<template>
	<div>
		<div 
		class="preloader-cont"
		:class="{'hidden': !hidden}"
		>
			<div class="preloader">
				<img src="/src/assets/images/preloader.gif">
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 text-center">			
				<img :src="wetherIconName">	
			</div>
			<div class="col-md-6" :key="wether.id">
				<div class="wrapper">
					<div class="data-cont">
						<div class="data-list-cont">
							<span class="data-name __big">t&#176;</span>
							<span class="data __big">{{((wether.currently.temperature - 32) * 5/9).toFixed(1)}}</span>
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
		<div class="row pt-3">
			<div class="col-md-3">
				<div class="wrapper-no-flex">
					<div class="data-cont">
						<div class="data-list-cont">
							<div class="data-name">Summary</div>
							<div v-if="wether.minutely != void(0)" class="data">{{wether.minutely.summary}}</div>
							<div v-else class="data">{{wether.currently.summary}}</div>
						</div>
					</div>
				</div>			
			</div>
			<div class="col-md-3">
				<div class="wrapper-no-flex">
					<div class="data-cont">
						<div class="data-list-cont">
							<div class="data-name">Humidity</div>
							<div class="data">{{wether.currently.humidity}}</div>
						</div>
					</div>
				</div>			
			</div>
			<div class="col-md-3">
				<div class="wrapper-no-flex">
					<div class="data-cont">
						<div class="data-list-cont">
							<div class="data-name">Wind speed</div>
							<div class="data">{{(wether.currently.windSpeed*1.609).toFixed(1)}} km/h</div>
						</div>
					</div>
				</div>			
			</div>
			<div class="col-md-3">
				<div class="wrapper-no-flex">
					<div class="data-cont">
						<div class="data-list-cont">
							<div class="data-name">Pressure</div>
							<div class="data">{{(wether.currently.pressure/1.334).toFixed(1)}} mm. Hg.</div>
						</div>
					</div>
				</div>			
			</div>
		</div>
		<div class="row" id="daily">
			{{wetherDay}}



		</div>
	</div>	
</template>

<script type="text/javascript">
	export default{
		data () {
		    return {
		      name: '',
		      hidden: false,
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
		      forecast:{},		      
		      wetherDay: [],
		      wetherDailyForecast:{},
		      resource: null
		    }
		},
		methods:{			
		    dataTranform(str){
				var a = new Date(str * 1000);
				var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				var year = a.getFullYear();
				var month = months[a.getMonth()];
				var date = a.getDate();
				var time = date + ' ' + month + ' ' + year;
				return time;
			},		
		    getForecastComponent(){
		    	this.hidden = !this.hidden;
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
				        for (var i = 0; i <= (this.wether.daily.data).length - 1; i++) {
				        	this.wetherDailyForecast = this.wether.daily.data[i];
				        	this.wetherDay[i] = this.dataTranform(this.wether.daily.data[i].time); 
				        	this.forecast[i] = [
				        		{
					        		dayTime: this.wetherDay[i],
					        		icon: this.wether.daily.data[i].icon,
					        		temperatureMin: ((this.wether.daily.data[i].temperatureMin - 32) * 5/9).toFixed(1),
					        		temperatureMax: ((this.wether.daily.data[i].temperatureMax - 32) * 5/9).toFixed(1)
				        	}]
				        }
				        console.log(this.forecast);
				        this.hidden = !this.hidden;
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
	.wrapper-no-flex{
		display: block;		
	}
	.wrapper-no-flex .data-cont .data-list-cont{
		color: #666666;
	}
	.wrapper-no-flex .data-cont .data-list-cont .data-name{
		padding-bottom: 1rem;
		border-bottom: 1px solid #c1c1c1;
		text-align: center;
		font-size: 21px;
	}
	.wrapper-no-flex .data-cont .data-list-cont .data{
		padding-top: 1rem;
		font-size: 16px;
    	text-align: center;
	}
	.data-cont{
		/*margin: auto auto auto 0;*/
		margin: auto;
	}
	.preloader-cont{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
		/*background: white;
    	opacity: 0.5;*/
	}
	.preloader-cont .preloader{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 90px;
		height: 90px;
	}
	.hidden{
	    display: none !important;
	 }
	 .data-list-cont .data-name.__big,
	 .data-list-cont .data.__big{
	 	font-size: 80px;
	 }
</style>