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
		<div>
			temperature {{ wether.currently.temperature }}
		</div>	
	</div>
</template>

<script type="text/javascript">
	export default{
		data () {
		    return {
		      name: '',
		      wether: [],
		      resource: null
		    }
		},
		methods:{
		    getData(){
		      this.resource.get().then(response => response.json())
		          .then(wether => this.wether = wether);
		          console.log()      
		    }
		},
		created(){
			const latitude = this.$route.query.latitude;
			const longitude = this.$route.query.longitude;
			var str = latitude + ',' + longitude;
		    this.resource = this.$resource(str);
		    this.resource.get().then(response => response.json())
		          .then(wether => this.wether = wether);
		          console.log() 
		}
	}
</script>

<style type="text/css" scoped>
	
</style>