<script lang="ts" setup>
const name = ref('')
const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div mx-auto px-30px text-34px>
    <img src="/favicon.svg" text-black mt-5>
    <a href="https://github.com/qixiaobro/vitesst-mobile" target="_blank" block mt-2 text-black dark:text-white>Vitesst mobile</a>
    <div mt-2 leading-2>
      <i-logos:vitejs /> 2.x + <i-vscode-icons:file-type-vue /> 3.x + <i-vscode-icons:file-type-typescript-official /> 4.x+ <img src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png" class="vant"> 3.x <br>Mobile Simple Starter Template
    </div>
    <div mt-2 text-22px leading-2 w-full px-50px box-border text-center>
      👏 欢迎使用Vitesst mobile 模版，这是一个基于 <a href="https://github.com/antfu/vitesse-lite" target="_blank" text-blue-500>Vitesse-lite</a> 扩展的移动端模版。
      添加了Vant 3.0的组件库和一些常用扩展，可以快速开发移动端页面。
    </div>
    <div box-border mt-2>
      <van-field v-model="name" placeholder="请输入你的昵称" size="normal" />
      <van-button
        type="primary" :disabled="!name" size="small" mt-2
        @click="go"
      >
        Go
      </van-button>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.vant{
  width:1.2em;
  height: 1.2em;
}
.van-cell{
  border:1px solid #e6e6e6;
}
</style>
