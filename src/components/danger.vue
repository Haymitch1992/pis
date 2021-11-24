<script setup lang="ts">
import { reactive, ref } from 'vue';
const porpsObj = defineProps({
  dangerText: String,
  dangerEn: String,
});
</script>

<template>
  <div class="dnager-box">
    <h2 class="danger-text">{{ porpsObj.dangerText }}</h2>
    <h2 class="danger-en">
      {{ porpsObj.dangerEn }}
    </h2>
  </div>
</template>

<style lang="less" scoped>
.dnager-box {
  border: 10px solid #df2f3b;
  width: 100%;
  height: 540px;
  box-sizing: border-box;
  background-color: #17172c;
  h2 {
    color: #df2f3b;
    padding: 0;
    margin: 0;
  }
  .danger-text {
    font-size: 100px;
    margin-top: 140px;
  }
  .danger-en {
    font-size: 60px;
  }
}
</style>
