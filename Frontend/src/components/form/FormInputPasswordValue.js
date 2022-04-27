import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormInputPasswordValue = (props) => {
  return (
    <Fragment>
      <Row>
        <FormLabel label={props.label} required={props.required}/>
        <Col span={12}>
            <Input.Password size={"large"} bordered={false} readOnly visibilityToggle={false} value={props.value} placeholder={props.placeholder}/>
        </Col>
      </Row>
    </Fragment>
  )
}
