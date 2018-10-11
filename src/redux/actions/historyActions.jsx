export function goBack() {
  return {
    type: "GO_BACK"
  }
}

export function goForwards(page) {
  return {
    type: "GO_FORWARDS",
    payload: page
  }
}

export function clearHistory() {
  return {
    type: "CLEAR_HISTORY"
  }
}