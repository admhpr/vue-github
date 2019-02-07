import Github from './components/Github.vue'

export let globalOptions = {}

export {
    Github,
}

function registerComponents(Vue, prefix) {
    Vue.component(`${prefix}github`, Github)
}

const plugin = {
    // eslint-disable-next-line no-undef
    install(Vue, options) {
        globalOptions = Object.assign({}, {
            installComponents: true,
            componentsPrefix: "vue-"
        }, options)

        if (globalOptions.installComponents) {
            registerComponents(Vue, globalOptions.componentsPrefix)
        }
    },
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