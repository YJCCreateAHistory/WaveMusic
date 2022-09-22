<template>
  <div className="range">
    <el-slider
      :show-tooltip="false"
      v-model="sliderTime.time"
      :format-tooltip="formatTooltip"
      :step="step"
      @mousedown="getDropTime"
      @mouseup="changeCurrentTime"
    />
  </div>
  <div id="ft">
    <div className="c">
      <div className="left">
        <div className="l">
          <div className="ig">
            <img :src="mdu.al.picUrl" alt="" />
          </div>
          <div className="text">
            <p className="name">{{ mdu.name }}</p>
            <p className="author">{{ mdu.al.name }}</p>
          </div>
        </div>
      </div>
      <div className="center">
        <ul className="u1">
          <!-- iconfont icon-bofang l1 -->
          <li className="iconfont icon-shangyishou l1"></li>
          <li
            :class="{
              iconfont: true,
              'icon-bofang': !store.state.play.playmusicFlag.flag,
              'icon-24gf-pause2': store.state.play.playmusicFlag.flag,
              l1: true,
            }"
            @click="playmusic"
          ></li>
          <li className="iconfont icon-xiayishou l1"></li>
        </ul>
      </div>
      <div className="right">
        <ul className="u2">
          <li className="iconfont icon-liebiao l2"></li>
          <li className="iconfont icon-xunhuanbofang l2"></li>
          <li className="iconfont icon-suiji l2"></li>
          <li className="iconfont icon-aixin l2"></li>
          <li
            className="iconfont icon-xiangshang l2 l4"
            @click="showMUsicLyrics()"
          >
            <div className="detail">
              <div className="msc"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <audio
    ref="audio"
    @canplay="getDuration"
    :src="mds.url"
    @play="is_play == false"
    @pause="is_play == true"
    @timeupdate="getCurrentTime"
  ></audio>
  <div
    :class="{
      dialog: true,
      animate__animated: true,
      animate__slideInUp: showDia,
      animate__slideOutDown: showDia1,
    }"
    v-show="showDia"
  >
    <div className="modal" :style="{ background: mdu.al.picUrl }">
      <div
        className="iconfont icon-xiangxia  back"
        @click="donShowLyriscs"
      ></div>
      <div className="ctr">
        <div className="lefts">
          <div className="imgPic">
            <img :src="mdu.al.picUrl" alt="" />
          </div>
          <div className="txt">
            <p className="named">{{ mdu.name }}</p>
            <p className="authored">{{ mdu.al.name }}</p>
          </div>
          <div className="slider">
            <el-slider :show-tooltip="false" />
          </div>
          <div className="qh">
            <ul className="u3">
              <li className="iconfont icon-xunhuanbofang l3"></li>

              <li className="iconfont icon-shangyishou l3"></li>
              <li
                :class="{
                  iconfont: true,
                  'icon-bofang': !store.state.play.playmusicFlag.flag,
                  'icon-24gf-pause2': store.state.play.playmusicFlag.flag,
                  l3: true,
                }"
                @click="playmusic"
              ></li>
              <li className="iconfont icon-xiayishou l3"></li>
              <li className="iconfont icon-suiji l3"></li>
            </ul>
          </div>
        </div>
        <div className="rights"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, reactive, onMounted, watch, onUnmounted } from "vue";
import { computed } from "@vue/reactivity";
import { onBeforeRouteUpdate } from "vue-router";
import { useRouter } from "vue-router";
import { useMusicFormat } from "../../hooks/useMusicFormat";
import axios from "axios"
import "animate.css";
const store = useStore();
const router = useRouter();

const audio = ref();
const duration = ref<number>(0);
const is_play = ref<boolean>(false);
const showDia = ref<boolean>(false);
const showDia1 = ref<boolean>(false);
const step = ref<number>(0.01);
const currentTime = ref(0);
const sliderTime = reactive<{ [key: string]: number }>({
  time: 0,
});
const getDuration = (): void => {
  if (store.state.play.playmusicFlag.flag === true) {
    audio.value.play();
  }
  // 播放时长
  duration.value = audio.value.duration; // 播放总时�?
};
const getCurrentTime = () => {
  currentTime.value = audio.value.currentTime;
  sliderTime.time = currentTime.value;
};
const playmusic = () => {
  if (store.state.play.playmusicFlag.flag === true) {
    audio.value.pause();
    store.commit("sendPlayMusic", {
      key: "playmusicFlag",
      value: { flag: false },
    });
  } else if (store.state.play.playmusicFlag.flag === false) {
    audio.value.play();
    store.commit("sendPlayMusic", {
      key: "playmusicFlag",
      value: { flag: true },
    });
  }
};

const showMUsicLyrics = () => {
  if (showDia1.value === true) {
    showDia1.value = false;
    showDia.value = true;
  } else {
    showDia.value = !showDia.value;
  }
};
const donShowLyriscs = () => {
  if (showDia.value === true) {
    showDia.value = !showDia.value;
    showDia1.value = true;
  }
};
// const sliderLength = ref(null)
const formatTooltip = (val: number) => {
  // 滑动
  return useMusicFormat(val * (duration.value / 1000));
};
// 点击跳转进度
const getDropTime = () => {
  // console.log(sliderTime.time)
  audio.value.currentTime = sliderTime.time;
};
const changeCurrentTime = () => {
  if (store.state.play.playmusicFlag.flag === false) {
    store.commit("sendPlayMusic", {
      key: "playmusicFlag",
      value: { flag: true },
    });
    audio.value.play();
  } else {
  }
};
const mdu = computed(() => {
  return store.state.play.mdu;
});
const mds = computed(() => {
  return store.state.play.mds;
});
onMounted(() => {
  window.addEventListener("beforeunload", () => {
    if (store.state.play.playmusicFlag.flag === true) {
      store.commit("sendPlayMusic", {
        key: "playmusicFlag",
        value: { flag: false },
      });
    }
  });
});
onUnmounted(() => {

  localStorage.setItem("currentTime", audio.value.currentTime);
  window.removeEventListener("beforeunload", () => {});
});
</script>

<style scoped lang="less">
.range {
  width: 100%;
  position: fixed;
  left: 0;
  min-width: 1100px;
  right: 0;
  bottom: 65px;
  margin: 0 auto;
  z-index: 999;
  .el-slider {
    width: 100%;
  }
}
#ft {
  width: 100%;
  position: fixed;
  left: 0;
  min-width: 1100px;
  right: 0;
  bottom: 0;
  height: 80px !important;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  border: none;
  outline: none;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  z-index: 99;
  .c {
    width: 1600px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    position: relative;
    justify-content: space-between;
    .left {
      width: 400px;
      display: flex;
      justify-content: space-between;
      .l {
        display: flex;
        position: absolute;
        top: 15px;
        .ig {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          overflow: hidden;
          &:hover {
            cursor: pointer;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
        .text {
          padding-left: 15px;
          p {
            margin-block-end: 0;
            margin-block-start: 0;
            //   padding: 8px;
            &:hover {
              cursor: pointer;
            }
          }
          p:nth-child(1) {
            font-size: 16px;
            font-weight: 900;
          }
        }
      }
    }
    .center {
      width: 200px;
      height: 80px;
      position: relative;
      .u1 {
        list-style: none;
        padding-inline-start: 0;
        display: flex;
        justify-content: space-between;
        margin-block-start: 0;
        margin-block-end: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .l1 {
          font-size: 28px;
          padding: 20px;
        }
      }
    }
    .right {
      width: 400px;
      height: 80px;
      position: relative;
      .u2 {
        width: 200px;
        height: 20px;
        list-style: none;
        padding-inline-start: 0;
        display: flex;
        justify-content: space-between;
        margin-block-start: 0;
        margin-block-end: 0;
        position: absolute;
        top: 50%;
        left: 70%;
        transform: translate(-50%, -50%);
        .l2 {
          height: 20px;
          line-height: 20px;
          font-size: 18px;
          font-weight: 900;
        }
      }
    }
  }
}
.dialog {
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  // background: url(../../assets/wallhaven-rd57x1_1920x1080.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1100px;
  .modal {
    width: 100vw;
    height: 100vh;
    background-color: rgba(89, 89, 89, 0.55);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    position: relative;
    .back {
      width: 40px;
      height: 40px;
      font-size: 26px;
      font-weight: bold;
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .ctr {
      position: absolute;
      width: 1340px;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      .lefts {
        width: 400px;
        position: relative;
        &:hover {
          cursor: pointer;
        }
        @-webkit-keyframes rotation {
          from {
            -webkit-transform: rotate(0deg);
          }

          to {
            -webkit-transform: rotate(360deg);
          }
        }
        .imgPic {
          width: 340px;
          height: 340px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top: 20px;
          left: 30px;
          -webkit-transform: rotate(360deg);

          animation: rotation 20s linear infinite;

          -moz-animation: rotation 20s linear infinite;

          -webkit-animation: rotation 20s linear infinite;

          -o-animation: rotation 20s linear infinite;
          img {
            width: 340px;
            height: 340px;
          }
        }
        .txt {
          width: 340px;
          position: absolute;
          top: 360px;
          left: 50%;
          transform: translateX(-50%);
          .named {
            font-size: 20px;
            font-weight: 900;
          }
        }
        .slider {
          top: 460px;
          position: absolute;
          left: 51%;
          transform: translateX(-50%);
          width: 340px;
        }
        .qh {
          width: 280px;
          height: 50px;
          position: absolute;
          top: 520px;
          left: 50%;
          transform: translateX(-50%);
          .u3 {
            list-style: none;
            padding-inline-start: 0;
            display: flex;
            justify-content: space-between;
            margin-block-start: 0;
            margin-block-end: 0;
            width: 280px;
            .l3 {
              font-size: 28px;
              font-weight: 900;
              padding-top: 11px;
            }
          }
        }
      }
      .rights {
        width: 900px;
        height: 100vh;
      }
    }
  }
}
</style>
