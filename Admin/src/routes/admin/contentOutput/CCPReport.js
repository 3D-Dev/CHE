import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { CCPReportList } from '../../../components'
import { getCCPReport } from '../../../api/axiosAPIs'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, Space, Spin } from 'antd'
import { setTitleText } from '../../../appRedux/actions/Custom'

class CCPReport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      selectedItemId: null,
      date: new Date(),
      header1: [],
      header2: [],
      body: []
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `btn.contents.important.record`}))

    const {date} = this.state
    this.fetchData(date)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  fetchData(date) {
    
    getCCPReport(date.getFullYear(), date.getMonth() + 1)
      .then(response => {
        if (!_.isEmpty(response.data)) {

          const header1 = response.data.header1
          header1.map((header, index) => {
            header.style = {
              width: 150,
              minHeight: 80,
              overflowWrap: 'break-word'
            }
          })
          const header2 = response.data.header2
          header2.map((header, index) => {
            header.style = {
              width: 150,
              backgroundColor: '#fff6f6'
            }
          })

          this.setState({
            header1: header1,
            header2: header2,
            body: response.data.body,
            date: date
          })
        }
      })
  }

  onClickPrevMonth = () => {
    const {date} = this.state
    date.setDate(1)
    date.setMonth(date.getMonth() - 1)
    this.fetchData(date)
  }

  onClickNextMonth = () => {
    const {date} = this.state
    let nextMonth = new Date(date.getFullYear() + 1, 0, 1)
    if (date.getMonth() === 11) {
      nextMonth = new Date(date.getFullYear() + 1, 0, 1)
    } else {
      nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    }
    this.fetchData(nextMonth)
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
      header1,
      header2,
      body,
      date
    } = this.state

    const today = new Date(),

      dateString = today.getHours() + '時' + today.getMinutes() + '分'

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
                  <div
                    className="gx-mr-3 ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
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
                  <h2 className="gx-w-60"><FormattedMessage id="btn.contents.important.record"/></h2>
                </Space>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-6 ant-col-xl-4 ant-col-xxl-4 gx-mb-2 text-align-right">
                <Space>
                  <Button className="ant-btn-primary gx-no-margin gx-btn-rounded-blue gx-w-100"
                          onClick={this.onClickPrevMonth}>
                    <FormattedMessage id="btn.prevMonth"/>
                  </Button>
                  <Button className="ant-btn-primary gx-no-margin gx-btn-rounded-blue gx-w-100"
                          onClick={this.onClickNextMonth}>
                    <FormattedMessage id="btn.nextMonth"/>
                  </Button>
                </Space>
              </div>

            </div>
            <CCPReportList
              header1={header1}
              header2={header2}
              body={body}
            />
          </Spin>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5"
                  onClick={this.goBack}>
            <FormattedMessage id="btn.back"/>
          </Button>
          <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto">
            <a href={PageConstant.PDF_CCP_REPORT + '?year=' + date.getFullYear() + '&month=' + (date.getMonth() + 1)}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CCPReport))
