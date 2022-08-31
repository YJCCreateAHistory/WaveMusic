<template>
  <LikeMusics></LikeMusics>
  <PlayMusic></PlayMusic>
  <Menu></Menu>
</template>

<script setup lang="ts">
import LikeMusics from "../../components/like/likemusic.vue";
import PlayMusic from "../../components/play/playmusic.vue";
import Menu from "../../components/menu/menu.vue"
import { useStore } from "vuex";

const store = useStore();

</script>

<style scoped lang="less"></style>
