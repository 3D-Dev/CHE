import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

const {TextArea} = Input;

export const FormTextArea = (props) => {
  return (
    <Fragment>
      <Row>
        <FormLabel label={props.label} required={props.required}/>
        <Col span={12}>
          <Form.Item
            name={props.name}
            rules={[{required: props.required, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
          >
            <TextArea autoSize={{minRows: 2, maxRows: 2}} placeholder={props.placeholder}/>
          </Form.Item>
        </Col>
      </Row>
    </Fragment>
  )
}
