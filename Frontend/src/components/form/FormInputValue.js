import React, {Fragment} from 'react';
import {Col, Form, Input, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormInputValue = (props) => {
  return (
    <Fragment>
      <Row>
        <FormLabel label={props.label} required={props.required}/>
        <Col span={12}>
          <div className={"text-base mt-2 ml-2"}>
            <span>{props.value}</span>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}
