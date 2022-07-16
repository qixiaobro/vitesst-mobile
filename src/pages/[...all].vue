<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div py-10 mx-auto>
    <div>
      Not Found
    </div>
    <van-button type="primary" mt-2 @click="router.back()">
      Back
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
</style>

