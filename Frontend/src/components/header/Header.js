import React, { useEffect } from 'react'
import i18next from 'i18next'
import {Link} from 'react-router-dom';
import {PageConstant} from "../../constants/PageConstant";

export const Header = (props) => {

    const onClickNavMenu = (e) => {
        e.preventDefault()
        document.getElementById("nav-content").classList.toggle("hidden")
    }


  return (
          <nav className="flex items-center justify-between flex-wrap p-6" style={{background: '#ffffff'}}>
              <div className="flex items-center flex-no-shrink text-black mr-6">
                <span className="font-semibold text-xl tracking-tight" style={{color: '#ff00ff'}}>
                    <strong>
                        <span style={{color: '#ff0000'}}>H</span>
                        <span style={{color: '#ff0000'}}>B</span>
                        <span style={{color: '#ff99cc'}}>Y</span>
                        <span style={{color: '#00ff00'}}>&</span>
                        <span style={{color: '#ff0000'}}>C</span>H
                        <span style={{color: '#ff0000'}}>E</span>&nbsp;
                        <span style={{color: '#ff0000'}}>C</span>O
                        <span style={{color: '#ff99cc'}}>I</span>N
                    </strong>
                </span>
              </div>
              <div className="block lg:hidden">
                  <button
                      className="flex items-center px-3 py-2 border rounded text-lighter border-light hover:text-grey hover:border-grey"
                      onClick={onClickNavMenu}>
                      <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{stroke:"black", fill:"black"}}><title>Menu</title>
                          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                      </svg>
                  </button>
              </div>
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden" id="nav-content">
                  <div className="text-sm md:flex lg:flex">
                      {/*{languages.map(({ code, name, country_code }) => (*/}
                          <a href="#responsive-header"
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                             onClick={() => {
                                 i18next.changeLanguage('en')
                             }}
                          >
                              <img src={require("../../assets/img/en.png")} height="24" width="24" alt="EN" />
                              <span className="pl-2">EN</span>
                          </a>

                          <a href="#responsive-header"
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                             onClick={() => {
                                 i18next.changeLanguage('id')
                             }}
                          >
                              <img src={require("../../assets/img/id.png")} height="24" width="24" alt="ID" />
                              <span className="pl-2">ID</span>
                          </a>
                          <a href="#responsive-header"
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                             onClick={() => {
                                 i18next.changeLanguage('ja')
                             }}
                          >
                              <img src={require("../../assets/img/ja.png")} height="24" width="24" alt="JA" />
                              <span className="pl-2">JA</span>
                          </a>

                          <a href="#responsive-header"
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                             onClick={() => {
                                 i18next.changeLanguage('vi')
                             }}
                          >
                              <img src={require("../../assets/img/vi.png")} height="24" width="24" alt="VI" />
                              <span className="pl-2">VI</span>
                          </a>
                          <a href={PageConstant.HOME}
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                          >
                              <span className="pl-2">ホーム</span>
                          </a>
                          <a href={PageConstant.LOGIN}
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                          >
                              <span className="pl-2">ログイン</span>
                          </a>
                          <a href={PageConstant.SIGNUP_COMPANY}
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                          >
                              <span className="pl-2">会員登録</span>
                          </a>
                          {/* <a href={PageConstant.SIGNUP}
                             className="mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4" style={{display: "flex"}}
                          >
                              <span className="pl-2">ユーザー登録</span>
                          </a> */}
                  </div>

              </div>
          </nav>
  )
}
