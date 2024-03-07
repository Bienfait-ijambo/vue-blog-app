
type AppURLType = {
  developpement: {
    baseURL: string
    apiURL: string
  }
  production: {
    baseURL: string
    apiURL: string
  }
}

type ApiType = {
  apiStatus:keyof AppURLType
} & AppURLType

const api: ApiType = {

  //change here when you shift to production
  apiStatus: 'developpement',

  developpement: {
    baseURL: 'http://127.0.0.1:8000',
    apiURL: 'http://127.0.0.1:8000/api'
  },
  production: {
    baseURL: '',
    apiURL: ''
  }
}

export const APP = api.apiStatus === 'developpement' ? api.developpement : api.production
