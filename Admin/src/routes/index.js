import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AddUser, Users, EditUser } from './admin/users'
import { Dashboard } from './admin/dashboard'


const AppRoute = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}admin/dashboard`} component={Dashboard}/>
      <Route exact path={`${match.url}/`} component={Users}/>
      <Route exact path={`${match.url}admin/users`} component={Users}/>
      <Route exact path={`${match.url}admin/users/add`} component={AddUser}/>
      <Route exact path={`${match.url}admin/users/edit/~:id`} component={EditUser}/>
      <Route exact path={`${match.url}admin/home`} component={Users}/>
      <Route exact path={`${match.url}admin/stores`} component={Users}/>
    </Switch>
  </div>
)

export default AppRoute
