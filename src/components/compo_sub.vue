<template>
    <div>
        <h3>当前币安的聚合行情涨幅榜：</h3>
        <table>
          <tbody>
            <tr>
              <th>排名</th>
              <th>币种</th>
              <th>涨幅</th>
            </tr>
            <tr v-for="(item, index) in topList" :key="item[0]">
              <td>{{index + 1}}</td>
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>

export default {
  data () {
    return {
      btc_price: "0.00",
      topList: [],
      dataList: [],
      usdt_list: [],
      symbol_list: [],
      change_map: new Map(),
      websock_id: 415257348439
    }
  },
  created () {
    this.symbol_list = localStorage.getItem("symbolList").split(",");
    this.symbol_list.forEach(item => {
      this.change_map.set(item, "0.00");
    });
    this.initWebSocket();
  },
  methods: {
      initWebSocket(){ 
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持WebSocket")
        }else{
          const ws_url = "wss://stream.binance.com:9443/ws/!ticker@arr"
          this.websock = new WebSocket(ws_url);
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
        }
      },
      websocketonopen(){
        this.websocketsend();
      },
      // 连接建立失败重连
      websocketonerror(){
        this.initWebSocket();
      },
      // 数据接收
      websocketonmessage(e){
        let data = JSON.parse(e.data);
        if(Array.isArray(data)){
          data.forEach(item => {
            if(this.change_map.has(item.s)){
              this.change_map.set(item.s, item.P);
              }
          });
        }
        this.topList = Array.from(this.change_map).sort((a, b) => {
          return  b[1] - a[1];
        }).filter((item) => {
          return item[0].substr(-8) !== "DOWNUSDT";
        }).slice(0, 20).map((item) => {
          return [item[0], item[1] + "%"];
        });
        console.log(this.topList)
      },
      setTopList(latestPrice){
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
        this.initWebSocket();
      },
  },    
  beforeDestroy() {
    this.websock.close();
  },
}

</script>


      