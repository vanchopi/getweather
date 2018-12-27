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
          <button type="button" class="btn btn-primary" @click="getData">Get</button>
        </div>  
      </div>
      <span>
        {{wether}}
      </span>
  </div>
</template>

<script type="text/javascript">
export default {
  
  data () {
    return {
      name: '',
      wether: []
    }
  },
  methods:{
    getData(){
      this.resource.get().then(response => response.json())
          .then(wether => this.wether = wether)      
    }
  },
  created(){
    this.resource = this.$resource('42.3601,-71.0589')
  }
}
</script>

<style type="text/css" scoped>

</style>
