<script lang="ts" setup>
const router = useRouter()
const onClickLeft = () => router.go(-1)

const title = ref('')
const route = useRoute()
title.value = route.meta.title as string || 'Vitesst Mobile'
</script>

<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <router-view />
</template>

<style lang="scss" scoped>
</style>

