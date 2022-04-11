import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { DescriptionItem1 } from '../../../components'
import { editGeneralHygieneManagement, getGeneralHygieneManagement } from '../../../api/axiosAPIs'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, Col, Radio, Spin } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { setTitleText } from '../../../appRedux/actions/Custom'

const titleData = [
  {
    id: 1,
    name: '原材料の受入確認'
  },
  {
    id: 2,
    name: '庫内温度の確認（冷蔵庫・冷凍庫）'
  },
  {
    id: 3,
    name: '交差汚染、二次汚染の防止'
  },
  {
    id: 4,
    name: '器具等の洗浄・消毒・殺菌'
  },
  {
    id: 5,
    name: 'トイレの洗浄・消毒'
  },
  {
    id: 6,
    name: '健康チェック'
  },
  {
    id: 7,
    name: '身嗜みチェック'
  },
  {
    id: 8,
    name: '手洗いの実施'
  }
]

const tempData = {
  before_start: 0,
  during_work: 0,
  after_work: 0,
  other_time: 0,
  del_flg: 1
}

class GeneralHygieneManagement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      step: 1,
      row: {}
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.general.hygiene.management`}))
    this.fetchData(0)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  fetchData(diff) {
    const {step} = this.state
    const curStep = step + diff
    const title = titleData.find(item => item.id === curStep)

    getGeneralHygieneManagement(curStep)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          this.setState({
            step: curStep,
            row: (response.data.data) ? response.data.data : tempData,
            title: (title) ? title.name : ''
          })
        }
      })
  }

  handleCheckButtonClick = (kind) => {
    const {row} = this.state

    switch (kind) {
      case 0:
        row.before_start = (row.before_start === 0) ? 1 : 0
        break
      case 1:
        row.during_work = (row.during_work === 0) ? 1 : 0
        break
      case 2:
        row.after_work = (row.after_work === 0) ? 1 : 0
        break
      case 3:
        row.other_time = (row.other_time === 0) ? 1 : 0
        break
      default:
    }
    this.setState({
      row: row
    })
  }

  handleRadioChange = (e) => {
    const {row} = this.state
    row.del_flg = e.target.value
    this.setState({
      row: row
    })
  }

  goToPrevious = () => {
    this.props.history.push({pathname: PageConstant.MAINTENANCE})
  }

  goBack = () => {
    const {step} = this.state
    if (step === 1) {
      this.goToPrevious()
    } else {
      this.fetchData(-1)
    }
  }

  finishRegist = () => {
    const {step, row} = this.state

    let formData = new FormData()
    formData.append('before_start', row.before_start)
    formData.append('during_work', row.during_work)
    formData.append('after_work', row.after_work)
    formData.append('other_time', row.other_time)
    formData.append('del_flg', row.del_flg)

    editGeneralHygieneManagement(step, formData)
      .then(response => {
        if (response.status === 200) {
          if (step === 8) {
            this.goToPrevious()
          } else {
            this.fetchData(1)
          }
        }
      })

  }

  render() {
    const {
      loader,
      row,
      title
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
                    <FormattedMessage id="lable.time"/>
                  </h2>
                  <div className="gx-mr-3 ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-8">
                    <Button className="maintenance-selector">{date}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="gx-no-flex-wrap-flow gx-mb-4">
              <div className="gx-align-self-left ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-12">
                <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage
                  id="page.title.general.hygiene.management"/></h2>
              </div>
            </div>
            <DescriptionItem1
              title={title}
              btnTitle={'マニュアル表⽰'}
              visiable={false}
              text={'頻度を下記のボタンより決定します。決定方法は、手順書で確認して下さい。'}
              // onHandleClick={this.showModal}
            />
            <div
              className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-my-4">
              <Button
                className={(row && row.before_start === 1) ? 'hygiene-btn-width selected gx-mr-4 gx-p-0' : 'hygiene-btn-width gx-mr-4 gx-p-0'}
                onClick={() => this.handleCheckButtonClick(0)}
              >
                <div className="gx-flex-row">
                  <Col span={5} className="gx-align-self-center">
                  </Col>
                  <Col span={14} className="gx-text-center gx-align-self-center">
                    <FormattedMessage id="page.title.general.hygiene.management1"/>
                  </Col>
                  <Col span={5} className="gx-text-center gx-align-self-center gx-text-white">
                    <CheckOutlined/>
                  </Col>
                </div>
              </Button>
              <Button
                className={(row && row.during_work === 1) ? 'hygiene-btn-width selected gx-mr-4' : 'hygiene-btn-width gx-mr-4'}
                onClick={() => this.handleCheckButtonClick(1)}
              >
                <div className="gx-flex-row">
                  <Col span={5} className="gx-align-self-center">
                  </Col>
                  <Col span={14} className="gx-text-center gx-align-self-center">
                    <FormattedMessage id="page.title.general.hygiene.management2"/>
                  </Col>
                  <Col span={5} className="gx-text-center gx-align-self-center gx-text-white">
                    <CheckOutlined/>
                  </Col>
                </div>
              </Button>
              <Button
                className={(row && row.after_work === 1) ? 'hygiene-btn-width selected gx-mr-4' : 'hygiene-btn-width gx-mr-4'}
                onClick={() => this.handleCheckButtonClick(2)}
              >
                <div className="gx-flex-row">
                  <Col span={5} className="gx-align-self-center">
                  </Col>
                  <Col span={14} className="gx-text-center gx-align-self-center">
                    <FormattedMessage id="page.title.general.hygiene.management3"/>
                  </Col>
                  <Col span={5} className="gx-text-center gx-align-self-center gx-text-white">
                    <CheckOutlined/>
                  </Col>
                </div>
              </Button>
              <Button
                className={(row && row.other_time === 1) ? 'hygiene-btn-width selected gx-mr-4' : 'hygiene-btn-width gx-mr-4'}
                onClick={() => this.handleCheckButtonClick(3)}
              >
                <div className="gx-flex-row">
                  <Col span={5} className="gx-align-self-center">
                  </Col>
                  <Col span={14} className="gx-text-center gx-align-self-center">
                    <FormattedMessage id="page.title.general.hygiene.management4"/>
                  </Col>
                  <Col span={5} className="gx-text-center gx-align-self-center gx-text-white">
                    <CheckOutlined/>
                  </Col>
                </div>
              </Button>
            </div>
            <div
              className="gx-align-self-left gx-mt-5 ant-col ant-col-xs-12 ant-col-sm-12 ant-col-xl-12 ant-col-xxl-12">
              <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage
                id="page.title.general.hygiene.management.radio"/></h2>
            </div>
            <Radio.Group className="gx-ml-5 gx-mt-3" value={(row) ? row.del_flg : ''} onChange={this.handleRadioChange}>
              <Radio value={1}>はい</Radio>
              <Radio value={0}>いいえ</Radio>
            </Radio.Group>
          </Spin>
        </Card>
        <div className="gx-flex-row gx-align-items-right gx-mb-3">
          <Button className="ant-btn-primary gx-btn-rounded-gray maintenance-btn gx-mr-4" onClick={this.goBack}>
            <FormattedMessage id="btn.go.previous"/>
          </Button>
          <Button className="ant-btn-primary gx-btn-rounded-blue maintenance-btn gx-mr-auto"
                  onClick={this.finishRegist}>
            <FormattedMessage id="btn.finish.next.screen"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(GeneralHygieneManagement))
