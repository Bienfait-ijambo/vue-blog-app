import { APP } from '@/shared/App'
import type { IRegisterInput } from '../auth-types'


type RegisterUserResponse={
    user: IRegisterInput,
    message: string
}

export function registerUser(input: IRegisterInput):Promise<RegisterUserResponse>  {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${APP.apiURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const data:RegisterUserResponse = await res.json()

    if (!res.ok) {
      reject(data)
    }

    resolve(data) 
  })
}

