<template>

  <div className="container">
    <div className="c">
      <div className="cover_info">
        <div className="left">
          <img :src="cover.db.coverImgUrl" alt="" />
        </div>
        <div className="right">
          <ul className="u1">
            <li className="title ">{{ cover.db.name }}</li>
            <li className="author ">
              <div className="list">
                {{ "by " + cover.db.creator.nickname }}
              </div>
              <div className="tm">最后更新于&nbsp;{{res}}</div>
            </li>
            <li className="text ">{{ cover.db.description }}</li>
            <li className="menu ">
              <div className="start">
                <div className="left1">
                  <div className="iconfont icon-bofang"></div>
                </div>
                <div className="right1">播放</div>
              </div>
              <div className="heart">
                <svg
                  t="1661952478962"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3477"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 512.8704m-432.3328 0a432.3328 432.3328 0 1 0 864.6656 0 432.3328 432.3328 0 1 0-864.6656 0Z"
                    fill="#FF6161"
                    p-id="3478"
                  ></path>
                  <path
                    d="M287.0272 418.7136c-85.0432 0-160.4096 41.3696-207.104 105.0624 4.5568 182.7328 122.368 337.3056 285.952 396.032 103.2192-33.28 177.92-130.048 177.92-244.3776 0-141.7216-114.944-256.7168-256.768-256.7168z"
                    fill="#FF7D7D"
                    p-id="3479"
                  ></path>
                  <path
                    d="M744.8576 358.5536c-63.488-63.488-166.4-63.488-229.888 0l-229.0688 229.0688 185.3952 185.3952c24.576 24.576 64.4608 24.576 89.0368 0l184.5248-184.5248c63.488-63.5392 63.488-166.5024 0-229.9392z"
                    fill="#FFCAC7"
                    p-id="3480"
                  ></path>
                  <path
                    d="M516.6592 358.5024c-63.488-63.488-166.4-63.488-229.888 0-63.488 63.488-63.488 166.4 0 229.888l184.5248 184.5248c24.576 24.576 64.4608 24.576 89.0368 0l185.3952-185.3952-229.0688-229.0176z"
                    fill="#FFFFFF"
                    p-id="3481"
                  ></path>
                </svg>
              </div>
              <div className="more">···</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <MusicList></MusicList>
  </div>

</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import {useDate} from "../../hooks/useDate"
import MusicList from "../../components/musiclist/musiclist.vue"
const store = useStore();
const route = useRoute();

const {
  play: { playInfo },
} = store.state;
const cover = reactive<{ [key: string]: { [key: string]: any } }>({
  db: playInfo,
});
const res = useDate(playInfo.updateTime,"{y}-{m}-{d} {h}:{i}:{s}{a}")

</script>

<style scoped lang="less">
.container {
  width: 100%;
  position: absolute;
  top: 80px;
  .c {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1600px;
    height: 300px;
    .cover_info {
      display: flex;
      .left {
        height: 300px;
        width: 300px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0px 16px 15px -3px rgba(0,0,0,0.1);
        -webkit-box-shadow: 0px 16px 15px -3px rgba(0,0,0,0.1);
        img {
          height: 300px;
          width: 300px;
        }
      }
      .right {
        width: 1250px;
        height: 300px;
        margin-left: 50px;
        .u1 {
          height: 300px;
          padding-inline-start: 0;
          list-style: none;
          .title {
            width: 100%;
            height: 50px;
            font-size: 24px;
            font-weight: 900;
            line-height: 50px;
          }
          .author {
            width: 100%;
            padding-top: 20px;
            padding-bottom: 20px;
            .list {
              font-size: 16px;
              font-weight: 900;
            }
            .tm {
              font-size: 14px;
              padding-top: 5px;
              padding-bottom: 5px;
              font-size: 12px;
              font-weight: 900;
            }
          }
          .text {
            width: 100%;
            font-size: 12px;
          }
          .menu {
            display: flex;
            width: 191px;
            height: 34px;
            justify-content: space-between;
            padding-top: 40px;
            .start {
              width: 55px;
              height: 24px;
              display: flex;
              justify-content: space-between;
              color: blue;
              font-weight: bold;
              font-size: 16px;
              padding: 5px;
              padding-left: 15px;
              padding-right: 15px;
              border-radius: 5px;
              background-color: #eaeffd;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: 0.3s;
              }
              &:hover {
                cursor: pointer;
              }
            }
            .heart {
              width: 24px;
              height: 24px;
              padding: 5px;
              background-color: #eaeffd;
              border-radius: 5px;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: 0.3s;
              }
              .icon {
                width: 24px;
                height: 24px;
              }
            }
            .more {
              width: 24px;
              height: 24px;
              padding: 5px;
              background-color: #eaeffd;
              border-radius: 5px;
              text-align: center;
              line-height: 24px;
              font-size: 18px;
              font-weight: 900;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: 0.3s;
              }
            }
          }
        }
      }
    }
  }
}
</style>
