/**
 * Axios related configurations here
 */

require('dotenv').config()

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/'

export const CREATE = `create`
// export const SIGNUP = `signup`
// export const SIGNUP_CONFIRM = `signup_confirm`
// export const LOGIN = `login`
// export const LOGOUT = `logout`
// export const PASSWORD_RESETS = `password_resets`
// export const INQUIRY = `inquiry`
export const HOME = 'home'

