import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Spin } from 'antd'
import { setTitleText } from '../../../appRedux/actions/Custom'
import PageConstant from '../../../constants/PageConstant'

class ContentsOutput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `label.manage.record`}))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  goToEmployeeHealthManagement = () => {
    this.props.history.push({pathname: PageConstant.CONTENTS_OUTPUT_EMPLOYEE})
  }

  goToGeneralHygieneReport = () => {
    this.props.history.push({pathname: PageConstant.CONTENTS_OUTPUT_GENERAL})
  }

  goToCCP = () => {
    this.props.history.push({pathname: PageConstant.CONTENTS_OUTPUT_CCP})
  }

  goToTemperatureReport = () => {
    this.props.history.push({pathname: PageConstant.CONTENTS_OUTPUT_TEMPERATURE})
  }

  goToBatchOutput = () => {
    this.props.history.push({pathname: PageConstant.CONTENTS_OUTPUT_BATCH})
  }

  goBack = () => {
    this.props.history.push({pathname: PageConstant.MAINTENANCE})
  }

  render() {
    const {
      loader
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
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div className="ant-col-24 gx-mb-4 gx-w-100">
                <h2><FormattedMessage id="label.manage.record"/></h2>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                <Button className="contents-btn-width"><a href={PageConstant.PDF_CONTENTS_OUTPUT_GENERAL}
                                                          target="_blank"><FormattedMessage
                  id="btn.contents.general.plan"/></a></Button>
                <Button className="contents-btn-width" onClick={this.goToEmployeeHealthManagement}><FormattedMessage
                  id="btn.contents.staff"/></Button>
                <Button className="contents-btn-width" onClick={this.goToGeneralHygieneReport}><FormattedMessage
                  id="btn.contents.general.record"/></Button>
                <Button className="contents-btn-width" onClick={this.goToCCP}><FormattedMessage
                  id="btn.contents.important.record"/></Button>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                <Button className="contents-btn-width" onClick={this.goToTemperatureReport}><FormattedMessage
                  id="btn.contents.temperature"/></Button>
                <Button className="contents-btn-width" onClick={this.goToBatchOutput}><FormattedMessage
                  id="btn.contents.output"/></Button>
              </div>
            </div>
          </Spin>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5" onClick={this.goBack}>
            <FormattedMessage id="btn.back"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ContentsOutput))
