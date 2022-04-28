/**
 * Axios related configurations here
 */

require('dotenv').config()

export const BASE_URL = 'http://192.168.1.141:5000/api'
//export const BASE_URL = 'http://35.78.212.16:5000/api'

export const CREATE = `/users/`
export const GET_INTRODUCER = `/user_by_code/:id`
export const GET_ACTIVATE = `/user_activate/:id`
export const SIGNUP = `signup`
// export const SIGNUP_CONFIRM = `signup_confirm`
export const LOGIN = `login`
// export const LOGOUT = `logout`
// export const PASSWORD_RESETS = `password_resets`
// export const INQUIRY = `inquiry`
export const HOME = 'home'

