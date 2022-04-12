import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

const Error500 = () => (
  <div className="gx-page-error-container">
    <div className="gx-page-error-content">
      <div className="gx-error-code">500</div>
      <h2 className="gx-text-center">
        <FormattedMessage id="error.500"/></h2>

      <p className="gx-text-center">
        <Link className="gx-btn gx-btn-primary" to="/"><FormattedMessage id="go.home"/></Link>
      </p>
    </div>
  </div>
)

export default Error500
