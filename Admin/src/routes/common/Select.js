import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Layout, Spin } from 'antd'
import { setRole } from '../../appRedux/actions/User'
import { select } from '../../api/axiosAPIs'
import { COPYRIGHT_COMPANY } from '../../constants/AppConfigs'

const {Footer} = Layout

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false
    }
  }

  // doSelect = () => {
  //   const {profile} = this.props
  //   select(profile.permission_id)
  //     .then(response => {
  //       if (response.status === 200) {
  //         this.props.history.push('/admin/users')
  //       }
  //     })
  // }

  componentDidMount() {
    this.props.setRole('SELECTED_USER')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  onFinish = () => {
    console.log("onfinish", this.props.name)
    this.props.history.push('/admin/users')
    //this.doSelect()
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    const {loader} = this.state
    const {profile} = this.props
    return (
      <div className="gx-login-layout">
        <div className="gx-login-container">
          <div className="gx-text-center">
            <div className="">
              <Link to="/">
                <img src={require('assets/images/logo.png')} alt={''} title={''}/>
              </Link>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="">
              <h2>アカウント選択</h2>
            </div>
            <br/>
            <div className="gx-login-content">
              <Spin spinning={loader} size="large">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true
                  }}
                  onFinish={this.onFinish}
                >
                  <div>
                    <label>{profile.email}</label>
                  </div>
                  <div>
                    <label>でログインしています。</label>
                  </div>
                  <br/>
                  <br/>
                  <div>
                    <label>アカウントを選択してください。</label>
                  </div>
                  <br/>
                  <Form.Item>
                    <Button type="primary" shape={'round'} htmlType="submit"
                            className="">
                      Select
                    </Button>
                  </Form.Item>
                </Form>
              </Spin>
            </div>
          </div>
        </div>
        {/*<Footer>*/}
        {/*  <div className="gx-layout-footer-content gx-align-items-center">*/}
        {/*    {COPYRIGHT_COMPANY}*/}
        {/*  </div>*/}
        {/*</Footer>*/}
      </div>
    )
  }
}

const WrappedNormalLoginForm = (Select)

const mapStateToProps = ({user, progress}) => {
  const {profile} = user
  const {loader} = progress
  return {loader, profile}
}

const mapDispatchToProps = {
  setRole
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(WrappedNormalLoginForm))

