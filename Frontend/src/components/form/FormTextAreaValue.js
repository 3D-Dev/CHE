import React, {Fragment} from 'react';
import {Col, Row} from "antd";
import {FormLabel} from "./FormLabel";

export const FormTextAreaValue = (props) => {
  return (
    <Fragment>
      <Row>
        <FormLabel label={props.label} required={props.required}/>
        <Col span={12}>
          <div className={"ml-2 mt-2"}
               dangerouslySetInnerHTML={{__html: props.value.replace(/(?:\r\n|\r|\n)/g, '<br>')}}>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}
