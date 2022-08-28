import { isLoginedIn, isAccountLoginedin } from "../utils/cookie"
import { getUserAccount, getUserLiked, getUserPlayList, getUserDetail } from "../api/account/userAccount"
import { USER_ACCOUNT } from "./types/index"

export default {
    // user profile
    // getUserProfile: ({ state, commit }: any): void | Promise<any> => {
    //     if (!isAccountLoginedin(state.data.loginMode)) {
    //         return
    //     } else {
    //         return getUserAccount().then(async (res: USER_ACCOUNT) => {
    //             if (res.data.code === 200) {
    //                 const { data } = res
    //                 const detail = await getUserDetail(data.account.id)
    //                 commit("updateData", { key: "user", value: { account: data.account, detail: detail } })
    //             }
    //         })
    //     }
    // },
    getUserAccountProfile: ({ state, commit }: any): void | Promise<any> => {
        if (isLoginedIn()) {
            // get user detail
            return getUserDetail(state.data.userData.account.id).then((res: USER_ACCOUNT) => {
                if (res.data.code === 200) {
                    commit("getUserDetailInfo", { key: "detailInfo", value: { detail: res.data } })
                }
            })
        }
    },
    // user playlist
    getUserLikePlayList: ({ state, commit }: any): void | Promise<any> => {
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
                } else {

                }
            })
        }
    },
}