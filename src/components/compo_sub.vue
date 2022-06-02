<template>
    <div>
        <h3>当前的BTC价格为：{{btc_price}}</h3>
    </div>
</template>

<script>
import unzip from "./unzip.js"

export default {
  data () {
    return {
      btc_price: "0.00",
      websock_id: 4152629025
    }
  },
  created () {
  },
  methods: {
      initWebSocket(){ 
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持WebSocket")
        }else{
          const ws_url = "wss://stream.binance.com:9443/ws"
          this.websock = new WebSocket(ws_url);
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
        }
      },
      websocketonopen(){
        let init_data = {
          "method": "SUBSCRIBE",
          "params":["btcusdt@aggTrade","btcusdt@depth"],
          "id": 1
        }
        this.websocketsend(JSON.stringify(init_data));
      },
      // 连接建立失败重连
      websocketonerror(){
        this.initWebSocket();
      },
      // 数据接收
      websocketonmessage(e){
        const { p : latestPrice } = JSON.parse(e.data);
        this.setPrice(latestPrice);
      },
      setPrice(latestPrice){
        if(latestPrice)
        {
          this.btc_price = latestPrice.substring(0,latestPrice.indexOf(".") + 3);
        }
      },
      // 数据发送
      websocketsend(Data){
        this.websock.send(Data);
      },
      // 关闭
      websocketclose(e){
        console.log('WebSocket 断开连接',e);
      },
  },    
  beforeDestroy() {
    this.websock.close();
  },
}

</script>


      