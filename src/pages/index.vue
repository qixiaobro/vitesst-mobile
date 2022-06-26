<script setup lang="ts">
import { Toast } from 'vant'

const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

const handleClick = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  })
}
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <van-button type="primary" @click="handleClick">
      主要按钮
    </van-button>
    <van-button type="success">
      成功按钮
    </van-button>
    <van-button type="default">
      默认按钮
    </van-button>
    <van-button type="warning">
      警告按钮
    </van-button>
    <van-button type="danger">
      危险按钮
    </van-button>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
