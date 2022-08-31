<script setup lang="ts">
import Nmheader from "../../components/navigation/Nmheader.vue"
import {useStore} from "vuex"
import {getCookie} from "../../utils/cookie"
const store = useStore()

</script>

<template>
<Nmheader></Nmheader>
<router-view></router-view>
</template>

<style scoped lang="less">

</style>
