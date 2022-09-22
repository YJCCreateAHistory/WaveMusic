<template>
  <div className="container1">
    <div className="c">
      <div className="title">{{ author_info.info[0] }}</div>
      <div className="videoPlay">
        <vue-plyr :options="options">
          <video controls playsinline>
            <source size="1080" :src="data" type="video/mp4" />
          </video>
        </vue-plyr>
      </div>
      <div className="text">
        <p>{{ md.description }}</p>
      </div>
      <div className="author_area">
        <div className="avatar">
          <img :src="author_info.info[1]" alt="" />
        </div>
        <div className="author_name">
          <p className="name">{{ author_info.info[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { reactive } from "@vue/reactivity";
import Nmheader from "../../components/navigation/Nmheader.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();
const options = {
  i18n: {
    speed: "速度",
    normal: "正常",
  },
};
console.log(store.state);
const data = store.state.mv.vd[0].url;
const md = store.state.data.md;
const title = md.name === undefined ? md.title : md.name
const nickname = md.artists===undefined ? md.creator.nickname : md.artists[0].name
const avatarUrl = md.artists === undefined ? md.creator.avatarUrl : md.artists[0].img1v1Url
const author_info = reactive<{ [key: string]: Array<string> }>({
  info: [title, avatarUrl, nickname],
});
</script>

<style scoped lang="less">
.container1 {
  width: 100%;
  position: absolute;
  top: 80px;
  padding-bottom: 200px;
  .c {
    width: 1380px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 22px;
      font-weight: 900;
    }
    .videoPlay {
      width: 1380px;
      height: 600px;
      border-radius: 20px;
      overflow: hidden;
    }
    .text {
      font-size: 18px;
      font-weight: 900;
    }
    .author_area {
      display: flex;
      padding-top: 40px;
      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 70px;
          height: 70px;
        }
      }
      .author_name {
        padding: 10px;
        .name {
          font-size: 20px;
          font-weight: 900;
        }
      }
    }
  }
}
</style>
