const {sequelize} = require("../models")
const db = require("../models")
const {hash} = require("bcrypt")
const {isAuth} = require("./accounts.controller")
const Requests = db.requests
const Op = db.Sequelize.Op
const moment = require('moment')
const {WAITING} = require("../constant/requestStatus")

exports.findAll = async (req, res) => {
  try {
    const userId = await isAuth(req, res)

    const data = await Requests.findAll({
      order: [sequelize.col('id')]
    })
    res.send({data: data})
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
    const Request = {
      status: WAITING,
    }

    const data = await Request.create(Request)
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


exports.auto_task_one = async () => {
  try {
    console.log("Task One ~~~~~~~~~~~~~~~ is running every minute " + new Date())

  } catch (err) {
  }
}

exports.auto_task_two = async () => {
  try {
    console.log("Task Two  @@@@@@@@@@@@@@@@@@@ is running 2 minute " + new Date())

  } catch (err) {
  }
}
