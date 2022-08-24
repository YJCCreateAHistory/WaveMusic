import { isLoginedIn, isAccountLoginedin } from "../utils/cookie"
import { getUserAccount, getUserLiked, getUserPlayList } from "../api/account/userAccount"
import { USER_ACCOUNT } from "./types/index"

export default {
    // user profile
    getUserProfile: ({ state,commit }: any): void | Promise<any> => {
        if (!isAccountLoginedin(state.data.loginMode)) {
            return
        } else {
            return getUserAccount().then((res: USER_ACCOUNT) => {
                if (res.data.code === 200) {
                    const { data} = res
                    commit("updateData", { key: "user", value: data.profile })
                }
            })
        }
    },
    // user playlist
    getUserLikePlayList: ({state, commit }: any): void | Promise<any> => {
        if (!isAccountLoginedin(state.data.loginMode)) return
        if (isLoginedIn()) {
            let params = {
                uid: state.data.user.id,
                limit: 2000,
                offset: 0
            }
            return getUserPlayList(params).then((res: USER_ACCOUNT) => {
                // submit playlist
                let { playlist } = res
                if (playlist) {
                    let params = {
                        key: "playList",
                        value: playlist
                    }
                    commit("updateUserPlayList", params)
                }else {

                }
            })
        }
    }
}