import { createApp } from 'vue'
import App from './App.vue'

import components from '@/components/UI'

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

import store from '@/store'

const vuetify = createVuetify({
    ssr: true,
})

const app = createApp(App)
    .use(vuetify)
    .use(store)

components.forEach(component => {
    app.component(component.name, component)
})

app.mount('#app')
