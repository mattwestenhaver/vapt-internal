export default function reducer(state={
  projects: []
}, action) {

if(action.type === "GET_PROJECTS") {
  return { 
    ...state, projects: [...action.payload] 
  }  
} else if (action.type === "ADD_PROJECT") {
  return {
    ...state, projects: [...state, action.payload]
  }
} else {
  return state
}

}