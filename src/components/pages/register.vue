<template>
  <div class="root">
    <mt-header :title="title"></mt-header>
    <div class="info">
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        :state="phoneState"
        :attr="{ maxlength: 11 }"
        type="tel"
        v-model="phone"
        @blur.native.capture="phoneBlur"
      ></mt-field>
      <mt-field
        label="昵称"
        placeholder="请输入昵称"
        :state="nameState"
        @blur.native.capture="nameBlur"
        v-model="nickname"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        :state="pwdState"
        @blur.native.capture="pwdBlur"
        type="password"
        v-model="password"
      ></mt-field>
      <mt-field
        label="请再输入密码"
        placeholder="请再次输入密码"
        :state="pwdAgainState"
        type="password"
        v-model="pwdAgain"
        @blur.native.capture="pwdAgainBlur"
      ></mt-field>
      <mt-button type="primary" size="large" @click.native.capture="submitInfo" class="register">注册</mt-button>
      <mt-button type="primary" size="large" class="login" @click.native.capture="login">已有账号，登录</mt-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import {register} from '../../common/js/app'
export default {
  data() {
    return {
      title: "用户注册页面",
      phone: "",
      nickname: "",
      password: "",
      pwdAgain: "",
      phoneState: "warning",
      nameState: "warning",
      pwdState: "warning",
      pwdAgainState: "warning"
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["setAdminUserSync"]),
    phoneBlur() {
      const reg = /^1(3|5|7|8)\d{9}$/;
      if (!reg.test(this.phone)) {
        this.phoneState = "error";
        MessageBox.alert("手机号格式不正确，请重新输入").then(action => {
          this.phone = "";
        });
      } else {
        this.phoneState = "success";
      }
    },
    nameBlur() {
      if (this.nickname.length == 0) {
        this.nameState = "error";
        MessageBox.alert("昵称不能为空，请重新输入").then(action => {
          this.nickname = "";
        });
      } else {
        this.nameState = "success";
      }
    },
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
      } else {
        this.pwdState = "success";
      }
    },
    pwdAgainBlur() {
      if (this.pwdAgain.length == 0) {
        this.pwdAgainState = "error";
        MessageBox.alert("第二次输入的密码不能为空，请重新输入").then(
          action => {
            this.pwdAgain = "";
          }
        );
      } else if (this.pwdAgain !== this.password) {
        this.pwdAgainState = "error";
        MessageBox.alert("两次密码不一致，请重新输入").then(action => {
          this.pwdAgain = "";
        });
      } else {
        this.pwdAgainState = "success";
      }
    },
    login() {
      this.$router.push("/login");
    },
    submitInfo() {
      if (this.phoneState == "success") {
        if (this.nameState == "success") {
          if (this.pwdState == "success") {
            if ((this.pwdAgainState = "success")) {
              this.axios
                .post(register, {
                  phone: this.phone,
                  nickname: this.nickname,
                  password: this.password
                })
                .then(res => {
                  if (res.data.code == 200) {
                    Toast({
                      message: "注册成功"
                    });
                    this.$router.push("/login");
                  } else {
                    MessageBox.alert(res.data.msg);
                    this.phone = "";
                    this.nickname = "";
                    this.password = "";
                    this.pwdAgain = "";
                    (this.phoneState = "none"),
                      (this.nameState = "none"),
                      (this.pwdState = "none"),
                      (this.pwdAgainState = "none");
                  }
                });
            }
          }
        }
      } else {
        MessageBox.alert("您输入的信息不正确，请再次检查");
        return false;
      }
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
  height: 80%;
}
.info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.register,
.login {
  margin: 0.3rem;
  width: 50%;
}
</style>