import React, {Fragment, useRef, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Card, Checkbox, Col, Form, Input} from "antd";
import {FormInput} from "../form/FormInput";
import {isLogined} from "../../helper/utils";
import {useAuthState} from "../../context";
import {FormLabel} from "../form/FormLabel";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import validation from 'validator'
import {createAccout} from "../../api/axiosAPIs";
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
    const [initFormValue] = useState(isLogined(profile) ? {
        inquiry_name: profile.name,
        email: profile.email,
        coin_address: profile.coin_address
    } : {});

    const items = [
        {to: '', label: 'お問い合わせ'},
    ]

    const onChangeInputConfirm = e => {
        setIsConfirm(e)
    }

    const onFinish = async(data) => {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('account', data.account)
        formData.append('referId', '')
        formData.append('referEmail', data.referEmail? data.referEmail : '')
        formData.append('createdAt', data.createdAt)
        let response = {}
        try {
            response = await createAccout(formData)
            if (response.status === HTTP_SUCCESS) {
                console.log("create_successfully!")
                openNotificationWithIcon(SUCCESS, props.intl.formatMessage({id: 'message.success.user'}))
            }
        } catch (error) {
            console.log(error)
        }

    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    useEffect(() => {
        console.log('Setting page stuff')
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = props.intl.formatMessage({id: 'app_title'})
    }, [currentLanguage, t])

  return (
    <Fragment>
      <div>
        <div>
          <img alt="" src={require('../../assets/img/HBY-logo2-1.png')} style={{width: '100%', height: '100%'}}/>
        </div>
      </div>
    </Fragment>
  )
}
