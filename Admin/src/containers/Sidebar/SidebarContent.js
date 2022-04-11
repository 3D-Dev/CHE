import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { CustomScrollbars } from '../../components'
import SidebarLogo from './SidebarLogo'
import Auxiliary from 'util/Auxiliary'

class SidebarContent extends Component {

  render() {
    const {pathname, role} = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    return (
      <Auxiliary>
        <div className="gx-sidebar-bg">
          <SidebarLogo/>
          <div className="gx-sidebar-content">
            <CustomScrollbars className="gx-layout-sider-scrollbar">
              <Menu
                defaultOpenKeys={[defaultOpenKeys]}
                selectedKeys={[selectedKeys]}
                theme={'dark'}
                mode="inline">
                <Menu.Item key="admin/select">
                  <Link to="/admin/select">
                    <FormattedMessage id="menu.title.accountSelect"/>
                  </Link>
                </Menu.Item>
                {role === 'NO_USER' &&
                <Menu.Item key="admin/agencies">
                  <Link to="/admin/agencies">
                    <FormattedMessage id="menu.title.agencies"/>
                  </Link>
                </Menu.Item>
                }
                {role === 'agency' &&
                <Menu.Item key="admin/customers">
                  <Link to="/admin/customers">
                    <FormattedMessage id="menu.title.customers"/>
                  </Link>
                </Menu.Item>
                }
                {/*<Menu.Item key="logout">*/}
                {/*  <LogoutMenu/>*/}
                {/*</Menu.Item>*/}
              </Menu>
            </CustomScrollbars>
          </div>
        </div>
      </Auxiliary>
    )
  }
}

SidebarContent.propTypes = {}
const mapStateToProps = ({settings, user}) => {
  const {role, profile} = user
  const {themeType, pathname} = settings
  return {themeType, pathname, role, profile}
}

export default connect(mapStateToProps, null)(SidebarContent)
