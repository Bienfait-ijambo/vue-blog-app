import { APP } from "@/shared/App";


import { timeoutPromise } from "@/helper/util";
import verifyToken from "@/helper/verifyToken";




export function deletePost(id: number){
    return new Promise(async (resolve, reject) => {

      const {headers}=verifyToken()
      const res = await Promise.race([
        fetch(`${APP.apiURL}/posts/${id}`, {
          method: 'DELETE',
          headers:headers
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