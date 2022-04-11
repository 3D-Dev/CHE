import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Icon, Input, Spin } from 'antd'
import { SITE_NAME } from '../../constants/AppConfigs'

const FormItem = Form.Item

class Register extends Component {

  state = {
    loader: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      this.doRegister(values)
    })
  }

  doRegister = (data) => {
    let formData = new FormData()
    formData.append('adminId', data.id)
    formData.append('email', data.email)
    formData.append('password', data.password)
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }

  confirmPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(this.props.intl.formatMessage({id: 'alert.passwordNotMatch'}))
    } else {
      callback()
    }
  }

  validateToConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], {force: true})
    }
    callback()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form
    const idRegExp = '^A-Za-z0-9_#-+$'
    const passwordRegExp = '^A-Za-z0-9_#~!@$%()`^&*+=|{}":;/?<>\'-]+$'

    return (
      <div className="gx-login-container">
        <div className="gx-login-content">
          <div className="gx-login-header gx-text-center">
            <Link to="/">
              <img src={require('assets/images/logo-white.png')} alt={SITE_NAME} title={SITE_NAME}/>
            </Link>
          </div>
          <div className="gx-text-center">
            <h2 className="gx-login-title"><FormattedMessage id="auth.register"/></h2>
          </div>
          <Spin spinning={loader} size="large">
            <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('id', {
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                  }, {
                    pattern: new RegExp(idRegExp, 'g'), message: intl.formatMessage({id: 'alert.usernameCharacter'})
                  }, {
                    min: 6, max: 32, message: intl.formatMessage({id: 'alert.lengthValidation'})
                  }]
                })(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder={intl.formatMessage({id: 'user.id'})}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: intl.formatMessage({id: 'alert.invalidEmail'})
                  }, {
                    required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                  }]
                })(
                  <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder={intl.formatMessage({id: 'user.email'})}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                  }, {
                    validator: this.validateToConfirm
                  }, {
                    pattern: new RegExp(passwordRegExp, 'g'),
                    message: intl.formatMessage({id: 'alert.passwordCharacter'})
                  }, {
                    min: 6, max: 32, message: intl.formatMessage({id: 'alert.lengthValidation'})
                  }]
                })(
                  <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder={intl.formatMessage({id: 'user.password'})}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('confirmPassword', {
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                  }, {
                    validator: this.confirmPassword
                  }, {
                    pattern: new RegExp(passwordRegExp, 'g'),
                    message: intl.formatMessage({id: 'alert.passwordCharacter'})
                  }, {
                    min: 6, max: 32, message: intl.formatMessage({id: 'alert.lengthValidation'})
                  }]
                })(
                  <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  onBlur={this.handleConfirmBlur}
                                  placeholder={intl.formatMessage({id: 'user.password.confirm'})}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" className="login-form-button" htmlType="submit">
                  <FormattedMessage id="auth.register"/>
                </Button>
                <span><FormattedMessage id="app.or"/></span>
                &nbsp;
                <Link to="/login"><FormattedMessage id="auth.login"/></Link>
              </FormItem>
            </Form>
          </Spin>
        </div>
      </div>
    )
  }
}

const WrappedNormalRegisterForm = Form.create()(Register)

const mapStateToProps = ({progress, user}) => {
  return {
    loader: progress.loader
  }
}

export default connect(
  mapStateToProps
)(
  injectIntl(WrappedNormalRegisterForm)
)
