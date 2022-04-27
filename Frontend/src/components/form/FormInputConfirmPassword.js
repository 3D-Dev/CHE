import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormInputConfirmPassword = (props) => {
  return (
    <Fragment>
      <Row>
        <FormLabel label={props.label} required={props.required}/>
        <Col span={12}>
          <Form.Item
            name={props.name}
            rules={[
              {required: props.required, message: props.intl.formatMessage({id: 'alert.fieldRequired'})},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (getFieldValue(props.dependency) === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(props.intl.formatMessage({id: 'alert.fieldPasswordConfirm'})))
                }
              })
            ]}
            hasFeedback
          >
            <Input.Password size={"large"} placeholder={props.placeholder}/>
          </Form.Item>
        </Col>
      </Row>
    </Fragment>
  )
}
