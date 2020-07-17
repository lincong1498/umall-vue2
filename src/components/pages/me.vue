<template>
  <div>
    <mt-header title="我的页面">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div>
      <div class="topContent">
        <div class="userInfo">
        <img src="../../assets/img/head.jpg" alt="头像" class="headImg" />
        <span>您好，{{userInfo.nickname}}</span>
        </div>
        <span @click="logout" class="logout" >退出登录</span>
      </div>
      <ul>
        <li>
          <mt-cell title="地址管理" is-link>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-location" />
            </svg>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="我的钱包" is-link>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-wdqb" />
            </svg>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="我的优惠券" is-link>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-xianshi" />
            </svg>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="我的二维码" is-link>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-youhuiquan" />
            </svg>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="我的小伙伴" is-link>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use xlink:href="#icon-xiaohuoban" />
            </svg>
          </mt-cell>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo", "cartsList"])
  },
  methods: {
  ...mapActions(["setAdminUserSync", "delCartsListSync"]),
    logout() {
      this.setAdminUserSync({});
      this.delCartsListSync([]);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.icon {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: -0.5em;
  fill: currentColor;
  overflow: hidden;
}
.topContent {
  display: flex;
  justify-content: space-between;
  height: 2rem;
  width: 100%;
  background:#32adee;
}
.topContent .userInfo{
  display: flex;
  align-items: center;
  justify-content: center;
}
ul {
  margin-top: 0.1rem;
}
.headImg {
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
  border-radius: 50%;
}
span {
  font-size: 0.3rem;
}
.logout{
  align-self: space-around;
  /* text-align:  */
}
</style>