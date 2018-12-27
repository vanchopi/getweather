import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import VueResource from 'vue-resource'

Vue.use(VueRouter)

Vue.use(VueResource)

Vue.http.options.root = 'https://api.darksky.net/forecast/53dbf25ba49514eff6ccd794e04da9ae/'

Vue.http.interceptors.push(request => {
	/*request.headers.set('Access-Control-Allow-Origin', 'http://localhost:8080')
	request.headers.set('Access-Control-Allow-Credentials', 'true')*/
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
