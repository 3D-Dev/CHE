const { sequelize } = require("../models")
const db = require("../models")
const {adminDB} = require("../auth/adminDB.js")
const {createAccessToken, sendAccessToken} = require("../auth/tokens.js")
const {isAuth} = require("../auth/isAuth.js")
const {verify} = require("jsonwebtoken")

exports.login = async (req, res) => {
  const {email, password} = req.body

  try {
    // 1. Find user in array. If not exist send error
    const user = adminDB.find(user => user.email === email)
    if (!user) throw new Error('User does not exist')
    // 2. Compare crypted password and see if it checks out. Send error if not
    if (password !== user.password) throw new Error('Password not correct')
    // 3. Create Refresh- and Accesstoken
    const accessToken = createAccessToken(user.id)
    // 4. Store RefreshToken with user in "db"
    // Could also use different version numbers instead.
    // 5. Send token. RefreshToken as a cookie and accessToken as a regular response
    sendAccessToken(res, req, accessToken, '', 'admin')
  } catch (err) {
    res.send({
      error: `${err.message}`,
    })
  }
}

exports.isAuth = async (req, res) => {
  try {
    const userId = isAuth(req)
    if (userId === null) {
      throw Error( "login is need!" )
    }
    return userId
  } catch (err) {
    res.send({
      error: `${err.message}`,
    })
  }
}
