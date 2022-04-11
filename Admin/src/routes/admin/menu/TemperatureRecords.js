import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { TemperatureRecordsInputTable } from '../../../components'
import { getTemperatureRecords, saveTemperatureRecords } from '../../../api/axiosAPIs'
import _ from 'lodash'
import { Button, Card, Spin } from 'antd'
import { setTitleText } from '../../../appRedux/actions/Custom'


class TemperatureRecords extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      rows: []
    }
  }

  fetchData() {
    const {employId} = this.props

    getTemperatureRecords(employId)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const data = response.data
          this.setState({
            rows: data
          })
        }
      })
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.records.temperature`}))

    this.fetchData()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  onChangeChildInput = (index, value) => {
    const {rows} = this.state

    let items = rows
    items[index].temperature_record = value

    this.setState({
      rows: items
    })

  }

  goBack = () => {
    this.props.history.goBack()
  }

  save = () => {
    const {employId} = this.props
    const {rows} = this.state

    let formData = new FormData()
    rows.map((row, key) => {
      formData.append('inputs[][machine_type]', row.machine_type)
      formData.append('inputs[][machine_type_text]', row.machine_type_text)
      formData.append('inputs[][machine_type_input]', row.machine_type_input)
      formData.append('inputs[][maker_cd]', row.maker_cd)
      formData.append('inputs[][maker_cd_text]', row.maker_cd_text)
      formData.append('inputs[][temperature]', row.temperature_record)
    })

    saveTemperatureRecords(employId, formData)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const data = response.data
          this.setState({
            rows: data
          })
        }
      })

    this.props.history.goBack()
  }

  render() {
    const {
      loader,
      rows
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
              <div className="ant-col-24 gx-mb-2 gx-w-100">
                <h2><FormattedMessage id="label.equipment.temperature.records"/></h2>
              </div>
            </div>
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-5">
              <TemperatureRecordsInputTable
                rows={rows}
                onChangeInput={this.onChangeChildInput}
              />
            </div>
          </Spin>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5" onClick={this.goBack}>
            <FormattedMessage id="btn.back"/>
          </Button>
          <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto" onClick={this.save}>
            <FormattedMessage id="btn.confirm.input"/>
          </Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setTitleText
}

const mapStateToProps = ({custom, progress}) => {
  const {employId} = custom
  return {
    employId,
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TemperatureRecords))
