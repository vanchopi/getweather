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
      <div class="mb-3">
        <div class="row">
          <button type="button" class="btn btn-primary">Get</button>
        </div>  
      </div>
      <router-link 
      tag="button"
      class="btn  btn-info"
      :to="{name: 'forecast', params: {id: id}, query: {latitude: 47, longitude: 39.7}}">Full forecast</router-link>
      <router-view></router-view> 
  </div>
</template>

<script type="text/javascript">
export default {
  
  
}
</script>

<style type="text/css" scoped>

</style>
