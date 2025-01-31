import React from 'react';
import {PageConstant} from "../constants/PageConstant";
import {Register, RegisterCompany, ActivateEmail} from '../pages/Register';
import {Login, Logout} from '../pages/Login';
import Home from '../pages/home';
import {Error404} from '../pages/common';

const routes = [
  {path: PageConstant.HOME, component: Home, isPrivate: false},
  {path: PageConstant.LOGIN, component: Login, isPrivate: false},
  // {path: PageConstant.MAIN, component: Main, isPrivate: false},
  {path: PageConstant.SIGNUP, component: Register, isPrivate: false},
  {path: PageConstant.SIGNUP_COMPANY, component: RegisterCompany, isPrivate: false},
  {path: PageConstant.ACTIVATE_EMAIL, component: ActivateEmail, isPrivate: false},
  {path: PageConstant._404, component: Error404, isPrivate: false},
];

export default routes;
