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
  return axiosRequest('get', axiosConfig.USER_LIST, data)
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

export const getDownloadList = () => {
  return axiosRequest('get', axiosConfig.AGENCY_DOWNLOAD_LIST)
}

export const deleteAgency = (id) => {
  return axiosRequest('delete', axiosConfig.AGENCY_ITEM + '/' + id)
}

export const loginCustomerFromAgency = (id) => {
  return axiosRequest('post', axiosConfig.LOGIN_CUSTOM_FROM_AGENCY + '/' + id)
}


