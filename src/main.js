import { createApp } from 'vue'
import App from '@/App.vue'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import components from '@/components/UI'
import store from '@/store'

const vuetify = createVuetify()

const app = createApp(App)
    .use(vuetify)
    .use(store)

    components.forEach(component => {
    app.component(component.name, component)
})

app.mount('#app')
