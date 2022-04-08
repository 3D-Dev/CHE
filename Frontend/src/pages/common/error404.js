import React, {Fragment} from 'react';
import {injectIntl} from "react-intl";

const Error404 = () => {
  return (
    <Fragment>
      <div>
        <h1 className={"flex text-gray-700 font-bold text-6xl items-center justify-center"}>404</h1>
      </div>
    </Fragment>
  )
}

export default injectIntl(Error404)