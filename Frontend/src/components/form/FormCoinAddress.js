import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormCoinAddress = (props) => {
  return (
    <Fragment>
      <Row>
        <FormLabel label={props.label} required={props.required}/>
        <Col span={12}>
          <Form.Item
            name={props.name}
            rules={[{required: true, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
          >
            <Input size={"large"} placeholder={props.placeholder} readOnly onClick={props.onHandleClick}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <div className={"pl-3 mt-1 flex items-center underline cursor-pointer"}>
            <span onClick={props.onHandleCancel}>リセット</span>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}
