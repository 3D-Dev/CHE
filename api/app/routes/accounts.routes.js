module.exports = app => {
  const auth = require("../controllers/auth.controller.js")
  const account = require("../controllers/accounts.controller.js")
  const multer = require('multer')
  const upload = multer()

  let router = require("express").Router()

  router.post("/admin_login", upload.none(), auth.adminLogin)
  router.post("/login", upload.none(), auth.login)

  router.get("/users", upload.none(), account.findAll)
  // router.get("/users/:id", upload.none(), account.findOne)
  router.get("/conpany_name_by_code/:id", upload.none(), account.findOneByCode)
  router.put("/user_public/:id", upload.none(), account.publicUpdate)

  router.get("/test", upload.none(), account.test)

  router.post("/users", upload.none(), account.create)

  app.use('/api', router)
}
