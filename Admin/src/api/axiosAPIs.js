import axios from 'axios'
import * as axiosConfig from './axiosConfig'

export const axiosRequest = (method, url, reqData = null, needLoader = true) => {
  const auth = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined
  const getHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': auth
  }

  const formDataHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
    'Authorization': auth
  }

  const jsonHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': auth
  }

  let reqConfig = {
    url: url,
    method: method,
    baseURL: axiosConfig.BASE_URL,
    withCredentials: true,
    needLoader: needLoader, // custom config for show loader
    headers: getHeaders, // default: get
    timeout: 300000
  }
  if (method === 'post' || method === 'put' || method === 'patch') {
    const headers = reqData instanceof FormData ? formDataHeaders : jsonHeaders
    reqConfig['data'] = reqData
    reqConfig['headers'] = headers
  } else { // 'get', 'delete', 'head'
    reqConfig['params'] = reqData
  }
  return axios.request(reqConfig)
}

export const login = (data) => {
  return axiosRequest('post', axiosConfig.LOGIN_URL, data)
}

export const select = (data) => {
  const url = axiosConfig.SELECT_URL + '?permission_id=' + data
  return axiosRequest('get', url)
}

export const logout = () => {
  return axiosRequest('post', axiosConfig.LOGOUT_URL)
}
// Agency API
export const getAgencyList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.AGENCY_LIST, data)
}

export const getAgencyItem = (data) => {
  return axiosRequest('get', axiosConfig.AGENCY_ITEM + '/' + data + '/edit')
}

export const addAgency = (data) => {
  return axiosRequest('post', axiosConfig.AGENCY_ITEM, data)
}

export const editAgency = (id, data) => {
  return axiosRequest('put', axiosConfig.AGENCY_ITEM + '/' + id, data)
}

export const deleteAgency = (id) => {
  return axiosRequest('delete', axiosConfig.AGENCY_ITEM + '/' + id)
}

export const loginCustomerFromAgency = (id) => {
  return axiosRequest('post', axiosConfig.LOGIN_CUSTOM_FROM_AGENCY + '/' + id)
}

export const getDownloadList = () => {
  return axiosRequest('get', axiosConfig.AGENCY_DOWNLOAD_LIST)
}

// Store API
export const getCustomerList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.CUSTOMER_LIST, data)
}

export const getCustomerItem = (data) => {
  return axiosRequest('get', axiosConfig.CUSTOMER_ITEM + '/' + data + '/edit')
}

export const addCustomer = (data) => {
  return axiosRequest('post', axiosConfig.CUSTOMER_ITEM, data)
}

export const editCustomer = (id, data) => {
  return axiosRequest('put', axiosConfig.CUSTOMER_ITEM + '/' + id, data)
}

export const deleteCustomer = (id) => {
  return axiosRequest('delete', axiosConfig.CUSTOMER_ITEM + '/' + id)
}

export const loginCustomer = (id) => {
  return axiosRequest('post', axiosConfig.LOGIN_CUSTOMER + '/' + id)
}

// Dashboard API
export const getEmployees = () => {
  return axiosRequest('get', axiosConfig.EMPLOYEE_LIST)
}

// HealthCareRecord API
export const getHealthCareRecords = (employId, qs, sId) => {
  return axiosRequest('get', axiosConfig.HEALTHCARE_RECORDS + '?employee_id=' + employId + '&question_step=' + qs + '&series_id=' + sId)
}

export const saveHealthCareRecords = (employId, data) => {
  return axiosRequest('post', axiosConfig.HEALTHCARE_RECORDS + '?employee_id=' + employId, data)
}

export const getCCPRecords = (employId, qs) => {
  return axiosRequest('get', axiosConfig.CCP_RECORDS + '?employee_id=' + employId + '&qs=' + qs)
}

export const saveCCPRecords = (employId, data) => {
  return axiosRequest('post', axiosConfig.CCP_RECORDS + '?employee_id=' + employId, data)
}

export const getGeneralHygieneRecords = (employId, qs, sId) => {
  return axiosRequest('get', axiosConfig.GENERAL_HYGIENE_RECORDS + '?employee_id=' + employId + '&question_step=' + qs + '&series_id=' + sId)
}

export const saveGeneralHygieneRecords = (employId, data) => {
  return axiosRequest('post', axiosConfig.GENERAL_HYGIENE_RECORDS + '?employee_id=' + employId, data)
}

export const getTemperatureRecords = (employId) => {
  return axiosRequest('get', axiosConfig.TEMPERATURE_RECORDS + '?employee_id=' + employId)
}

export const saveTemperatureRecords = (employId, data) => {
  return axiosRequest('post', axiosConfig.TEMPERATURE_RECORDS + '?employee_id=' + employId, data)
}

// Employ API
export const getEmployList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.EMPLOYS, data)
}

export const getEmployItem = (data) => {
  return axiosRequest('get', axiosConfig.EMPLOYS + '/' + data + '/edit')
}

export const addEmploy = (data) => {
  return axiosRequest('post', axiosConfig.EMPLOYS, data)
}

export const editEmploy = (id, data) => {
  return axiosRequest('put', axiosConfig.EMPLOYS + '/' + id, data)
}

export const deleteEmploy = (id) => {
  return axiosRequest('delete', axiosConfig.EMPLOYS + '/' + id)
}

// ImportantManagement API
export const getImportantManagmentList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.IMPORTANT_MANAGEMENT, data)
}

export const getImportantManagmentItem = (data) => {
  return axiosRequest('get', axiosConfig.IMPORTANT_MANAGEMENT + '/' + data + '/edit')
}

export const addImportantManagment = (data) => {
  return axiosRequest('post', axiosConfig.IMPORTANT_MANAGEMENT, data)
}

export const editImportantManagment = (id, data) => {
  return axiosRequest('put', axiosConfig.IMPORTANT_MANAGEMENT + '/' + id, data)
}

export const deleteImportantManagment = (id) => {
  return axiosRequest('delete', axiosConfig.IMPORTANT_MANAGEMENT + '/' + id)
}

// ImportantCategory API
export const getImportantCategoryList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.IMPORTANT_CATEGORY, data)
}

export const getImportantCategoryItem = (data) => {
  return axiosRequest('get', axiosConfig.IMPORTANT_CATEGORY + '/' + data + '/edit')
}

export const addImportantCategory = (data) => {
  return axiosRequest('post', axiosConfig.IMPORTANT_CATEGORY, data)
}

export const editImportantCategory = (id, data) => {
  return axiosRequest('put', axiosConfig.IMPORTANT_CATEGORY + '/' + id, data)
}

export const deleteImportantCategory = (id) => {
  return axiosRequest('delete', axiosConfig.IMPORTANT_CATEGORY + '/' + id)
}

// ManagementDevice API
export const getManagementDeviceList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.MANAGEMENT_DEVICES, data)
}

export const getManagementDeviceItem = (data) => {
  return axiosRequest('get', axiosConfig.MANAGEMENT_DEVICES + '/' + data + '/edit')
}

export const addManagementDevice = (data) => {
  return axiosRequest('post', axiosConfig.MANAGEMENT_DEVICES, data)
}

export const editManagementDevice = (id, data) => {
  return axiosRequest('put', axiosConfig.MANAGEMENT_DEVICES + '/' + id, data)
}

export const deleteManagementDevice = (id) => {
  return axiosRequest('delete', axiosConfig.MANAGEMENT_DEVICES + '/' + id)
}

// GeneralHygieneManagement API
export const getGeneralHygieneManagement = (step) => {
  return axiosRequest('get', axiosConfig.GENERAL_HYGIENE_MANAGEMENT + '?step=' + step)
}

export const editGeneralHygieneManagement = (step, data) => {
  return axiosRequest('post', axiosConfig.GENERAL_HYGIENE_MANAGEMENT + '?step=' + step, data)
}

// Content Output API
export const getGeneralHygieneReport = (year, month) => {
  return axiosRequest('get', axiosConfig.GENERAL_HYGIENE_REPORT + '?year=' + year + '&month=' + month)
}

export const getCCPReport = (year, month) => {
  return axiosRequest('get', axiosConfig.CCP_REPORT + '?year=' + year + '&month=' + month)
}

export const getTemperatureReport = (year, month) => {
  return axiosRequest('get', axiosConfig.TEMPERATURE_REPORT + '?year=' + year + '&month=' + month)
}

// Commuting API
export const saveCommutingRecords = (employId, data) => {
  return axiosRequest('post', axiosConfig.RUSH_RECORDS + '?employee_id=' + employId, data)
}

export const getCommutingRecords = (employId, date) => {
  return axiosRequest('get', axiosConfig.RUSH_RECORDS + '?employee_id=' + employId + '&date=' + date)
}

