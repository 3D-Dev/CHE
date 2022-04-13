const { sequelize } = require("../models")
const db = require("../models")
const {hash} = require("bcrypt")
const {isAuth} = require("./auth.controller")
const Account = db.accounts
const Requests = db.requests
const Op = db.Sequelize.Op;
const requests = require('./requests.controller');

exports.findAll = async (req, res) => {
  try {
    // const userId = await isAuth(req, res)

    const keyword = req.query.keyword || ""
    const limit = parseInt(req.query.limit) || 0
    const offset = limit * ((parseInt(req.query.page || 1)) - 1)

    const condition = {
      [Op.or]: [
        {name: {[Op.like]: '%' + keyword + '%'}},
        {email: {[Op.like]: '%' + keyword + '%'}},
        {account: {[Op.like]: '%' + keyword + '%'}},
      ]
    }

    const count = await Account.count({where: condition})

    const findCondition = {
      where: condition,
      order: [sequelize.col('id')]
    }
    if (limit > 0) {
      findCondition.offset = offset
      findCondition.limit = limit
    }

    const data = await Account.findAll(findCondition)

    const request = await Requests.findAll({
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    })

    if (data) {
      res.send({data: data, total: count, request: request})
    }

    requests.auto_task_one()
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving accounts."
    })
  }
}

exports.create = async (req, res) => {
  // Validate request
  try {
    // const userId = await isAuth(req, res)

    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      })
      return
    }
    let result = await Account.findOne({where: {email: req.body.referEmail}})
    let referId = 0
    if (result) {
      referId = result.id
    }

    const account = {
      name: req.body.name,
      email: req.body.email,
      account: req.body.account,
      referId: referId,
      referEmail: req.body.referEmail,
    }

    result = await Account.findOne({where: {email: account.email}})
    if (result) {
      res.status(409).send({
        message:
          "既に存在するユーザーです。"
      })
    } else {
      const data = await Account.create(account)
      if (data) {
        res.send(data)
      }
    }
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating of user."
    })
  }
}

exports.update = async (req, res) => {
  try {
    const userId = await isAuth(req, res)
    const id = req.params.id
    const result = await Account.update(req.body, { where: { id: id } })
    if (result[0] === 1) {
      res.send({
        message: "account was updated successfully."
      })
    } else {
      res.send({
        message: `Cannot update account with id=${id}. Maybe account was not found or req.body is empty!`
      })
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating account with id=" + id
    })
  }
}

