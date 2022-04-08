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

export const signup = (data) => {
  return axiosRequest('post', axiosConfig.SIGNUP, data)
}

export const signupConfirm = (data) => {
  return axiosRequest('post', axiosConfig.SIGNUP_CONFIRM, data)
}

export const login = (data) => {
  return axiosRequest('post', axiosConfig.LOGIN, data)
}

export const logout = () => {
  return axiosRequest('delete', axiosConfig.LOGOUT)
}

export const forgetPasswordSendMail = (data) => {
  return axiosRequest('post', axiosConfig.PASSWORD_RESETS, data)
}

export const resetPassword = (id, data) => {
  return axiosRequest('put', axiosConfig.PASSWORD_RESETS + '/' + id, data)
}

export const sendInquiry = (data) => {
  return axiosRequest('post', axiosConfig.INQUIRY, data)
}

// School API
export const getSchoolList = (data) => {
  data.page = data.page + 1
  return axiosRequest('get', axiosConfig.SCHOOL, data)
}

// Program API
export const getProgramList = (data) => {
  return axiosRequest('get', axiosConfig.PROGRAM, data)
}

export const getProgramItem = (data) => {
  return axiosRequest('get', axiosConfig.PROGRAM + '/' + data + '/edit')
}

// Teacher API
export const isExistTeacher = (data) => {
  return axiosRequest('get', axiosConfig.TEACHER_EXIST, data)
}

export const getTeacherList = (data) => {
  return axiosRequest('get', axiosConfig.TEACHER, data)
}

export const getTeacherItem = (data) => {
  return axiosRequest('get', axiosConfig.TEACHER + '/' + data + '/edit')
}

export const addTeacher = (data) => {
  return axiosRequest('post', axiosConfig.TEACHER, data)
}

export const editTeacher = (id, data) => {
  return axiosRequest('put', axiosConfig.TEACHER + '/' + id, data)
}

export const deleteTeacher = (id) => {
  return axiosRequest('delete', axiosConfig.TEACHER + '/' + id)
}

export const changeTeacherEmail = (data) => {
  return axiosRequest('post', axiosConfig.TEACHER_EMAIL, data)
}

export const changeTeacherPassword = (data) => {
  return axiosRequest('post', axiosConfig.TEACHER_PASSWORD, data)
}

// Lesson API
export const getLessonList = (data) => {
  return axiosRequest('get', axiosConfig.LESSON, data)
}

export const getLessonItem = (data) => {
  return axiosRequest('get', axiosConfig.LESSON + '/' + data + '/edit')
}

// Theme API
export const getThemeList = (data) => {
  return axiosRequest('get', axiosConfig.THEME, data)
}

export const getThemeListByInstructor = (data) => {
  return axiosRequest('get', axiosConfig.THEME_BY_INSTRUCTOR, data)
}

export const getThemeItem = (data) => {
  return axiosRequest('get', axiosConfig.THEME + '/' + data + '/edit')
}

// Instructor API
export const getInstructorItem = (data) => {
  return axiosRequest('get', axiosConfig.INSTRUCTOR + '/' + data + '/edit')
}

// Notification API
export const getNotificationList = (data) => {
  return axiosRequest('get', axiosConfig.NOTIFICATION, data)
}

export const getNotificationItem = (data) => {
  return axiosRequest('get', axiosConfig.NOTIFICATION + '/' + data + '/edit')
}

// Common API
export const getMainList = () => {
  return axiosRequest('get', axiosConfig.HOME)
}

export const getProfile = () => {
  return axiosRequest('get', axiosConfig.PROFILE)
}

// Share API
export const getSharedUrl = (data) => {
  return axiosRequest('get', axiosConfig.SHARED_PROGRAM, data)
}

export const addSharedProgramUrl = (data) => {
  return axiosRequest('post', axiosConfig.SHARED_PROGRAM, data)
}

export const getSharedLessonItem = (data) => {
  return axiosRequest('get', axiosConfig.SHARED_LESSON, data)
}

export const getSharedInstructorItem = (data) => {
  return axiosRequest('get', axiosConfig.SHARED_INSTRUCTOR, data)
}
