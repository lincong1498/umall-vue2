<template>
  <div class="cate">
    <mt-header title="商品分类页">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="pageContent">
      <div class="left">
        <ul>
          <li
            v-for="(item,index) of cateTree"
            :key="index"
            @click="secondClassChange(index)"
          >{{item.catename}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="list">
          <div
            class="item"
            v-for="item of cateChildren"
            :key="item.id"
            @click="getCateGoods(item.id)"
          >
            <img :src="item.img" alt />
            <span>{{item.catename}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getCateTree,getCateGoods} from '../../common/js/app'
export default {
  data() {
    return {
      cateTree: "",
      cateChildren: "",
      cateGoods: "",
      goodList: ""
    };
  },
  methods: {
    ...mapActions(['setGoodsListSync']),
    secondClassChange(id) {
      this.cateChildren = this.cateTree[id].children;
    },
    getCateGoods(sid) {
      this.axios({
        url:getCateGoods,
        params: { sid }
      }).then(res => {
        if (res.data.code == 200) {
          this.setGoodsListSync(res.data.list)
          this.$router.push("/goodsList");
        }
      });
    }
  },
  mounted() {
    this.axios.get(getCateTree).then(res => {
      this.cateTree = res.data.list;
      this.cateChildren = this.cateTree[0].children;
    });
  }
};
</script>

<style scoped>
.mint-header {
  background: blue;
}
#root > div.cate {
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
}
.cate .pageContent {
  margin: 0.6rem 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.cate ul {
  flex-direction: column;
}
.cate .pageContent .left {
  width: 2rem;
  border-right: 1px solid #fff;
}
/* .cate .pageContent .left ul{
    width: 2rem;
    border-right: 1px solid #fff;
} */
.cate .pageContent .right {
  flex: 1;
}
.cate .pageContent .right .list {
  display: flex;
  justify-content: space-around;
}
.cate .pageContent .right .item {
  width: 33%;
  height: 2rem;
  flex-wrap: wrap;
}
.cate .pageContent .right .item img {
  width: 100%;
  height: 80%;
}
.cate .pageContent .right .item span {
  font-size: 0.3rem;
}
.cate .pageContent .left li {
  font-size: 0.35rem;
  padding: 0.2rem;
}
</style>