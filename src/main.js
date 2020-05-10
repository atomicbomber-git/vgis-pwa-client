import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

// Import vue2-google-maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    libraries: ["geometry"],
    key: 'AIzaSyCt1SXMaJ-9Yb7xley_wWlvi54f5ckafOQ'
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
