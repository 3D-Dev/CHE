import React, { Component } from 'react'
import { connect } from 'react-redux'
import URLSearchParams from 'url-search-params'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import AppLocale from 'lngProvider'
import { onNavStyleChange, setThemeType } from 'appRedux/actions/Setting'

import { NAV_STYLE_INSIDE_HEADER_HORIZONTAL, THEME_TYPE_DARK } from './constants/ThemeSetting'
import RootApp from './containers/App/RootApp'

class App extends Component {

  setLayout() {
    document.body.classList.remove('boxed-layout')
    document.body.classList.remove('framed-layout')
    document.body.classList.add('full-layout')
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL) {
      document.body.classList.add('full-scroll')
      document.body.classList.add('horizontal-layout')
    } else {
      document.body.classList.remove('full-scroll')
      document.body.classList.remove('horizontal-layout')
    }
  }

  componentWillMount() {
    const {location} = this.props
    const params = new URLSearchParams(location.search)

    if (params.has('theme')) {
      setThemeType(params.get('theme'))
    }
    if (params.has('nav-style')) {
      onNavStyleChange(params.get('nav-style'))
    }
  }

  render() {
    const {match, themeType, navStyle, locale} = this.props
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme')
    }

    this.setLayout()
    this.setNavStyle(navStyle)
    let currentAppLocale = AppLocale['ja']
    // if ((!_.isEmpty(locale)) || (!_.isUndefined(locale))) {
    //   currentAppLocale = AppLocale[locale]
    // }

    return (
      <div>
        {
          currentAppLocale &&
          <ConfigProvider locale={currentAppLocale.antd}>
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}>
              <RootApp
                match={match}
              />
            </IntlProvider>
          </ConfigProvider>
        }
      </div>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale} = settings
  return {locale, navStyle, themeType}
}

export default connect(mapStateToProps, {onNavStyleChange})(App)
