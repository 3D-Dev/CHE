import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AddAgency, Agencies, EditAgency } from './admin/agencies'
import { AddCustomer, Customers, EditCustomer } from './admin/customers'
import { Dashboard } from './admin/dashboard'
import { Maintenance } from './admin/maintenance'
import { EditEmployee, Employees, NewEmployee } from './admin/employees'
import {
  BatchOutput,
  CCPReport,
  ContentsOutput,
  EmployeeHealthManagement,
  GeneralHygieneReport,
  TemperatureReport
} from './admin/contentOutput'
import { CCPRecords, GeneralHygieneRecords, HealthCareRecords, TemperatureRecords, RushRecords } from './admin/menu'
import { RushReport } from './admin/rushManagment'
import { EditImportantManagement, ImportantManagements, NewImportantManagement } from './admin/importantManagements'
import { EditManagementDevice, ManagementDevices, NewManagementDevice } from './admin/managementDevices'
import { EditImportantCategory, ImportantCategories, NewImportantCategory } from './admin/importantCategories'
import { GeneralHygieneManagement } from './admin/generalHygieneManagement'

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
      <Route exact path={`${match.url}admin/customers`} component={Customers}/>
      <Route exact path={`${match.url}admin/customer/add`} component={AddCustomer}/>
      <Route exact path={`${match.url}admin/customer/edit/~:id`} component={EditCustomer}/>
      <Route exact path={`${match.url}admin/maintenance`} component={Maintenance}/>
      <Route exact path={`${match.url}admin/employees`} component={Employees}/>
      <Route exact path={`${match.url}admin/health_management_records`} component={HealthCareRecords}/>
      <Route exact path={`${match.url}admin/employees/add`} component={NewEmployee}/>
      <Route exact path={`${match.url}admin/employees/edit/~:id`} component={EditEmployee}/>
      <Route exact path={`${match.url}admin/ccp_records`} component={CCPRecords}/>
      <Route exact path={`${match.url}admin/general_hygiene_records`} component={GeneralHygieneRecords}/>
      <Route exact path={`${match.url}admin/temperature_records`} component={TemperatureRecords}/>
      <Route exact path={`${match.url}admin/rush_records`} component={RushRecords}/>
      <Route exact path={`${match.url}admin/rush_report/~:id`} component={RushReport}/>
      <Route exact path={`${match.url}admin/contents_output`} component={ContentsOutput}/>
      <Route exact path={`${match.url}admin/contents_output/employee_health_management`}
             component={EmployeeHealthManagement}/>
      <Route exact path={`${match.url}admin/contents_output/general_hygiene_report`} component={GeneralHygieneReport}/>
      <Route exact path={`${match.url}admin/contents_output/ccp_report`} component={CCPReport}/>
      <Route exact path={`${match.url}admin/contents_output/temperature_report`} component={TemperatureReport}/>
      <Route exact path={`${match.url}admin/contents_output/batch_output`} component={BatchOutput}/>
      <Route exact path={`${match.url}admin/general_hygiene_management`} component={GeneralHygieneManagement}/>
      <Route exact path={`${match.url}admin/important_managements`} component={ImportantManagements}/>
      <Route exact path={`${match.url}admin/important_managements/add`} component={NewImportantManagement}/>
      <Route exact path={`${match.url}admin/important_managements/edit/~:id`} component={EditImportantManagement}/>
      <Route exact path={`${match.url}admin/important_categories`} component={ImportantCategories}/>
      <Route exact path={`${match.url}admin/important_categories/add`} component={NewImportantCategory}/>
      <Route exact path={`${match.url}admin/important_categories/edit/~:id`} component={EditImportantCategory}/>
      <Route exact path={`${match.url}admin/management_devices`} component={ManagementDevices}/>
      <Route exact path={`${match.url}admin/management_devices/add`} component={NewManagementDevice}/>
      <Route exact path={`${match.url}admin/management_devices/edit/~:id`} component={EditManagementDevice}/>
    </Switch>
  </div>
)

export default AppRoute
