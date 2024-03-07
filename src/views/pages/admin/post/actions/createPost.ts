import { APP } from "@/shared/App";
import type { ICreatePostInput } from "../admin-types";
import { timeoutPromise } from "@/helper/util";
import verifyToken from "@/helper/verifyToken";




type PostResponse={
    post:{
        id:number
    }& ICreatePostInput
    message: string
} 



export function createPost(input: ICreatePostInput): Promise<PostResponse> {
    return new Promise(async (resolve, reject) => {

      const {headers}=verifyToken()
      const res = await Promise.race([
        fetch(`${APP.apiURL}/posts`, {
          method: 'POST',
          headers:headers,
          body: JSON.stringify(input)
        }),
        timeoutPromise("Request timed out") 
      ]);

      
      if (!(res as Response).ok) {
        reject(['Server serror !'])
      }
  
      const data: PostResponse = await (res as Response).json();
  
      resolve(data) 

    });
  }
  