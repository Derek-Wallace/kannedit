// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import 'popper.js'
import 'bootstrap'
import 'jquery'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  .mount('#app')
