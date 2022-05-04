import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Layout, Spin } from 'antd'
import { initSettings, setRole, setSettings } from '../../appRedux/actions/User'
import { initCustom } from '../../appRedux/actions/Custom'
import { login } from '../../api/axiosAPIs'
import { COPYRIGHT_COMPANY } from '../../constants/AppConfigs'
import {HTTP_SUCCESS} from "../../constants/ResponseCode";

const {Footer} = Layout

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loader: false
    }
  }

  doLogin = (data) => {
    this.props.initSettings()
    this.props.initCustom()

    let formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    login(formData)
      .then(response => {
        response.data.email = data.email
        console.log('login', response.data)
        this.props.setSettings(response.data)
        if (response.status === HTTP_SUCCESS) {
          localStorage.setItem('token', response.data.adminAccessToken)
          this.props.setRole('SELECTED_USER')
          this.props.history.push('/admin/')
        }
      })
  }

  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  onFinish = (values) => {
    this.doLogin(values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {

    const {loader} = this.state
    return (
      <div className="gx-login-layout">
        <div className="gx-login-container">
          <div className="gx-text-center">
            {/*<div className="">*/}
            {/*  <Link to="/">*/}
            {/*    <img src={require('assets/images/logo-rabtto.png')} alt={''} title={''}/>*/}
            {/*  </Link>*/}
            {/*</div>*/}
            <br/>
            <br/>
            <br/>
            <div className="">
              <h2 style={{fontWeight: 'bold'}}>ログイン</h2>
            </div>
            <br/>
            <div className="gx-login-content" style={{width: '575px', height:'100%'}}>
              <Spin spinning={loader} size="large">
                <Form
                  name="normal_login"
                  className="login-form"
                  style={{textAlign: 'left'}}
                  initialValues={{
                    remember: true
                  }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <div style={{textAlign: 'left'}}>
                    <label>ユーザーID</label>
                  </div>
                  <Form.Item
                    name="email"
                    style={{padding: '0 14px'}}
                    rules={[
                      {
                        required: true,
                        message: 'ユーザーIDを入力してください'
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                  <div style={{textAlign: 'left'}}>
                    <label>パスワード</label>
                  </div>
                  <Form.Item
                    name="password"
                    style={{padding: '0 14px'}}
                    rules={[
                      {
                        required: true,
                        message: 'パスワードを入力してください'
                      }
                    ]}
                  >
                    <Input
                      type="password"
                    />
                  </Form.Item>
                  <br/>

                  <Form.Item
                    style={{padding: '0 14px'}}
                  >
                    <Button type="primary" shape={'round'} htmlType="submit"
                            className="login-form-button gx-btn-rounded-blue">
                      ログイン
                    </Button>
                  </Form.Item>
                </Form>
              </Spin>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const WrappedNormalLoginForm = (Login)

const mapStateToProps = ({user, progress}) => {
  const {locale} = user
  const {loader} = progress
  return {loader, locale}
}

const mapDispatchToProps = {
  setSettings, initSettings, initCustom, setRole
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(WrappedNormalLoginForm))

