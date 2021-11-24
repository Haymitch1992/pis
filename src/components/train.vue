<script setup lang="ts">
import { reactive, ref } from 'vue';
</script>

<template>
  <div class="car-status">
    <div class="car-container" :class="'active' + 1 + '-' + 2">
      <div class="car-men">
        <span></span>
        <span></span>
      </div>
      <div class="car-men car-men-1">
        <span></span>
        <span></span>
      </div>
      <span class="wendu wendu-1">24.5℃</span>
      <span class="wendu wendu-2">24.5℃</span>
      <div class="per-1">
        <img
          src="../assets/person-2.png"
          v-for="(item, index) in 2"
          :key="index"
          alt=""
        />
      </div>
      <div class="per-2">
        <img
          src="../assets/person-2.png"
          v-for="(item, index) in 2"
          :key="index"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.car-status {
  text-align: center;
  padding-bottom: 10px;
  position: relative;
  width: 500px;
  display: inline-block;
  .car-container {
    width: 500px;
    height: 44px;
    display: block;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border: 1px solid #fff;
    box-sizing: border-box;
    background: linear-gradient(to right, #01be00, #01be00);
    margin-left: 60px;
    // 红色 #c40001
    position: relative;
    top: 20px;
    .car-men {
      position: absolute;
      bottom: 0;
      left: 150px;
      width: 60px;
      span {
        display: inline-block;
        height: 26px;
        width: 16px;
        background: #fff;
        margin-right: 3px;
        vertical-align: bottom;
      }
    }
    .car-men.car-men-1 {
      left: 270px;
    }
    .wendu {
      font-size: 18px;
    }
    .wendu-1 {
      position: absolute;
      left: 24px;
      top: 4px;
    }
    .wendu-2 {
      position: absolute;
      right: 24px;
      top: 4px;
    }
  }
  .per-1 {
    position: absolute;
    bottom: -4px;
    left: 205px;
  }
  .pos-num-1 {
    position: absolute;
    bottom: 18px;
    left: 170px;
  }
  .pos-num-2 {
    position: absolute;
    bottom: 18px;
    left: 410px;
  }
  .per-2 {
    position: absolute;
    bottom: -4px;
    left: 326px;
  }
}
</style>
