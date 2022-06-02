<template>
    <div>
        <h3>当前的count值为：{{btc_price}}</h3>
    </div>
</template>

<script>
export default {
  data () {
    return {
      btc_price: 0.00
    }
  },
  created () {
    this.initWebSocket()
  },
  methods: {
      initWebSocket(){ 
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持WebSocket")
        }else{
          const ws_url = "wss://api-aws.huobi.pro/ws"
          this.websock = new WebSocket(ws_url);
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
        }
      },
      websocketonopen(){
        alert("socket连接成功")
        let init_data = {"test":"12345"};
        this.websocketsend(JSON.stringify(init_data));
      },
      // 连接建立失败重连
      websocketonerror(){
        console.log("连接错误");
        this.initWebSocket();
      },
      // 数据接收
      websocketonmessage(e){
        const resdata = JSON.parse(e.data);
        console.log(resdata);
      },
      // 数据发送
      websocketsend(Data){
        this.websock.send(Data);
      },
      // 关闭
      websocketclose(e){
        alert("socket连接关闭")
        console.log('WebSocket 断开连接',e);
      },
  },    
  beforeDestroy() {
    this.websock.close();
  },
}

</script>


      