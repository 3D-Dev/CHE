import React, {Fragment} from 'react';
import {Top} from "../../components/home/Top";
import {useAuthState} from "../../context";
import {injectIntl} from "react-intl";

const Home = (props) => {
  const {profile} = useAuthState();

  return (
    <Fragment>
      <div className="App">
        {
            <Top intl={props.intl}/>
        }
      </div>
    </Fragment>
  )
}

export default injectIntl(Home)