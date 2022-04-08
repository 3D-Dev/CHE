import React, {Fragment} from 'react';

export const GoogleSheet = (props) => {
  return (
    <Fragment>
      {
        props.url && (
          <div className={"relative w-full"} style={{overflow: 'hidden', height: 500}}>
                <iframe className={"absolute"} style={{width: 2000, height: 500, left: -1}}
                        src={props.url + "?chrome=false&amp;headers=false&amp;widget=false&amp;dummy=" + Math.random()}>
                </iframe>
          </div>
        )
      }
    </Fragment>
  )
}
