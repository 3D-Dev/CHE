require('dotenv/config')
const express = require("express")
const cors = require("cors")
const cron = require('node-cron');
const requests = require('./app/controllers/requests.controller');

const app = express()
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
global.__basedir = __dirname

var corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(!origin || whitelist.includes(origin))
      return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  }
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())  /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models")

db.sequelize.sync()
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.")
// })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." })
})

require("./app/routes/accounts.routes")(app)
require("./app/routes/requests.routes")(app)

cron.schedule('* * * * *', async () => {
  await requests.auto_task()
});

// set port, listen for requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}.`)
})
