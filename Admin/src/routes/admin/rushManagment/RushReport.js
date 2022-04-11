import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Space, Spin } from 'antd'
import { setTitleText } from '../../../appRedux/actions/Custom'
import RushReportList from '../../../components/contents/RushReportList'
import { getCommutingRecords } from '../../../api/axiosAPIs'
import moment from 'moment'


class RushReport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      employId: -1,
      loader: false,
      date: new Date(),
      rows: []
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `btn.go.rush.report.screen`}))

    let url = window.location.pathname
    let employId = url.split('/~').slice(-1)[0]

    this.setState({
      employId: employId
    })

    const {date} = this.state
    this.fetchData(employId, date)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  fetchData(employId, date) {
    const commuting_date = moment(date).format('YYYY-MM')
    getCommutingRecords(employId, commuting_date)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            employId: employId,
            rows: response.data,
            date: date
          })
        }
      })
  }

  onClickPrevMonth = () => {
    const {employId, date} = this.state
    date.setDate(1)
    date.setMonth(date.getMonth() - 1)
    this.fetchData(employId, date)
  }

  onClickNextMonth = () => {
    const {employId, date} = this.state
    let nextMonth = new Date()
    if (date.getMonth() === 11) {
      nextMonth = new Date(date.getFullYear() + 1, 0, 1)
    } else {
      nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    }
    this.fetchData(employId, nextMonth)
  }

  getMonthString = (date) => {
    const lang = 'jp'
    const year = date.toLocaleString(lang, {year: 'numeric'})
    const month = date.toLocaleString(lang, {month: 'numeric'})
    const yearString = (year.includes('年')) ? year : `${year}年`
    const monthString = (month.includes('月')) ? month : `${month}月`
    return `${yearString} ${monthString}`
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const {
      loader,
      rows,
      date
    } = this.state

    const today = new Date(),
      dateString = today.getHours() + '時' + today.getMinutes() + '分'

    console.log("today@@@", today, "date ", date)

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
                    <Button className="date-selector">{dateString}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                <Space>
                  <h2 className="gx-w-40">{this.getMonthString(date)}</h2>
                  <h2 className="gx-w-60"><FormattedMessage id="btn.go.rush.report"/></h2>
                </Space>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-6 ant-col-xl-4 ant-col-xxl-4 gx-mb-2 text-align-right">
                <Space>
                  <Button className="ant-btn-primary gx-no-margin gx-btn-rounded-blue gx-w-100"
                          onClick={this.onClickPrevMonth}>
                    <FormattedMessage id="btn.prevMonth"/>
                  </Button>
                  {
                    ( !moment(date).isSame(today, 'day')) && (
                      <Button className="ant-btn-primary gx-no-margin gx-btn-rounded-blue gx-w-100"
                              onClick={this.onClickNextMonth}>
                        <FormattedMessage id="btn.nextMonth"/>
                      </Button>
                    )
                  }
                </Space>
              </div>

            </div>
            <RushReportList
              rows={rows}
            />
          </Spin>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5" onClick={this.goBack}>
            <FormattedMessage id="btn.back"/>
          </Button>
          {/*<Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto">*/}
          {/*  <a*/}
          {/*    href={PageConstant.PDF_TEMPERATURE_REPORT + '?year=' + date.getFullYear() + '&month=' + (date.getMonth() + 1)}*/}
          {/*    target="_blank"><FormattedMessage id="btn.confirm.print"/></a>*/}
          {/*</Button>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RushReport))
