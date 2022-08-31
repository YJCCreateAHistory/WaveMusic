<template>
  <div class="container">
    <div class="NmToNm">
      <div class="myNm">
        <img
          src="https://music.qier222.com/img/logos/yesplaymusic.png
"
          alt=""
        />
      </div>
      <div class="to">
        <el-icon><CloseBold /></el-icon>
      </div>
      <div class="Nm">
        <img
          src="https://music.qier222.com/img/logos/netease-music.png"
          alt=""
        />
      </div>
    </div>
    <div className="chooseLoginWay" @click="goToLogin">
      <div className="nmAccount">
        <div className="nm_login">
          <p class="u">登录网易云账号</p>
          <p class="d">可访问全部数据</p>
        </div>
        <div class="trs">
          <p class="iconfont icon-bofang"></p>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const goToLogin = ()=>{
    router.push({
        name:"Account",
        params:{
            
        }
    })
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  min-width: 1100px;
  left: 50%;
  top: 100px;
  width: 900px;
  height: 650px;
  transform: translateX(-50%);
  .NmToNm {
    display: flex;
    position: absolute;
    left: 50%;
    top: 3%;
    transform: translateX(-50%);
    width: auto;
    .myNm {
      img {
        width: 64px;
        height: 64px;
        padding: 20px;
      }
    }
    .to {
      font-size: 20px;
      height: 110px;
      line-height: 110px;
    }
    .Nm {
      img {
        width: 64px;
        height: 64px;
        padding: 20px;
      }
    }
  }
  .chooseLoginWay {
    width: 300px;
    position: absolute;
    left: 50%;
    top: 22%;
    transform: translateX(-50%);
    .nmAccount {
      width: 300px;
      height: 128px;
      background-color: #eaeffd;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-border-radius: 10px;
      .nm_login {
        width: 300px;
        height: 128px;
        transition: all 0.3s;
        color: blue;
        font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
          BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
          Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
          microsoft uighur;
        .u,
        .d {
          width: 200px;
          position: absolute;
          left: 53%;
          transform: translateX(-50%);
        }
        .u {
          font-size: 22px;
          font-weight: 900;
          top: 13px;
        }
        .d {
          top: 46px;
        }
      }
      .trs {
        position: absolute;
        top: 24%;
        left: 80%;
        font-size: 20px;
        z-index: 9999;
        transform: translateX(-50%);
        opacity: 0;
        height: 24px;
        width: 24px;
        transition: all 0.3s;
      }
    }
    &:hover {
        cursor: pointer;
      .nm_login {
        transform: translateX(-8px);
      }
      .trs {
        opacity: 1;
        visibility: visible;
        transform: translateX(8px);
      }
    }
  }
}
</style>
