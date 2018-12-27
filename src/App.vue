<template>
  <div class="container pt-5">      
      <div class="row">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">City</span>
          </div>
          <input type="search" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>  
      </div>  
      <div class="row">
        <router-link 
        tag="button"
        class="btn  btn-info"
        :to="{name: 'forecast',  query: {latitude: 47, longitude: 39.7}}">Full forecast</router-link>
      </div>
      <div class="row">
        <router-view></router-view> 
      </div>  


  </div>
</template>

<script type="text/javascript">
export default {
  
  
}
</script>

<style type="text/css" scoped>

</style>
