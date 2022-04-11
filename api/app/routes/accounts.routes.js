module.exports = app => {
  const auth = require("../controllers/auth.controller.js")
  const account = require("../controllers/accounts.controller.js")
  const multer = require('multer')
  const upload = multer()

  let router = require("express").Router()

  router.post("/admin_login", upload.none(), auth.login)

  router.get("/users", upload.none(), account.findAll)

  router.post("/users", upload.none(), account.create)

  app.use('/api', router)
}
