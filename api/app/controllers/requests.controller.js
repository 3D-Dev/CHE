const {sequelize, requests} = require("../models")
const db = require("../models")
const {hash} = require("bcrypt")
const {isAuth} = require("./auth.controller")
const Account = db.accounts
const Request = db.requests
const Op = db.Sequelize.Op
const moment = require('moment')
const {WAITING, SUCCESS, FAIL} = require("../constant/requestStatus")
const {USER, INTRODUCER} = require("../constant/accountType")
const {USER_PAYMENT, INTRODUCTION_PAYMENT, FEE_PERCENT} = require("../constant/payment")
const {transferHBYFromAdmin} = require("../constant/chainHelper")

exports.findAll = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

    const limit = parseInt(req.query.limit) || 0
    const offset = limit * ((parseInt(req.query.page || 1)) - 1)
    const findCondition = {
      order: [sequelize.col('id')]
    }

    const count = await Request.count(findCondition)

    if (limit > 0) {
      findCondition.offset = offset
      findCondition.limit = limit
    }
    const data = await Request.findAll(findCondition)

    res.send({data: data, total: count})
  } catch (err) {
    console.log("findAll", err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Requests."
    })
  }
}

exports.create = async (req, res) => {
  try {
    const userId = await isAuth(req, res)
    const data = await Request.create({
      startAt: db.sequelize.fn('NOW'),
      status: WAITING,
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating of user."
    })
  }
}

exports.findOne = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

    const id = req.params.id

    const data = await Request.findByPk(id)

  } catch (err) {
    console.log("findOne", err)
    res.status(500).send({
      message: "Error retrieving Request with id=" + id
    })
  }
}

exports.update = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

    const id = req.params.id
    const result = await Request.update(req.body, {where: {id: id}})
    if (result[0] === 1) {
      res.send({
        message: "Request was updated successfully."
      })
    } else {
      res.send({
        message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`
      })
    }
  } catch (err) {
    console.log("update", err)
    res.status(500).send({
      message: "Error updating Request with id=" + id
    })
  }
}

const copyUser = (record) => {
  return {
    name: record.name,
    email: record.email,
    account: record.account,
    referId: record.referId,
    referEmail: record.referEmail,
    distributed: record.distributed,
    totalDistribution: record.totalDistribution,
    name: record.name,
  }
}

const copyRequest = (record) => {
  return {
    status: record.status,
    startAt: record.startAt,
    retryCount: record.retryCount,
  }
}

const updateUserInfo = async (record) => {
  // update user
  const newRecord = copyUser(record)
  newRecord.distributed = true
  newRecord.totalDistribution += USER_PAYMENT

  await transferHBYFromAdmin(newRecord.account, (USER_PAYMENT * FEE_PERCENT).toString())
  await Account.update(newRecord, { where: { id: record.id } })

  // update refer
  if (record.referId > 0) {
    const referRecord = await Account.findByPk(record.referId)
    const newReferRecord = copyUser(referRecord)
    newReferRecord.totalDistribution += INTRODUCTION_PAYMENT
    await transferHBYFromAdmin(newReferRecord.account, (INTRODUCTION_PAYMENT * FEE_PERCENT).toString())

    await Account.update(newReferRecord, { where: { id: referRecord.id } })
  }
}

const updateRequestRetryCount = async (record) => {
  const newRecord = copyRequest(record)
  newRecord.retryCount += 1
  await Request.update(newRecord, { where: { id: record.id } })
}

const updateRequestToSuccess = async (record, status) => {
  const newRecord = copyRequest(record)
  newRecord.status = status
  await Request.update(newRecord, { where: { id: record.id } })
}

exports.auto_task_one = async () => {
  try {
    console.log("Task One ~~~~~~~~~~~~~~~ is running every minute " + new Date())

    const request = await Request.findAll({
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    })
    if (request.length > 0) {
      if (request[0].retryCount < 3  && request[0].status == WAITING) {
        // update request
        await updateRequestRetryCount(request[0])

        const data = await Account.findAll({
          where: {
            distributed: false,
            activated: true,
            updatedAt: {[Op.lt]: request[0].startAt},
          },
          order: [sequelize.col('id')]
        })

        let isSuccess = true
        for (index in data) {
          try {
            const record = data[index]
            if (record.isIntroducer === INTRODUCER && !record.isPublic) {
              //if user is introducer, check isPublic flag
              continue
            }
            await updateUserInfo(record)
          } catch (err) {
            isSuccess = false
            console.log("auto_task_one::updateUserInfo", err)
          }
        }
        if (isSuccess) {
          await updateRequestToSuccess(request[0], SUCCESS)
        }
      }
      else if (request[0].retryCount >= 3  && request[0].status == WAITING) {
        await updateRequestToSuccess(request[0], FAIL)
      }
    }

  } catch (err) {
    console.log("auto_task_one", err)
  }
}

exports.auto_task_two = async () => {
  try {
    console.log("Task Two  @@@@@@@@@@@@@@@@@@@ is running 2 minute " + new Date())

  } catch (err) {
  }
}
