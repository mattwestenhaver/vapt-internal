export function getProjects(projects) {
  return {
    type: "GET_PROJECTS",
    payload: projects
  }
}

export function addProject(project) {
  return {
    type: "ADD_PROJECT",
    payload: project
  }
}