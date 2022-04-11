import {SERIAL_ID, EMPLOY_ID, INIT_CUSTOM, TITLE_TEXT} from '../../constants/ActionTypes'


export const initCustom = () => {
  return {type: INIT_CUSTOM}
}

export const setTitleText = (payload) => {
  return {type: TITLE_TEXT, payload}
}

export const setEmployId = (payload) => {
  return {type: EMPLOY_ID, payload}
}

export const setSerialId = (payload) => {
  return {type: SERIAL_ID, payload}
}
