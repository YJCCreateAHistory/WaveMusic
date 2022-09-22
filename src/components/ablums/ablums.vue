<template>
  <div className="container">
    <div className="lists">
      <ul>
        <li
          className="songlist"
          v-for="(item, index) in ablums.data"
          :key="item.id"
        >
          <div className="coverImg">
            <img :src="item.picUrl" alt="" />
          </div>
          <div className="create_by">
            <div className="ablum_name">
              {{ item.name }}
            </div>
            <div className="name">
              {{ item.artists.name }}
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
import { getAlbumList } from "../../api/music/music";
const store = useStore();
let ablums = reactive<any>({
  data: [],
});
onMounted(async () => {
  const {data:{data}} = await getAlbumList();
  ablums.data = data
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  position: absolute;
  top: 60px !important;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
    microsoft uighur;
  .lists {
    width: 1380px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ul {
      max-width: 1380px;
      list-style: none;
      padding-inline-start: 0;
      margin-block-start: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .songlist {
        width: 200px;
        height: 280px;
        position: relative;
        padding: 10px;
        &:hover {
          cursor: pointer;
        }
        .coverImg {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 20px;
          &:hover {
            box-shadow: 0px 9px 15px -3px rgba(0, 0, 0, 0.3);
          }
          img {
            width: 200px;
            height: 200px;
          }
        }
        .create_by {
          margin-top:20px;
          text-align: center;
          font-weight: 900;
        }
      }
    }
  }
}
</style>
