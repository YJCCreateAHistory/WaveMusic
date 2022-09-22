<template>
  <QRcode v-if="qrcode"> </QRcode>
  <!-- <EmailLogin v-if="email"></EmailLogin> -->
  <CellPhone v-if="cellphone"></CellPhone>
  <div className="change_login_way">
    <ul>
      <li @click="changeWayEmail">{{ loginWay }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import Nmheader from "../../components/navigation/Nmheader.vue";
import QRcode from "../../components/qrcode/qrcode.vue";
import EmailLogin from "../../components/eamil/email.vue";
import CellPhone from "../../components/cellphone/cellphone.vue";

let qrcode = ref<boolean>(true);
let cellphone = ref<boolean>(false);
let loginWay = ref<string>("手机登录");
const changeWayEmail = () => {
  qrcode.value = !qrcode.value;
  cellphone.value = !cellphone.value
  if(qrcode.value === true) {
    loginWay.value = "手机登录"
  }else if(qrcode.value === false) {
    loginWay.value = "二维码登录"
  }
};

</script>
<style scoped lang="less">
.change_login_way {
  width: 200px;
  height: 40px;
  position: absolute;
  top: 566px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  ul {
    list-style: none;
    padding-inline-start: 0;
    // display: flex;
    // justify-content: space-between;
    li {
      color: #000;
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
</style>
