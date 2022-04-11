import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getEmployees } from '../../../api/axiosAPIs'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, DatePicker, Select, Space, Spin } from 'antd'
import locale from 'antd/es/date-picker/locale/ja_JP'
import moment from 'moment'
import 'moment/locale/ja'
import { setTitleText } from '../../../appRedux/actions/Custom'


const monthFormat = 'YYYY/MM'
const Option = Select.Option

class EmployeeHealthManagement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      members: [],
      from: '',
      to: '',
      selectedMemberId: 0
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `btn.contents.employee.health.management`}))

    getEmployees()
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const memberList = response.data
          this.setState({
            members: memberList
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

  goBack = () => {
    this.props.history.goBack()
  }


  handleChangeSelect = (value) => {
    this.setState({
      selectedMemberId: value
    })
  }

  handleFromDatePicker = (value) => {
    this.setState({
      from: value.format('YYYY-MM')
    })
  }

  handleToDatePicker = (value) => {
    this.setState({
      to: value.format('YYYY-MM')
    })
  }

  render() {
    const {
      loader,
      members,
      from,
      to,
      selectedMemberId
    } = this.state
    const today = new Date(),
      date = today.getHours() + '時' + today.getMinutes() + '分'

    return (
      <div>
        <Card className="gx-card">
          <Spin spinning={loader} size="large">
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-5">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-12 ant-col-xxl-8 gx-no-padding">
                <div className="gx-no-flex-wrap-flow">
                  <h2 className="gx-align-self-center ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                    <FormattedMessage id="label.time"/>
                  </h2>
                  <div className="gx-mr-3 ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                    <Button className="date-selector">{date}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
              <Space>
                <h2 className="gx-w-60"><FormattedMessage id="btn.contents.employee.health.management"/></h2>
              </Space>
            </div>
            <br></br>
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-4 gx-no-padding gx-mb-2 gx-mr-2" style={{textAlignLast: 'right'}}>
                <FormattedMessage id="label.select.target"/>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-8 gx-no-padding gx-mb-2">
                <DatePicker defaultValue={moment(today.getFullYear() + '/01', monthFormat)} format={monthFormat}
                            picker="month" locale={locale} onChange={this.handleFromDatePicker}/>
                <span>&nbsp;~&nbsp;</span>
                <DatePicker defaultValue={moment(today.getFullYear() + '/' + (today.getMonth() + 1), monthFormat)}
                            format={monthFormat} picker="month" locale={locale} onChange={this.handleToDatePicker}/>
              </div>
            </div>
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-4 gx-no-padding gx-mb-2 gx-mr-2" style={{textAlignLast: 'right'}}>
                <FormattedMessage id="label.select.user"/>
                <br></br>
                <br></br>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-8 gx-no-padding gx-mb-2">
                <Select onChange={(value => this.handleChangeSelect(value))}
                        value={selectedMemberId} style={{width: 220}}>
                  <Option key={0} value={0}>ユーザーを選択して下さい</Option>
                  {
                    members.length > 0 && (
                      members.map(function (item, index) {
                        return <Option key={item.id} value={item.id}>{item.emp_name}</Option>
                      })
                    )
                  }
                </Select>
                <p className="contents-notice-red"><FormattedMessage id="label.select.user.discriptstion"/></p>
              </div>
            </div>
          </Spin>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5" onClick={this.goBack}>
            <FormattedMessage id="btn.back"/>
          </Button>
          <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto">
            <a
              href={PageConstant.PDF_CONTENTS_EMPLOY_HEALTH_MANAGEMENT + '?employee=' + (selectedMemberId ? selectedMemberId : '') + '&from=' + from + '&to=' + to}
              target="_blank"><FormattedMessage id="btn.confirm.print"/></a>
          </Button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EmployeeHealthManagement))
