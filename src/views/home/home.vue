<script setup lang="ts">
import Nmheader from "../../components/head_navigation/Nmheader.vue"
import {useStore} from "vuex"
const store = useStore()
console.log(store.state.data.user)
</script>

<template>
<Nmheader></Nmheader>
</template>

<style scoped lang="less">

</style>
