import React from 'react';
import {HIDE_LOADING, INIT_STATE, SET_PROFILE, SHOW_LOADING} from "../constants/ActionType";

export const initialProfile = {
  id: '',
  name: '',
  email: '',
  permission: '',
  remember: false,
};

let profile = localStorage.getItem('currentProfile')
  ? JSON.parse(localStorage.getItem('currentProfile'))
  : initialProfile;

export const initialState = {
  profile: profile,
  loading: false,
  callCount: 0,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case INIT_STATE:
      return {
        ...initialState,
        profile: '',
      };
    case SET_PROFILE:
      return {
        ...initialState,
        profile: action.payload,
        loading: false,
      };
    case SHOW_LOADING:
      return {
        ...initialState,
        callCount: initialState.callCount + 1,
        loading: true
      };
    case HIDE_LOADING:
      const callCount = initialState.callCount > 1 ? initialState.callCount - 1 : 0
      return {
        ...initialState,
        callCount,
        loading: callCount > 0
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
