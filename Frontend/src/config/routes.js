import React from 'react';
import {PageConstant} from "../constants/PageConstant";
import Home from '../pages/home';
import {Error404} from '../pages/common';

const routes = [
  {path: PageConstant.HOME, component: Home, isPrivate: false},
  {path: PageConstant._404, component: Error404, isPrivate: false},
];

export default routes;
