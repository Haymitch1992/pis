<script setup lang="ts">
import { reactive, ref } from 'vue';
const num = ref(8);
const arrialTime = ref(3);
let processNumber = ref(0);
// 预计到站时间 每减1分钟 执行一下动效
const animateProcess = () => {
  let timer = setInterval(() => {
    processNumber.value += 0.1;
    if (processNumber.value >= 12.5) {
      clearInterval(timer);
    }
  }, 200);
};
// 监听时间发生变化的时候 触发动效
// 关键是动效的时间
animateProcess();
</script>

<template>
  <div class="process">
    <span class="previous-station">金安桥</span>
    <div class="process-line">
      <div
        class="process-item"
        :class="item > arrialTime ? 'active' : ''"
        v-for="item in num"
      >
        <span v-if="item !== num" class="process-dot"></span>
      </div>
      <span class="start-dot"></span>
      <span class="end-dot"></span>
      <span
        class="current"
        :style="{ width: arrialTime * 12.5 + processNumber + '%' }"
      >
        <span class="subway-icon">
          <img class="subway-icon-img" src="../assets/subway.png" alt="" />
        </span>
      </span>
    </div>
    <span class="current-station">北辛安</span>
  </div>
</template>

<style lang="less" scoped>
.process {
  text-align: center;
  padding-top: 20px;
  .previous-station {
    vertical-align: top;
    margin: 0 10px;
  }
  .current-station {
    vertical-align: top;
    margin: 0 10px;
  }
  .current {
    width: 50%;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    text-align: right;
    background: #ed9166;
    height: 20px;
    border-radius: 20px;
    .subway-icon {
      background: #fff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -10px;
      right: -10px;
      text-align: center;
      line-height: 50px;
      z-index: 20;
    }
    .subway-icon-img {
      width: 28px;
    }
  }
  .process-line {
    width: 960px;
    height: 20px;
    border-radius: 20px;
    margin: 4px auto 0;
    background: rgb(134, 122, 122);
    position: relative;
    // overflow: hidden;
    display: inline-block;
    vertical-align: top;
    .process-item {
      width: 120px;
      display: inline-block;
      height: 20px;

      text-align: right;
      position: relative;
    }
    // .process-item.active {
    //   // background: #ed9166;
    // }
    .process-dot {
      width: 6px;
      height: 6px;
      background: #fff;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      position: absolute;
      right: 0;
      top: 7px;
      z-index: 10;
    }
    .start-dot {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      border: 4px solid #ddd;
      position: absolute;
      left: 2px;
      top: 2px;
      z-index: 10;
    }
    .process-line .process-item:last-child .process-dot {
      display: none;
      opacity: 0;
    }
    .end-dot {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      border: 4px solid #ddd;
      position: absolute;
      right: 2px;
      top: 2px;
      z-index: 10;
    }
    .previous-station {
      position: absolute;
      left: 100px;
    }
  }
}
</style>
