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
          <input
            type="text"
            placeholder="手机号"
            v-model="phone"
            @blur.native.capture="check"
          />
        </div>
        <div className="psd">
          <i className="iconfont icon-logo-flickr"></i>
          <input type="text" placeholder="请输入验证码" v-model="verify" />
          <el-button
            type="primary"
            class="virefBtn"
            @click="Verification"
            v-show="show"
            >{{ virefText }}</el-button
          >
          <el-button type="primary" class="virefBtnCount" v-show="!show"
            >{{ count }}s后重新发送</el-button
          >
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
import {
  loginByCellPhone,
  sendVirefMessage,
  checkVirefMessage,
} from "../../api/login/login";
import router from "../../router";
import { RES } from "./index";
import { useStore } from "vuex";
import { getUserAccount } from "../../api/account/userAccount";
const store = useStore();
let phone = ref<string>("");
const verify = ref<string>("");
let virefText = ref<string>("发送验证码");
const show = ref(true);
const timer = ref();
const count = ref();
let TIME_COUNT = ref<number>(60);
const check = (): void => {
  let reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (reg.test(phone.value)) {
    return;
  } else {
    ElNotification.error({
      title: "Error",
      message: "手机号格式有误，请重新输入",
      offset: 100,
    });
  }
};
const Verification = () => {
  sendVirefMessage(phone.value);
  if (!timer.value && phone.value !== "") {
    count.value = TIME_COUNT.value;
    show.value = false;
    timer.value = setInterval(() => {
      if (count.value > 0 && count.value <= TIME_COUNT.value) {
        count.value--;
      } else {
        show.value = true;
        clearInterval(timer.value);
        timer.value = null;
      }
    }, 1000);
  }
};
const loginIn = async () => {
  const { data } = await checkVirefMessage<string, string>(phone.value, verify.value);
  if (data.code === 200) {
    store.commit("sendUserIdByPhone", { key: "phone", value: data });
    store.dispatch("getUserAccountByPhone").then((): void => {
      router.push({ name: "Home", params: {} });
    });
  } else {
    ElNotification.error({
      title: "Error",
      message: "验证码错误",
      offset: 100,
    });
  }
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
          width: 184px;
          height: 40px;
          background-color: #fff;
          border: none;
          outline: none;
          background-color: #f5f5f7;
          padding-left: 10px;
        }
        .virefBtn {
          position: absolute;
          height: 41px;
          top: 1px;
          left: 217px;
        }
        .virefBtnCount {
          position: absolute;
          height: 41px;
          top: 1px;
          width: 124.91px;
          left: 182px;
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
