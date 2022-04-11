import React, { Component } from 'react'
import { CustomerItem } from '../../../components'
import { FormattedMessage, injectIntl } from 'react-intl'
import PageConstant from '../../../constants/PageConstant'
import { connect } from 'react-redux'
import { editCustomer, getCustomerItem } from '../../../api/axiosAPIs'
import { dateByFormat, getQueryVariable } from '../../../util/helpers'
import _ from 'lodash'
import { openNotificationWithIcon } from '../../../components/common/Messages'
import { setTitleText } from '../../../appRedux/actions/Custom'

class EditCustomer extends Component {
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
    this.props.setTitleText(intl.formatMessage({id: `card.title.customer.edit`}))

    let url = window.location.pathname
    let id = url.split('/~').slice(-1)[0]
    this.prevPageNum = getQueryVariable('num')
    this.prevPageLimit = getQueryVariable('limit')

    this.selectedId = id
    
    getCustomerItem(id)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          this.setState({
            row: response.data
          })
        }
      })
  }


  submitEditCustomer = (data) => {
    let formData = new FormData()
    
    formData.append('name', data.name)
    formData.append('staff_name', data.representative_name)
    formData.append('staff_email', data.representative_email)
    formData.append('staff_password', data.password)
    formData.append('staff_password_confirmation', data.password)
    formData.append('contract_date', data.contractDate ? dateByFormat(data.contractDate, '-') : '')
    formData.append('memo', data.memo ? data.memo : '')

    if (!_.isNull(this.selectedId)) {
      let selectedItemId = this.selectedId
      editCustomer(selectedItemId, formData)
        .then(response => {
          openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.editCustomer'}))
          this.goToCustomerList()
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
    this.goToCustomerList()
  }

  goToCustomerList() {
    this.props.history.push({
      pathname: PageConstant.CUSTOMERS,
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
          <h2 className="title gx-mb-auto" style={{marginRight: '50px'}}><FormattedMessage
            id="card.title.customer.edit"/></h2>
        </div>
        <CustomerItem
          isAdd={isAdd}
          row={row}
          loader={loader}
          submitEditCustomer={this.submitEditCustomer}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditCustomer))