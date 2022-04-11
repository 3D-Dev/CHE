import React, { Component } from 'react'
import { CustomerItem } from '../../../components'
import { FormattedMessage, injectIntl } from 'react-intl'
import { addCustomer } from '../../../api/axiosAPIs'
import PageConstant from '../../../constants/PageConstant'
import { connect } from 'react-redux'
import { openNotificationWithIcon } from '../../../components/common/Messages'
import { dateByFormat } from '../../../util/helpers'
import { setTitleText } from '../../../appRedux/actions/Custom'

class AddCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false
    }
    this.prevPageNum = 0
    this.prevPageLimit = 10
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `card.title.customer.add`}))

    let {pageNumberState, rowsPerPageState} = this.props.location
    if ((pageNumberState !== undefined) && (rowsPerPageState !== undefined)) {
      this.prevPageNum = pageNumberState
      this.prevPageLimit = rowsPerPageState
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  submitAddCustomer = (data) => {
    
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('staff_name', data.representative_name)
    formData.append('staff_email', data.representative_email)
    formData.append('staff_password', data.password)
    formData.append('staff_password_confirmation', data.password)
    formData.append('contract_date', data.contractDate ? dateByFormat(data.contractDate, '-') : '')
    formData.append('memo', data.memo ? data.memo : '')

    addCustomer(formData)
      .then(response => {
        openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.newCustomer'}))
        this.goToCustomerList()
      })
  }

  handleCancelBtn = () => {
    this.props.history.push({
      pathname: PageConstant.CUSTOMERS,
      pageNumberState: this.prevPageNum,
      rowsPerPageState: this.prevPageLimit
    })
  }

  goToCustomerList() {
    this.props.history.push({
      pathname: PageConstant.CUSTOMERS,
      pageNumberState: parseInt(this.prevPageNum),
      rowsPerPageState: parseInt(this.prevPageLimit)
    })
  }

  render() {
    let isAdd = true
    const {loader} = this.state
    return (
      <div>
        <div className="gx-flex-row gx-align-items-center gx-mb-4">
          <h2 className="title gx-mb-auto" style={{marginRight: '50px'}}><FormattedMessage
            id="card.title.customer.add"/></h2>
        </div>
        <CustomerItem
          isAdd={isAdd}
          loader={loader}
          submitAddCustomer={this.submitAddCustomer}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddCustomer))