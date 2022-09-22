import request from "../../http/request"
import {HTTP_RES_DATA} from  "../../types/httpTypes/index"

/**
 *@business {} get user profile 
 * 
**/
export const getUserAccount = ():Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/user/account",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

/**
 *@business {} get user homePage detail 
 * 
**/

export const getUserDetail = <T>(uid:T):Promise<any>=>{
    return request({
        url:"/user/detail",
        method:"get",
        params:{
            uid:uid,
            timesamp:new Date().getTime()
        }
    })
}
