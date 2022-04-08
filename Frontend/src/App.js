import React from 'react'
import routes from "./config/routes";
import {AuthProvider} from "./context";
import {BrowserRouter, Switch} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import {IntlProvider} from 'react-intl'
import AppLocale from './lngProvider'
import "antd/dist/antd.css"
import './stylesheet/styles.css'
import './stylesheet/antd.css'
import './stylesheet/ckeditor-content-styles.css'
import './stylesheet/customize.css'
import './stylesheet/cocoon-master-style.css'
import './stylesheet/cocoon-master-webfonts-icomoon-style.css'
import './stylesheet/cocoon-master-skins-skin-colors-black-style.css'
import {AppContainer} from "./components/container/AppContainer";

function App() {
  let currentAppLocale = AppLocale['ja']
  return (
    currentAppLocale &&
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>
        <AuthProvider>
          <BrowserRouter>
            <AppContainer/>
          </BrowserRouter>
        </AuthProvider>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
