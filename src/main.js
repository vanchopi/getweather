import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store';
import router from './routes'
import VueResource from 'vue-resource'



Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/53dbf25ba49514eff6ccd794e04da9ae/'
/*
 	*** origin request -https://api.darksky.net/forecast/53dbf25ba49514eff6ccd794e04da9ae/ ***
*/

/*Vue.http.interceptors.push((request, next) => {
  request.headers.set('Access-Control-Allow-Origin', '*')
  next()
})*/

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
