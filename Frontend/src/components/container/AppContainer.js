import React, {Fragment, useEffect} from 'react';
import {Switch, useLocation} from "react-router-dom";
import {Header} from "../header/Header";
import routes from "../../config/routes";
import AppRoute from "../route/AppRoute";
import {Footer} from "../footer/Footer";
import {Spin} from "antd";
import {useAuthState} from "../../context";

export const AppContainer = (props) => {
  const {loading} = useAuthState();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Fragment>
      <Spin spinning={loading} size="large">
        <Header/>
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
        <Footer/>
      </Spin>
    </Fragment>
  )
}
