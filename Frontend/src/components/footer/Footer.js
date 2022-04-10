import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import {PageConstant} from "../../constants/PageConstant";

const LinkSpan = styled.span`
  font-size: 15px;
  color: white;
`
const CopyrightSpan = styled.span`
  font-size: 13px;
  color: white;
`

export const Footer = () => {
  return (
    <div className={"bg-yellow"}>
      <div>
        <img alt="" src={require('../../assets/images/footer_seperate.png')}/>
      </div>

      <div className="lg:px-32 lg: pt-8">
          <div className="text-center">
              <a target="_blank" href="https://rabbitmember.com/" className="lg:mx-10 p-2" >
                  <LinkSpan>運営会社</LinkSpan>
              </a>
              <a target="_blank" href="https://rabbitmember.com/terms-of-service/" className="lg:mx-10 p-2">
                  <LinkSpan>利用規約</LinkSpan>
              </a>
              <a target="_blank" href="https://rabbitmember.com/faq/" className="lg:mx-10 p-2">
                  <LinkSpan>よくある質問</LinkSpan>
              </a>
          </div>
      </div>

      <div className="text-center pt-2 pb-8">
        <CopyrightSpan>© 2022 Rabbit member.</CopyrightSpan>
      </div>
    </div>
  )
}
