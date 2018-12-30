<template>
	<div>
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
		    	const latitude = this.$route.query.latitude;
				const longitude = this.$route.query.longitude;
				var str = latitude + ',' + longitude;
			    this.resource = this.$resource(str);
			    console.log('created1')
			    this.resource.get().then(response => response.json())
			        .then(wether => {
			          	this.wether = wether
			          	console.log('parasha');
			        });
		        console.log('govno');
		    }
		},
		computed:{

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