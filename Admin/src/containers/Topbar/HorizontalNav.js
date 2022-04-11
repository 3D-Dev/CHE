import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { NAV_STYLE_INSIDE_HEADER_HORIZONTAL } from '../../constants/ThemeSetting'
import { LogoutMenu } from '../../components'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve'
      default:
        return 'gx-menu-horizontal'
    }
  }

  render() {
    const {pathname} = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]

    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">
        <Menu.Item key="agencies">
          <Link to="/admin/agencies">
            <FormattedMessage id="menu.title.agencies"/>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutMenu/>
        </Menu.Item>
      </Menu>
    )
  }
}

HorizontalNav.propTypes = {}
const mapStateToProps = ({settings}) => {
  return settings
}

export default connect(mapStateToProps)(HorizontalNav)
