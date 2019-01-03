<template>
	<div class="row">
		<div class="col-md-6 text-center">			
			<img :src="wetherIconName">	
		</div>
		<div class="col-md-6" :key="wether.id">
			<div class="wrapper">
				<div class="data-cont">
					<div class="data-list-cont">
						<span class="data-name">t&#176;</span>
						<span class="data">{{((wether.currently.temperature - 32) * 5/9).toFixed(1)}}c</span>
					</div>
					<div class="data-list-cont">
						<span class="data-name">Summary:</span>
						<span v-if="wether.minutely != void(0)" class="data">{{wether.minutely.summary}}</span>
						<span v-else>{{wether.currently.summary}}</span>
					</div>
					<div class="data-list-cont">
						<span class="data-name">Humidity:</span>
						<span class="data">{{wether.currently.humidity}}</span>
					</div>
					<div class="data-list-cont">
						<span class="data-name">Wind speed:</span>
						<span class="data">{{(wether.currently.windSpeed*1.609).toFixed(1)}} km/h</span>
					</div>
					<div class="data-list-cont">
						<span class="data-name">Pressure:</span>
						<span class="data">{{(wether.currently.pressure/1.334).toFixed(1)}} mm. Hg.</span>
					</div>
				</div>
			</div>	
		</div>
		
		<!--<div>
			<span>
				latitude: {{ $route.query.latitude }}
			</span>
			<span>
				longitude: {{ $route.query.longitude }}
			</span>
		</div>
		<div >
			
			<br>
			{{((wether.currently.temperature - 32) * 5/9).toFixed(1)}}
		</div>	-->
	</div>
</template>

<script type="text/javascript">
	export default{
		data () {
		    return {
		      name: '',
		      wetherIconName:'',
		      wether: {
		      	currently: {
		      		summary:'',
		      		humidity: 0,
		      		windSpeed: 0,
		      		temperature: 0,
		      		pressure: 0
		      	},
		      	minutely:{
		      		summary:''
		      	}
		      },
		      wetherDay: {},
		      resource: null
		    }
		},
		methods:{
		    getForecastComponent(){
		    	const latitude = this.$route.query.latitude;
				const longitude = this.$route.query.longitude;
				var str = latitude + ',' + longitude;
				var imgPath = "/src/assets/images/wether-icons/"
			    this.resource = this.$resource(str);
			    console.log('created1')
			    this.resource.get().then(response => response.json())
			        .then(wether => {
			          	this.wether = wether;
				        this.wetherIconName = imgPath + this.wether.currently.icon + '.png';  
				        this.wetherDay = this.wether.daily;
				        console.log(this.wetherDay);
			        });
		    }
		},
		watch:{
			'$route'(){
		    	this.getForecastComponent()
		    } 
		},
		created(){			
			this.getForecastComponent();
		}
	}
</script>

<style type="text/css" scoped>
	.wrapper{
		display: flex;		
		height: 100%;
		width: 100%;
	}
	.data-cont{
		margin: auto auto auto 0;
	}
</style>