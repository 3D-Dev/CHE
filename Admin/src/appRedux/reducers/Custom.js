import {SERIAL_ID, EMPLOY_ID, INIT_CUSTOM, TITLE_TEXT,} from '../../constants/ActionTypes'

const INIT_STATE = {
  titleText: '',
  employId: -1,
  serialId: '',
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_CUSTOM:
      return INIT_STATE
    case TITLE_TEXT:
      if (action.payload) {
        return {...state, titleText: action.payload }
      } else {
        return state
      }
    case EMPLOY_ID:
      if (action.payload) {
        return {...state, employId: action.payload }
      } else {
        return state
      }
    case SERIAL_ID:
      if (action.payload) {
        return {...state, serialId: action.payload }
      } else {
        return state
      }
    default:
      return state
  }
}
