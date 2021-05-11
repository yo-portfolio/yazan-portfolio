import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import '../node_modules/primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css';

import '../tailwind.css';
import  db  from './firebaseDb.js';


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.use(PrimeVue);
