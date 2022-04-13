const { sequelize } = require("../models")
const db = require("../models")
const {hash} = require("bcrypt")
const {isAuth} = require("./auth.controller")
const Account = db.accounts

exports.findAll = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

    const count = await Account.count()
    const limit = parseInt(req.query.limit)
    const offset = limit * (parseInt(req.query.page)-1)

    const data = await Account.findAll({
      offset: offset,
      limit: limit,
      order: [sequelize.col('id')]
    })
    if (data) {
      res.send({data: data, total: count})
    }
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
    let result = await Account.findOne({where: {email: req.body.refer_email}})
    let refer_id = 0
    if (result) {
      refer_id = result.id
    }

    const account = {
      name: req.body.name,
      email: req.body.email,
      account: req.body.account,
      refer_id: refer_id,
      refer_email: req.body.refer_email,
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

