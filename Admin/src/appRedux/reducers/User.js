import {
  GET_PROFILE,
  GET_SETTINGS,
  INIT_SETTINGS,
  SET_SETTINGS,
  GET_ROLE,
  SET_ROLE,
  SWITCH_LANGUAGE
} from '../../constants/ActionTypes'
import { LANGUAGES } from '../../constants/AppConfigs'

const INIT_STATE = {
  profile: {
    adminAccessToken: '',
    email: ''
  },
  role: 'NO_USER',
  locale: LANGUAGES[0].code,
}

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case INIT_SETTINGS:
      return INIT_STATE
    case GET_SETTINGS:
    case SET_SETTINGS:
      if (action.payload) {
        return {...state, profile: action.payload }
      } else {
        return state
      }
    case GET_PROFILE:
      if (action.payload) {
        return {...state, profile: action.payload}
      } else {
        return state
      }
    case GET_ROLE:
    case SET_ROLE:
      if (action.payload) {
        return {...state, role: action.payload }
      } else {
        return state
      }
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload
      }
    default:
      return state
  }
}
