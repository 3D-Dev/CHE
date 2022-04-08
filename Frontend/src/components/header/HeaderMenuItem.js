import React, {Fragment} from 'react';
import {useHistory} from "react-router-dom";

export const HeaderMenuItem = (props) => {
  let history = useHistory();
  const onClick = () => {
    history.push(props.url, {cache: Math.random().toString()})
  }
  return (
    <Fragment>
      <div className={"w-1/3 cursor-pointer"} onClick={onClick}>
        <div className={"flex items-center justify-center"}>
          {
            props.lockImage && (
              <img alt="" className={"mr-2"} src={props.lockImage}/>
            )
          }
          <img alt="" src={props.image}/>
        </div>
      </div>
    </Fragment>
  )
}
