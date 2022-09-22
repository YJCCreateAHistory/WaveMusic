import cookie from "js-cookie";
// import {logout} from "../api/loginout/exit"
export const setCookie = <T extends string>(cookie: T): void => {
    localStorage.setItem('MUSIC_U', cookie)

}

// get cookie
export const getCookie = (key: string): string | null => {
    return cookie.get(key) ?? localStorage.getItem(key)
}

// remove cookie
export const removeCookie = (key: string): void => {
    cookie.remove(key)
    localStorage.removeItem(key)
}

// user'music by logined
export const isLoginedIn = (): boolean => {
    return getCookie("MUSIC_U") !== null
}
export const isAccountLoginedin = (account: any): boolean => {
    return (getCookie("MUSIC_U") !== null && account === "account")
}

// 账号登录
// export const isAccountLoginedin = ()=>{
//     return
// }