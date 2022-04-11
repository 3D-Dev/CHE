import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AddAgency, Agencies, EditAgency } from './admin/agencies'
import { Dashboard } from './admin/dashboard'


const AppRoute = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}admin/dashboard`} component={Dashboard}/>
      <Route exact path={`${match.url}/`} component={Agencies}/>
      <Route exact path={`${match.url}admin/agencies`} component={Agencies}/>
      <Route exact path={`${match.url}admin/agencies/add`} component={AddAgency}/>
      <Route exact path={`${match.url}admin/agencies/edit/~:id`} component={EditAgency}/>
      <Route exact path={`${match.url}admin/home`} component={Agencies}/>
      <Route exact path={`${match.url}admin/stores`} component={Agencies}/>
    </Switch>
  </div>
)

export default AppRoute
