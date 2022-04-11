import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { addImportantManagment, getImportantCategoryList } from '../../../api/axiosAPIs'
import PageConstant from '../../../constants/PageConstant'
import { connect } from 'react-redux'
import { Button, Card, Form, Input, Select, Spin } from 'antd'
import _ from 'lodash'

const {Option} = Select
const {TextArea} = Input

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

class NewImportantManagement extends Component {
  formRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      row: {chk_content: '', mng_overview: ''},
      categories: []
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

    const data = {
      page: 0,
      limit: 500
    }
    getImportantCategoryList(data)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          this.setState({
            categories: response.data.data
          })
        }
      })

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  onFinish = (data) => {
    let formData = new FormData()
    
    formData.append('important_category_id', data.important_category_id)
    formData.append('menu_content', data.menu_content)
    formData.append('chk_content', data.chk_content)
    formData.append('mng_overview', data.mng_overview)

    addImportantManagment(formData)
      .then(response => {
        // openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.editCustomer'}))
        this.goToPrevious()
      })
  }

  handleCancelBtn = () => {
    this.props.history.push({
      pathname: PageConstant.CUSTOMERS,
      pageNumberState: this.prevPageNum,
      rowsPerPageState: this.prevPageLimit
    })
  }

  goToPrevious = () => {
    this.props.history.push({pathname: PageConstant.IMPORTANT_MANAGEMENTS})
  }

  onChangeData = () => {
    const {row} = this.state
    if (this.formRef && this.formRef.current) {
      this.formRef.current.setFieldsValue(row)
    }
  }

  handleChangeSelect = (value) => {
    const {row, categories} = this.state
    const item = categories.find(item => item.id === value)

    row.chk_content = item.chk_content
    row.mng_overview = item.mng_overview

    this.setState({
      row: row
    })
  }

  render() {
    const {loader, row, categories} = this.state
    const {intl} = this.props
    this.onChangeData()

    const today = new Date(),
      date = today.getHours() + '時' + today.getMinutes() + '分'

    return (
      <div>
        <Form
          {...formItemLayout}
          className="gx-mt-5"
          onFinish={this.onFinish}
          ref={this.formRef}
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
              <Form.Item
                label={intl.formatMessage({id: 'form.item.important.management.category'})}
                name="important_category_id"
              >
                <Select className="gx-minw400" placeholder="分類を選択して下さい"
                        onChange={(value => this.handleChangeSelect(value))}>
                  {categories.map((item, index) => (
                    <Option key={item.id} value={item.id}>{index + 1}.{item.bunrui_name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'form.item.important.management.menu'})}
                name="menu_content"
              >
                <Input className="gx-minw400" placeholder="入力してください"/>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'form.item.important.management.method'})}
                name="chk_content"
              >
                <TextArea rows={5} placeholder="入力してください"/>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'form.item.important.management.comment'})}
                name="mng_overview"
              >
                <TextArea rows={5} placeholder="入力してください"/>
              </Form.Item>
            </Spin>
          </Card>
          <div className="gx-flex-row gx-align-items-right gx-mb-3">
            <Button className="ant-btn-primary gx-btn-rounded-gray maintenance-btn gx-mr-4" onClick={this.goToPrevious}>
              <FormattedMessage id="btn.go.previous"/>
            </Button>
            <Button className="ant-btn-primary gx-btn-rounded-blue maintenance-btn gx-mr-auto" htmlType="submit">
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NewImportantManagement))