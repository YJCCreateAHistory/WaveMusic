import request from "../../http/request"
import md5 from "crypto-js/md5"
import { LOGIN_RES_DATA } from "./index"
import { Phone } from "@element-plus/icons-vue"
export const haveQRcodeKey = ()=>{
    return request({
        url:"/login/qr/key",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

export const createQrcode = (unikey:string):Promise<LOGIN_RES_DATA>=>{
    return request({
        url:"/login/qr/create",
        method:"get",
        params:{
            timesamp:new Date().getTime(),
            key:unikey
        }
    })
}

export const checkQrcodeLoginState = (unikey:string):Promise<LOGIN_RES_DATA> => {
    return request({
        url:"/login/qr/check",
        method:"get",
        params:{
            key:unikey,
            timesamp:new Date().getTime()
        }
    })
}

export const loginByEmail = (email:string, psd:string):Promise<LOGIN_RES_DATA>=>{
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

export const loginByCellPhone = (phone:string, verify:string):Promise<LOGIN_RES_DATA> => {
    return request({
        url:"/login/cellphone",
        method:"get",
        params:{
            phone:phone,
            verify:verify,
            // md5_password:password,
            timesamp:new Date().getTime()
        }
    })
}
/**
 * @business {验证码}
 * @params {phone，timesamp} 手机号 时间戳
**/
export const sendVirefMessage = (phone:string)=>{
    return request({
        url:"/captcha/sent",
        method:"get",
        params:{
            phone:phone,
            timesamp:new Date().getTime()
        }
    })
}
/**
 * @business {验证验证码}
 * @params {phone，captcha, timesamp} 手机号,验证码,时间戳
**/
export const checkVirefMessage = (phone:string, verify:string):Promise<any>=>{
    return request({
        url:"/captcha/verify",
        method:"get",
        params:{
            phone:phone,
            captcha:verify,
            timesamp:new Date().getTime()
        }
    })
}

export const getLoginStatus = (cookie:string):Promise<any>=>{
    return request({
        url:"/login/status",
        method:"post",
        params:{
            cookie:cookie,
            timesamp:new Date().getTime()
        }
    })
}