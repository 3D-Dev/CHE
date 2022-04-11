import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { addManagementDevice } from '../../../api/axiosAPIs'
import PageConstant from '../../../constants/PageConstant'
import { connect } from 'react-redux'
import { Button, Card, Form, Input, Radio, Select, Spin } from 'antd'
import { managementDevicesCategory, managementDevicesMaker } from '../../../constants/ManagementDevice'

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
    md: {span: 4},
    lg: {span: 4}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
    md: {span: 24},
    lg: {span: 24}
  }
}


class NewManagementDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false
    }
    this.prevPageNum = 0
    this.prevPageLimit = 10
  }

  componentDidMount() {
    let {pageNumberState, rowsPerPageState} = this.props.location
    if ((pageNumberState !== undefined) && (rowsPerPageState !== undefined)) {
      this.prevPageNum = pageNumberState
      this.prevPageLimit = rowsPerPageState
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  goToPrevious = () => {
    this.props.history.push({pathname: PageConstant.MANAGEMENT_DEVICES})
  }

  onFinish = (data) => {
    let formData = new FormData()
    
    formData.append('maker_cd', data.maker_cd)
    formData.append('machine_type', data.machine_type)
    formData.append('machine_type_input', data.machine_type_input)
    formData.append('del_flg', data.del_flg)

    addManagementDevice(formData)
      .then(response => {
        // openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.editCustomer'}))
        this.goToPrevious()
      })
  }

  render() {
    const {loader} = this.state
    const {intl, row} = this.props
    const today = new Date(),
      date = today.getHours() + '時' + today.getMinutes() + '分'

    return (
      <div>
        <Form
          {...formItemLayout}
          className="gx-mt-5"
          onFinish={this.onFinish}
        >
          <Card className="gx-card">
            <Spin spinning={loader} size="large">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-5">
                <div
                  className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-12 ant-col-xxl-8 gx-no-padding">
                  <div className="gx-no-flex-wrap-flow">
                    <h2
                      className="gx-align-self-center ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                      <FormattedMessage id="lable.time"/>
                    </h2>
                    <div className="gx-mr-3 ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                      <Button className="maintenance-selector">{date}</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gx-align-self-left ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-12">
                <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage
                  id="page.title.important.management.regist"/></h2>
              </div>
              <br/>
              <br/>
              <Form.Item
                label={intl.formatMessage({id: 'form.item.management.devices.maker'})}
                name="maker_cd"
              >
                <Select className="gx-minw400" placeholder="選択して下さい">
                  {managementDevicesMaker.map(item => (
                    <Option key={item.id} value={item.id}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'form.item.management.devices.category'})}
                name="machine_type"
              >
                <Select className="gx-minw400" placeholder="選択して下さい">
                  {managementDevicesCategory.map(item => (
                    <Option key={item.id} value={item.id}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'form.item.management.devices.common.name'})}
                name="machine_type_input"
              >
                <Input placeholder="入力してください"/>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'page.title.management.devices.temperature'})}
                name="del_flg"
              >
                <Radio.Group>
                  <Radio value={1}>はい</Radio>
                  <Radio value={0}>いいえ</Radio>
                </Radio.Group>
              </Form.Item>
            </Spin>
          </Card>
          <div className="gx-flex-row gx-align-items-right gx-mb-3">
            <Button className="ant-btn-primary gx-btn-rounded-gray maintenance-btn gx-mr-4" onClick={this.goToPrevious}>
              <FormattedMessage id="btn.go.previous"/>
            </Button>
            <Button className="ant-btn-primary gx-btn-rounded-blue maintenance-btn gx-mr-auto" htmlType={'submit'}>
              <FormattedMessage id="btn.finish.regist"/>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = {}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NewManagementDevice))