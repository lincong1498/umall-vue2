<template>
  <mt-tabbar :fixed="true">
    <mt-tab-item id="/home" @click.native="switchTab('/home')">
      <svg class="icon" aria-hidden="true" v-if="this.selected =='/home'">
        <use xlink:href="#icon-shouye" />
      </svg>
      <svg class="icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-shouye-copy" />
      </svg>
      <div class="nav">首页</div>
    </mt-tab-item>
    <mt-tab-item id="/cart" @click.native="switchTab('/cart')">
      <svg class="icon" aria-hidden="true" v-if="this.selected =='/cart'">
        <use xlink:href="#icon-gouwuche-copy" />
      </svg>
      <svg class="icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-gouwuche" />
      </svg>
      <div class="nav">购物车</div>
    </mt-tab-item>
    <mt-tab-item id="/me" @click.native="switchTab('/me')">
      <svg class="icon" aria-hidden="true" v-if="this.selected =='/me'">
        <use xlink:href="#icon-wode-copy" />
      </svg>
      <svg class="icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-wode" />
      </svg>
      <div class="nav">我的</div>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: "/home"
    };
  },
  methods: {
    switchTab(name) {
      if (this.$route.path == name) {
        return;
      }
      this.$router.push(name);
    }
  },
  mounted() {
    this.selected = this.$route.path;
  },
  watch: {
    $route(nowPath) {
      this.selected = nowPath.path;
    }
  }
};
</script>

<style scoped>
.mint-tab-item {
  display: flex;
  flex-direction: column;
}
.icon {
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
div.nav {
  font-size: 0.3rem;
}
</style>