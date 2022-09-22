<template>
    <audio  ref="audio" @canplay="getDuration" :src="mdu.url"></audio>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { defineProps, ref, reactive, onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { nextTick } from "process";
const store = useStore();

const audio = ref(null);
const duration = ref(0);

const getDuration = () => {
  duration.value = audio.value.duration; // 播放总时长
  let t = ~~duration.value;
  let m = "" + ~~(t / 60);
  let s = "" + (t % 60);
  if (m == "0") {
    m = "00";
  } else if (m.length == 1) {
    m = "0" + m;
  }
  if (s.length == 1) {
    s = "0" + s;
  }
  console.log(m, s)
};
const mdu = computed(() => {
  return store.state.play.mds;
});
</script>

<style scoped lang="less"></style>
