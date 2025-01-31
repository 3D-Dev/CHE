import axios from 'axios'
import * as axiosConfig from './axiosConfig'
import {FINDALL_URL, REQUEST_FINDALL_URL} from "./axiosConfig";

export const axiosRequest = (method, url, reqData = null, needLoader = true) => {
  //const user = JSON.parse(localStorage.getItem("persist:root")).user
  //const auth = JSON.parse(user).profile.adminAccessToken ? `Bearer ${JSON.parse(user).profile.adminAccessToken}` : undefined
  const auth = 'Bearer ' + localStorage.getItem('token')
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

export const logout = () => {
  return axiosRequest('post', axiosConfig.LOGOUT_URL)
}

export const userPublic = (id, data) => {
  return axiosRequest('put', axiosConfig.USER_PUBLIC + id, data)
}

// User API
export const getUserList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.FINDALL_URL, data)
}

export const addRequest = () => {
  return axiosRequest('post', axiosConfig.REQUEST_FINDALL_URL)
}

export const getRequestList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.REQUEST_FINDALL_URL, data)
}

export const getUserItem = (data) => {
  return axiosRequest('get', axiosConfig.USER_ITEM + '/' + data + '/edit')
}

export const addUser = (data) => {
  return axiosRequest('post', axiosConfig.USER_ITEM, data)
}

export const editUser = (id, data) => {
  return axiosRequest('put', axiosConfig.USER_ITEM + '/' + id, data)
}

export const getDownloadList = (data) => {
  return axiosRequest('get', axiosConfig.FINDALL_URL, data)
}

export const deleteUser = (id) => {
  return axiosRequest('delete', axiosConfig.USER_ITEM + '/' + id)
}

export const loginCustomerFromUser = (id) => {
  return axiosRequest('post', axiosConfig.LOGIN_CUSTOM_FROM_USER + '/' + id)
}


