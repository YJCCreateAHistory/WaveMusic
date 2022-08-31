<template>
  <div className="container">
    <div className="user">
      <div className="avatar">
        <img :src="info.m.avatar" alt="" />
      </div>
      <div className="username">
        {{ info.m.nickname + lib }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { INFO } from "./index";
const store = useStore();
const lib = ref<string>("的音乐库");
const {
  profile: { avatarUrl },
} = store.state.data.userData;
const {
  profile: { nickname },
} = store.state.data.userData;

const info = reactive<INFO>({
  m: {
    avatar: avatarUrl,
    nickname: nickname,
  },
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  position: absolute;
  top: 80px;
  background: #fff;
  height: 100px;
  .user {
    display: flex;
    height: 80px;
    width: 1380px;
    position: absolute;
    left: 52%;
    transform: translateX(-50%);
    .avatar {
      border-radius: 50%;
      height: 80px;
      width: 80px;
      overflow: hidden;
      img {
        height: 80px;
        width: 80px;
      }
    }
    .username {
        line-height: 80px;
        margin-left: 20px;
        font-size: 30px;
        font-family: Barlow,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,microsoft uighur;
        font-weight: 900;
    }
  }
}
</style>
