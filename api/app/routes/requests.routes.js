module.exports = app => {
  const requests = require("../controllers/requests.controller.js")
  const multer = require('multer')
  const upload = multer()

  let router = require("express").Router()

  router.post("/", upload.none(), requests.create)
  router.get("/", upload.none(), requests.findAll)

  app.use('/api/request', router)
}
