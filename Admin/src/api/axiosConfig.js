/**
 * Axios related configurations here
 */

require('dotenv').config()

export const BASE_URL = 'http://localhost:5000/api/'

export const LOGIN_URL = `admin_login`
export const SELECT_URL = `authorize_api`
export const LOGOUT_URL = `signout`
export const USER_LIST = 'users'
export const LOGIN_CUSTOM_FROM_AGENCY = 'admin/authorize_pretend_to_agency'
export const AGENCY_DOWNLOAD_LIST = 'admin/export_agencies'
export const AGENCY_ITEM = 'admin/agencies'
// export const CUSTOMER_LIST = 'agency/customers'
// export const CUSTOMER_ITEM = 'agency/customers'
// export const LOGIN_CUSTOMER = 'agency/authorize_pretend_to_customer'
