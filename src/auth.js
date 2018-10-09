import axios from 'axios'
// import jwtDecode from 'jwt-decode'

class AuthClient {

  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/',
      // headers: {
      //   common: {
      //     token: this.getToken()
      //   }
      // }
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
  
}

export default new AuthClient()
