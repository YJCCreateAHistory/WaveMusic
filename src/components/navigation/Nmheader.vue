<template>
  <div className="container">
    <div className="left">
      <div className="iconsed">
        <div className="back">
          <el-icon><ArrowLeftBold /></el-icon>
        </div>
        <div className="go">
          <el-icon><ArrowRightBold /></el-icon>
        </div>
      </div>
    </div>
    <div className="center">
      <ul>
        <li className="nm_headerName">首页</li>
        <li className="nm_headerName">发现</li>
        <li className="nm_headerName" @click="gotoLibary">音乐库</li>
      </ul>
    </div>
    <div className="right">
      <div className="search">
        <div className="user">
          <div className="menu" v-if="showFlag">
            <div className="list">
              <ul>
                <li class="iconfont icon-shezhi">
                  {{ loginMenu.choose.setting }}
                </li>
                <li class="iconfont icon-denglu1" @click="goLogin">
                  {{ loginMenu.choose.login }}
                </li>
              </ul>
            </div>
          </div>
          <img :src="img_src" alt="" @click="showLoginEdit" />
        </div>
        <div className="icons">
          <el-icon><Search /></el-icon>
        </div>
        <div className="text">
          <input type="text" placeholder="搜索" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { IMG_SRC, MENU_LIST } from "./index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import { loginout } from "../../api/loginout/exit";
const store = useStore();
const router = useRouter();
let img_src = ref<IMG_SRC>(
  "https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60"
);
let f = ref<boolean>(false);
let loginMenu = reactive<MENU_LIST>({
  choose: {
    setting: "设置",
    login: "登录",
  },
});
const getStatus = () => {
  if (getCookie("MUSIC_U") !== null) {
    f.value = !f.value;
    loginMenu.choose.login = "退出登录";
    img_src.value = store.state.data.userData.profile.avatarUrl;
  } else {
    return;
  }
};
onMounted(() => {
  getStatus();
});
// 显示登录设置项
let showFlag = ref<boolean>(false);
const showLoginEdit = () => {
  showFlag.value = !showFlag.value;
};
// 登录页
const goLogin = () => {
  if (f.value === true) {
    loginout().then((res: any) => {
      if (res.data.code === 200) {
        localStorage.removeItem("vuex");
        removeCookie("MUSIC_U");
        loginMenu.choose.login = "登录";
        f.value = !f.value;
      }
    });
  } else {
    loginMenu.choose.login = "登录";
    router.push({
      name: "Login",
      params: {},
    });
    showFlag.value = !showFlag.value;
  }
};
const gotoLibary = () => {
  if (getCookie("MUSIC_U") === null) {
    router.push({
      name: "Login",
      params: {},
    });
  } else {
    router.push({
      name: "Libary",
      params: {},
    });
  }
};
</script>
<style scoped lang="less">
.container {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1100px;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  border-radius: 12px;
  -webkit-border-radius: 12px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  z-index: 9999;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  .left {
    width: 400px;
    height: 60px;
    line-height: 60px;
    display: flex;
    font-size: 20px;
    font-weight: bolder;
    position: relative;
    .iconsed {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      .go,
      .back:hover {
        cursor: pointer;
      }
    }
  }
  .center {
    width: 400px;
    height: 60px;
    position: relative;
    ul {
      list-style: none;
      display: flex;
      width: 200px;
      justify-content: space-between;
      padding-inline-start: 0;
      margin-block-start: 0em;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .nm_headerName {
        font-size: 18px;
        font-weight: bolder;
        font-weight: 700;
        &:hover {
          cursor: pointer;
          color: #9b52f4;
        }
      }
    }
  }
  .right {
    width: 400px;
    height: 60px;
    position: relative;
    .search {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      margin-block-start: 0;
      .user {
        width: 40px;
        height: 40px;
        margin-right: 40px;
        position: relative;
        .menu {
          height: 100px;
          width: 140px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 2px 2px 4px #d6d6d6, -2px -2px 4px #ffffff;
          position: absolute;
          top: 19px;
          left: -115px;
          .list {
            ul {
              list-style: none;
              padding-inline-start: 0;
              margin-block-start: 0;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              li {
                width: 120px;
                height: 40px;
                line-height: 40px;
                font-weight: 900;
                padding-left: 15px;
                border-radius: 10px;
                &:hover {
                  background: #edf2ff;
                  cursor: pointer;
                  color: blue;
                }
              }
            }
          }
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .icons {
        position: absolute;
        left: 91px;
        top: 9px;
        font-size: 20px;
      }
      .text {
        width: 200px;
        height: 35px;
        background-color: transparent;
        input {
          padding-left: 40px;
          width: 200px;
          height: 35px;
          font-size: 16px;
          border: none;
          outline: none;
          background-color: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
          -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
          border-radius: 6px;
          -webkit-border-radius: 6px;
        }
      }
    }
  }
}
</style>
