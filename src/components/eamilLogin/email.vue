<template>
  <div className="container">
    <div className="login_box">
      <div className="login_img">
        <img
          src="https://music.qier222.com/img/logos/netease-music.png"
          alt=""
        />
        <p className="login_by_ncmaccount">登录网易云账号</p>
      </div>
      <div className="login_Input">
        <div className="username">
          <i className="iconfont icon-youxiang"></i>
          <input type="text" placeholder="邮箱" v-model="email" />
        </div>
        <div className="psd">
          <i className="iconfont icon-logo-flickr"></i>
          <input type="password" placeholder="密码" v-model="password" />
        </div>
        <div className="loginIn">
          <button className="login_btn" @click="loginIn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RES } from "./index";
import { loginByEmail } from "../../api/login/login";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setCookie } from "../../utils/cookie";
import { getUserAccount } from "../../api/account/userAccount";
const router = useRouter();
const store = useStore();
const emits = defineEmits<{ (e: string, data: boolean): void }>();
const send = () => {
  emits("sendEmailLogin", true);
};
let email = ref<string>("");
let password = ref<string>("");
// 登录验证
const loginByEmailTo = () => {
  loginByEmail(email.value, password.value).then((res: RES) => {
    const { data } = res;
    console.log(data);
    if (data.code !== 200) {
      ElNotification.error({
        title: "Error",
        message: "用户名或密码错误",
        offset: 100,
      });
    } else {
      ElNotification.success({
        title: "Error",
        message: "登录成功",
        offset: 100,
      });
      setCookie(data.cookie); // 存放cookie
      store.commit("updateDataByAccount", {
        key: "loginMode",
        value: "account",
      });
      store.dispatch("getUserProfile").then((): void => {
        store.dispatch("getUserLikePlayList").then((): void => {
          router.push({
            name: "Homes",
            params: {},
          });
        });
      });
    }
  });
};
// 邮箱验证
const checkEmail = (): void => {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!reg.test(email.value)) {
    ElNotification.error({
      title: "Error",
      message: "请输入正确的邮箱地址",
      offset: 100,
    });
  } else {
    loginByEmailTo();
  }
};
// 登录
const loginIn = async() => {
  checkEmail();
  getUserAccount().then((res) => {
  const {data:{account}} = res
  console.log(account)
  console.log(store.state.data)
});
};
</script>
<style scoped lang="less">
.container {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 540px;
  .login_box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .login_img {
      width: 104px;
      height: 104px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        width: 40px;
        height: 40px;
      }
      .login_by_ncmaccount {
        width: 200px;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translateX(-50%);
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
          BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
          Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
          microsoft uighur;
        font-weight: 900;
      }
    }
    .login_Input {
      width: 350px;
      height: 250px;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eaeffd;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-border-radius: 10px;
      .iconfont {
        margin-left: 5px;
        font-size: 16px;
        font-weight: 900;
        z-index: 9999;
        line-height: 40px;
      }
      .username {
        width: 320px;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f5f5f7;
        border-radius: 10px;
        input {
          width: 280px;
          height: 40px;
          background-color: #fff;
          border: none;
          outline: none;
          background-color: #f6f6f6;
          padding-left: 10px;
        }
      }
      .psd {
        width: 320px;
        position: absolute;
        top: 38%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f5f5f7;
        border-radius: 10px;

        input {
          width: 280px;
          height: 40px;
          background-color: #fff;
          border: none;
          outline: none;
          background-color: #f5f5f7;
          padding-left: 10px;
        }
      }
      .loginIn {
        width: 320px;
        height: 50px;
        position: absolute;
        top: 72%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f6f6f6;
        border-radius: 10px;
        .login_btn {
          width: 320px;
          height: 50px;
          font-size: 18px;
          font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
            Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
            sans-serif, microsoft uighur;
          font-weight: 900;
          color: blue;
          border: none;
          outline: none;
          &:hover {
            cursor: pointer;
            background-color: #eee;
          }
        }
      }
    }
    .change_login_way {
      width: 180px;
      height: 40px;
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      ul {
        list-style: none;
        padding-inline-start: 0;
        display: flex;
        justify-content: space-between;
        li {
          color: blue;
          font-weight: 900;
          font-family: BlinkMacSystemFont, Helvetica Neue, PingFang SC,
            Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
            WenQuanYi Micro Hei, sans-serif, microsoft uighur;
          &:hover {
            cursor: pointer;
            color: #f4528b;
          }
        }
      }
    }
  }
}
</style>
