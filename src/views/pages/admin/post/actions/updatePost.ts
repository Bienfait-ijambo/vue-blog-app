import { APP } from "@/shared/App";
import type { IUpdatePostInput } from "../admin-types";

export async function createPost(input:IUpdatePostInput){
    const res= await fetch(`${APP.apiURL}/posts`,{
        method:'PUT',
        body: JSON.stringify(input),
        headers:{
            contentType: 'application/json',
            authorization:'Bearer'
        }
    })

    const data=await res.json();
    return data
    
}