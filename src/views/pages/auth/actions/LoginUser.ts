import { APP } from "@/shared/App";
import type { ILoginUserInput } from "../auth-types";



export type LoginResponse={
    user: {
        id:number
    } & ILoginUserInput,
    token: string
    message:string
    isLogged:boolean
}

export function loginUser(input: ILoginUserInput):Promise<LoginResponse>  {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${APP.apiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const data:LoginResponse = await res.json()

    if (!res.ok) {
      reject(data)
    }

    resolve(data) 
  })
}


