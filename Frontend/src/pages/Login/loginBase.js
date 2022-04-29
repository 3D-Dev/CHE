import React, {Fragment, useState} from 'react';
import {Checkbox, Form, Input} from "antd";
import {injectIntl} from 'react-intl'
import {Link, useHistory} from "react-router-dom";
import {useAuthDispatch, useAuthState} from "../../context";
import {PageConstant} from "../../constants/PageConstant";
import {StaticAlert} from "../../components/Alert/StaticAlert";
import {login} from "../../api/axiosAPIs";
import _ from "lodash";
import {updateProfile} from "../../helper/utils";


function LoginBase(props) {
  let history = useHistory();
  const dispatch = useAuthDispatch()
  const {loading,} = useAuthState()
  const [remember, setRemember] = useState(false);

  const changeRemember = (e) => {
    setRemember(e.target.checked)
  }

  const onFinish = async (data) => {
    let formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    let response = {}
    try {
      response = await login(formData)
      if (response.status === 200) {
        console.log('Login Success!!!', response.data)
        updateProfile(dispatch, response.data, remember)
        history.push(PageConstant.HOME)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      {
        props.logout && (
          <StaticAlert content={"ログアウトしました"}/>
        )
      }
      <div className={"md:px-32 md:pb-12 md:pt-12 xl:px-100 lg:px-100 lg:pb-32 lg:pt-32 bg-yellow-light"}>
        <div className="bg-white lg:mx-auto" style={{width: '100%', borderRadius: 20, overflow: 'hidden'}}>
          <div className={"flex items-center justify-center bg-yellow"} style={{height: 75}}>
            <span className={"text-xl text-blue font-bold"}>ログイン</span>
          </div>
          <Form
            style={{padding: 35}}
            onFinish={onFinish}
          >
            {/*ID（メールアドレス）*/}
            <div className={"mb-2"}>
              <span className={"font-bold text-sm"}>ID（メールアドレス）</span>
            </div>
            <Form.Item
              name={"email"}
              rules={[{required: true, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
            >
              <Input placeholder={"メールアドレスを入力"} style={{height: 45}}/>
            </Form.Item>
            {/*パスワード*/}
            <div className={"mb-2"}>
              <span className={"font-bold text-sm"}>パスワード</span>
            </div>
            <Form.Item
              name={"password"}
              rules={[{required: true, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
            >
              <Input.Password placeholder={"パスワードを入力"} style={{height: 45}}/>
            </Form.Item>
            <div className={"flex justify-center "}>
              <Form.Item>
                <Checkbox onChange={changeRemember}>
                  <span className={"ml-1"}>ログイン状態を保持する</span>
                </Checkbox>
              </Form.Item>
            </div>
            <div className={"flex justify-center"}>
              <button
                type="submit"
                className={"flex items-center justify-center bg-blue btn-primary-semi-round text-white text-lg"}
                style={{width: 315, height: 55}}
              >
                <span>ログイン</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  )
}

export default injectIntl(LoginBase)