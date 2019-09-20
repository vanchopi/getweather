import VueRouter from 'vue-router'
import Forecast from './components/Forecast'
import ErrorCmp from './components/404'

export default new VueRouter({
	routes:[
		{
			path:'/forecast',
			component: Forecast,
			name: 'forecast'
		},
		{
			path:'/404',
			component: ErrorCmp,
			name:'404'
		}
	]
})
