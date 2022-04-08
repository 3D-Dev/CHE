import React, {Fragment} from 'react';
import {HeaderMenuItem} from "./HeaderMenuItem";
import {PageConstant} from "../../constants/PageConstant";
import {useAuthState} from "../../context";

export const HeaderMenu = (props) => {
  const {profile} = useAuthState();
  return (
    <Fragment>
      <div className={"bg-yellow-light flex items-center justify-center h-40px"}>
      </div>
      <div className={"px-32 bg-yellow flex items-center justify-center h-75px"}>
      </div>
    </Fragment>
  )
}
