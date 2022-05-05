import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { Redirect } from 'react-router-dom'

import Sidebar from '../Sidebar/index'
import Topbar from '../Topbar/index'
import InsideHeader from '../Topbar/InsideHeader'
import AppRoute from '../../routes/index'
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE
} from '../../constants/ThemeSetting'
import { TitleArea } from '../../components'

const {Content, Footer} = Layout

export class MainApp extends Component {

  getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-container-wrap'
      default:
        return ''
    }
  }
  getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
        return <InsideHeader/>
      case NAV_STYLE_FIXED :
        return <Topbar/>
      case NAV_STYLE_DRAWER :
        return <Topbar/>
      case NAV_STYLE_MINI_SIDEBAR :
        return <Topbar/>
      default :
        return null
    }
  }

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar/>
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Sidebar/>
      case NAV_STYLE_DRAWER :
        return <Sidebar/>
      case NAV_STYLE_MINI_SIDEBAR :
        return <Sidebar/>
      default :
        return null
    }
  }

  render() {
    console.log('MainApp', this.props)
    const {role, match, width, navStyle} = this.props
    return (
      (role === 'NO_USER') ? (<Redirect
          to={{pathname: '/admin/login', state: {from: this.props.location}}}
        />)
        :
        (
          <Layout className="gx-app-layout">
            {this.getSidebar(navStyle, width)}
            <Layout>
              {this.getNavStyles(navStyle)}
              <Content className={`gx-layout-content ${this.getContainerClass(navStyle)} `}>
                <TitleArea/>
                <AppRoute match={match}/>
              </Content>
            </Layout>
          </Layout>)
    )
  }
}

const mapStateToProps = ({settings, user}) => {
  const {role} = user
  const {width, navStyle} = settings
  return {role, width, navStyle}
}
export default connect(mapStateToProps)(MainApp)

