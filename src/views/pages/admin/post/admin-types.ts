
export interface IPost{
    id:number
    title:string
    post_content:string
}


export interface ICreatePostInput extends Omit<IPost,'id'>{}

export interface IUpdatePostInput extends IPost{}


export interface DeletePostInput{
    id:number
}

