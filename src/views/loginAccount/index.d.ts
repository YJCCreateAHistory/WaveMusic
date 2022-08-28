export interface SEND_LOGIN_STATE {
    (e:string, data:boolean) : void
}
export interface LOGIN_WAY_FLAG {
    data: { 
        [key: string]: string; 
    }
}