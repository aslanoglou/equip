import '../scss/styles.scss'

import { createApp } from 'vue'
import App from '../App.vue'

import 'primevue/resources/themes/aura-light-blue/theme.css'
import "primevue/resources/primevue.min.css"; /* Deprecated */

import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload';
const app = createApp(App)

app.use(PrimeVue, { ripple: true })

app.component('Button', Button)
app.component('InputText', InputText)
app.component('FileUpload', FileUpload);
app.mount('#app')
