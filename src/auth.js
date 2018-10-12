import axios from 'axios'
import jwtDecode from 'jwt-decode'

class AuthClient {

  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: {
        common: {
          token: this.getToken()
        }
      }
    })
  }

  loadAWS() {
    return this.request({ method: "GET", url: "/aws" })
      .then(response => {
        return response
      })
  }

  loadPath(dir) {
    return this.request({ method: "GET", url: `/aws/n?dir=${dir}`})
      .then(response => {
        return response.data
      })
  }

  getCurrentUser() {
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }

  getToken() {
    // retrieve the token from localStorage
    return localStorage.getItem('token')
  }

  setToken(token) {
    // save the token to localStorage
    localStorage.setItem('token', token)
    // tell axios to always include the token in headers:
    this.request.defaults.headers.common.token = token
    return token
  }

  clearToken() {
    // remove the token from localStorage
    localStorage.removeItem('token')
    // tell axios to stop sending requests with the token
    delete this.request.defaults.headers.common.token
  }

  login(credentials) {
    return this.request({ method: "POST", url: '/users/authenticate', data: credentials })
      .then(response => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token)
        } else {
          return false
        }
      })
  }

  getProjects() {
    return this.request({ method: "GET", url: '/projects' })
      .then(response => {
        if(response.data.success) {
          return response.data.projects
        } else {
          return false
        }
      })
  }

  newProject(projectData) {
    return this.request({ method: "POST", url: "/projects", data: projectData})
      .then(response => {
        if(response.data.success) {
          return true
        } else {
          return false
        }
      })
  } 
  
}

export default new AuthClient()
