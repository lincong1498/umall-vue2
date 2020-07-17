export default {
    setAdminUser(state, info) {
        state.adminUser = info;
    },
    setGoodsList(state, info) {
        state.goodsList = info;
    },
    setGoodsInfo(state, info) {
        state.goodsInfo = info;
    },
    // 购物车列表
    setCartsList(state, info) {
        // console.log(info);
        if(info==null){
            console.log(1111)
        }
        // 购物车里有东西
        if (state.cartsList == 0) {
            // 第一次赋值
            // console.log(info)
            info.map(item => {
                state.cartsList.push(item);
            })
        }else{
            state.cartsList.map((item,index)=>{
                if (item.goodsid == info[index].goodsid) {

                    // this.commit('setCartsNum', [index, 2]);
                }else{
                    state.cartsList.push(item);
                }
            })
        }
    },
    // 退出登录删除购物车
    delCartsList(state, info) {
        state.cartsList = info;
    },
    //修改购物车数量
    setCartsNum(state, [id, type]) {
        if (type == 1) {
            state.cartsList[id].num--;
        } else {
            state.cartsList[id].num++;
        }
    },
    // 删除购物车一件商品
    delCartsGood(state, id) {
        state.cartsList.map((item, index) => {
            if (item.goodsid == id) {
                state.cartsList.splice(index, 1)
            }
        })
    }
}