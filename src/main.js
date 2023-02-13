import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { myStore } from './store/store.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import './assets/style/main.scss'

library.add(faTrashCan, faPenToSquare, faCircleInfo)

const app = createApp(App)

app.use(router)
app.use(myStore)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
