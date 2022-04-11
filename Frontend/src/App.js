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
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ja',
    name: 'Japanese',
    country_code: 'ja',
  },
  {
    code: 'id',
    name: 'Indonesian',
    country_code: 'id',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    country_code: 'vi',
  },
]
function App() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  console.log('current language2', currentLanguage)
  const { t } = useTranslation()
  let currentAppLocale = AppLocale[currentLanguage.code]
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
