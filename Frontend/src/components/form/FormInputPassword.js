import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormInputPassword = (props) => {

  const isKanjiKana = (data) => {
    return !!data.match(/[\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]/);
  }

  return (
    <Fragment>
      <div>
        <FormLabel label={props.label} required={props.required}/>
        <Col lg={16} className={"p-0 lg:ml-24"} >
          <Form.Item
            name={props.name}
            rules={[
              {required: props.required, message: props.intl.formatMessage({id: 'alert.fieldRequired'})},
              {min: 6, message: props.intl.formatMessage({id: 'alert.min.length.Required'})},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (isKanjiKana(value)) {
                    return Promise.reject(new Error(props.intl.formatMessage({id: 'alert.fieldJapaneseCode'})))
                  }
                  return Promise.resolve()
                }
              })
            ]}
            hasFeedback
          >
            <Input.Password size={"large"} placeholder={props.placeholder}/>
          </Form.Item>
        </Col>
      </div>
    </Fragment>
  )
}
