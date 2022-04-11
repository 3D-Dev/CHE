const {sign} = require('jsonwebtoken')

// Create tokens
// ----------------------------------
const createAccessToken = userId => {
  return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  })
}

// Send tokens
// ----------------------------------
const sendAccessToken = (res, req, token, code, kind = null) => {
  res.send((kind) ? {
      adminAccessToken: token,
      email: req.body.email,
    } : {
      accessToken: token,
      email: req.body.email,
      code: code,
    }
  )
}

module.exports = {
  createAccessToken,
  sendAccessToken,
}