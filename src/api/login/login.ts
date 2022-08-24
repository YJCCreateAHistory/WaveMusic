import request from "../../http/request"
import md5 from "crypto-js/md5"
export const haveQRcodeKey = ()=>{
    return request({
        url:"/login/qr/key",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

export const createQrcode = (unikey:string)=>{
    return request({
        url:"/login/qr/create",
        method:"get",
        params:{
            timesamp:new Date().getTime(),
            key:unikey
        }
    })
}

export const checkQrcodeLoginState = (unikey:string) => {
    return request({
        url:"/login/qr/check",
        method:"get",
        params:{
            params:unikey,
            timesamp:new Date().getTime()
        }
    })
}

export const loginByEmail = (email:string, psd:string)=>{
    return request({
        url:"/login",
        method:"get",
        params:{
            email:email,
            password:psd,
            md5_password:md5(psd).toString(),
            timesamp:new Date().getTime()
        }
    })
}