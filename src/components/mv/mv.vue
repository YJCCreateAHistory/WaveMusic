<template>
  <div className="container">
    <div className="video_list">
      <ul>
        <li v-for="(item, index) in mvs.data" @click="goPlayMv(item)" :key="item.id">
          <div className="v">
            <!-- <vue-plyr :options="options">
              <video controls playsinline>
                <source
                  size="1080"
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                  type="video/mp4"
                />
              </video>
            </vue-plyr> -->
            <img :src="item.coverUrl" alt="" />
          </div>
          <div className="intr">
            <div className="title">
              {{ item.title }}
            </div>
            <div className="author">
              {{ item.creator[0].userName }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { getMvList } from "../../api/mv/mv";
import {useRouter} from "vue-router"
const router = useRouter()
const store = useStore();
const mvs = reactive<{ [key: string]: Array<any> }>({
  data: [],
});
onMounted(async () => {
  const {
    data: { data },
  } = await getMvList();
  console.log(data)
  mvs.data = data;
});
const goPlayMv = (item:string)=>{
    router.push({
        name:"Play",
        params:{
            data:item
        }
    })
}
// const options = {
//   i18n: {
//     speed: "速度",
//     normal: "正常",
//   },
// };
</script>

<style scoped lang="less">
    
.container {
  position: absolute;
  top: 70px !important;
  width: 100%;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
    microsoft uighur;
  .video_list {
    padding-bottom: 200px;
    width: 1380px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ul {
      padding-inline-start: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 400px;
        height: 240px;
        padding: 20px;
        padding-bottom: 30px;
        &:hover {
          cursor: pointer;
        }
        .v {
          width: 400px;
          height: 200px;
          border-radius: 20px;
          overflow: hidden;
          img {
            width: 400px;
            height: 200px;
          }
        }
        .intr {
          .title {
            padding-top: 10px;
            padding-bottom: 10px;
            width: 400px;
            height: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 18px;
            font-weight: 900;
          }
          .author {
          }
        }
      }
    }
  }
}
</style>
