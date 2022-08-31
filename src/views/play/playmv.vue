<template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
const router = useRouter()
const data = router.currentRoute.value
console.log(data)
</script>

<style scoped lang="less"></style>
