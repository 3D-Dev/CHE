import React, { Component } from 'react'
import { UserItem } from '../../../components'
import { FormattedMessage, injectIntl } from 'react-intl'
import PageConstant from '../../../constants/PageConstant'
import { connect } from 'react-redux'
import { editUser, getUserItem } from '../../../api/axiosAPIs'
import { getQueryVariable } from '../../../util/helpers'
import _ from 'lodash'
import { openNotificationWithIcon } from '../../../components/common/Messages'
import { setTitleText } from '../../../appRedux/actions/Custom'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      row: {}
    }
    this.selectedId = null
    this.prevPageNum = 0
    this.prevPageLimit = 10
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `card.title.user.edit`}))

    let url = window.location.pathname
    let id = url.split('/~').slice(-1)[0]
    this.prevPageNum = getQueryVariable('num')
    this.prevPageLimit = getQueryVariable('limit')

    this.selectedId = id
    
    getUserItem(id)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          this.setState({
            row: response.data
          })
        }
      })
  }

  submitEditUser = (data) => {
    let formData = new FormData()

    formData.append('id', this.selectedId)
    formData.append('name', data.name)
    formData.append('staff_email', data.representative_email)
    formData.append('password', data.password)

    if (!_.isNull(this.selectedId)) {
      let selectedItemId = this.selectedId
      editUser(selectedItemId, formData)
        .then(response => {
          openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.editUser'}))
          this.goToUserList()
        })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  handleCancelBtn = () => {
    this.goToUserList()
  }

  goToUserList() {
    this.props.history.push({
      pathname: PageConstant.USERS,
      pageNumberState: parseInt(this.prevPageNum),
      rowsPerPageState: parseInt(this.prevPageLimit)
    })
  }

  render() {
    let isAdd = false
    const {loader, row} = this.state

    return (
      <div>
        <div className="gx-flex-row gx-align-items-center gx-mb-4">
          <h2 className="title gx-mb-auto" style={{marginRight: '50px'}}><FormattedMessage id="card.title.user.edit"/>
          </h2>
        </div>
        <UserItem
          isAdd={isAdd}
          row={row}
          loader={loader}
          submitEditInfo={this.submitEditUser}
          handleCancelBtn={this.handleCancelBtn}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditUser))