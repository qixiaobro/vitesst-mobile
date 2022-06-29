<script lang="ts" setup>
import { navList } from './navList'
const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
]

interface Good {
  id: number
  title: string
  type: string
  url: string
}
const goodList = ref<Good[]>([])
const asyncGetImgList = async () => {
  try {
    const toast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    })

    const { result } = await getImgList({
      page: 0,
      size: 5,
    })
    toast.clear()
    goodList.value = result.list
  }
  catch (err: any) {

  }
}

onMounted(() => {
  asyncGetImgList()
})
</script>

<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image">
    </van-swipe-item>
  </van-swipe>
  <van-swipe lazy-render :loop="false">
    <van-swipe-item v-for="n in 2" :key="n">
      <van-grid square :column-num="5">
        <template
          v-for="item in navList.slice((navList.length * (n - 1)) / 2, (navList.length * n) / 2)"
          :key="item.title"
        >
          <van-grid-item :icon="item.url" :text="item.title" />
        </template>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
  <van-card
    v-for="item in goodList"
    :key="item.id"
    :num="item.id"
    tag="标签"
    :price="item.id.toFixed(2)"
    :desc="item.type"
    :title="item.title"
    :thumb="item.url"
    :origin-price="(item.id * 10).toFixed(2)"
  />
</template>

<style lang="scss" scoped>
  .van-swipe img {
    display: block;
    width: 100%;
    height: 480px;
    padding: 30px 60px;
    pointer-events: none;
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
