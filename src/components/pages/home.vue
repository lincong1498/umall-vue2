<template>
  <div id="page">
    <mt-header class="homeHeader">
      <div slot="left" class="leftHeader">
        <img src="../../assets/img/logo.jpg" class="logo" />
        <mt-search cancel-text="取消" placeholder="搜索" class="search"></mt-search>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- 分类 -->
    <div class="cate">
      <ul>
        <li v-for="(cateitem,index) of catearr" :key="index">{{cateitem.catename}}</li>
      </ul>
    </div>
    <!-- 轮播图 -->
    <mt-swipe class="banner">
      <mt-swipe-item v-for="banneritem of bannerarr" :key="banneritem.id">
        <img :src="banneritem.img" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 功能导航 -->
    <div class="funcNav">
      <ul>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xianshi" />
          </svg>
          <p>限时抢购</p>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-A" />
          </svg>
          <p>积分商城</p>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lianxi" />
          </svg>
          <p>联系我们</p>
        </li>
        <li>
          <router-link to="/cate">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shangpinfenlei" />
            </svg>
            <p>商品分类</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 活动 -->
    <div class="huodong">
      <div class="left">
        <div class="limited">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xianshi" />
          </svg>
          <span>限时秒杀</span>
        </div>
        <p class="title">每天零点，好货不停</p>
        <div class="countdown">
          <span class="time">02</span>
          <i>:</i>
          <span class="time">02</span>
          <i>:</i>
          <span class="time">05</span>
          <span class="seckill">秒杀</span>
        </div>
        <img class="limitedGoods" src="../../assets/img/seckill_03.jpg" alt />
      </div>
      <div class="right">
        <div class="head">
          <div>
            <span class="brand">品牌上新</span>
            <span class="discount">折</span>
            <p class="daily">每日九点 抢大牌</p>
          </div>
          <img src="../../assets/img/shop_1.jpg" alt />
        </div>
        <div class="bottom">
          <div class="bottomLeft">
            <p class="title">每日十件</p>
            <p class="info">只为你选好货</p>
            <img src="../../assets/img/shop_2.jpg" alt />
          </div>
          <div class="bottomRight">
            <p class="title">拼啊</p>
            <p class="info">超级好价拼团</p>
            <img src="../../assets/img/shop_3.jpg" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 商品 -->
    <div class="goods">
      <ul class="btnUl">
        <li
          v-for="(btnitem,index) of btnarr"
          :key="index"
          :class="{active:btnactive ==index}"
          @click="btnactive=index"
        >{{btnitem}}</li>
      </ul>
      <div
        class="list"
        v-for="(goodsitem,index) of goodsarr"
        :key="index"
        v-show="btnactive==index"
      >
        <div class="content" v-for="(item,index) of goodsitem.content" :key="index">
          <img :src="item.img" />
          <div class="info">
            <p class="title">{{item.goodsname}}</p>
            <p class="price">￥{{item.price}}</p>
            <p class="sales">市场价：￥{{item.market_price}}</p>
            <p class="buy">立即抢购</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vTab from "../views/tabBar";
export default {
  components: {
    vTab
  },
  data() {
    return {
      btnactive: 0,
      btnarr: ["热卖商品", "最新商品", "所有商品"],
      catearr: [],
      bannerarr: [],
      goodsarr: []
    };
  },
  methods: {
    getcate() {
      return this.axios.get("/api/getcate");
    },
    getbanner() {
      return this.axios.get("/api/getbanner");
    },
    getIndexgoods() {
      return this.axios.get("/api/getindexgoods");
    }
  },
  mounted() {
    this.axios
      .all([this.getcate(), this.getbanner(), this.getIndexgoods()])
      .then(
        this.axios.spread((cateres, bannerres, goodsres) => {
          this.catearr = cateres.data.list;
          this.bannerarr = bannerres.data.list;
          this.goodsarr = goodsres.data.list;
          // console.log(this.goodsarr)
        })
      );
  }
};
</script>

<style scoped>
#page {
  margin-bottom: 1rem;
}
.homeHeader {
  height: 0.8rem;
}
.icon {
  width: 0.8rem;
  height: 0.8rem;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
.logo {
  height: 0.4rem;
  width: 1.5rem;
  margin: 0 0.3rem 0 0.2rem;
}
.leftHeader {
  display: flex;
  height: 0.8rem;
  align-items: center;
}
.mint-header {
  border-bottom: 1px solid #999;
}

.mint-search {
  width: 3rem;
  height: 0.65rem;
  background: #fff;
}
.mint-search >>> .mint-searchbar {
  padding: 0;
  font-size: 0.2rem;
  background: #fff;
}
.mint-search >>> .mint-searchbar-cancel {
  margin-right: 0.1rem;
  margin-left: 0;
}
.mint-search >>> input,
.mint-search >>> a {
  font-size: 0.25rem;
}
.mintui-more {
  color: #000;
}
.cate {
  height: 0.8rem;
  width: 100%;
  font-size: 0.3rem;
  /* margin-top: 0.1rem; */
}
.cate ul {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #32adee;
}
.cate li {
  height: 0.8rem;
  width: 1.4rem;
  margin-right: 0.1rem;
  color: #fff;
  line-height: 0.8rem;
  font-weight: 500;
  text-align: center;
}
.banner {
  width: 100%;
  height: 3rem;
}
.banner img {
  height: 100%;
  width: 100%;
}
.funcNav {
  position: relative;
}
.funcNav ul {
  display: flex;
  height: 1.6rem;
  justify-content: space-around;
  border-bottom: 1px solid #999;
  margin-top: 0.1rem;
}
.funcNav ul li {
  text-align: center;
}
#page > div.funcNav > ul > li:nth-child(4) > a {
  text-decoration: none;
  color: #000;
}
.funcNav ul li img {
  height: 0.8rem;
  width: 0.8rem;
}
.funcNav ul li p {
  font-size: 0.25rem;
}
.huodong {
  height: 5rem;
  width: 100%;
  display: flex;
  overflow: hidden;
  /* margin-top: .1rem; */
}
.huodong .left {
  flex: 1;
  padding: 0.1rem;
}
.huodong .left .limited {
  display: flex;
  align-items: center;
}
.huodong .left .limited span {
  flex-direction: row;
  margin-left: 0.1rem;
  font-size: 0.4rem;
  color: #f32985;
}
.huodong .left .title {
  font-size: 0.3rem;
  color: #666;
}
.huodong .left .countdown {
  font-size: 0.3rem;
  color: #666;
  margin-top: 0.1rem;
}
.huodong .left .countdown .time {
  display: inline-block;
  width: 0.35rem;
  height: 0.35rem;
  line-height: 0.4rem;
  background: #000;
  color: #fff;
  text-align: center;
  border-radius: 0.1rem;
}
.huodong .left .countdown i {
  font-size: 0.3rem;
  margin: 0 0.1rem;
}
.huodong .left .countdown .seckill {
  display: inline-block;
  width: 1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: yellow;
  font-size: 0.4rem;
  text-align: center;
}
.huodong .left .limitedGoods {
  height: 2.5rem;
  width: 100%;
}
.huodong .right {
  display: flex;
  flex-direction: column;
  flex: 1;
  border-left: 1px solid #f0f0f0;
}
.huodong .right .head {
  font-size: 0.2rem;
  display: flex;
}
.huodong .right .brand {
  color: #f32985;
  font-size: 0.3rem;
}
.huodong .right .discount {
  background: #f32985;
  color: #fff;
  font-size: 0.2rem;
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
.huodong .right .daily {
  color: #888;
}
.huodong .right .head img {
  /* width: 1rem; */
  height: 1.5rem;
}
.huodong .right .bottom {
  border-top: 1px solid #888;
  display: flex;
}
.huodong .right .bottom .bottomLeft {
  flex: 1;
  padding: 0.1rem;
}
.huodong .right .bottom .title {
  color: #f32985;
  font-size: 0.3rem;
}
.huodong .right .bottom .info {
  color: #999;
  font-size: 0.2rem;
  margin-top: 0.15rem;
}
.huodong .right .bottom .bottomRight {
  border-left: 1px solid #888;
  flex: 1;
  padding: 0.1rem;
}
.huodong > .right > .bottom img {
  margin-top: 0.3rem;
  width: 1.4rem;
}
.goods {
  margin-top: 0.1rem;
}
.goods .btnUl {
  display: flex;
  height: 1rem;
}
.goods .btnUl li {
  flex: 1;
  border: 1px solid #000;
  font-size: 0.3rem;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  border: 1px solid #f0f0f0;
}
#page > div.goods > div:nth-child(2),
#page > div.goods > div:nth-child(3),
#page > div.goods > div:nth-child(4) {
  margin-bottom: 1.2rem;
}
#page > div.goods > ul > li.active {
  background: #f26b11;
  color: #fff;
}
.goods .content {
  display: flex;
  height: 3rem;
  margin-bottom: 0.1rem;
}
.goods .content img {
  width: 3rem;
  height: 3rem;
}
.goods .content .info p {
  margin: 0.2rem;
}
.goods .content .info .title {
  overflow: hidden;
  width: 2.8rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.35rem;
}
.goods .content .info .price {
  font-size: 0.3rem;
  color: red;
}
.goods .content .info .sales {
  font-size: 0.3rem;
  color: #888;
}
.goods .content .info .buy {
  width: 2.2rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background: #f26b11;
  color: #fff;
  border-radius: 0.15rem;
  font-size: 0.3rem;
}
</style>