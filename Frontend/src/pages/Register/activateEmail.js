import React, {Fragment, useRef, useEffect, useState} from 'react';
import {useAuthState} from "../../context";
import {injectIntl} from "react-intl";
import {Link, useHistory, useLocation} from "react-router-dom";
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {PageConstant} from "../../constants/PageConstant";
import {getEmailActivateStatus} from "../../api/axiosAPIs";
import {
    HTTP_SUCCESS,
} from "../../constants/ResponseCode";

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


const ActivateEmail = (props) => {
  const {profile} = useAuthState();
  const [isVerified, setIsVerified] = useState(-1);
  let history = useHistory();
  const urlParams = window.location.pathname
  const key = urlParams.toString().split('/', -1)[2]
  console.log('AcitivateEmailKey:', key)
  
  useEffect(() => {
    verifyEmail();
  }, []);

  const goLogin = e => {
    e.preventDefault()
    history.push(PageConstant.LOGIN)
  }

  const verifyEmail = async() => {
    let response = {}
    console.log('Verified_Email!', key)
    try {
        response = await getEmailActivateStatus(key)
        if (response.message === 'account was activated successfully.') {
            console.log("emailVerify_successfully!")
            setIsVerified(1)
        }
        else {
            setIsVerified(2)
        }
    } catch (error) {
        console.log(error)
    }

}

  return (
    <Fragment>
        <div className={"pt-4 lg:pb-20 sm:px-0 md:px-8 lg:px-30 xl:px-56 bg-yellow-light"}>
            <div className={"lg:px-32 lg:pb-12"}>
                <div className={"flex items-center justify-center lg:m-10"}>
                    {
                        (isVerified === 1) && 
                        <span className={"blue-color text-3xl font-bold"}>{props.intl.formatMessage({id: 'str.item.mail.verify.success'})}</span>
                    }
                    {
                        (isVerified === 2) && 
                        <span className={"blue-color text-3xl font-bold"}>{props.intl.formatMessage({id: 'str.item.mail.verify.fail'})}</span>
                    }
                </div>
            </div>
            <div className={"flex justify-center"}>
                <button
                    onClick={goLogin}
                    className={"flex items-center justify-center bg-blue btn-primary-semi-round text-white text-lg"}
                    style={{width: 315, height: 55}}
                >
                    <span>{props.intl.formatMessage({id: 'btn.login.send'})}</span>
                </button>
            </div>
        </div>
    </Fragment>
  )
}

export default injectIntl(ActivateEmail)