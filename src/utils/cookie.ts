import cookie from "js-cookie";
// import {logout} from "../api/loginout/exit"
import { useStore } from "vuex"
const store = useStore()
export const setCookie = (cookie: string): void => {
    const cookies = cookie.split(";;")
    cookies.map((el: string) => {
        document.cookie = el
        const keyValue = el.split(";")[0].split("=")
        localStorage.setItem(`cookie-${keyValue[0]}`, keyValue[1])
    })
}

// get cookie
export const getCookie = (key: string): string | null => {
    return cookie.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

// remove cookie
export const removeCookie = (key: string): void => {
    cookie.remove(key)
    localStorage.removeItem(`cookie-${key}`)
}

// user'music by logined
export const isLoginedIn = (): boolean => {
    return getCookie("MUSIC_U") !== undefined
}
export const isAccountLoginedin = (account:any): boolean => {
    return (getCookie("MUSIC_U") !== undefined && account==="account")
}

// 账号登录
// export const isAccountLoginedin = ()=>{
//     return
// }