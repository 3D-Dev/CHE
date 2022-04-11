import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { DescriptionItem1 } from '../../../components'
import { editEmploy, getEmployItem } from '../../../api/axiosAPIs'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, Form, Input, Spin } from 'antd'
import { getQueryVariable } from '../../../util/helpers'
import { setTitleText } from '../../../appRedux/actions/Custom'

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
    md: {span: 4},
    lg: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
    md: {span: 16},
    lg: {span: 16}
  }
}

class EditEmployee extends React.Component {
  formRef = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      selectedItemId: null,
      row: {}
    }
    this.selectedId = null
    this.prevPageNum = 0
    this.prevPageLimit = 10
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.employee.new`}))

    let url = window.location.pathname
    let id = url.split('/~').slice(-1)[0]
    this.prevPageNum = getQueryVariable('num')
    this.prevPageLimit = getQueryVariable('limit')

    this.selectedId = id
    
    getEmployItem(id)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          this.setState({
            row: response.data
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

  handleCancelBtn = () => {
    this.goBack()
  }

  goBack() {
    this.props.history.push({
      pathname: PageConstant.EMPLOYEES,
      pageNumberState: parseInt(this.prevPageNum),
      rowsPerPageState: parseInt(this.prevPageLimit)
    })
  }

  onFinish = (data) => {
    let formData = new FormData()
    
    formData.append('emp_name', data.emp_name)
    formData.append('authority_name', data.authority_name)

    if (!_.isNull(this.selectedId)) {
      let selectedItemId = this.selectedId
      editEmploy(selectedItemId, formData)
        .then(response => {
          // openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.editCustomer'}))
          this.goBack()
        })
    }
  }

  onChangeData = () => {
    const {row} = this.state
    if (this.formRef && this.formRef.current) {
      this.formRef.current.setFieldsValue(row)
    }
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const today = new Date(),
      date = today.getHours() + '時' + today.getMinutes() + '分'
    this.onChangeData()

    return (
      <div>
        <Form
          {...formItemLayout}
          className="gx-flex-row gx-mt-5"
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
              <div className="gx-no-flex-wrap-flow gx-mb-4">
                <div
                  className="gx-align-self-left ant-col ant-col-xs-24 ant-col-sm-24 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-12">
                  <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage id="page.title.employee.new"/></h2>
                </div>
              </div>
              <DescriptionItem1
                title={'アドバイス'}
                btnTitle={'マニュアル表⽰'}
                visiable={false}
                text={'従業員の登録を行います。同姓同名などには最後に英数字を付けるなど、誤認が生じないように注意しましょう！'}
                // onHandleClick={this.showModal}
              />
              <br/>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-8">
                <Form.Item
                  label={intl.formatMessage({id: 'form.item.employee.name'})}
                  name="emp_name"
                  // rules={[{ required: true, message: intl.formatMessage({id: 'alert.fieldRequired'}) }]}
                >
                  <Input placeholder={intl.formatMessage({id: 'alert.itemNoSelect'})}/>
                </Form.Item>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-8">
                <Form.Item
                  label={intl.formatMessage({id: 'form.item.employee.right'})}
                  name="authority_name"
                  // rules={[{ required: true, message: intl.formatMessage({id: 'alert.fieldRequired'}) }]}
                >
                  <Input placeholder={intl.formatMessage({id: 'alert.itemNoSelect'})}/>
                </Form.Item>
              </div>
            </Spin>
          </Card>
          <div className="gx-flex-row gx-align-items-right gx-mb-3">
            <Button className="ant-btn-primary gx-btn-rounded-gray maintenance-btn gx-mr-4"
                    onClick={this.handleCancelBtn}>
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

const mapDispatchToProps = {
  setTitleText
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditEmployee))
