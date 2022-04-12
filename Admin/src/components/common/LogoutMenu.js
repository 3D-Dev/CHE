import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { initSettings, setSettings } from '../../appRedux/actions/User'
import { connect } from 'react-redux'

class LogoutMenu extends Component {

  doLogout = () => {
    this.props.initSettings()
    this.props.history.push('/admin/login')
  }

  render() {
    return (
      <Link to="#" onClick={this.doLogout}>
        <FormattedMessage id="auth.logout"/>
      </Link>
    )
  }
}

const mapDispatchToProps = {
  setSettings, initSettings
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(injectIntl(LogoutMenu)))

