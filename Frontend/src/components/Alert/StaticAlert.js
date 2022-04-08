import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

export const StaticAlert = (props) => {
  return (
    <Fragment>
      <div className={"flex items-center justify-center"} style={{height: 60, background: '#3F75A0'}}>
        <span className={"text-lg text-white font-bold"}>{props.content}</span>
      </div>
    </Fragment>
  )
}
