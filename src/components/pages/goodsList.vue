<template>
  <div class="goods">
    <mt-header title="商品列表页">
      <router-link to="/cate" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="content" v-for="item of goodsList" :key="item.id" @click="goodsDetail(item.id)">
      <img :src="item.img" />
      <div class="info">
        <p class="title">{{item.goodsname}}</p>
        <p class="price">￥{{item.price}}</p>
        <p class="sales">市场价：￥{{item.market_price}}</p>
        <p class="buy" @click.stop="addCart(item.id)">立即抢购</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { MessageBox } from 'mint-ui';
import {getGoodsInfo,cartAdd} from '../../common/js/app'
export default {
  data() {
    return {
      sid: ""
    };
  },
  computed: {
    ...mapGetters(["goodsList", "userInfo"])
  },
  methods: {
    ...mapActions(["setGoodsListSync", "setGoodsInfoSync","setCartsListSync"]),
    addCart(id) {
      if (this.userInfo.uid) {
        this.http.post( cartAdd,{ uid:this.userInfo.uid,goodsid:id, num:1}
        ).then(res => {
          if (res.data.code == 200) {
            this.$router.push('/cart');
          }else{
            MessageBox.alert(res.data.msg).then(action => {
            this.$router.push("/login");
            });
          }
        });
      } else {
        MessageBox.alert('请先登录').then(action => {
            this.$router.push("/login");
            });
      }
    },
    goodsDetail(id) {
      this.axios({
        url: getGoodsInfo,
        params: { id }
      }).then(res => {
        if (res.data.code == 200) {
          this.setGoodsInfoSync(res.data.list);
          this.$router.push("/goodsInfo");
        }
      });
    }
  }
};
</script>

<style scoped>
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
    font-size: 0.35rem;
  width: 2.8rem;
  overflow: hidden;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
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