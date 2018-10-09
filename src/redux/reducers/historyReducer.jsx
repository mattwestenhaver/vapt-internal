export default function reducer(state={
    history: ['/']
  }, action) {
  
  if(action.type === "GO_BACK") {
    return { 
      ...state, history: [...state.history.slice(0, (state.history.length - 1))] 
    }  
  } else if (action.type === "GO_FORWARDS") {
    return {
      ...state, history: [...state.history, action.payload] 
    }
  } else {
    return state
  }

}
