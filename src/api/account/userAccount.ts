import request from "../../http/request"
/**
 *@business {} get user profile 
 * 
**/
export const getUserAccount = ():Promise<any>=>{
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

export const getUserDetail = (uid:string):Promise<any>=>{
    return request({
        url:"/user/detail",
        method:"get",
        params:{
            uid:uid,
            timesamp:new Date().getTime()
        }
    })
}
