import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { initSettings, setSettings } from '../../appRedux/actions/User'
import { connect } from 'react-redux'

class AuthVerify extends Component {

  doLogout = () => {
    this.props.initSettings()
    localStorage.removeItem('token')
    this.props.history.push('/admin/login')
  }

  AuthVerify = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedJwt = this.parseJwt(token);
      console.log('Auth Expired', decodedJwt.exp)
      if (decodedJwt.exp * 1000 < Date.now()) {
        this.doLogout();
      }
    }
  }

  parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  render() {
    const auth = this.AuthVerify()
    return (
      <div></div>
    )
  }
}

const mapDispatchToProps = {
  setSettings, initSettings
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(injectIntl(AuthVerify)))
