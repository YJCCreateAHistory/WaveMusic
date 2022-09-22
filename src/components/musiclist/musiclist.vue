<template>
  <div className="container1">
    <div className="c">
      <ul>
        <li
          v-for="(item, index) in song.db"
          :key="item.al.id"
          @click="getMusicId(item)"
        >
          <div className="music">
            <div className="left">
              <div className="l">
                <div className="ig">
                  <img :src="item.al.picUrl" alt="" />
                </div>
                <div className="text">
                  <p className="name">
                    {{ item.al.name }}
                  </p>
                  <p className="author">
                    {{ item.ar[0].name }}
                  </p>
                </div>
              </div>
              <div className="ablums">
                {{ item.name }}
              </div>
            </div>
            <div className="right">
              <svg
                t="1662036093688"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3519"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="200"
                height="200"
              >
                <path
                  d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                  p-id="3520"
                ></path>
              </svg>
            </div>
          </div>
        </li>
        <footer>
          <div ref="target" style="height: 10px"></div>
        </footer>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { getUserLikedMusics, getMusicDeatil } from "../../api/music/music";
import { useLazyData } from "../../hooks/useLazyData";

const router = useRouter();
const store = useStore();
const song = reactive<{ [key: string]: Array<any> }>({
  db: [],
});
onMounted(async () => {
  song.db = store.state.play.songs;
});

// 列表懒加载
const fn = () => {
  const pid = store.state.play.playInfo.id;
  const data = store.state.play.num;
  const params = {
    id: pid,
    limit: data.limit,
    offset: data.offset + 10,
  };
  store.commit("sendMusicNumber", {
    key: "num",
    value: { limit: data.limit, offset: params.offset },
  });
  getUserLikedMusics<{[key: string]:string | number}>(params).then((res: any) => {
    const {
      data: { songs },
    } = res;
    song.db = [...song.db, ...songs];
  });
};
const target = ref(null);
useLazyData(fn, target); // 懒加载
const getMusicId = (item: { [key: string]: any }) => {
  store.commit("sendPlayMusic", {key:"playmusicFlag", value:{flag:true}})
  store.commit("sendMusicUrlDetail", { key: "mdu", value: item });
  getMusicDeatil<string>(item.id).then((res) => {
    const {
      data: { data },
    } = res;
    store.commit("sendMusicUrl", { key: "mds", value: data[0] });
  });
};
</script>

<style scoped lang="less">
.container1 {
  width: 100%;
  position: absolute;
  top: 380px !important;
  .c {
    width: 1600px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ul {
      width: 1600px;
      padding-inline-start: 0;
      list-style: none;
      li {
        width: 1600px;
        padding-top: 10px;
        padding-bottom: 10px;
        .music {
          display: flex;
          justify-content: space-between;
          .left {
            width: 1000px;
            display: flex;
            justify-content: space-between;
            .l {
              // width: 250px;
              display: flex;
              .ig {
                width: 80px;
                height: 80px;
                border-radius: 10px;
                overflow: hidden;
                &:hover {
                  cursor: pointer;
                  transform: scale(1.1);
                  transition: 0.4s;
                }
                img {
                  width: 80px;
                  height: 80px;
                }
              }

              .text {
                p {
                  margin-block-end: 0;
                  margin-block-start: 0;
                  padding: 8px;
                  &:hover {
                    cursor: pointer;
                    transform: scale(1.1);
                    transition: 0.4s;
                  }
                }
                p:nth-child(1) {
                  font-size: 16px;
                  font-weight: 900;
                }
              }
            }
            .ablums {
              width: 400px;
              text-align: center;
              line-height: 80px;
              font-size: 16px;
              font-weight: 900;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: 0.4s;
              }
            }
          }
          .right {
            width: 50px;
            height: 80px;
            position: relative;
            .icon {
              width: 24px;
              height: 24px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
