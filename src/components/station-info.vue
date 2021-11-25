<script setup lang="ts">
import { reactive, ref } from 'vue';
const props = defineProps({
  line: Array,
  currentStation: Number,
  arrivalTime: Number,
});
</script>

<template>
  <div class="pis-line">
    <span
      class="station-item"
      v-for="item: any in props.line"
      :key="item.en_name"
    >
      <span
        class="pis-line-item"
        :title="item.station_id"
        :class="item.station_id == props.currentStation ? 'active' : ''"
      >
        <p class="cn">{{ item.cn_name }}</p>
        <p class="en">{{ item.en_name }}</p>
        <p class="daozhan" v-if="item.station_id === props.currentStation">
          预计到站{{ props.arrivalTime }}分钟
        </p>
      </span>
      <img src="../assets/next-2.png" alt="" />
    </span>
  </div>
</template>

<style lang="less" scoped>
.pis-line {
  text-align: center;
  width: 100%;
  font-size: 50px;
  padding-bottom: 20px;
  display: inline-block;
  width: 1200px;
  i {
    font-style: normal;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .en {
    font-size: 34px;
  }
  margin-top: 20px;
  img {
    display: inline-block;
    margin: 0 20px;
    vertical-align: middle;
    width: 80px;
  }
}

.pis-line-item {
  position: relative;
  color: #a1a1a0;

  .daozhan {
    font-size: 18px;
    background: #0d3d62;
    position: absolute;
    top: -46px;
    left: calc(50% - 100px);
    display: inline-block;
    width: 200px;
    padding: 8px 0;
    z-index: 10;
    // display: none;
  }
  .daozhan::after {
    content: '';
    display: block;
    position: absolute;
    top: 34px;
    left: 88px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #0d3d62;
    z-index: 1;
  }
}
.pis-line-item.active {
  color: #fff;
  .cn {
    font-size: 60px;
  }
  .en {
    font-size: 40px;
  }
}
.pis-line-item.active .daozhan {
  display: block;
}
.pis-line .station-item:last-child img {
  display: none;
}
</style>
