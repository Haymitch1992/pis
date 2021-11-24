<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import train from './train.vue';
import stationInfo from './station-info.vue';
// 需要请求车辆的信息
// 监听websocket 状态 切换为应急显示
import axios from 'axios';
const line = reactive({
  up: { line_info: [] },
  down: { line_info: [] },
});
const lineInfo = computed(() => {
  if (line.up === null) {
    return [];
  } else {
    return line.up.line_info;
  }
});

axios
  .get('/api/v1/device/platform_ats/station_info')
  .then((res) => {
    console.log(res.data.result);
    line.up = res.data.result[0][0];
    line.down = res.data.result[0][1];
    console.log(line);
  })
  .catch((err) => {
    console.log(err);
  });

// 线路信息 上行 下行 当前站 预计到达时间
</script>

<template>
  <div class="container">
    <!-- pis -->
    <div class="pis-top">
      <span>
        <span class="pis-text-line pis-text-left">
          <p>开往</p>
          <P class="pis-text-p">To</P>
        </span>
        <span class="current pis-text-line">
          <p>金顶街</p>
          <P class="pis-text-p">JINDINGJIE</P>
        </span>
        <span class="text-left">方向</span>
      </span>
      <span class="manche">
        <p class="cn">普通车</p>
        <p>Local</p>
      </span>
    </div>
    <div class="pis-body">
      <!-- 线路信息 -->
      <stationInfo class="pis-line" :line="lineInfo"></stationInfo>
      <!-- 车辆状态 -->
      <train></train>
    </div>
  </div>
</template>

<style lang="less" scoped>
p {
  padding: 0;
  margin: 0;
}
.container {
  width: 1920px;
  height: 540px;
  background-color: #17172c;
  color: #fff;
  text-align: left;
  padding: 40px 60px;
  font-size: 20px;
  box-sizing: border-box;
}
.pis-top {
  font-size: 44px;
  margin-bottom: 120px;

  .pis-text-line {
    display: inline-block;
    vertical-align: top;

    p {
      text-align: left;
    }
  }
  .current p {
    color: #fc9a6a;
    margin: 0 20px;
    text-align: cneter;
  }
  .pis-text-left p {
    text-align: right;
  }
  .text-left {
    text-align: left;
  }
  .pis-text-p {
    font-size: 24px;
  }
  .manche {
    background: #ed9166;
    color: #fff;
    display: block;
    border-radius: 10px;
    font-size: 22px;
    padding: 6px 44px;
    float: right;
    width: 100px;
    text-align: center;
    p {
      font-size: 24px;
    }
    .cn {
      font-size: 32px;
    }
  }
}
</style>
