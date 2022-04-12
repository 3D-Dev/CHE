import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { toggleCollapsedSideNav } from '../../appRedux/actions/Setting'
import Auxiliary from 'util/Auxiliary'
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from '../../constants/ThemeSetting'
import Setting from './Setting'

const {Header} = Layout

class Topbar extends Component {

  render() {
    const {width, navCollapsed, navStyle} = this.props
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   this.props.toggleCollapsedSideNav(!navCollapsed)
                 }}
              />
            </div> : null}
          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-language">
              <Setting/>
            </li>
          </ul>
        </Header>
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, navCollapsed, width} = settings
  return {navStyle, navCollapsed, width}
}

export default connect(mapStateToProps, {toggleCollapsedSideNav})(Topbar)
