import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';

import {useAuthDispatch, useAuthState} from '../../context';
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED
} from "../../constants/ResponseCode";
import axios from "axios";
import {HIDE_LOADING, SHOW_LOADING} from "../../constants/ActionType";
import {PageConstant} from "../../constants/PageConstant";
import {isLogined, updateProfile} from "../../helper/utils";
import _ from "lodash";
import {ERROR, openNotificationWithIcon} from "../common/Messages";
import {initialProfile} from "../../context/reducer";

const AppRoutes = ({component: Component, path, isPrivate, ...rest}) => {
  const {profile} = useAuthState();
  const dispatch = useAuthDispatch();

  const processError = (error) => {
    let msg = null
    if (error.response) {
      const {status, data} = error.response
      switch (status) {
        case HTTP_BAD_REQUEST:
        case HTTP_NOT_FOUND:
        case HTTP_INTERNAL_SERVER_ERROR:
          break
        case HTTP_CONFLICT:
          msg = data
        case HTTP_UNAUTHORIZED:
          updateProfile(dispatch, initialProfile, profile.remember)
      }
    }
    if (!_.isEmpty(msg)) {
      openNotificationWithIcon(ERROR, msg)
    }
  }

  useEffect(() => {
    if (axios.interceptors.request.handlers.length < 1) {
      axios.interceptors.request.use(config => {
          if (config.needLoader) {
            dispatch({type: SHOW_LOADING})
          }
          return config
        },
        error => {
          return Promise.reject(error)
        })
    }

    // Add a response interceptor
    if (axios.interceptors.response.handlers.length < 1) {
      axios.interceptors.response.use(
        response => {
          if (response.config.needLoader) {
            dispatch({type: HIDE_LOADING})
          }
          return response
        }, error => {
          if (!!error.config && error.config.needLoader) {
            dispatch({type: HIDE_LOADING})
          }
          processError(error)
          return Promise.reject(error)
        })
    }
  }, []);

  console.log("/***** profile ******/ ", profile)

  return (
    <Route
      path={path}
      render={(props) =>
        path === '/*' ? (
            <Redirect to={{pathname: PageConstant.HOME}}/>
          ) :
            <Component {...props} />
      }
      {...rest}
    />
  );
};

export default AppRoutes;
