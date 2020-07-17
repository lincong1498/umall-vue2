export default{
    // 异步用改变用户信息
    setAdminUserSync({commit},info){
        commit('setAdminUser',info);
    },
    // 商品列表
    setGoodsListSync({commit},info){
        commit('setGoodsList',info);
    },
    // 商品详情
    setGoodsInfoSync({commit},info){
        commit('setGoodsInfo',info);
    },
    // 获取购物车列表
    setCartsListSync({commit},info){
        commit('setCartsList',info);
    },
    // 退出登录，删除购物车数据
    delCartsListSync({commit},info){
        commit('delCartsList',info);
    },
    // 购物车商品数量
    setCartsNumSync({commit},[id,type]){
        commit('setCartsNum',[id,type]);
    },
    // 删除购物车一件商品
    delCartsGoodSync({commit},id){
        commit('delCartsGood',id);
    },
}