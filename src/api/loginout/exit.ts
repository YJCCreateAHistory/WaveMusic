import request from "../../http/request"
import {HTTP_RES_DATA} from  "../../types/httpTypes/index"

export const loginout = ():Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/logout",
        method:"get",
        params:{
            timesamp:new Date().getTime(),
        }
    })
}