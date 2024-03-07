
import { APP } from "@/shared/App";
import type { ICreatePostInput, IPost } from "../admin-types";
import { timeoutPromise } from "@/helper/util";
import verifyToken from "@/helper/verifyToken";




type PostResponse={
   data:Array<IPost>
}  & Record<string,string>



export function getPosts(page:number,query:string): Promise<PostResponse> {
    return new Promise(async (resolve, reject) => {

      const {headers}=verifyToken()

      const res = await Promise.race([
        fetch(`${APP.apiURL}/posts?page=${page}&query=${query}`, {
          method: 'GET',
          headers:headers
        }),
        timeoutPromise("Request timed out") 
      ]);

      // console.log('status: ' + (res as Response).status)
      
      if (!(res as Response).ok) {
        reject(['Server serror !'])
      }
  
      const data: PostResponse = await (res as Response).json();
  
      resolve(data) 

    });
  }
  