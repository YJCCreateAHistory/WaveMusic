import {createStore} from "vuex"
import actions from "./action"
import mutations from "./mutation"
import state from "./state"
const options = {
    actions,
    mutations,
    state
}
const store = createStore(options)

export default store
