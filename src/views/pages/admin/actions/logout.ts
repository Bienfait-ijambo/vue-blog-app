import { timeoutPromise } from "@/helper/util";
import verifyToken, { getUserData } from "@/helper/verifyToken";
import { APP } from "@/shared/App";


export function logout(){
    return new Promise(async (resolve, reject) => {

        const userData=getUserData()
        const {headers}=verifyToken()

      const res = await Promise.race([
        fetch(`${APP.apiURL}/logout`, {
          method: 'POST',
          headers:headers,
          body: JSON.stringify({userId: userData?.user?.id})
        }),
        timeoutPromise("Request timed out") 
      ]);

      
      if (!(res as Response).ok) {
        reject(['Server serror !'])
      }
  
      const data: {message:string} = await (res as Response).json();
  
      resolve(data) 

    });
  }
  