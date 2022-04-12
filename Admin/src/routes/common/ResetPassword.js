import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button, Form, Icon, Input } from 'antd'
import { SITE_NAME } from '../../constants/AppConfigs'

const FormItem = Form.Item

class ResetPassword extends Component {

  state = {
    confirmDirty: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    })
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

  render() {
    const {intl} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-login-container">
        <div className="gx-login-content">
          <div className="gx-login-header gx-text-center">
            <img src={require('assets/images/logo-white.png')} alt={SITE_NAME} title={SITE_NAME}/>
            <Link to="/">
              <img src={require('assets/images/logo-white.png')} alt={SITE_NAME} title={SITE_NAME}/>
            </Link>
          </div>
          <div className="gx-text-center">
            <h2 className="gx-login-title"><FormattedMessage id="auth.resetPassword"/></h2>
          </div>
          <div className="gx-mb-4">
            <p><FormattedMessage id="auth.resetPassword.desc"/></p>
          </div>
          <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }, {
                  validator: this.validateToConfirm
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
                }]
              })(
                <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                onBlur={this.handleConfirmBlur}
                                placeholder={intl.formatMessage({id: 'user.password.confirm'})}/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" className="login-form-button" htmlType="submit">
                <FormattedMessage id="btn.reset"/>
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPassword)

export default injectIntl(WrappedResetPasswordForm)
