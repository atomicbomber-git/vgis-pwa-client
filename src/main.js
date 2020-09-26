import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'
// Import vue2-google-maps
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Sentry.init({
  dsn: 'https://da686f87b8fe4eb585c1a0b504548f30@o255420.ingest.sentry.io/5440818',
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1,
})

Vue.use(VueGoogleMaps, {
  load: {
    libraries: ['geometry'],
    key: 'AIzaSyCt1SXMaJ-9Yb7xley_wWlvi54f5ckafOQ'
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
