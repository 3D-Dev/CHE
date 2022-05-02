import React, {Fragment} from 'react';
import {Col} from "antd";

export const FormLabel = (props) => {

  return (
    <Fragment>
        <Col lg={3} className={"lg:ml-24"}>
        <div className={"flex items-center mt-3"}>
          {
              <div className={"-ml-12"} style={{width: 45}}/>
          }
          <span className={"text-base whitespace-no-wrap ml-2"}>{props.label}</span>
        </div>
      </Col>
    </Fragment>
  )
}
