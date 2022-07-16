<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()

const imgs = ref([])
const asyncGetImages = async () => {
  try {
    Toast({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    })
    const { data } = await getImgList()
    imgs.value = data
    Toast.clear()
    Toast({ message: '获取图片成功', type: 'success' })
  }
  catch (err: any) {
    Toast(err.message || err.msg)
  }
}

onMounted(() => {
  asyncGetImages()
})
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-28px inline-block mt-10 />
    <p text-34px>
      Hi, {{ props.name }}
    </p>
    <p text-34px op50>
      <em>动态路由 & layout & fetch</em>
    </p>

    <div>
      <van-button type="primary" :disabled="!name" size="small" @click="router.back()">
        Back
      </van-button>
    </div>
    <Footer />
    <div w-full box-border px-30px mt-2>
      <img v-for="(v, k) in imgs" :key="k" :src="v" w-full h-300px mb-2 rounded object-cover box-border>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: child
  title: 欢迎页
</route>
