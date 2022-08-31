<template>
  <div className="container">
    <div className="c">
      <div className="choose">
        <ul>
          <li
            v-for="(item, index) in choose.data"
            class="sh"
            :class="{ active: current === index, sh: current !== index }"
            @click="change(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div className="list">
        <ul>
          <li v-for="(item, index) in week.data" class="ls" :key="item.id">
            <div className="left">
              <div className="ig">
                <img :src="item.song.al.picUrl" alt="" />
              </div>
              <div className="text">
                <ul>
                  <li className="names">{{ item.song.al.name }}</li>
                  <li className="author">{{ item.song.ar[0].name }}</li>
                </ul>
              </div>
            </div>
            <div className="right">
              <p>{{ item.playCount }}</p>
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
import { getUserPlayedReocrd } from "../../api/music/music";
const store = useStore();
interface WEEK {
  data: Array<any>;
}
const choose = reactive<{ [key: string]: Array<string> }>({
  data: ["最近一周", "全部时间"],
});
const week = reactive<WEEK>({
  data: [],
});
const {
  userData: { account },
} = store.state.data;
const getData = async (id: string, val?: number) => {
  const {
    data: { weekData },
  } = await getUserPlayedReocrd(id, val);
  week.data = weekData;
};
onMounted(() => {
  getData(account.id, 1);
});
const current = ref<number>(0);
const change = async(index: number) => {
  if (index === 0) {
    getData(account.id, 1);
  } else {
    const {
      data: { allData },
    } = await getUserPlayedReocrd(account.id, 0);
    week.data = allData;
  }
  current.value = index;
};

</script>

<style scoped lang="less">
  
.active {
  background-color: #f5f5f7;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
}
.container {
  width: 100%;
  position: absolute;
  top: 80px !important;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif,
    microsoft uighur;
  .c {
    width: 1380px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .choose {
      margin-left:15px;
      ul {
        list-style: none;
        padding-inline-start: 0;
        display: flex;
        .sh {
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .list {
      ul {
        list-style: none;
        padding-inline-start: 0;
        width: 1360px;
        .ls {
          width: 1360px;
          display: flex;
          justify-content: space-between;
          padding: 10px;
          .left {
            display: flex;
            .ig {
              height: 100px;
              width: 100px;
              border-radius: 15px;
              overflow: hidden;
              img {
                width: 100px;
                height: 100px;
              }
            }
            .text {
              ul {
                width: 300px;
                padding-inline-start: 0;
                position: relative;
                .names {
                  width: 300px;
                  position: absolute;
                  top: 13px;
                  left: 10px;
                  font-size: 20px;
                  font-weight: 900;
                }

                .author {
                  width: 300px;
                  position: absolute;
                  top: 63px;
                  left: 10px;
                }
              }
            }
          }
          .right {
            width: 135px;
            position: relative;
            p {
              font-size: 22px;
              font-weight: 900;
              width: 135px;
              text-align: center;
              margin-block-start: 0;
              margin-block-end: 0;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
  }
}
</style>
