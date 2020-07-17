<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/css/reset.css";
import "./assets/js/rem.js";
import "./assets/js/iconfont.js";
export default {
  name: "App",
};
</script>

<style>
html,body,#app{
  width: 100%;
  height: 100%;
}
.mint-header{
  background-color: #1aa4ec;
}
</style>
