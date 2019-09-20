<template>
	<div class="wrp">
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
		</div>
		<div class="row pt-3">
			<div class="col-md-3 col-sm-6 col-6">
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
			<div class="col-md-3 col-sm-6 col-6">
				<div class="wrapper-no-flex">
					<div class="data-cont">
						<div class="data-list-cont">
							<div class="data-name">Humidity</div>
							<div class="data">{{wether.currently.humidity}}</div>
						</div>
					</div>
				</div>			
			</div>
			<div class="col-md-3 col-sm-6 col-6">
				<div class="wrapper-no-flex">
					<div class="data-cont">
						<div class="data-list-cont">
							<div class="data-name">Wind speed</div>
							<div class="data">{{(wether.currently.windSpeed*1.609).toFixed(1)}} km/h</div>
						</div>
					</div>
				</div>			
			</div>
			<div class="col-md-3 col-sm-6 col-6">
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

		<div class="daily-cont">
			<div class="row daily pt-5">			
				
			    <div 
			    	class="daily-forecast-wrapper"
			    	v-for="(item, index) of getLongForcast()"
			    	>
					<div class="col-md-12 col-sm-12 col-lg-12">
						<div class="wrapper">
							<div class="data-cont">
								<div class="data-list-cont daily-time">
									{{item.dayTime}}
								</div>
							</div>
						</div>
					</div>	
					<div class="col-md-12 col-sm-12 col-lg-12">
						<div class="wrapper __daily-icon">
							<div class="data-cont">
								<div class="data-list-cont daily-icon">
									<div class="img-small-cont">
										<img :src="item.icon">	
									</div>	
								</div>
							</div>
						</div>
					</div>	
					<div class="col-md-12 col-sm-12 col-lg-12">
						<div class="wrapper">
							<div class="data-cont">
								<div class="data-list-cont daily-temperature">
									<div class="min">{{item.temperatureMin}}</div>
									<div class="max">{{item.temperatureMax}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
												
			</div>
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
		      forecast:[],		      
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
			getLongForcast(){
				return this.forecast;
			},
		    getForecastComponent(){
		    	this.hidden = !this.hidden;
		    	const latitude = this.$route.query.latitude;
				const longitude = this.$route.query.longitude;
				var str = latitude + ',' + longitude;
				var imgPath = "/src/assets/images/wether-icons/";
				this.forecast = [];
			    this.resource = this.$resource(str);
			    console.log(' city - ',this.$store.state.cityName.cityNameStr);
			    this.resource.get().then(response => response.json())
			        .then(wether => {
			          	this.wether = wether;
				        this.wetherIconName = imgPath + this.wether.currently.icon + '.png';  
				        for (var i = 0; i <= (this.wether.daily.data).length - 1; i++) {
				        	this.wetherDailyForecast = this.wether.daily.data[i];
				        	this.wetherDay[i] = this.dataTranform(this.wether.daily.data[i].time); 
				        	this.forecast.push( 
				        		{
					        		dayTime: this.wetherDay[i],
					        		icon: imgPath + this.wether.daily.data[i].icon + '.png',
					        		temperatureMin: ((this.wether.daily.data[i].temperatureMin - 32) * 5/9).toFixed(1),
					        		temperatureMax: ((this.wether.daily.data[i].temperatureMax - 32) * 5/9).toFixed(1)
				        		});				        	
				        }
				        console.log(this.forecast);
				        this.hidden = !this.hidden;
			        });
		    }
		},
		watch:{
			'$route'(){
		    	this.getForecastComponent();		    			    	
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
	.wrp{
		position: relative;
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
		font-weight: 500;
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
		position: fixed;
	    background-color: rgba(232, 232, 232, 0.6);
	    width: 100%;
	    height: 100%;
	    z-index: 10;
	    top: 0;
	    left: 0;
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
	.img-small-cont{
	 	width: 50px;
	}
	.img-small-cont img {
	 	width: 100%;
	}

	.daily {

	}
	.daily .daily-forecast-wrapper{
	 	display: inline-block;
	 	width: 12.5%;
	}

	.daily .daily-forecast-wrapper .data-cont .min,
	.daily .daily-forecast-wrapper .data-cont .max{
	 	width: 50px;
	    text-align: center;
	    height: 25px;
	    color: white;
	    background-color: black;
	    border-radius: 7px;
	}
	.daily .daily-forecast-wrapper .data-cont .data-list-cont .max{
	 	margin-top: 5px;
	 	background-color: white;
	 	color: black;
	}
	.daily .daily-forecast-wrapper .data-cont .data-list-cont.daily-time{
	 	margin-bottom: 5px;
	 	text-align: center;
	}
	.daily .daily-forecast-wrapper .data-cont .data-list-cont.daily-icon
	{
	 	margin-bottom: 5px;
	}
	.daily .daily-forecast-wrapper .wrapper.__daily-icon{
	 	min-height: 55px;
	}
	.daily-cont{
		padding-bottom: 10px;
		margin-bottom: 10px;
	}
	@media  (max-width: 767px){
		.preloader-cont {
		    position: fixed;
		    background-color: rgba(232, 232, 232, 0.6);
		    width: 100%;
		    height: 100%;
		    z-index: 10;
		    top: 0;
		    left: 0;
		}
		.daily-cont{
			overflow-x: scroll;
		}
		.daily-cont .daily {
			width: 720px;
		}
		.daily-cont::-webkit-scrollbar {
		  	
		  	height: 10px;
		}

		/* Track */
		.daily-cont::-webkit-scrollbar-track {
		  	box-shadow: inset 0 0 5px grey; 
		  	border-radius: 10px;
		}

		/* Handle */
		.daily-cont::-webkit-scrollbar-thumb {
		  	background: #c1c1c1; 
		  	border-radius: 10px;
		}
		.wrapper-no-flex .data-cont .data-list-cont{
			padding-bottom: 1rem;
		}
		.wrapper-no-flex .data-cont .data-list-cont .data-name,
		.wrapper-no-flex .data-cont .data-list-cont .data{
			border-bottom: none;
			display: inline-block;
			padding-bottom: 0px;
			padding-top: 0px;
		}
		.wrapper-no-flex .data-cont .data-list-cont .data-name::after{
			content:': ';
			
		}
		.daily-cont .daily.pt-5{
			padding-top: 1rem!important;
		}
	}
	@media  (max-width: 700px){
		.wrapper-no-flex .data-cont .data-list-cont .data-name,
		.wrapper-no-flex .data-cont .data-list-cont .data{
			border-bottom: none;
			display: inline-block;
			padding-bottom: 0px;
			padding-top: 0px;
		}
		.forecastCont .col-sm-6 {
		    -ms-flex: 0 0 100%;
		    flex: 0 0 100%;
		    max-width: 100%;
		}
		.wrapper-no-flex .data-cont .data-list-cont .data-name::after{
			content:': ';
		}
	}	
	@media  (max-width: 350px){
		.preloader-cont + .row .text-center img{
			width: 100%;
    		max-width: 252px;
		}
		.data-list-cont .data-name.__big, 
		.data-list-cont .data.__big{
			font-size: 45px;
		}
	}	
</style>