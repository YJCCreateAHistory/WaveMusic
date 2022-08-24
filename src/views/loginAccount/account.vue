<template>
<Nmheader></Nmheader>
<QRcode></QRcode>
<EmailLogin v-if="false"></EmailLogin>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Nmheader from "../../components/head_navigation/Nmheader.vue"
import QRcode from "../../components/loginByQRcode/qrcode.vue"
import EmailLogin from "../../components/eamilLogin/email.vue"

</script>
<style scoped lang="less">

</style>
