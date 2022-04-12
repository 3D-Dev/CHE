import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from './reducers/Settings'
import Progress from './reducers/Progress'
import User from './reducers/User'
import Custom from './reducers/Custom'

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  progress: Progress,
  user: User,
  custom: Custom
});
