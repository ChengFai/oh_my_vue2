<template>
    <div>
        <h3>交易所行情</h3>
        <table>
          币安
          <tbody>
            <tr>
              <th>排名</th>
              <th>币种</th>
              <th>涨幅</th>
            </tr>
            <tr v-for="(item, index) in binanceTopList" :key="item[0]">
              <td>{{index + 1}}</td>
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </tbody>
        </table>
        <div id="myChart" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
let timer, last_time ;

export default {
  data () {
    return {
      btc_price: "0.00",
      binanceTopList: [],
      okTopList: [],
      dataList: [],
      usdt_list: [],
      symbol_list: [],
      change_map: new Map(),
      websock_id: 415257348439
    }
  },
  created () {
    let myChart = this.echarts.init(document.getElementById('myChart'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });

    this.symbol_list = localStorage.getItem("symbolList").split(",").filter(
      (item) => {
        return !(item.includes("UPUSDT") || item.includes("DOWNUSDT"))
      }
    )
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
        let now = new Date().getTime();
        if(last_time && now - last_time < 2000){
          return;
        }
        if(!timer) 
        {
          last_time = now;
          timer = setTimeout(() => {
            this.binanceDataHd(data);
            timer = null;
          }, 2000);
        }

      },
      binanceDataHd(data){
        if(Array.isArray(data)){
          data.forEach(item => {
            if(this.change_map.has(item.s)){
              this.change_map.set(item.s, item.P);
              }
          });
        }
        this.binanceTopList = Array.from(this.change_map).sort((a, b) => {
          return  b[1] - a[1];
        }).filter((item) => {
          return (item[0].substr(-8) !== "DOWNUSDT" && item[0].substr(-6) !== "UPUSDT");
        }).slice(0, 20).map((item) => {
          return [item[0].replace("USDT",""), item[1] + "%"];
        });
      },
      setbinanceTopList(latestPrice){
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


<style scoped>
table{
  width: 400px;
  border-collapse: collapse;
  border-spacing: 0;
}

td, th {
  border: 1px solid rgb(128, 128, 128);
  text-align: center;
  width: auto;
}
</style>

      