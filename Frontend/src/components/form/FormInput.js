import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormInput = (props) => {
  return (
    <Fragment>
      <div>
        <FormLabel label={props.label} required={props.required}/>
        <Col lg={16} className={"p-0 lg:ml-24"} >
          <Form.Item
            name={props.name}
            rules={[{required: props.required, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
          >
            <Input style={{padding:'6px'}} size={"large"} placeholder={props.placeholder} readOnly={props.readOnly}/>
          </Form.Item>
        </Col>
      </div>
    </Fragment>
  )
}
