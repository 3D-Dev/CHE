/**
 * Axios related configurations here
 */

require('dotenv').config()

export const BASE_URL = 'http://192.168.1.141:5000/api/'

export const LOGIN_URL = `admin_login`
export const FINDALL_URL = `users`
export const REQUEST_FINDALL_URL = `request`
export const LOGOUT_URL = `signout`
export const LOGIN_CUSTOM_FROM_USER = 'admin/authorize_pretend_to_user'
export const USER_ITEM = 'admin/users'
// export const CUSTOMER_LIST = 'user/customers'
// export const CUSTOMER_ITEM = 'user/customers'
// export const LOGIN_CUSTOMER = 'user/authorize_pretend_to_customer'
