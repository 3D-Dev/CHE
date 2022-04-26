const { sequelize } = require("../models")
const db = require("../models")
const {hash} = require("bcrypt")
const {isAuth} = require("./auth.controller")
const {sendEmail} = require("../helper/mailer")
const Account = db.accounts
const Requests = db.requests
const Op = db.Sequelize.Op;
const uuid = require("uuid")
const moment = require('moment')


exports.findAll = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

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

  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving accounts."
    })
  }
}

generateCode = async () => {
  let code = uuid.v4().replace(/-/g, '')
  while ( await Account.findOne({where: {code: code}}) ) {
    code = uuid.v4().replace(/-/g, '')
  }
  return code
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
      name: req.body.name || "",
      email: req.body.email,
      password: await hash(req.body.password, 10),
      account: req.body.account || "",
      code: await generateCode(),
      referId: referId,
      referEmail: req.body.referEmail,
      isIntroducer: req.body.isIntroducer || false,
      companyName: req.body.companyName || "",
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

exports.userActivate = async (req, res) => {
  try {
    // const userId = await isAuth(req, res)
    const code = req.params.id

    const data = await Account.findOne({where: {code: code}})
    if (data) {
      // const createDate = moment(data.createdAt)
      // const diff = moment().diff(createDate, 'hour')
      if (true) {
      // if (diff <= 8) {
        const result = await Account.update({ activated: true }, { where: { code: code } })
        if (result[0] === 1) {
          res.send({
            message: "account was activated successfully."
          })
        }
      } else {
        res.send({
          message: "account activation link was expired."
        })
      }
    } else {
      res.send({
        message: "account is not existed."
      })
    }


  } catch(err) {
    res.status(500).send({
      message: "Error userActivate"
    })
  }
}

exports.publicUpdate = async (req, res) => {
  try {
    const userId = await isAuth(req, res)
    const id = req.params.id
    const isPublic = req.params.isPublic
    const result = await Account.update({ isPublic: isPublic}, { where: { id: id } })
    if (result[0] === 1) {
      res.send({
        message: "account was updated successfully."
      })
    } else {
      res.send({
        message: `Cannot update account with id=${id}. Maybe account was not found or isPublic is empty!`
      })
    }
  } catch(err) {
    res.status(500).send({
      message: "Error publicUpdate" 
    })
  }
}


exports.findOne = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

    const id = req.params.id

    const data = await Course.findByPk(id)
    if (data) {
      res.send(data)
    } else {
      res.send("")
    }
  } catch (err) {
    console.log("findOne", err)
    res.status(500).send({
      message: "Error retrieving account with id=" + id
    })
  }
}

exports.findOneByCode = async (req, res) => {
  try {
    // const userId = await isAuth(req, res)

    const code = req.params.id

    const data = await Account.findOne({where: {code: code}})
    if (data) {
      res.send(data)
    } else {
      res.send("")
    }
  } catch (err) {
    console.log("findOneByCode", err)
    res.status(500).send({
      message: "Error retrieving account with id=" + code
    })
  }
}

exports.test = async (req, res) => {
  try {

    await sendEmail()




  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating of user."
    })
  }
}

