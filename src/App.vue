<template>
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
          id="city"
          v-model="city"
          >
        </div>  
      </div>  
      <div class="row pb-3">
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
      <div class="row">
        <div class="col-md-2">
        <router-link 
        tag="button"
        class="btn  btn-info"
        :to="{name: 'forecast',  query: {latitude: latitude, longitude: longitude}}">Full forecast</router-link>
        </div>
      </div>
      <hr>
      <button class="btn btn-success" @click="getCoordinates(city)">Coords</button>
      <br>
      <span>{{cityCoords.results[0].locations[0].latLng}}</span>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view> 
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
      console.log(val);
      var cityName = 'http://open.mapquestapi.com/geocoding/v1/address?key=F9rFHk242FvWMVGiNgGhP7KgTkkbSAJL&location=' + val;
      const self = this;
      self.$http.get(cityName)
        .then(response => {
          return response.json()
         })
         .then(cityCoords => {
          self.cityCoords = cityCoords// наш пустой массив;
          self.latitude = self.cityCoords.results[0].locations[0].latLng.lat;
          self.longitude = self.cityCoords.results[0].locations[0].latLng.lng;
        console.log(self.cityCoords);
         })

         
    }
  }
  
}
</script>

<style type="text/css" scoped>

</style>
