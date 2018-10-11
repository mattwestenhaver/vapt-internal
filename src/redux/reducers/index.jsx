import { combineReducers } from 'redux'

import history from './historyReducer'
import user from './userReducer'
import projects from './projectReducer'

export default combineReducers({
  history,
  user,
  projects
})