import type { LoginResponse } from "@/views/pages/auth/actions/LoginUser"

export default function verifyToken() {

  const userData=getUserData()
  if(typeof userData?.token==='undefined'){
    window.location.href='/'
  }

  const config = {
    headers: {
      Accept: 'application/json', //content accept by the app
      'Content-Type': 'application/json', //content send to the server
      Authorization: `Bearer ${userData?.token}`
    }
  }
  return config
}

export function getUserData() {
  const userData = localStorage.getItem('userData')
  try {
    if (userData != null) {
     const loginData:LoginResponse= JSON.parse(userData)
     return loginData
    }
  } catch (error) {
    console.log(error)
  }
}
