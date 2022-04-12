import React from 'react'
import { BASE_URL } from '../api/axiosConfig'

const PAGE_PREFIX = '/admin'
const PageConstant = {
  USERS: PAGE_PREFIX + '/users',
  ADD_USER: PAGE_PREFIX + '/users/add',
  EDIT_USER: PAGE_PREFIX + '/users/edit',
  CUSTOMERS: PAGE_PREFIX + '/customers',
  ADD_CUSTOMER: PAGE_PREFIX + '/customer/add',
  EDIT_CUSTOMER: PAGE_PREFIX + '/customer/edit',
  DASHBOARD: PAGE_PREFIX + '/dashboard',
  HEALTH_MANAGEMENT_RECORDS: PAGE_PREFIX + '/health_management_records',
  CCP_RECORDS: PAGE_PREFIX + '/ccp_records',
  HYGIENE_RECORDS: PAGE_PREFIX + '/general_hygiene_records',
  TEMPERATURE_RECORDS: PAGE_PREFIX + '/temperature_records',
  RUSH_RECORDS: PAGE_PREFIX + '/rush_records',
  MAINTENANCE: PAGE_PREFIX + '/maintenance',
  EMPLOYEES: PAGE_PREFIX + '/employees',
  NEW_EMPLOYEE: PAGE_PREFIX + '/employees/add',
  EDIT_EMPLOYEE: PAGE_PREFIX + '/employees/edit',
  GENERAL_HYGIENE_MANAGEMENT: PAGE_PREFIX + '/general_hygiene_management',
  IMPORTANT_MANAGEMENTS: PAGE_PREFIX + '/important_managements',
  NEW_IMPORTANT_MANAGEMENTS: PAGE_PREFIX + '/important_managements/add',
  EDIT_IMPORTANT_MANAGEMENTS: PAGE_PREFIX + '/important_managements/edit',
  IMPORTANT_CATEGORIES: PAGE_PREFIX + '/important_categories',
  NEW_IMPORTANT_CATEGORY: PAGE_PREFIX + '/important_categories/add',
  EDIT_IMPORTANT_CATEGORY: PAGE_PREFIX + '/important_categories/edit',
  MANAGEMENT_DEVICES: PAGE_PREFIX + '/management_devices',
  NEW_MANAGEMENT_DEVICE: PAGE_PREFIX + '/management_devices/add',
  EDIT_MANAGEMENT_DEVICE: PAGE_PREFIX + '/management_devices/edit',
  CONTENTS_OUTPUT: PAGE_PREFIX + '/contents_output',
  CONTENTS_OUTPUT_EMPLOYEE: PAGE_PREFIX + '/contents_output/employee_health_management',
  CONTENTS_OUTPUT_GENERAL: PAGE_PREFIX + '/contents_output/general_hygiene_report',
  CONTENTS_OUTPUT_CCP: PAGE_PREFIX + '/contents_output/ccp_report',
  CONTENTS_OUTPUT_TEMPERATURE: PAGE_PREFIX + '/contents_output/temperature_report',
  CONTENTS_OUTPUT_BATCH: PAGE_PREFIX + '/contents_output/batch_output',
  RUSH_REPORT: PAGE_PREFIX + '/rush_report',
  PDF_CONTENTS_OUTPUT_GENERAL: BASE_URL + 'contents_output/general_hygiene_management_pdf',
  PDF_CONTENTS_EMPLOY_HEALTH_MANAGEMENT: BASE_URL + 'contents_output/employee_health_management_pdf',
  PDF_CONTENTS_GENERAL_HYGIENE: BASE_URL + 'contents_output/general_hygiene_report_pdf',
  PDF_CCP_REPORT: BASE_URL + 'contents_output/ccp_report_pdf',
  PDF_TEMPERATURE_REPORT: BASE_URL + 'contents_output/temperature_report_pdf',
  PDF_BATCH_OUTPUT_REPORT: BASE_URL + 'contents_output/batch_output_pdf_api'
}

export default PageConstant
