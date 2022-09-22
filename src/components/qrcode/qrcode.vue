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
      <div className="qrcode">
        <div className="codeQr">
          <img :src="qrimg" alt="" />
        </div>
        <p className="open">{{ remindText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, onMounted } from "vue";
import { RES } from "./index";
import {
  haveQRcodeKey,
  createQrcode,
  checkQrcodeLoginState,
  getLoginStatus,
} from "../../api/login/login";
import QRCode from "qrcode";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setCookie, getCookie } from "../../utils/cookie";

const store = useStore();
const router = useRouter();
let qrcodeKey = ref<string>("");
let qrimg = ref<string>("");
let key = ref<string>("");
const getQrcodeKey = () => {
  haveQRcodeKey().then((res: RES) => {
    const {
      data: { data },
    } = res;
    key.value = data.unikey;
    if (data.code === 200) {
      qrcodeKey.value = data.unikey;
      // 将网址信息解析为二维码
      QRCode.toString(
        `https://music.163.com/login?codekey=${qrcodeKey.value}`,
        {
          width: 192,
          margin: 0,
          color: {
            dark: "#335eea",
            light: "#00000000",
          },
          type: "svg",
        }
      )
        .then((svg: any) => {
          qrimg.value = `data:image/svg+xml;utf-8,${encodeURIComponent(svg)}`; //解析
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  });
};
onMounted(() => {
  getQrcodeKey();
});

// 二维码状态
let remindText = ref<string>("打开网易云音乐APP扫码登录");
const timingToCheckState = setInterval(() => {
  checkQrcodeLoginState<string>(key.value).then(async (res: RES) => {
    let { data } = res;
    if (data.code === "") return;
    if (data.code === 800) {
      getQrcodeKey();
      remindText.value = "二维码已失效，请重新扫码";
      clearInterval(timingToCheckState);
    } else if (data.code === 802) {
      clearInterval(timingToCheckState);
      remindText.value = "扫描成功，请在手机确认登录";
    } else if (data.code === 803) {
      clearInterval(timingToCheckState);
      setCookie<string>(data.cookie);
      remindText.value = "登录成功，正在跳转中...";
      const resCode = await getLoginStatus<string>(data.cookie);
      if (resCode.data.data.code === 200) {
        store.commit("sendDetailTostore", {
          key: "userData",
          value: {
            account: resCode.data.data.account,
            profile: resCode.data.data.profile,
          },
        });
        store.dispatch("getUserAccountProfile").then((): void => {
          store.dispatch("getUserLikePlayList").then((): void => {
            router.push({
              name: "Home",
              params: {},
            });
          });
        });
      }
    }
  });
}, 5000);
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 480px;
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
    .qrcode {
      width: 290px;
      height: 290px;
      position: absolute;
      top: 28%;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      .codeQr {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 260px;
        height: 260px;
        text-align: center;
        background-color: #eaeffd;
        border-radius: 15px;
        img {
          margin-top: 30px;
          width: 200px;
          height: 200px;
        }
      }
      .open {
        width: 260px;
        position: absolute;
        left: 50%;
        top: 100%;
        color: #000;
        font-weight: 900;
        transform: translate(-50%, -50%);
        font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
          BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
          Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
          microsoft uighur;
        &:hover {
          color: #f4528b;

          cursor: pointer;
        }
      }
    }
  }
}
</style>
