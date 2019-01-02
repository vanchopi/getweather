<template>
	<div>
		<img :src="wetherIconName">
		<div>
			<span>
				latitude: {{ $route.query.latitude }}
			</span>
			<span>
				longitude: {{ $route.query.longitude }}
			</span>
		</div>
		<div :key="wether.id">
			{{wether.currently}}
			<br>
			{{((wether.currently.temperature - 32) * 5/9).toFixed(1)}}
		</div>	
	</div>
</template>

<script type="text/javascript">
	export default{
		data () {
		    return {
		      name: '',
		      wetherIconName:'',
		      //wether: [],
		      wether: {
		      	currently: {
		      		temperature: 0
		      	}
		      },
		      resource: null
		    }
		},
		methods:{
		    getForecastComponent(){
		    	var wetherList = [ // listing of all possible icons
	                "clear-day",
	                "clear-night",
	                "partly-cloudy-day",
	                "partly-cloudy-night",
	                "cloudy",
	                "rain",
	                "sleet",
	                "snow",
	                "wind",
	                "fog"
	            ];
		    	const latitude = this.$route.query.latitude;
				const longitude = this.$route.query.longitude;
				var str = latitude + ',' + longitude;
				var imgPath = "/src/assets/images/wether-icons/"
			    this.resource = this.$resource(str);
			    console.log('created1')
			    this.resource.get().then(response => response.json())
			        .then(wether => {
			          	this.wether = wether;
			          	for (var i = 0; i < wetherList.length - 1; i ++ ){
				          		if (wetherList[i] == this.wether.currently.icon){
				          			console.log('icon - ',wetherList[i] + i);
				          			this.wetherIconName = imgPath + wetherList[i] + '.png';
				          		}				          		
				          	}
			          	console.log(this.wether.currently.icon)
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
	
</style>