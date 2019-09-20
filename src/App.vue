<template>
  <div class="int-cont">
    <div class="container pt-5">      
        <div class="row">
          <div class="input-group mb-3 col-md-12">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">City</span>
            </div>
            <input 
            type="search" 
            class="form-control" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"
            placeholder="Saint Petersburg" 
            id="city"
            v-model="city"
            >
          </div>  
        </div>  
        <div class="hidden">
          <div class="input-group col-md-6">
            <div class="input-group-prepend">
              <span class="input-group-text" id="latitude">latitude</span>
            </div>
            <input 
            type="text" 
            class="form-control" 
            aria-label="latitude" 
            aria-describedby="basic-addon1"
            v-model.lazy.number="latitude"
            >
          </div>
          <div class="input-group col-md-6">
            <div class="input-group-prepend">
              <span class="input-group-text" id="longitude">longitude</span>
            </div>
            <input 
            type="text" 
            class="form-control" 
            aria-label="longitude" 
            aria-describedby="basic-addon1"
            v-model.lazy.number="longitude"
            >
          </div>
        </div>
        <!--<div class="row">
          <div class="col-md-2">
          <router-link 
          tag="button"
          class="btn  btn-info"
          :to="{name: 'forecast',  query: {latitude: latitude, longitude: longitude}}">Full forecast</router-link>
          </div>
        </div>-->
        
        <button class="btn btn-success" @click="getCoordinates(city)">Get forecast</button>
        <span class="city-name">{{cityStrName}}</span>
        <hr>
        <!--<br>
        <span>{{cityCoords.results[0].locations[0].latLng}}</span>
        <hr>-->
        <div class="forecastCont">          
            <router-view></router-view>           
        </div>  


    </div>
    <div class="bg-cont">
          <div class="white-overlay">            
          </div>
      </div>
  </div>  
</template>

<script type="text/javascript">
export default {
  data(){
    return{
      latitude: 0,
      longitude:0,
      cityStrName: '',
      cityCoords:{        
        results: [
          {  
            providedLocation: {
              location: "Rostov on don"
            },            
            locations: [
              {                  
                latLng: {
                  lat: 5,
                  lng: 5
                }
              }
            ]
          }
        ]
      }
      ,
      city: ''
    }
  },
  methods:{
    getCoordinates(val){
      //console.log(val);
      var cityName = 'http://open.mapquestapi.com/geocoding/v1/address?key=F9rFHk242FvWMVGiNgGhP7KgTkkbSAJL&location=' + val;      
      this.$http.get(cityName)
        .then(response => {
          return response.json()
         })
          .then(cityCoords => {
          this.cityCoords = cityCoords;
          if (this.cityCoords.results[0].locations[0].adminArea5 != ''){
              this.cityStrName = this.cityCoords.results[0].locations[0].adminArea5 + ', ' + this.cityCoords.results[0].locations[0].adminArea3 + ', ' + this.cityCoords.results[0].locations[0].adminArea1;  
              this.$store.dispatch("cityName/setCityName", this.cityStrName);
              this.latitude = this.cityCoords.results[0].locations[0].latLng.lat;
              this.longitude = this.cityCoords.results[0].locations[0].latLng.lng;
              this.$router.push({name: 'forecast', query:{latitude: this.latitude, longitude: this.longitude}})
            } else{
              this.$router.push({name: '404'});
              this.cityStrName = "Can't find city '" + this.city +"'";
            }               
          })
      }
  }
  
}
</script>

<style type="text/css" scoped>
  .int-cont{
    position: relative;
    min-width: 100%;
    min-height: 100vh;
    height: 100%;
    background-image: url('/src/assets/images/clouds.jpg'); 
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .int-cont .container{
    position: relative;
    z-index: 10;
  }

  .int-cont .bg-cont {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .int-cont .bg-cont .white-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0.75;
  }

  .hidden{
    display: none !important;
  }
  .city-name{
    float: right;
    margin-top: 12px;
  }
  @media (max-width: 767px){
    .int-cont .container {
        max-width: 100%;
    }
  }  
  @media  (max-width: 450px){
    .city-name {
        float: none;
        display: block;
    }
  }
</style>
