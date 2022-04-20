import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import axios from 'axios'
import _ from 'lodash'
import { hideLoader, showLoader } from '../../appRedux/actions/Progress'
import { openNotificationWithIcon } from '../../components/common/Messages'
import {initSettings, setSettings} from '../../appRedux/actions/User'
import MainApp from './MainApp'
import Login from '../../routes/common/Login'
import Error404 from '../../routes/common/Error404'
import Error500 from '../../routes/common/Error500'
import { ERROR } from '../../constants/AppConfigs'
import {
  HTTP_BAD_REQUEST, HTTP_CONFLICT,
  HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED
} from '../../constants/ResponseCode'


class RootApp extends Component {

  processError = (error) => {
    let msg = null
    if (error.response) {
      const {status, data} = error.response
      switch (status) {
        case HTTP_BAD_REQUEST:
        case HTTP_UNAUTHORIZED:
        case HTTP_NOT_FOUND:
        case HTTP_NO_CONTENT:
        case HTTP_INTERNAL_SERVER_ERROR:
          this.props.initSettings()
          this.props.history.push('/admin/login')
          break
        // case HTTP_NOT_FOUND:
        //   this.props.history.push('/404')
        //   break
        // case HTTP_INTERNAL_SERVER_ERROR:
        //   this.props.history.push('/500')
        //   break
        case HTTP_CONFLICT:
          msg = data
      }
    }
    if (!_.isEmpty(msg)) {
      openNotificationWithIcon(ERROR, msg)
    }
  }

  componentWillMount() {
    // Add a request interceptor
    if (axios.interceptors.request.handlers.length < 1) {
      axios.interceptors.request.use(config => {
          if (config.needLoader) {
            this.props.showLoader()
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
            this.props.hideLoader()
          }
          // console.log('response:', response)
          return response
        },
        error => {
          if (!!error.config && error.config.needLoader) {
            this.props.hideLoader()
          }
          this.processError(error)
          return Promise.reject(error)
        })
    }
  }

  render() {
    const {match} = this.props


    console.log("!!!!", this.props.setSettings())

    return (
      <Switch>
        <Route exact path="/admin/login" component={Login}/>
        <Route exact path="/admin" component={MainApp}/>
        <Route exact path="/404" component={Error404}/>
        <Route exact path="/500" component={Error500}/>
        <Route path={match.url} component={MainApp}/>
      </Switch>
    )
  }
}

const mapDispatchToProps = {
  setSettings, hideLoader, showLoader, initSettings
}

const mapStateToProps = ({settings}) => {
  const {pathname} = settings
  return {pathname}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(RootApp)))
