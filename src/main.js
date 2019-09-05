import Github from './components/Github.vue'

export let globalOptions = {}

export {
    Github,
}

const plugin = {
    // eslint-disable-next-line no-undef
    install(Vue) {
        Vue.component(`vue-github`, Github)
    }
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}