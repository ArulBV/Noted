import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App);

app.use(VueSweetalert2);

app.mount('#app');