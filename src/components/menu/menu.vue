<template>
  <div className="container">
    <div className="ml">
      <div className="left">
        <ul>
          <li
            className="menu_list"
            v-for="(item, index) in componentsTab"
            :key="index"
            @click="switchComponent(item, index)"
            :class="{ active: index === current, menu_list: index !== current }"
          >
            {{ item.name }}
          </li>
          <keep-alive>
            <component :is="currentComponent.comp"></component>
          </keep-alive>
        </ul>
      </div>
      <div className="right">
        <div className="create_list">
          <span
            ><el-icon><Plus /></el-icon> </span
          ><span>{{ create }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, reactive, ref, shallowRef } from "vue"
import { useStore } from "vuex"
import { MS } from "./index";
import Ranking from "../ranking/ranking.vue"
import Ablums from "../ablums/ablums.vue"
import Song from "../songlist/song.vue"
import Follow from "../follows/follows.vue"
import Followed from "../followed/followed.vue"
import MvRaw from "../mv/mv.vue"
// import SongList from "../songlist/song.vue"
const color = ref("blue")
const store = useStore()
const current = ref<number>(0)
const create = ref<string>("新建歌单")
// 切换组件
const componentsTab = reactive([
{
    name: "全部歌单",
    comp: markRaw(Song),
  },
  {
    name: "专辑",
    comp: markRaw(Ablums),
  },
  {
    name: "MV",
    comp: markRaw(MvRaw),
  },
  {
    name: "我的关注",
    comp: markRaw(Follow),
  },
  {
    name: "我的粉丝",
    comp: markRaw(Followed),
  },
  {
    name: "听歌排行",
    comp: markRaw(Ranking),
  },
])
let currentComponent = reactive({
  comp: componentsTab[0].comp,
})
const switchComponent = (component: any, index: any) => {
  current.value = index;
  currentComponent.comp = component.comp;
}
</script>

<style scoped lang="less">
.active {
  background-color: #f5f5f7;
  border-radius: 6px;
  padding: 10px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
    microsoft uighur;
  &:hover {
    cursor: pointer;
  }
}
.container {
  width: 100%;
  position: absolute;
  top: 530px;
  .ml {
    width: 1380px;
    position: absolute;
    left: 51.3%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    .left {
      ul {
        display: flex;
        list-style: none;
        padding-inline-start: 0;
        .menu_list {
          padding: 10px;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
          font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
            Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
            sans-serif, microsoft uighur;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .right {
      width: 116px;
      height: 40px;
      padding: 10px;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: 900;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
        Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
        microsoft uighur;
      .create_list {
        span {
          position: relative;
          .el-icon {
            position: absolute;
            top: 3px;
            left: -21px;
          }
        }
      }
    }
  }
}
</style>
