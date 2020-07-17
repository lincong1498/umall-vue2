<template>
  <div class="root">
    <mt-header :title="title"></mt-header>
    <div class="info">
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        type="tel"
        @blur.native.capture="phoneBlur"
        v-model="phone"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        type="password"
        @blur.native.capture="pwdBlur"
        v-model="password"
      ></mt-field>
      <mt-button type="primary" size="large" class="login" @click="submitInfo">{{title}}</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      title: "用户登录页面",
      phone: "",
      nickname: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["setAdminUserSync"]),
    pwdBlur() {
      if (this.password.length == 0) {
        this.pwdState = "error";
        MessageBox.alert("密码不能为空，请重新输入").then(action => {
          this.password = "";
        });
      } else if (this.password.length < 6) {
        this.pwdState = "error";
        MessageBox.alert("密码不能小于6位，请重新输入").then(action => {
          this.password = "";
        });
      }
    },
    phoneBlur() {
      const reg = /^1(3|5|7|8)\d{9}$/;
      if (!reg.test(this.phone)) {
        this.phoneState = "error";
        MessageBox.alert("手机号格式不正确，请重新输入").then(action => {
          this.phone = "";
        });
      }
    },
    submitInfo() {
      this.axios
        .post("/api/login", { phone: this.phone, password: this.password })
        .then(res => {
          this.setAdminUserSync(res.data.list);
          this.$router.push("/home");
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
html,
body,
#app,
.root,
#root {
  width: 100%;
  height: 50%;
}
.info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login {
  margin: 0.5rem;
  width: 50%;
}
</style>