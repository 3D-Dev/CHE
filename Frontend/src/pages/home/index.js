import React, {Suspense,Fragment} from 'react';
import {Top} from "../../components/home/Top";
import {useAuthState} from "../../context";
import {injectIntl} from "react-intl";
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'id', 'ja', 'vi'],
        fallbackLng: 'ja',
        debug: false,
        // Options for language detector
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        react: { useSuspense: false },
        backend: {
            loadPath: "../../lngProvider/locales/translation.json",
        },
    })


const Home = (props) => {
  const {profile} = useAuthState();

  return (
    <Fragment>
      <div className="App">
        {
            <Top intl={props.intl}/>
        }
      </div>
    </Fragment>

  )
}

export default injectIntl(Home)