import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { MenuCard } from '../../../components/'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, Col, Modal, Row, Select } from 'antd'
// import { getEmployees } from '../../../api/axiosAPIs'
import { setEmployId, setTitleText } from '../../../appRedux/actions/Custom'
import { connect } from 'react-redux'
import { initSettings } from '../../../appRedux/actions/User'

const {Option} = Select

const MenuCards = [
  {
    id: 0,
    title: 'menu.card.healthCare',
    imageName: 'healthcare.png'
  },
  {
    id: 1,
    title: 'menu.card.ccp',
    imageName: 'ccp.png'
  },
  {
    id: 2,
    title: 'menu.card.hygiene',
    imageName: 'hygiene.png'
  },
  {
    id: 3,
    title: 'menu.card.temperature',
    imageName: 'temperature.png'
  },
  {
    id: 4,
    title: 'menu.card.rush',
    imageName: 'rush.png'
  },
]

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      selectedMember: -1,
      defaultValue: ''
    }
  }

  componentDidMount() {
    this.props.setTitleText(' ')

    this.fetchMemberList()
  }

  fetchMemberList() {
    const {employId} = this.props
  }

  changeMember = (value) => {
    const {members} = this.state
    const data = members.find(item => item.id === value)

    this.setState({
      selectedMember: value,
      defaultValue: ((data) ? (data.emp_name) : '')
    })
  }

  onClickLogout = (e) => {
    this.props.initSettings()
    this.props.history.push('/admin/login')
  }

  goToPage = (type) => {
    const {intl} = this.props
    const {selectedMember} = this.state

    if (selectedMember < 0) {
      Modal.info({
        title: intl.formatMessage({id: 'alert.dashboard.memberNoSelect'}),
        onOk() {
        }
      })
    } else {
      this.props.setEmployId(selectedMember)
      switch (type) {
        case 0 :
          this.props.history.push({
            pathname: PageConstant.HEALTH_MANAGEMENT_RECORDS
          })
          break
        case 1 :
          this.props.history.push({
            pathname: PageConstant.CCP_RECORDS
          })
          break
        case 2 :
          this.props.history.push({
            pathname: PageConstant.HYGIENE_RECORDS
          })
          break
        case 3 :
          this.props.history.push({
            pathname: PageConstant.TEMPERATURE_RECORDS
          })
          break
        case 4 :
          this.props.history.push({
            pathname: PageConstant.RUSH_RECORDS
          })
          break
        default:
      }
    }

  }

  render() {
    const {intl, employId} = this.props
    const {members, defaultValue} = this.state
    return (
      <div>
        <div className="gx-flex-row gx-align-items-center gx-mb-4">
          <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage id="card.title.selectMember"/></h2>
        </div>
        <Card className="gx-card">
          <Select style={{width: 200}} value={defaultValue} onChange={(e) => this.changeMember(e)}>
            {members.map(option =>
              <Option value={option.id} key={option.id}>{option.emp_name}</Option>
            )}
          </Select>
        </Card>
        <div className="gx-flex-row gx-align-items-center gx-mb-4">
          <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage id="page.title.selectMenu"/></h2>
        </div>
        <Row>
          {MenuCards.map((menuCard, index) =>
            <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24} key={index}>
              <MenuCard
                title={intl.formatMessage({id: `${menuCard.title}`})}
                imageName={menuCard.imageName}
                type={index}
                onCardClick={this.goToPage}
              />
            </Col>)
          }
        </Row>
        <div align="right">
          <Button type="primary gx-btn-rounded-blue gx-width-100" onClick={this.onClickLogout}>
            <FormattedMessage id={'auth.logout'}/>
          </Button>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = {
  initSettings, setEmployId, setTitleText
}

const mapStateToProps = ({custom, progress}) => {
  const {employId} = custom
  return {
    employId,
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Dashboard))
