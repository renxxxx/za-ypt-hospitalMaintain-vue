<template>
  <div id="view">
    <leftNav></leftNav>
    <router-view class="rightNav"/>
  </div>
</template>

<script>
import leftNav  from  './adminView/functionComponents/leftNav.vue'
export default {
  name: 'view',
  components:{
    leftNav
  }
}
</script>

<style>
#view{
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  min-width: 1200px;
  /* overflow: hidden; */
}
.rightNav{
  height: 100vh;
  /* overflow-y: scroll; */
}
</style>
