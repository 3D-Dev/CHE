import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { CCPRecordsList, DescriptionItem } from '../../../components'
import { Button, Card, Input, Select, Spin, Steps } from 'antd'
import { getCCPRecords, saveCCPRecords } from '../../../api/axiosAPIs'
import { setTitleText } from '../../../appRedux/actions/Custom'
import _ from 'lodash'

const {Step} = Steps
const {Option} = Select
const {TextArea} = Input

const steps = [
  {
    id: 1,
    title: 'First',
    content: 'First-content'
  },
  {
    id: 2,
    title: 'Second',
    content: 'Second-content'
  }
]

class CCPRecords extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      current: 1,
      rows: [],
      selectedType: -1,
      textareaValue: '',
      ngReasonData: []
    }
  }

  fetchData(current) {
    const {employId} = this.props
    const qs = current

    getCCPRecords(employId, qs)
      .then(response => {
        if (!_.isEmpty(response.data)) {

          const responseData = response.data
          if (responseData.data && responseData.option) {
            const rows = [responseData.data]
            this.setState({
              current: current,
              rows: rows,
              ngReasonData: responseData.option,
              selectedType: -1
            })
          } else {
            this.props.history.goBack()
          }
        }
      })
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.records.ccp`}))

    const {current} = this.state
    this.fetchData(current)
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

  handleTextAreaChange = (event) => {
    this.setState({
      textareaValue: event.target.value
    })
  }

  next = (answer) => {
    const {intl, employId} = this.props
    const {current, selectedType, textareaValue} = this.state

    const importantCategoryId = 11
    const nextCurrent = current + 1
    const nextQs = '1_' + nextCurrent
    const question = current

    // if (selectedType < 0) {
    //     Modal.info({
    //         title: intl.formatMessage({id: 'alert.dashboard.itemNoSelect'}),
    //         onOk() {},
    //     });
    // } else {
    let formData = new FormData()
    formData.append('important_category_id', importantCategoryId)
    formData.append('next_qs', nextQs)
    formData.append('question', question)
    formData.append('answer', answer)
    if (selectedType === 0) {
      formData.append('ng_reason', selectedType)
      formData.append('comments', textareaValue)
    } else if (selectedType > 0) {
      formData.append('ng_reason', selectedType)
    } else {
      formData.append('ng_reason', '')
    }

    saveCCPRecords(employId, formData)
      .then(response => {
        if (response.status === 200) {
          this.fetchData(nextCurrent)
        }
      })
    // }
  }

  handleChange = (value) => {
    console.log(`selected ${value}`)
    this.setState({
      selectedType: value
    })
  }

  render() {
    const {intl} = this.props
    const {
      loader,
      current,
      rows,
      selectedType,
      textareaValue,
      ngReasonData
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
                <h2><FormattedMessage id="label.ccp.records"/></h2>
              </div>
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                <Steps progressDot current={current - 1}>
                  {steps.map(item => (
                    <Step key={item.title}/>
                  ))}
                </Steps>
              </div>
            </div>
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-5">
              <CCPRecordsList
                rows={rows}
              />
            </div>
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-5">
              <DescriptionItem
                title={intl.formatMessage({id: 'label.manage.record.ng.msg1'})}
                btnTitle={<FormattedMessage id="btn.manual"/>}
                visiable={false}
                text={intl.formatMessage({id: 'label.manage.record.ng.msg2'})}
              />
            </div>
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-2">
              <Select style={{width: '100%'}} placeholder="選択してください" onChange={this.handleChange}>
                <Option key="-1" value="-1">選択してください</Option>
                {ngReasonData.map((item, index) =>
                  <Option key={index + 1} value={index + 1}>{item}</Option>)
                }
                <Option key="0" value="0">その他</Option>
              </Select>
            </div>
            {
              selectedType === '0' && (
                <div
                  className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-5">
                  <TextArea rows={3} value={textareaValue} onChange={this.handleTextAreaChange}/>
                </div>
              )
            }
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5"
                        onClick={(e) => this.next('0')}>
                  <FormattedMessage id="btn.ng"/>
                </Button>
                <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto"
                        onClick={(e) => this.next('1')}>
                  <FormattedMessage id="btn.ok"/>
                </Button>
              </div>
            </div>
          </Spin>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CCPRecords))
