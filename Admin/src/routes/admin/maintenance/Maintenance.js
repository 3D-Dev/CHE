import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, Col } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { setTitleText } from '../../../appRedux/actions/Custom'

class Maintenance extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.maintenance`}))
  }

  goToEmployees = () => {
    this.props.history.push({pathname: PageConstant.EMPLOYEES})
  }

  goToGeneralHygieneManagement = () => {
    this.props.history.push({pathname: PageConstant.GENERAL_HYGIENE_MANAGEMENT})
  }

  goToImportantManagement = () => {
    this.props.history.push({pathname: PageConstant.IMPORTANT_MANAGEMENTS})
  }

  goToManagementDevices = () => {
    this.props.history.push({pathname: PageConstant.MANAGEMENT_DEVICES})
  }

  goToDashboard = () => {
    this.props.history.push({pathname: PageConstant.DASHBOARD})
  }

  goToContentsOutput = () => {
    this.props.history.push({pathname: PageConstant.CONTENTS_OUTPUT})
  }

  render() {

    const today = new Date(),
      date = today.getHours() + '時' + today.getMinutes() + '分'

    return (
      <div>
        <Card className="gx-card">
          <div
            className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-5">
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-12 ant-col-xxl-8 gx-no-padding">
              <div className="gx-no-flex-wrap-flow">
                <h2 className="gx-align-self-center ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                  <FormattedMessage id="lable.time"/>
                </h2>
                <div className="gx-mr-3 ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                  <Button className="maintenance-selector">{date}</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="gx-flex-row gx-align-items-center gx-mb-4">
            <div className="ant-col-24 gx-mb-2 gx-w-100">
              <h2><FormattedMessage id="page.title.maintenance"/></h2><br/>
              <Button className="gx-flex-row maintenance-selector gx-justify-content-between"
                      onClick={this.goToEmployees}>
                <Col span={12} className="gx-text-left gx-align-self-center">
                  <FormattedMessage id="page.title.maintenance1"/>
                </Col>
                <Col span={12} className="gx-text-right gx-align-self-center">
                  <RightOutlined/>
                </Col>
              </Button>
              <Button className="gx-flex-row maintenance-selector gx-justify-content-between"
                      onClick={this.goToGeneralHygieneManagement}>
                <Col span={12} className="gx-text-left gx-align-self-center">
                  <FormattedMessage id="page.title.maintenance2"/>
                </Col>
                <Col span={12} className="gx-text-right gx-align-self-center">
                  <RightOutlined/>
                </Col>
              </Button>
              <Button className="gx-flex-row maintenance-selector gx-justify-content-between"
                      onClick={this.goToImportantManagement}>
                <Col span={12} className="gx-text-left gx-align-self-center">
                  <FormattedMessage id="page.title.maintenance3"/>
                </Col>
                <Col span={12} className="gx-text-right gx-align-self-center">
                  <RightOutlined/>
                </Col>
              </Button>
              <Button className="gx-flex-row maintenance-selector gx-justify-content-between"
                      onClick={this.goToManagementDevices}>
                <Col span={12} className="gx-text-left gx-align-self-center">
                  <FormattedMessage id="page.title.maintenance4"/>
                </Col>
                <Col span={12} className="gx-text-right gx-align-self-center">
                  <RightOutlined/>
                </Col>
              </Button>
            </div>
          </div>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray maintenance-btn gx-mr-4" onClick={this.goToDashboard}>
            <FormattedMessage id="btn.finish.back"/>
          </Button>
          <Button className="ant-btn-primary gx-btn-rounded-blue maintenance-btn gx-mr-auto"
                  onClick={this.goToContentsOutput}>
            <FormattedMessage id="btn.confirm.print"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Maintenance))
