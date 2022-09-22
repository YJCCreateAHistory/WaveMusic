<template>
  <div className="container">
    <div className="c">
      <div className="h">
        <div className="lyrics"></div>
        <div className="like">
          <div className="left">
            <span className="my_like">{{ likeMe }}</span
            ><br />
            <span className="my_like_all">{{ nums + likeAll }}</span
            ><br />
          </div>
          <div className="right">
            <div className="sing">
              <i className="iconfont icon-bofang"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="music_list">
        <ul className="musics">
          <li
            className="list"
            v-for="(item, index) in musics.db"
            :key="item.id"
          >
            <div className="avatar">
              <img :src="item.al.picUrl" alt="" />
            </div>
            <div className="name">
              <div class="mm">{{ item.name }}</div>
              <div class="sm">{{ item.ar[0].name }} - {{ item.al.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { MUSIC_LIST, RES } from "./index";
const store = useStore();
const likeMe = ref<string>("我喜欢的音乐");
const likeAll = ref<string>("首歌");
const nums = ref<number>();
const musics = reactive<MUSIC_LIST>({
  db: [],
});
onMounted(() => {
  nums.value = store.state.data.num;
  musics.db = store.state.data.likeMusic;
});

</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 340px;
  position: absolute;
  top: 180px;

  .c {
    min-width: 1380px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    .h {
      width: 400px;
      height: 300px;
      position: absolute;
      top: 20px;
      left: 20px;
      border-radius: 20px;
      background-color: #eaeffd;
      .lyrics {
        height: 200px;
      }
      .like {
        height: 80px;
        display: flex;
        justify-content: space-between;
        .left {
          width: 160px;
          height: 80px;
          font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
            Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
            sans-serif, microsoft uighur;
          .my_like {
            margin-left: 20px;
            font-size: 22px;
            color: blue;
            font-weight: 900;
            line-height: 50px;
          }
          .my_like_all {
            margin-left: 20px;
            font-size: 16px;
            color: #335eea;
          }
        }
        .right {
          position: relative;
          height: 80px;
          width: 80px;
          .sing {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background-color: blue;
            position: absolute;
            right: 20px;
            top: 15px;
            &:hover {
              cursor: pointer;
              transition: all 0.5s;
              -webkit-transition: all 0.5s;
              transform: scale(1.1);
              -webkit-transform: scale(1.1);
              -moz-transform: scale(1.1);
              -o-transform: scale(1.1);
              -ms-transform: scale(1.1);
              background-color: rgba(89, 89, 89, 0.25);
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
              border: 0px solid rgba(255, 255, 255, 0.18);
              box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
              -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
            }
            i {
              font-size: 27px;
              border-radius: 2px;
              color: #fff;
              position: absolute;
              top: 52%;
              left: 54%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
    .music_list {
      width: 900px;
      height: 300px;
      position: absolute;
      left: 460px;
      top: 20px;

      .musics {
        width: 900px;
        list-style: none;
        padding-inline-start: 0;
        margin-block-start: 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .list {
          width: 250px;
          height: 60px;
          background-color: #fff;
          display: flex;
          padding: 7px;
          &:hover {
            background-color: #d4dcf0;
            border-radius: 10px;
            cursor: pointer;
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border: 0px solid rgba(255, 255, 255, 0.18);
            box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
            -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
            color: blue;
          }
          .avatar {
            width: 43px;
            height: 43px;
            border-radius: 6px;
            overflow: hidden;
            margin-top: 10px;
            img {
              width: 43px;
              height: 43px;
            }
          }
          .name {
            margin-left: 20px;
            margin-top: 10px;
            .mm {
              font-weight: 900;
              font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
                BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
                Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
                sans-serif, microsoft uighur;
            }
            .sm {
              font-size: 12px;
              height: 20px;
              width: 180px;
              overflow: hidden;
              white-space: nowarp;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
