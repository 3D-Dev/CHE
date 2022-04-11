/**
 * Axios related configurations here
 */

require('dotenv').config()

export const BASE_URL = 'http://localhost:5000/api/'

export const LOGIN_URL = `admin_login`
export const SELECT_URL = `authorize_api`
export const LOGOUT_URL = `signout`
export const AGENCY_LIST = 'admin/agencies'
export const LOGIN_CUSTOM_FROM_AGENCY = 'admin/authorize_pretend_to_agency'
export const AGENCY_DOWNLOAD_LIST = 'admin/export_agencies'
export const AGENCY_ITEM = 'admin/agencies'
export const CUSTOMER_LIST = 'agency/customers'
export const CUSTOMER_ITEM = 'agency/customers'
export const LOGIN_CUSTOMER = 'agency/authorize_pretend_to_customer'
export const EMPLOYEE_LIST = 'employees_list_api'
export const HEALTHCARE_RECORDS = 'health_management_records'
export const CCP_RECORDS = 'ccp_records'
export const GENERAL_HYGIENE_RECORDS = 'general_hygiene_records'
export const TEMPERATURE_RECORDS = 'temperature_records'
export const EMPLOYS = 'employees'
export const IMPORTANT_MANAGEMENT = 'important_managements'
export const IMPORTANT_CATEGORY = 'important_categories'
export const MANAGEMENT_DEVICES = 'management_devices'
export const GENERAL_HYGIENE_MANAGEMENT = 'general_hygiene_management'
export const GENERAL_HYGIENE_REPORT = 'contents_output/general_hygiene_report'
export const CCP_REPORT = 'contents_output/ccp_report'
export const TEMPERATURE_REPORT = 'contents_output/temperature_report'
export const RUSH_RECORDS = 'commuting_records'
