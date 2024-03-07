interface IUser{
    name:string
    email: string
    password: string
}


export interface IRegisterInput extends IUser{}


export interface ILoginUserInput extends Omit<IUser,'name'>{}
