import React from 'react'
import { Button, Card, Form, Input, Spin } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import _ from 'lodash'

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
    md: {span: 4},
    lg: {span: 4}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
    md: {span: 24},
    lg: {span: 24}
  }
}

class UserItem extends React.Component {
  formRef = React.createRef()

  onFinish = (values) => {
    const {isAdd} = this.props
    if (isAdd) {
      this.props.submitAddInfo(values)
    } else if (!isAdd) {
      this.props.submitEditInfo(values)
    }
  }

  onChangeData = () => {
    const {isAdd, row} = this.props
    if (!isAdd && this.formRef && this.formRef.current) {
      this.formRef.current.setFieldsValue(row)
    }
  }

  onClickCancelButton = (e) => {
    e.preventDefault()
    this.props.handleCancelBtn()
  }

  render() {
    const {intl, loader, isAdd, row} = this.props
    this.onChangeData()
    return (
      <Card className="gx-card">
        <Spin spinning={loader} size="large">
          <Form
            {...formItemLayout}
            onFinish={this.onFinish}
            ref={this.formRef}
          >
            <Form.Item
              label={intl.formatMessage({id: 'form.item.user.name'})}
              name="name"
              initialValue={isAdd ? '' : !_.isEmpty(row.name) ? row.name : ''}
              rules={[{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({id: 'form.item.staff.mailAddress'})}
              initialValue={isAdd ? '' : !_.isEmpty(row.address) ? row.address : ''}
              name="representative_email"
              rules={[{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({id: 'form.item.pass'})}
              name="password"
              rules={[{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]}
              hasFeedback
            >
              <Input type={'password'}/>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({id: 'form.item.passConfirm'})}
              name="password_confirm"
              dependencies={['password']}
              rules={[{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})},
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(intl.formatMessage({id: 'alert.fieldPasswordConfirm'})))
                  }
                })
              ]}
              hasFeedback
            >
              <Input type={'password'}/>
            </Form.Item>

            <div align="right">
              <Button type="primary gx-btn-rounded-blue gx-width-100" htmlType="submit">
                <FormattedMessage id={isAdd ? 'btn.register' : 'btn.update'}/>
              </Button>
              <Button type="primary gx-btn-rounded-blue gx-width-100" onClick={this.onClickCancelButton}>
                <FormattedMessage id="btn.cancel"/>
              </Button>
            </div>
          </Form>
        </Spin>
      </Card>
    )
  }
}


export default injectIntl(UserItem)