import jwtDecode from 'jwt-decode'

export default function reducer(state={
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null
}, action) {

if(action.type === "USER_LOGIN") {
  return { 
    ...state, user: action.payload 
  }  
} else if (action.type === "USER_LOGOUT") {
  return {
    ...state, user: null 
  }
} else {
  return state
}

}