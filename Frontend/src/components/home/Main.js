import React, {Fragment, useRef, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {isLogined} from "../../helper/utils";
import {useAuthState} from "../../context";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import {ProgramShare} from "../modal/ProgramShare";
import {PageConstant} from "../../constants/PageConstant";
import {getIntruducer} from "../../api/axiosAPIs";
import {ERROR, openNotificationWithIcon, SUCCESS} from "../common/Messages";
import {
    HTTP_SUCCESS,
} from "../../constants/ResponseCode";
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
export const Main = (props) => {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    console.log('current language1', currentLanguage)
    const { t } = useTranslation()

    let history = useHistory();
    const {loading, profile} = useAuthState();
    const formRef = useRef();
    const [isConfirm, setIsConfirm] = useState(false);
    const [isPublic, setPublic] = useState(0);
    const [initFormValue] = useState(isLogined(profile) ? {
        inquiry_name: profile.name,
        email: profile.email,
        coin_address: profile.coin_address
    } : {});

    const items = [
        {to: '', label: 'お問い合わせ'},
    ]

    const QRCode = require('qrcode.react');
    const key = JSON.parse(localStorage.getItem("currentProfile")).code
    const [sharedState, setSharedState] = useState({bCopied: false, key: key});

    const getUrl = () => {
        return window.location.host + PageConstant.SIGNUP + "/" + sharedState.key
    }
    
    const onCopyUrl = (url) => {
        console.log('getURL_QR:', url)
        if(navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url)
        }
        else {
        let textArea = document.createElement("textarea");
        textArea.value = url;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
        }
        setSharedState({bCopied: true, key: sharedState.key})
    }
    const getUserInfo = async (data) => {
        let response = await getIntruducer(key)
            if (response.status === HTTP_SUCCESS) {
                console.log("login_getUserInfo_Success!", response.data)            
                setPublic(response.data.isPublic)
                console.log('login_getUserInfo_isIntroducer!', isPublic)
            }
      }

    useEffect(() => {
        console.log('Setting page stuff')
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = props.intl.formatMessage({id: 'app_title'})
        getUserInfo()
    }, [currentLanguage, t])

  return (
    <Fragment>
      <div>
        <div>
          <img alt="" src={require('../../assets/img/HBY-logo2-1.png')} style={{width: '100%', height: '100%'}}/>
        </div>
      </div>
      <ProgramShare
        isVisible={isPublic}
        intl={props.intl}
        bCopied={sharedState.bCopied}
        onCopyUrl={onCopyUrl}
        url={getUrl()}
        size={400}
        handleCancel={() => setSharedState({isVisible: false, bCopied: false, key: sharedState.key})}
      />
    </Fragment>
  )
}
