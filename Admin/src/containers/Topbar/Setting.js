import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SettingOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import PageConstant from '../../constants/PageConstant'

class Setting extends Component {

  constructor(props) {
    super(props)
  }

  onClickSetting = () => {
    this.props.history.push({pathname: PageConstant.MAINTENANCE})
  }

  render() {
    const {role} = this.props

    return (
      <div>
        {
          role === 'customer' &&
          (
            <span className="gx-pointer gx-flex-row gx-align-items-center" onClick={this.onClickSetting}>
                <SettingOutlined className="setting-menu"/>
            </span>
          )
        }
      </div>
    )
  }
}

Setting.propTypes = {}
const mapStateToProps = ({user}) => {
  const {role, profile} = user
  return {role, profile}
}

export default connect(mapStateToProps, null)(withRouter(Setting))
