<!-- <template>
    <div className="container">
      <div className="lists">
        <ul>
          <li
            className="songlist"
            v-for="(item, index) in playlist"
            :key="item.id"
            @click="checkPlayDetail(item)"
          >
            <div className="play">
              <i className="iconfont icon-bofang"></i>
            </div>
            <div className="coverImg">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div className="list_name">
              {{ item.name }}
            </div>
            <div className="create_by">
              <ul>
                <li>by&nbsp;{{ item.name }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import router from "../../router";
  const store = useStore();
  const { playlist } = store.state.data;
  const checkPlayDetail = (play: { [key: string]: any }) => {
    store.commit("sendPlayDetailMusic", { key: "playInfo", value: play })
    store.commit("sendMusicNumber", { key: "num", value: {limit:10, offset:0 }})
    store.dispatch("updatePlayMusicList").then(()=>{
      router.push({
      name: "Musics",
      params: play,
    });
    })
  };
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
        justify-content: space-between;
        .songlist {
          width: 340px;
          height: 380px;
          position: relative;
          padding-top: 30px;
          padding-bottom: 30px;
  
          .play {
            display: none;
          }
          &:hover {
            cursor: pointer;
            .play {
              display: block !important;
              width: 50px;
              height: 50px;
              background-color: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(9px);
              -webkit-backdrop-filter: blur(9px);
              border: 1px solid rgba(255, 255, 255, 0.18);
              box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
              -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
              position: absolute;
              left: 44%;
              top: 45%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
              .iconfont {
                position: absolute;
                left: 54%;
                top: 51%;
                transform: translate(-50%, -50%);
                font-size: 30px;
                color: #fff;
              }
            }
          }
          .coverImg {
            width: 300px;
            height: 300px;
            border-radius: 20px;
            overflow: hidden;
            margin-top: 20px;                           
            // position: absolute;
            // top: 40px;
            // left: 50%;
            // transform: translateX(-50%);
            &:hover {
              box-shadow: 0px 9px 15px -3px rgba(0, 0, 0, 0.3);
            }
            img {
              width: 300px;
              height: 300px;
            }
          }
          .list_name {
            position: absolute;
            top: 355px;
            font-size: 14px;
            font-weight: 900;
          }
          .create_by {
            position: absolute;
            top: 375px;
            font-size: 12px;
          }
        }
      }
    }
  }
  </style>
   -->