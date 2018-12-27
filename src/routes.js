import VueRouter from 'vue-router'
import Forecast from './pages/Forecast'

export default new VueRouter({
	routes:[
		{
			path:'/forecast',
			component: Forecast,
			name: 'forecast'
		}
	]
})
