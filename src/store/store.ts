import {createStore} from "vuex"
import actions from "./action"
import mutations from "./mutation"
import state from "./state"
import plugins from "./plugins"
const plugin = plugins
const options = {
    actions,
    mutations,
    state,
    plugin
}
const store = createStore(options)
export default store
