import React, {Fragment} from 'react';
import {injectIntl} from 'react-intl'
import LoginBase from "./loginBase";


function Login(props) {
  return (
    <Fragment>
      <LoginBase
        intl={props.intl}
      />
    </Fragment>
  )
}

export default injectIntl(Login)