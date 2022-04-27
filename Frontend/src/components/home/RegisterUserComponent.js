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
export const RegisterUserComponent = (props) => {
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
      <div className={"sns-share ss-col-6 ss-high-and-low-lc bc-brand-color sbc-hide ss-top "} style={{margin: '30px 0'}}>
        <div className={"sns-share-buttons sns-buttons"}>
          <a href="https://twitter.com/intent/tweet?text=%EF%BC%BB%E4%BC%9A%E5%93%A1%E7%99%BB%E9%8C%B2%EF%BC%BD0021%E3%80%80%E6%B5%85%E8%8D%89&#038;url=https%3A%2F%2Frabbitmember.com%2Fform021%2F"
             className={"share-button twitter-button twitter-share-button-sq"} target="_blank"
             rel="nofollow noopener noreferrer">
            <span className={"social-icon icon-twitter"}></span>
            <span className={"button-caption"}>Twitter</span>
            <span className={"share-count twitter-share-count"}></span>
          </a>

          <a href="//www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frabbitmember.com%2Fform021%2F&#038;t=%EF%BC%BB%E4%BC%9A%E5%93%A1%E7%99%BB%E9%8C%B2%EF%BC%BD0021%E3%80%80%E6%B5%85%E8%8D%89"
             className="share-button facebook-button facebook-share-button-sq" target="_blank"
             rel="nofollow noopener noreferrer">
            <span className={"social-icon icon-facebook"}></span>
            <span className={"button-caption"}>Facebook</span>
            <span className={"share-count facebook-share-count"}></span>
          </a>

          <a href="//timeline.line.me/social-plugin/share?url=https%3A%2F%2Frabbitmember.com%2Fform021%2F"
             className="share-button line-button line-share-button-sq" target="_blank"
             rel="nofollow noopener noreferrer">
            <span className={"social-icon icon-line"}></span>
            <span className={"button-caption"}>LINE</span>
            <span className={"share-count line-share-count"}></span>
          </a>
        </div>
      </div>
      <div>
          <div className="entry-content cf" itemProp="mainEntityOfPage">
              <p style={{textAlign: 'center'}}>
            <span style={{fontSize: '24px', color: '#ff00ff'}}>
                <strong>&#8211;
                    <span style={{color: '#ff0000'}}>新</span>着(≧
                    <span style={{color: '#ff0000'}}>◇</span>
                    ≦)<span style={{color: '#ff99cc'}}>N</span>
                    <span style={{color: '#00ff00'}}>E</span>
                    <span style={{color: '#ff0000'}}>W</span>S-
                </strong>
            </span>
              </p>

              <div className={"new-entry-cards widget-entry-cards no-icon cf"}>
                  <a href="https://rabbitmember.com/2022/03/24/5%ef%bc%85%e3%83%90%e3%83%bc%e3%83%b3%ef%bc%88%e7%84%bc%e5%8d%b4%ef%bc%89%e3%81%a8%e3%83%9e%e3%82%a4%e3%83%8b%e3%83%b3%e3%82%b0%e3%81%ab%e3%81%a4%e3%81%84%e3%81%a6/"
                     className="new-entry-card-link widget-entry-card-link a-wrap" title={props.intl.formatMessage({id: 'str.item.news.first'})}>
                      <div className="new-entry-card widget-entry-card e-card cf">
                          <figure className="new-entry-card-thumb widget-entry-card-thumb card-thumb">
                              <img
                                  src={require('../../assets/img/logo-rabtto-120x68.png')} alt=""
                                  className="no-image new-entry-card-thumb-no-image widget-entry-card-thumb-no-image" width="150"
                                  height="68"/>
                          </figure>
                          <div className="new-entry-card-content widget-entry-card-content card-content">
                              <div className="new-entry-card-title widget-entry-card-title card-title">
                                  {props.intl.formatMessage({id: 'str.item.news.first'})}
                              </div>
                              <div className="new-entry-card-date widget-entry-card-date display-none"><span
                                  className="new-entry-card-post-date widget-entry-card-post-date post-date">2022.03.24</span>
                              </div>
                          </div>
                      </div>
                  </a>
                  <a href="https://rabbitmember.com/2022/03/24/%e6%96%b0%e3%81%97%e3%81%84%e6%96%b9%e3%80%85%e3%82%82%e5%a2%97%e3%81%88%e3%81%a6%e6%9d%a5%e3%82%89%e3%82%8c%e3%81%be%e3%81%97%e3%81%9f%e3%81%ae%e3%81%a7%e3%80%81%e4%bb%8a%e4%b8%80%e5%ba%a6%e3%83%a9/"
                     className="new-entry-card-link widget-entry-card-link a-wrap"
                     title={props.intl.formatMessage({id: 'str.item.news.second'})}>
                      <div className="new-entry-card widget-entry-card e-card cf">
                          <figure className="new-entry-card-thumb widget-entry-card-thumb card-thumb">
                              <img
                                  src={require('../../assets/img/logo-rabtto-120x68.png')} alt=""
                                  className="no-image new-entry-card-thumb-no-image widget-entry-card-thumb-no-image" width="120"
                                  height="68"/>
                          </figure>
                          <div className="new-entry-card-content widget-entry-card-content card-content">
                              <div
                                  className="new-entry-card-title widget-entry-card-title card-title">{props.intl.formatMessage({id: 'str.item.news.second'})}
                              </div>
                              <div className="new-entry-card-date widget-entry-card-date display-none">
                    <span
                        className="new-entry-card-post-date widget-entry-card-post-date post-date">2022.03.24
                    </span>
                              </div>
                          </div>
                      </div>
                  </a>
                  <a href="https://rabbitmember.com/2022/03/20/%e3%83%a9%e3%83%93%e3%83%83%e3%83%88%e3%82%b3%e3%82%a4%e3%83%b3%e3%82%b3%e3%83%9f%e3%83%a5%e3%83%8b%e3%83%86%e3%82%a3%e3%82%92%e5%ae%88%e3%82%8b%e3%81%9f%e3%82%81%e3%81%ab%e3%80%81%e3%80%81/"
                     className="new-entry-card-link widget-entry-card-link a-wrap" title={props.intl.formatMessage({id: 'str.item.news.third'})}>
                      <div className="new-entry-card widget-entry-card e-card cf">
                          <figure className="new-entry-card-thumb widget-entry-card-thumb card-thumb">
                              <img
                                  src={require('../../assets/img/logo-rabtto-120x68.png')} alt=""
                                  className="no-image new-entry-card-thumb-no-image widget-entry-card-thumb-no-image" width="120"
                                  height="68"/>
                          </figure>
                          <div className="new-entry-card-content widget-entry-card-content card-content">
                              <div className="new-entry-card-title widget-entry-card-title card-title">{props.intl.formatMessage({id: 'str.item.news.third'})}</div>
                              <div className="new-entry-card-date widget-entry-card-date display-none"><span
                                  className="new-entry-card-post-date widget-entry-card-post-date post-date">2022.03.20</span>
                              </div>
                          </div>
                      </div>
                  </a>
              </div>
          </div>

          <p style={{textAlign: 'center'}}>
            <span style={{fontSize: '24px', color: '#ff00ff'}}>
                <strong>
                    H
                    <span style={{color: '#00ff00'}}>B</span>
                    Y
                    <span style={{color: '#ff6600'}}>うさぎ</span>
                    倶
                    <span style={{color: '#ff0000'}}>楽</span>
                    部へ
                    <span style={{color: '#ff9900'}}>よ</span>
                    う
                    <span style={{color: '#ff0000'}}>こ</span>
                    そ！
                </strong>
            </span>
          </p>
          <div className="p1 danger-box" style={{textAlign: 'center'}}>
              <span className="s1">0021</span>
              <span className="s2">　{props.intl.formatMessage({id: 'str.item.asakusa'})}</span>
              <span className="s1">HBY</span>
          </div>
      </div>

      <div className={"pt-4 pb-20 bg-home-theme body"}>
          <div className={"flex justify-center pt-16 sm:px-8 md:mx-32 lg:mx-64"}>
              <a target="_blank"
                 href={"https://rabbitmember.com/usagi-10minute/"}
                 className={"flex items-center justify-center bg-yellow btn-secondary-round h-75px text-white text-xl cursor-pointer"}
                 style={{width: 550}}>
                  <span className={"lg:mr-8"}>{props.intl.formatMessage({id: 'str.item.explain.rabbit.club'})}</span>
                  <img alt="" src={require('../../assets/images/circle_arrow_blue.png')}/>
              </a>
          </div>
          <div className={"flex justify-center pt-16 sm:px-8 md:mx-32 lg:mx-64"}>
              <span className={"mr-8"}>{props.intl.formatMessage({id: 'str.item.campaign.offer'})}</span>
          </div>
          <div className={"flex justify-center pt-16 sm:px-8 md:mx-32 lg:mx-64"}>
              <a target="_blank"
                 href={"https://rabbitmember.com/faq/"}
                 className={"flex items-center justify-center bg-yellow btn-secondary-round h-75px text-white text-xl cursor-pointer"}
                 style={{width: 550}}>
                  <span className={"lg:mr-8"}>{props.intl.formatMessage({id: 'str.item.faq'})}</span>
                  <img alt="" src={require('../../assets/images/circle_arrow_blue.png')}/>
              </a>
          </div>
          <div className={"flex justify-center pt-16 sm:px-8 md:mx-32 lg:mx-64"}>
              <a target="_blank"
                 href={"https://rabbitmember.com/member-apps/"}
                 className={"flex items-center justify-center bg-yellow btn-secondary-round h-75px text-white text-xl cursor-pointer"}
                 style={{width: 550}}>
                  <span className={"lg:mr-8"}>{props.intl.formatMessage({id: 'str.item.explain.rabbit'})}</span>
                  <img alt="" src={require('../../assets/images/circle_arrow_blue.png')}/>
              </a>
          </div>
          <div className={"flex justify-center pt-16 sm:px-8 md:mx-32 lg:mx-64"}>
              <a target="_blank"
                 href={"https://rabbitmember.com/che-kaisetu/"}
                 className={"flex items-center justify-center bg-yellow btn-secondary-round h-75px text-white text-xl cursor-pointer"}
                 style={{width: 550}}>
                  <span className={"lg:mr-8"}>{props.intl.formatMessage({id: 'str.item.mining.che'})}</span>
                  <img alt="" src={require('../../assets/images/circle_arrow_blue.png')}/>
              </a>
          </div>
      </div>
      <div className={"pt-4 lg:pb-20 sm:px-0 md:px-8 lg:px-30 xl:px-56 bg-yellow-light"}>
          <div className={"lg:px-32 lg:pb-12"}>
              <div className={"flex items-center justify-center lg:m-10"}>
                  <span className={"blue-color text-3xl font-bold"}>{props.intl.formatMessage({id: 'str.item.new.register'})}</span>
              </div>
              <Card className={"flex items-center justify-center"}>
                  <Form
                      ref={formRef}
                      onFinish={onFinish}
                      initialValues={initFormValue}
                  >
                      <Col className={"lg:ml-20"} style={{marginBottom: '2rem'}}>
                          <div className={"flex items-center mt-2"}>
                              <span className={"text-base"}>{props.intl.formatMessage({id: 'str.item.register.step1'})}</span>
                          </div>
                      </Col>
                      {/*氏名*/}
                      <FormInput
                          label={props.intl.formatMessage({id: 'form.item.name'})}
                          name={"name"}
                          placeholder={props.intl.formatMessage({id: 'form.item.name.confirm'})}
                          intl={props.intl}
                          required={true}
                          readOnly={false}
                      />
                      <Col className={"lg:ml-20"} style={{marginBottom: '2rem'}}>
                          <div className={"flex items-center mt-2"}>
                              <span className={"text-base"}>{props.intl.formatMessage({id: 'str.item.register.step2'})}</span>
                          </div>
                      </Col>
                      {/*メールアドレス*/}
                      <Fragment>
                          <div>
                              <FormLabel label={props.intl.formatMessage({id: 'form.item.email'})} required={true}/>
                              <Col lg={16} className={"p-0 lg:ml-24"} >
                                  <Form.Item
                                      name={"email"}
                                      rules={[{required: true, 
                                        type: "email",
                                        message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
                                  >
                                      <Input size={"large"} type={"email"} placeholder={props.intl.formatMessage({id: 'form.item.email.confirm'})}/>
                                  </Form.Item>
                              </Col>
                          </div>
                      </Fragment>
                      <Col className={"lg:ml-20"} style={{marginBottom: '2rem'}}>
                          <div className={"flex items-center mt-2"}>
                              <span className={"text-base"}>{props.intl.formatMessage({id: 'str.item.register.step3'})}</span>
                          </div>
                      </Col>
                      <FormInput
                          label={props.intl.formatMessage({id: 'form.item.coin.address'})}
                          name={"account"}
                          placeholder=""
                          intl={props.intl}
                          required={true}
                          readOnl={false}
                      />
                      <Col className={"lg:ml-20"} style={{marginBottom: '2rem'}}>
                          <div className={"flex items-center mt-2"}>
                              <span className={"text-base"}>
                                <a href= "https://rabbitmember.com/token-pocket-kaisetu/" target="_blank" >{props.intl.formatMessage({id: 'str.item.link.tokenpoket'})}</a>
                              </span>
                          </div>
                      </Col>
                      <Col className={"lg:ml-20"} style={{marginBottom: '2rem'}}>
                          <div className={"flex items-center mt-2"}>
                              <span className={"text-base"}>{props.intl.formatMessage({id: 'str.item.register.step4'})}</span>
                          </div>
                      </Col>
                      {/*紹介者*/}
                      <Fragment>
                          <div>
                              <FormLabel label={props.intl.formatMessage({id: 'form.item.introduce.name'})}/>
                              <Col lg={16} className={"p-0 lg:ml-24"} >
                                  <Form.Item
                                      name={"referEmail"}
                                      rules={[{required: false, 
                                        type: "email",
                                        message: props.intl.formatMessage({id: 'alert.fieldReferEmailConfirm'})}]}
                                    //   rules={[
                                    //       ({getFieldValue}) => ({
                                    //           validator(_, value) {
                                    //               if(validation.isEmpty(value)) {
                                    //                   console.log('#############')
                                    //                 return Promise.resolve()
                                    //               }
                                    //               if (getFieldValue("email") == value) {
                                    //                 console.log('@@@@@@@@@@@')
                                    //                   return Promise.reject(new Error(props.intl.formatMessage({id: 'alert.fieldReferEmailDuplicate'})))
                                    //               }
                                    //               if(validation.isEmail(value)) {
                                    //                 console.log('!!!!!!!!!!')
                                    //                 return Promise.resolve()  
                                    //               }
                                    //               else {
                                    //                 console.log('&&&&&&&&&&&&')
                                    //                 return Promise.reject(new Error(props.intl.formatMessage({id: 'alert.fieldReferEmailConfirm'})))
                                    //               }
                                    //               //return Promise.resolve()
                                    //           }
                                    //       })
                                    //   ]}
                                  >
                                      <Input size={"large"} type={"email"} placeholder={props.intl.formatMessage({id: 'form.item.name.confirm'})}/>
                                  </Form.Item>
                              </Col>
                          </div>
                      </Fragment>
                      <Fragment>
                          <div>
                              <FormLabel label={props.intl.formatMessage({id: 'form.item.introduce.date'})} required={true}/>
                              <Col lg={16} className={"p-0 lg:ml-24"} >
                                  <Form.Item
                                      name={"createdAt"}
                                      rules={[{required: true, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
                                  >
                                      <Input type={"date"} size={"large"} placeholder={props.placeholder} readOnly={props.readOnly}/>
                                  </Form.Item>
                              </Col>
                          </div>
                      </Fragment>

                      <Col className={"lg:ml-24"}>
                          <div className={"flex items-center mt-5 mb-5"}>
                              <img alt="" src={require('../../assets/images/require.png')}/>
                              <div className={"ml-3"}>
                                  <Checkbox onChange={onChangeInputConfirm}>
                                      <span className={"text-base ml-1"}>{props.intl.formatMessage({id: 'str.item.policy.confirm'})}</span>
                                  </Checkbox>
                              </div>
                          </div>
                          <div className={"flex items-center mb-5"}>
                                  <span className={"text-base whitespace-no-wrap"}>
                                    <a href= "https://rabbitmember.com/terms-of-service/" target="_blank" >{props.intl.formatMessage({id: 'str.item.policy'})}</a>
                                  </span>
                          </div>
                      </Col>
                      <div className={"flex items-center justify-center"}>
                          <Col className={"lg:ml-8"}>
                              <button
                                  type="submit"
                                  disabled={!isConfirm}
                                  className={"flex items-center justify-center btn-secondary-semi-round text-yellow text-lg"}
                                  style={{width: 315, height: 55}}
                              >
                                  <span>{props.intl.formatMessage({id: 'btn.send'})}</span>
                              </button>
                          </Col>
                      </div>
                  </Form>
              </Card>
          </div>
      </div>
    </Fragment>
  )
}
