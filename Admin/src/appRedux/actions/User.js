import {
  INIT_SETTINGS,
  SET_SETTINGS,
  SWITCH_LANGUAGE,
  GET_PROFILE, SET_ROLE,
} from '../../constants/ActionTypes'

export const initSettings = () => {
  return {type: INIT_SETTINGS}
}

export const setSettings = (payload) => {
  return {type: SET_SETTINGS, payload}
}

export const setRole = (payload) => {
  return {type: SET_ROLE, payload}
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  }
}

export const getProfile = () => {
  return {type: GET_PROFILE}
}
