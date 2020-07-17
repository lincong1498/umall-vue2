<template>
  <div>
    <mt-header title="商品详情页">
      <router-link to="/goodsList" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="content" v-for="item of goodsInfo" :key="item.id">
      <img :src="item.img" />
      <div class="info">
        <p class="title">{{item.goodsname}}</p>
        <p class="price">
          ￥{{item.price}}
          <span class="sales">市场价：￥{{item.market_price}}</span>
        </p>
        <mt-cell title="是否为新品" :value="item.isnew==1?'是':'否'" class="isnew"></mt-cell>
        <mt-cell title="是否为热卖" :value="item.ishot==1?'是':'否'" class="ishot"></mt-cell>
        <mt-button class="buy" @click.prevent="addCart(item.id)" type="primary">立即抢购</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["goodsInfo","userInfo"])
  },
  methods: {
    addCart(id){
      if (this.userInfo.uid) {
        this.http.post( "/api/cartadd",{ uid:this.userInfo.uid,goodsid:id, num:1}
        ).then(res => {
          if (res.data.code == 200) {
            // console.log(res.data)
            // this.setCartsListSync(res.data.list);
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
    }
  },
  mounted () {
    console.log(this.goodsInfo)
  }
};
</script>

<style scoped>
.content{
  margin-bottom: 2rem;
}
.content img {
  width: 100%;
  height: 100%;
}
.content .title {
  font-size: .32rem;
  line-height: .42rem;
}
.content .price {
  color: red;
  font-size: 0.35rem;
  margin: 0.2rem 0;
}
.content .price .sales{
  font-size: .25rem;
  color: #999;
  text-decoration: line-through;
}
.content .info{
  margin-left: .2rem;
}
.mint-cell-value{
  color: red !important;
}
</style>