<template>
  <div class="goods">
    <mt-header title="购物车页">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- <div @click="logout" v-if="userInfo.uid&&cartsList" class="logout">退出登录</div> -->
    <div v-if="!userInfo.uid" class="tip">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gouwuche-copy" />
      </svg>
      <p>登录后即可同步购物车数据哦~</p>
      <mt-button type="primary" size="large" class="login" @click.native.capture="login">登录账号</mt-button>
    </div>
    <div
      class="content"
      ref="mycontent"
      v-for="(item,index) in goodsList"
      :key="index"
      @touchstart="start($event,index)"
      @touchmove="move($event,index)"
      @touchend="end(index)"
    >
      <div class="left" ref="left">
        <p class="check">
          <input type="checkbox" :checked="item.checkState" @click="one(index,item)" />
        </p>
        <img :src="item.img" />
        <div class="info">
          <p class="title">{{item.goodsname}}</p>
          <p class="price">价格：￥{{item.price}}</p>
          <p class="sales">
            数量：
            <button @click="sub(item.id,index)">-</button>
            {{item.num}}
            <button @click="add(item.id,index)">+</button>
          </p>
        </div>
        <div class="right">
          <mt-button type="danger" @click="del(item.id,index)" id="del">删除</mt-button>
        </div>
      </div>
    </div>
    <footer class="footer">
      <p class="check">
        <input type="checkbox" @click="all" :checked="allCheck" />全选
      </p>
      <p class="order">总价：{{totalPrice}}</p>
    </footer>
  </div>
</template>

<script>
import vTab from "../views/tabBar";
import { mapGetters, mapActions } from "vuex";
import { MessageBox } from "mint-ui";
import {cartList,cartInfo,cartEdit,cartDelete} from '../../common/js/app'
export default {
  data() {
    return {
      goodsList: "",
      allCheck: false,
      oneCheck: false,
      checkArr: [],
      totalPrice: 0
    };
  },
  components: {
    vTab
  },
  computed: {
    ...mapGetters(["userInfo", "cartsList"])
  },
  activated() {
    if (this.$route.path == "/cart") {
      this.delCartsListSync([]);
      this.getCartList();
      this.allCheck = false;
      this.checkArr = [];
    }
  },
  // watch: {
  //   $route(to) {
  //     if (to.path == "/cart") {
  //       this.delCartsListSync([]);
  //       this.getCartList();
  //     }
  //   }
  // },
  mounted() {
    if (this.userInfo.uid) {
      // this.allCheck=false;
      this.getCartList();
    } else {
      MessageBox.alert("请先登录").then(action => {
        this.$router.push("/register");
      });
    }
  },
  methods: {
    ...mapActions([
      "setCartsNumSync",
      "setCartsListSync",
      "setAdminUserSync",
      "delCartsListSync",
      "delCartsGoodSync"
    ]),
    login() {
      this.$router.push("/login");
    },
    start: function(e, idx) {
      this.goodsList[idx].startx = e.targetTouches[0].clientX;
      this.goodsList[idx].endx = 0;
    },
    move(e, idx) {
      this.goodsList[idx].endx = e.targetTouches[0].clientX;
    },
    end(idx) {
      //结束的坐标点大于开始的坐标点，认为用户已经从左往右滑动了屏幕
      if (this.goodsList[idx].endx == 0) return;
      if (this.goodsList[idx].endx - this.goodsList[idx].startx < -100) {
        this.$refs.left[idx].style.left = "-1.9rem";
        this.$refs.left[idx].style.transition = "left .2s linear 0s";
      } else {
        this.$refs.left[idx].style.left = 0;
      }
    },
    price() {
      this.totalPrice = this.checkArr.reduce((sum, item) => {
        return (sum += item.num * item.price);
      }, 0);
    },
    one(index, item) {
      item.checkState = !item.checkState;
      let stateInd = this.checkArr.findIndex(oneItem => {
        return oneItem.goodsid == item.goodsid;
      });
      if (stateInd == -1) {
        this.checkArr.push(item);
      } else {
        let ind = this.checkArr.findIndex(hand => {
          return hand.goodsid == item.goodsid;
        });
        this.checkArr.splice(ind, 1);
        if (this.checkArr.length != this.goodsList.length) {
          if (this.allCheck == true) {
            this.allCheck = !this.allCheck;
          }
        }
      }
      let noAll = this.goodsList.findIndex(oneItem => {
        return oneItem.checkState == false;
      });
      if (noAll == -1) {
        //全选
        this.allCheck = !this.allCheck;
      }
      this.price();
    },
    all() {
      this.checkArr = [];
      this.allCheck = !this.allCheck;
      this.goodsList.map(oneItem => {
        oneItem.checkState = this.allCheck;
      });
      if (this.allCheck) {
        this.goodsList.map(item => {
          this.checkArr.push(item);
        });
      } else {
        this.checkArr = [];
      }
      this.price();
    },
    logout() {
      this.setAdminUserSync({});
      this.delCartsListSync([]);
      this.$router.push("/login");
    },
    getCartList() {
      this.http.get(cartList, { uid: this.userInfo.uid }).then(res => {
        if (res.data.code == 200) {
          this.goodsList = res.data.list;
          this.goodsList.map(item => {
            item.checkState = false;
            item.endx = 0;
            item.startx = 0;
          });
          if (this.goodsList != null) {
            this.setCartsListSync(this.goodsList);
          }
        }
      });
    },
    add(goodsId, ind) {
      this.setCartsNumSync([ind, 2]);
      this.http.post(cartEdit, { id: goodsId, type: 2 });
      this.http.get(cartList, { uid: this.userInfo.uid }).then(res => {
        if (res.data.code == 200) {
          this.goodsList = res.data.list;
          this.checkArr.map(caItem => {
            if (caItem.id == goodsId) {
              caItem.num++;
            }
            if (caItem.checkState) {
              this.goodsList.map(item => {
                if (item.id == caItem.id) {
                  item.checkState = true;
                } 
              });
            }
          });
          console.log(this.checkArr)
          this.price();
        }
      });
    },
    sub(goodsId, ind) {
		let flag = false;
		this.cartsList.map(item=>{
			// console.log(item.id)
			if(goodsId==item.id&&item.num==1){
				flag =true;
			}
		})
		if(flag){
			return;
		}
      this.setCartsNumSync([ind, 1]);
      this.http.post(cartEdit, { id: goodsId, type: 1 });
      this.http.get(cartList, { uid: this.userInfo.uid }).then(res => {
        if (res.data.code == 200) {
          this.goodsList = res.data.list;
          this.checkArr.map(caItem => {
            if (caItem.id == goodsId) {
              caItem.num--;
            }
            if (caItem.checkState) {
              this.goodsList.map(item => {
                if (item.id == caItem.id) {
                  item.checkState = true;
                }
              });
            }
          });
          this.price();
        }
      });
    },
    del(goodsId, ind) {
      this.delCartsGoodSync(ind);
      this.http.post(cartDelete, { id: goodsId });
      this.http.get(cartList, { uid: this.userInfo.uid }).then(res => {
        if (res.data.code == 200) {
          this.delCartsListSync([]);
          if (res.data.list != null) {
            this.setCartsListSync(res.data.list);
          }
          this.goodsList = res.data.list;
          this.$refs.left.map((item, idx) => {
            item.style.left = "0";
            item.style.transition = "left 0s";
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.icon {
  width: 3em;
  height: 3em;
  display: inherit;
  margin: 0 auto 0.3rem;
  fill: currentColor;
  overflow: hidden;
}
.goods .content {
  display: flex;
  height: 3rem;
  margin-bottom: 0.1rem;
  position: relative;
  overflow: hidden;
}
.goods .content .left {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
}
.goods .content .right {
  height: 100%;
  position: absolute;
  right: -1.6rem;
  top: 0;
}
.goods .content img {
  width: 3rem;
  height: 3rem;
}
.goods .content .info {
  /* display: flex; */
}
.goods .content .info p {
  margin: 0.2rem;
}
.goods .content .info .title {
  font-size: 0.35rem;
  width: 2.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
#del {
  height: 100%;
}
.footer {
  display: flex;
  position: fixed;
  bottom: 1.2rem;
  font-size: 0.4rem;
  justify-content: space-around;
  z-index: 999;
}
.footer p.order {
  margin-left: 3rem;
}
.logout {
  font-size: 0.2rem;
}
.login {
  margin-top: 0.5rem;
}
.tip {
  position: absolute;
  display: inherit;
  margin: 0 auto;
  left: 17%;
  top: 20%;
  font-size: 0.3rem;
}
</style>