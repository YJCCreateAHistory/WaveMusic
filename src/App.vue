<script setup lang="ts">
import {useStore} from "vuex"
const store = useStore()

</script>

<template>
    <Nmheader></Nmheader>
    <router-view></router-view>
    <FtPlayMusic></FtPlayMusic>
</template>

<style scoped lang="less"></style>
