<template>
  <div id="root">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <v-tab></v-tab>
  </div>
</template>

<script>
import vTab from '../views/tabBar'
export default {
  components: {
    vTab
  }
  // watch: {
  //   $route(val){
  //     console.log(val)
  //   }
  // }
}
</script>

<style scoped>
#root{
  height: 100%;
  width:100%;
}
</style>