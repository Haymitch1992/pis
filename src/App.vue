<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import pis from './components/pis.vue';
import dangerView from './components/danger.vue';
import loading from './components/loading.vue';
const dangerText = ref('暴雨红色预警，请勿停留');
const dangerEn = ref('Red Rainstorm Warning, No Loitering!');
const loadgingText = ref('已启动一键开关站流程,请做好开关站保障工作');
const pageStatus = ref(1);

const data = reactive({
  wsuri: 'ws://172.51.215.158:8081/api/v1/device/platform_ats/connection', // ws wss
  lockReconnect: false, // 连接失败不进行重连
  maxReconnect: 5, // 最大重连次数，若连接失败
  socket: null as any,
});

function reconnect() {
  console.log('尝试重连');
  if (data.lockReconnect || data.maxReconnect <= 0) {
    return;
  }
  setTimeout(() => {
    // this.maxReconnect-- // 不做限制 连不上一直重连
    initWebSocket();
  }, 60 * 1000);
}
function websocketonopen() {
  console.log('WebSocket连接成功', data.socket.readyState);
  heartCheck.start(data.socket);
  // this.socket.send('发送数据')
  websocketsend();
}

function websocketonerror(e: any) {
  console.log('WebSocket连接发生错误', e);
  reconnect();
}

function websocketonmessage(e: any) {
  // console.log(e)
  // console.log('得到响应', e.data);
  // 将数据进行切割

  let arr = e.data.split('|');
  console.log(arr);
  // if (arr.length === 2) {
  //   this.setDirection(arr[1]);
  //   this.setStation(arr[0]);
  // }
  // 修改应急状态 setEmergencyState
  if (e.data === 'emergent1') {
    pageStatus.value = 4; // danger
  } else if (e.data === 'recover') {
    pageStatus.value = 1;
  } else if (e.data === 'waiting') {
    pageStatus.value = 5;
  }
  // console.log('可以渲染网页数据...');
  // 消息获取成功，重置心跳
  heartCheck.start(data.socket);
}
function websocketclose(e: any) {
  console.log('connection closed (' + e.code + ')');
  reconnect();
}
function websocketsend() {
  let data2 = { id: 'start' };
  data.socket.send(JSON.stringify(data2));
}

function initWebSocket() {
  try {
    if ('WebSocket' in window) {
      data.socket = new WebSocket(data.wsuri);
    } else {
      console.log('您的浏览器不支持websocket');
    }
    data.socket.onopen = websocketonopen;
    data.socket.onerror = websocketonerror;
    data.socket.onmessage = websocketonmessage;
    data.socket.onclose = websocketclose;
  } catch (e) {
    reconnect();
  }
}

// 监听状态

const heartCheck = {
  timeout: 60 * 1000,
  timer: null as any,
  serverTimer: null as any,
  reset() {
    this.timer && clearTimeout(this.timer);
    this.serverTimer && clearTimeout(this.serverTimer);
  },
  start(ws: any) {
    this.reset();
    this.timer = setTimeout(() => {
      // console.log('发送心跳,后端收到后，返回一个心跳消息')
      // onmessage拿到返回的心跳就说明连接正常
      ws.send(JSON.stringify({ heart: 1 }));
      this.serverTimer = setTimeout(() => {
        // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
        ws.close();
      }, this.timeout);
    }, this.timeout);
  },
};

onMounted(() => {
  initWebSocket();
});
</script>

<template>
  <div class="pis-container">
    <pis v-if="pageStatus === 1"></pis>
    <danger-view
      v-if="pageStatus === 4"
      :dangerText="dangerText"
      :dangerEn="dangerEn"
    ></danger-view>

    <loading :loadgingText="loadgingText" v-if="pageStatus === 5"></loading>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,
p {
  padding: 0;
  margin: 0;
}
.pis-container {
  width: 1920px;
  height: 540px;
}
</style>
