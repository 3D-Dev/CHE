import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { DescriptionItem } from '../../../components'
import { Button, Card, Input, Modal, Select, Spin, Steps } from 'antd'
import { getHealthCareRecords, saveHealthCareRecords } from '../../../api/axiosAPIs'
import { setSerialId, setTitleText } from '../../../appRedux/actions/Custom'
import { getId } from '../../../util/helpers'
import _ from 'lodash'

const {Step} = Steps
const {Option} = Select
const {TextArea} = Input

const steps = [
  {
    id: 1,
    title: '健康チェック',
    content: '下痢、吐き気、発熱、だるさ、等体調の不良同居の家族にノロウイルスなどの感染が疑われる場合も必ず報告すること。手指の傷は、治療されていても報告し、作業時は、手袋を使用する事。'
  },
  {
    id: 2,
    title: '身嗜みチェック',
    content: '服装はクリーニングされた衛生的なものですか？\n' +
      '頭髪・髪などは清潔に整えられていますか？\n' +
      '爪の手入れ、不必要な化粧などありませんか？\n' +
      '作業に不要なものは持っていませんか？\n' +
      '履き物は清潔な専用の物ですか？\n' +
      '\n'
  },
  {
    id: 3,
    title: '手洗いの実施',
    content: '１．手洗いは、２度洗いします。\n' +
      '２．ペーパータオルで水分を拭き取ります。\n' +
      '３．アルコールによる消毒を行います。\n' +
      '\n' +
      '※詳しい手順は手順書を確認してください。\n' +
      '\n'
  }
]

const manual = [
  {
    id: 1,
    data: [
      {
        title: '何故必要なのか',
        content: '調理担当が下痢をしていると手指などを介して食中毒が発生する危険性があります。\n' +
          'また、手指に切り傷などがある場合や汚れたままの作業着の着用、装飾品を外し忘れたままでの調理作業などは、食品が有害な微生物に汚染されたり、異物混入の原因になったりする可能性があります。\n'
      },
      {
        title: 'いつ',
        content: '作業前、作業中、作業後、トイレ後\n'
      },
      {
        title: 'どのように',
        content: '下痢、吐き気、発熱、だるさ、等体調の不良\n' +
          '同居の家族にノロウイルスなどの感染が疑われる場合も必ず報告すること。\n' +
          '手指の傷は、治療されていても報告し、作業時は、手袋を使用する事。\n'
      },
      {
        title: '問題があった時はどうするか',
        content: '消化器系の症状がある場合は必ず報告しましょう。その他の体調不良も報告し上長の判断に従いうましょう。手に傷が有る場合は、耐水性絆創膏をつけた上から手袋を着用しましょう。\n'
      }
    ]
  },
  {
    id: 2,
    data: [
      {
        title: '何故必要なのか',
        content: '調理担当が汚れたままの作業着の着用、装飾品を外し忘れたままでの調理作業を行う事で、食品が有害な微生物に汚染されたり、調理作業中に異物の混入などの原因になったりする可能性があります。\n'
      },
      {
        title: 'いつ',
        content: '作業前、作業中、作業後、トイレ後\n'
      },
      {
        title: 'どのように',
        content: '服装はクリーニングされた衛生的なものですか？\n' +
          '頭髪・髪などは清潔に整えられていますか？\n' +
          '爪の手入れ、不必要な化粧などありませんか？\n' +
          '作業に不要なものは持っていませんか？\n' +
          '履き物は清潔な専用の物ですか？\n'
      },
      {
        title: '問題があった時はどうするか',
        content: '基準から外れている場合は、作業前に必ず改善し、汚れた作業着は速やかに交換する。\n'
      }
    ]
  },
  {
    id: 3,
    data: [
      {
        title: '何故必要なのか',
        content: '手には目に見えない有害な細菌やウイルスが付着していることがあり、食品を汚染する可能性があります。手洗いは見た目の汚れを落とすだけでなく、これらの有害な微生物が食品を汚染しないためにも大切です。\n'
      },
      {
        title: 'いつ',
        content: '作業前、作業中、作業後、トイレ後\n'
      },
      {
        title: 'どのように',
        content: '１．手洗いは、２度洗いします。\n' +
          '２．ペーパータオルで水分を拭き取ります。\n' +
          '３．アルコールによる消毒を行います。\n' +
          '\n' +
          '※詳しい手順は手順書を確認してください。\n'
      },
      {
        title: '問題があった時はどうするか',
        content: '手洗いマニュアルを再度確認し、適切な方法、タイミングで手洗いを行う。\n'
      }
    ]
  }
]

class HealthCareRecords extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      current: 1,
      selectedType: -1,
      modalVisible: false,
      descriptionTitle: '',
      descriptionText: '',
      showSelectReason: false,
      textareaValue: '',
      ngReasonData: [],
      manuals: []
    }
  }

  fetchData(current) {
    const {employId, serialId} = this.props
    const data = steps.find(item => item.id === current)
    const dataManual = manual.find(item => item.id === current)

    let sId = serialId
    if (current == 1) {
      sId = getId()
      this.props.setSerialId(sId)
    }

    if (data && dataManual) {
      getHealthCareRecords(employId, current, sId)
        .then(response => {
          if (!_.isEmpty(response.data)) {
            const dataNgReason = response.data
            if (data && dataManual && dataNgReason) {
              this.setState({
                current: current,
                descriptionTitle: data.title,
                descriptionText: data.content,
                ngReasonData: dataNgReason.data,
                manuals: dataManual.data,
                showSelectReason: false,
                selectedType: -1
              })
            }
          }
        })
    } else {
      this.props.history.goBack()
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.records.health`}))

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

  goNGBack = () => {
    this.setState({
      showSelectReason: false,
      selectedType: -1,
      textareaValue: ''
    })
  }

  handleTextAreaChange = (event) => {
    this.setState({
      textareaValue: event.target.value
    })
  }

  next = () => {
    const {intl, employId, serialId} = this.props
    const {current, showSelectReason, selectedType, textareaValue} = this.state
    const nextCurrent = current + 1

    if (showSelectReason && selectedType < 0) {
      Modal.info({
        title: intl.formatMessage({id: 'alert.dashboard.itemNoSelect'}),
        onOk() {
        }
      })
    } else {
      let formData = new FormData()
      formData.append('question_step', current)
      formData.append('question', current)
      formData.append('serialId', serialId)
      formData.append('answer', (showSelectReason) ? '0' : '1')
      if (selectedType === 0) {
        formData.append('ng_reason', selectedType)
        formData.append('comments', textareaValue)
      } else if (selectedType > 0) {
        formData.append('ng_reason', selectedType)
      } else {
        formData.append('ng_reason', '')
      }

      saveHealthCareRecords(employId, formData)
        .then(response => {
          if (response.status === 200) {
            this.fetchData(nextCurrent)
          }
        })
    }
  }

  ng = () => {
    this.setState({
      showSelectReason: true,
      selectedType: -1,
      textareaValue: ''
    })
  }

  showModal = () => {
    const {modalVisible} = this.state
    this.setState({modalVisible: !modalVisible})
  }

  handleCancel = () => {
    const {modalVisible} = this.state
    this.setState({modalVisible: !modalVisible})
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
      selectedType,
      descriptionTitle,
      descriptionText,
      modalVisible,
      showSelectReason,
      textareaValue,
      ngReasonData,
      manuals
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
                <h2><FormattedMessage id="label.health.manage.record"/></h2>
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
              <DescriptionItem
                title={descriptionTitle + '\t' + ((showSelectReason) ? intl.formatMessage({id: 'label.manage.record.ng.msg1'}) : '')}
                btnTitle={<FormattedMessage id="btn.manual"/>}
                visiable={true}
                text={((showSelectReason) ? intl.formatMessage({id: 'label.manage.record.ng.msg2'}) : descriptionText)}
                onHandleClick={this.showModal}
              />
            </div>
            {
              showSelectReason && ngReasonData && (
                <div
                  className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-5">
                  <Select style={{width: '100%'}} placeholder="選択してください" onChange={this.handleChange}>
                    <Option key="-1" value="-1">選択してください</Option>
                    {ngReasonData.map((item, index) =>
                      <Option key={index + 1} value={index + 1}>{item}</Option>)
                    }
                    <Option key="0" value="0">その他</Option>
                  </Select>
                </div>
              )
            }
            {
              showSelectReason && selectedType === '0' && (
                <div
                  className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24 gx-mb-5">
                  <TextArea rows={3} value={textareaValue} onChange={this.handleTextAreaChange}/>
                </div>
              )
            }
            {
              showSelectReason && (
                <div className="gx-flex-row gx-align-items-center gx-mb-4">
                  <div
                    className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                    <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5"
                            onClick={this.goNGBack}>
                      <FormattedMessage id="btn.back"/>
                    </Button>
                    <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto"
                            onClick={this.next}>
                      <FormattedMessage id="btn.confirm.input"/>
                    </Button>
                  </div>
                </div>
              )
            }
            {
              !showSelectReason && (
                <div className="gx-flex-row gx-align-items-center gx-mb-4">
                  <div
                    className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                    <Button className="ant-btn-primary gx-btn-rounded-gray common-btn-back gx-mr-5" onClick={this.ng}>
                      <FormattedMessage id="btn.ng"/>
                    </Button>
                    <Button className="ant-btn-primary gx-btn-rounded-blue common-btn-back gx-mr-auto"
                            onClick={this.next}>
                      <FormattedMessage id="btn.ok"/>
                    </Button>
                  </div>
                </div>
              )
            }
          </Spin>
        </Card>
        <Modal
          title={<div className="modal-manual-header">{descriptionTitle}</div>}
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={650}
        >
          {manuals.map((item, index) =>
            <div>
              <p>{item.title}</p>
              <p className="model-contents-div gx-mb-4">
                {item.content}
              </p>
            </div>)
          }
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setTitleText, setSerialId
}

const mapStateToProps = ({custom, progress}) => {
  const {employId, serialId} = custom
  return {
    employId,
    serialId,
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HealthCareRecords))
