import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Col, Row, Spin } from 'antd'
import { setEmployId, setTitleText } from '../../../appRedux/actions/Custom'
import Clock from 'react-live-clock'

import moment from 'moment'
import { getEmployees, saveCommutingRecords } from '../../../api/axiosAPIs'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'


class RushRecords extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      time: moment(),
      defaultValue: '',
      selectedMember: -1,
      getIn: 0
    }
  }

  fetchData() {
    const {employId} = this.props

    getEmployees()
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const memberList = response.data
          const data = memberList.find(item => item.id === employId)

          this.setState({
            defaultValue: ((data) ? (data.emp_name) : ''),
            selectedMember: ((data) ? (data.id) : -1)
          })
        }
      })
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.records.rush`}))

    this.fetchData()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  changeInOut = (value) => {
    const {getIn} = this.state
    if (getIn !== value) {
      this.save(value)
    }
  }

  goToList = () => {
    const {employId} = this.props
    this.props.history.push({pathname: PageConstant.RUSH_REPORT + '/~' + employId})
  }

  save(getIn) {
    const {employId} = this.props
    const commuting_date = moment().format('YYYY-MM-DD')

    let formData = new FormData()
    formData.append('get_in', getIn)
    formData.append('commuting_date', commuting_date)
    saveCommutingRecords(employId, formData)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            getIn: getIn
          })
        }
      })

  }

  render() {
    const {
      loader,
      defaultValue,
      getIn
    } = this.state

    const today = new Date()
    const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}
    const date = today.toLocaleString('ja-jp', options)

    return (
      <div>
        <Spin spinning={loader} size="large">

          <Row justify="end">
            <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back"
                    onClick={this.goToList}>
              <FormattedMessage id="btn.go.rush.report.screen"/>
            </Button>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={10} xl={12} xxl={16}>
              <Row>
                <Col span={24}>
                  <Card className="gx-card">
                    <div className="gx-fs-xl">{date}</div>
                    <br/>
                    <div className="gx-fs-xl" style={{fontSize: 70}}>
                      <Clock format={'H:mm'} ticking={true} timezone={'Japan'}/>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card className="gx-card">
                    <div className="gx-fs-xl">{defaultValue}</div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={12} md={12} lg={7} xl={6} xxl={4}>
              <Row justify="center">
                <Button className={(getIn === 1) ? 'rush-btn-in-out' : 'rush-btn-in-out selected'}
                        onClick={() => this.changeInOut(1)}>
                  <FormattedMessage id="btn.go.rush.in"/>
                </Button>
              </Row>
            </Col>
            <Col xs={24} sm={12} md={12} lg={7} xl={6} xxl={4}>
              <Row justify="center">
                <Button className={(getIn === 1) ? 'rush-btn-in-out selected' : 'rush-btn-in-out'}
                        onClick={() => this.changeInOut(0)}>
                  <FormattedMessage id="btn.go.rush.out"/>
                </Button>
              </Row>
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setTitleText, setEmployId
}

const mapStateToProps = ({custom, progress}) => {
  const {employId} = custom
  return {
    employId,
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RushRecords))
