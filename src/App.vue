<template>
  <div class="container pt-5">      
      <div class="row">
        <div class="input-group mb-3 col-md-12">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">City</span>
          </div>
          <input type="search" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
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
      longitude:0
    }
  }
  
}
</script>

<style type="text/css" scoped>

</style>
