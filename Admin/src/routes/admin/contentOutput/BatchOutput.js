import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, DatePicker, Spin } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { setTitleText } from '../../../appRedux/actions/Custom'

import moment from 'moment'
import PageConstant from '../../../constants/PageConstant'
import locale from 'antd/es/date-picker/locale/ja_JP'
import 'moment/locale/ja'

const monthFormat = 'YYYY/MM'

class BatchOutput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      temperature: false,
      ccp: false,
      general: false,
      from: '',
      to: ''
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `btn.contents.output`}))
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

  onSelectTarget(target) {
    const {
      temperature,
      ccp,
      general
    } = this.state
    switch (target) {
      case 1:
        this.setState({general: !general})
        return
      case 2:
        this.setState({ccp: !ccp})
        return
      case 3:
        this.setState({temperature: !temperature})
        return
    }
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
      temperature,
      ccp,
      general,
      from,
      to
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
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-no-padding">
                <div className="gx-no-flex-wrap-flow">
                  <h2 className="gx-align-self-center ant-col ant-col-xs-12 ant-col-sm-8 ant-col-xl-8 ant-col-xxl-4">
                    <FormattedMessage id="btn.contents.output"/>
                  </h2>
                  <div className="gx-mr-3 ant-col ant-col-xs-12 ant-col-sm-16 ant-col-xl-16 ant-col-xxl-20">
                    <h6><FormattedMessage id="label.contents.output.discriptstion"/></h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-4 gx-no-padding gx-mr-4"
                style={{marginBottom: 15, textAlignLast: 'right'}}
              >
                <FormattedMessage id="label.select.target.form"/>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-15 ant-col-xl-15 ant-col-xxl-19 gx-no-padding gx-no-margin">
                <Button className="contents-btn-width-btn-green" onClick={() => this.onSelectTarget(1)}>
                  <FormattedMessage id="btn.general.health"/>
                  {
                    general && (
                      <DownOutlined type="right"/>
                    )
                  }
                </Button>
                <Button className="contents-btn-width-btn-red" onClick={() => this.onSelectTarget(2)}>
                  <FormattedMessage id="btn.general.important"/>
                  {
                    ccp && (
                      <DownOutlined type="right"/>
                    )
                  }
                </Button>
                <Button className="contents-btn-width-btn-blue" onClick={() => this.onSelectTarget(3)}>
                  <FormattedMessage id="btn.general.temperature"/>
                  {
                    temperature && (
                      <DownOutlined type="right"/>
                    )
                  }
                </Button>
              </div>
            </div>
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-4 gx-no-padding gx-mb-2 gx-mr-4" style={{textAlignLast: 'right'}}>
                <FormattedMessage id="label.select.target"/>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-16 ant-col-xl-12 ant-col-xxl-8 gx-no-padding gx-mb-2">
                <DatePicker defaultValue={moment(today.getFullYear() + '/01', monthFormat)} format={monthFormat}
                            picker="month" locale={locale} onChange={this.handleFromDatePicker}/>
                <span>&nbsp;~&nbsp;</span>
                <DatePicker defaultValue={moment(today.getFullYear() + '/' + (today.getMonth() + 1), monthFormat)}
                            format={monthFormat} picker="month" onChange={this.handleToDatePicker}/>
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
              href={PageConstant.PDF_BATCH_OUTPUT_REPORT + '?temperature=' + temperature + '&ccp=' + ccp + '&general=' + general + '&from=' + from + '&to=' + to}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BatchOutput))
