export interface Iuser {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    role : 'user' | 'admin'
}