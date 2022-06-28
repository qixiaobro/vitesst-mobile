<script setup lang="ts">
const checked = $ref(false)
</script>

<template>
  <div>
    <van-button type="primary">
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
    <van-radio-group v-model="checked">
      <van-radio name="1">
        单选框 1
      </van-radio>
      <van-radio name="2">
        单选框 2
      </van-radio>
    </van-radio-group>
  </div>
</template>
