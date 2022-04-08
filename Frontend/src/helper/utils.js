import {PageConstant} from "../constants/PageConstant";
import {SET_PROFILE} from "../constants/ActionType";

export const isLogined = (profile) => {
  return Boolean(profile.id)
}

export const updateProfile = (dispatch, payload, remember) => {
  payload.remember = remember
  dispatch({type: SET_PROFILE, payload: payload});
  if (remember) {
    localStorage.setItem('currentProfile', JSON.stringify(payload));
  }
}

export const isShared = () => {
  const pathname = window.location.pathname
  return (pathname.indexOf(PageConstant.SHARED_PROGRAM) !== -1 || pathname.indexOf(PageConstant.SHARED_LESSON) !== -1)
}

export const Trim = (data) => {
  return data.trim().replace(/\\n/g, '')
}
