import axios from 'axios'
import * as axiosConfig from './axiosConfig'

export const axiosRequest = (method, url, reqData = null, needLoader = true) => {
  const auth = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined

  const getHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': auth,
  }

  const formDataHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
    'Authorization': auth,
  }

  const jsonHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': auth,
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
export const createAccout = (data) => {
  return axiosRequest('post', axiosConfig.CREATE, data)
}
export const getIntruducer = (data) => {
  return axiosRequest('get', axiosConfig.GET_INTRODUCER, data)
}
export const getEmailActivateStatus = (data) => {
  return axiosRequest('get', axiosConfig.GET_ACTIVATE, data)
}
export const signup = (data) => {
  return axiosRequest('post', axiosConfig.SIGNUP, data)
}
//
// export const signupConfirm = (data) => {
//   return axiosRequest('post', axiosConfig.SIGNUP_CONFIRM, data)
// }

export const login = (data) => {
  return axiosRequest('post', axiosConfig.LOGIN, data)
}
//
// export const logout = () => {
//   return axiosRequest('delete', axiosConfig.LOGOUT)
// }
//
// export const forgetPasswordSendMail = (data) => {
//   return axiosRequest('post', axiosConfig.PASSWORD_RESETS, data)
// }
//
// export const resetPassword = (id, data) => {
//   return axiosRequest('put', axiosConfig.PASSWORD_RESETS + '/' + id, data)
// }
//
// export const sendInquiry = (data) => {
//   return axiosRequest('post', axiosConfig.INQUIRY, data)
// }

