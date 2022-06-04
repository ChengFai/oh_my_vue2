<template>
  <div class="data_visualization">
    <div class="progress_statistics">
      <div id="qualityChart" :style="{ width: '383px', height: '227px' }"></div>
    </div>

    <div class="data_statistics">
      <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
      <el-radio-group v-model="type" @change="getData()" class="button_group" size="mini">
        <el-radio-button label="1">近10天</el-radio-button>
        <el-radio-button label="2">近30天</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        p_id: 11111,
        type: 1,
        markInfo:{
            domId:'markChart',
            name:'标注进度统计',
            yAxisList:["质检合格数", "已质检数", "已标注数"],
            textArr:[
            {finish:'质检判断为合格数据总量',unfinish:'质检判断为不合格数据总量'},
            {finish:'已质检数据总量',unfinish:'未验收的数据总量（包含未验收包，验收中包、验收失效的包）'},
            {finish:'已完成标注数据总量',unfinish:'未标注数据总量（包含待领取包、标注中包、失效包、打回包）'}
            ]
        },
      mark: {}, //标注
      qualityInfo:{
        domId:'qualityChart',
        name:'质检进度统计',
        yAxisList:["验收合格数", "已验收数", "已质检数"],
        textArr:[
          {finish:'验收判断为合格的数据总量',unfinish:'验收判断为不合格的数据总量'},
          {finish:'已验收的数据总量',unfinish:'未验收的数据总量（包含未验收包，验收中包、验收失效的包）'},
          {finish:'已完成质检的数据总量',unfinish:'未质检数据总量'},
        ]
      },
      quality: {}, // 质检
      acceptInfo:{
        domId:'acceptChart',
        name:'验收进度统计',
        yAxisList:["已验收数"],
        textArr:[
          {finish:'已完成验收数据总量',unfinish:'未验收的数据总量'}
        ]
      },
      accept: {}, // 验收
      count_label: [], // 图例
      count_list: [],
    };
  },
  mounted() {
        this.drawLine(this.markInfo, this.mark);
        this.drawLine(this.qualityInfo, this.quality);
          this.drawLine(this.acceptInfo, this.accept);
          this.draw(count_label, this.count_list);
  },
  methods: {
    drawLine(info, obj) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.init(document.getElementById(info.domId));
      // 绘制图表
      myChart.setOption({
      // 图标标题
        title: {
          text: info.name,
          textStyle: {
            color: "#FFF", //颜色
            fontSize: 14, //大小
            fontWeight: "normal", //粗细
          },
        },
      // 表格提示框
        tooltip: {
          backgroundColor: "#4B515E", 
          borderColor:'#4B515E',
          extraCssText:'width:150px;white-space:pre-wrap;',// 设置允许换行
          formatter: function (params) { //设置返回的提示数据
            if(params.seriesName == 'blue'){
              return info.textArr[params.dataIndex].finish;
              }else if(params.seriesName == 'grey'){
                return info.textArr[params.dataIndex].unfinish;
            }
          },
          textStyle:{
            color:'#FFF'
          }
        },
       // 设置图标的边距
        grid: {
          left: "-14%",// 2、y轴的label左对齐
          right: "17%",
          bottom: "0%",
          containLabel: true,
        },
        color: ["#194DE8", "#51525B"],
        barWidth: 12,
        xAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: {
            show: true, 
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFF"
            },
          },
        },
        yAxis: {
          type: "category",
          data: info.yAxisList,
          axisLine: {
            show: false, //y轴线消失
          },
          axisTick: {
            show: false, //y轴坐标点消失
          },
          axisLabel: {
            show: true,
            interval:0,//1、横轴信息全部显示
            left:0,
            margin:67,// 3、y轴的label左对齐
            textStyle: {
              color: "#BEBEBE", 
              align:'left' //** 
            },
          },
        },
        series: [
          {
            name: 'blue',
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: obj.finish_progress,
            itemStyle: {
              emphasis: {
                // 普通图表的高亮颜色
                color: "#6D9FFF",
                textStyle: {
                  // 文字样式
                  color: "#FFF",
                },
              },
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [6, 0, 0, 6],
              },
            },
          },
          {
            name: 'grey',
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: obj.finish_check_progress,
            itemStyle: {
              // emphasis:{
              //     // 普通图表的高亮颜色
              //     color: "#51525B"
              // },
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [0, 6, 6, 0],
                // label: {
                // //   show: true,
                // //   position: 'right',//数据在中间显示
                // //   formatter:'{c}%'//百分比显示，模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                //     // 重写未完成label，通过计算属性重新给formatter赋值，返回
                //     show: true,   // 计算的总数
                //     position: 'right',
                //     formatter: function (params) {
                //         console.log('params',params)
                //         // return params.value + data1[params.dataIndex]
                //     }
                // }
              },
            },
          },
          {
          // 该列用于做统计
            name: 'transparent',
            type: "bar",
            stack: "total",
            label: {
              normal: {
                show: true,
                position: "right",
                // formatter:'{c}%',//百分比显示，模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                formatter: function (params) {
                  // console.log(params);
                  return (obj.finish_qualified_progress[params.dataIndex] + "%");
                },
                padding:[0,10,0,8],
                textStyle: { color: "#FFF" },
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(128, 128, 128, 0)", // 柱状图颜色设为透明
              },
            },
            z: -1,
            //不同系列的柱间距离，为百分比,如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。
            // barGap: '-100%',
            data: [0, 0, 0],
          },
        ],
      });
    },

    draw(legend, data) {
      var chartDom = document.getElementById("myChart");
      var myChart = this.echarts.init(chartDom);
      var option;

      option = {
        legend: {
          left: "left", // 位置
          padding:[40, 0, 0, 22],
          icon: "roundRect", //形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 30, // 设置宽度
          itemHeight: 5, // 设置高度
          itemGap: 53, // 设置间距
          textStyle: {
            //文字样式
            color: "#BEBEBE",
            fontSize: "14",
          },
          data: legend,
        },
        grid: {
          top:'30%',
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        dataset: {
          source: data,
        },
        xAxis: { 
          type: "category",
          axisLabel:{
            // interval:0,//横轴信息全部显示
            // rotate:-20,//-15度角倾斜显示   
          }
        },
        yAxis: {},
        barWidth: 10,
        barBorderRadius: [6, 6, 6, 6],
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#6D9FFF",
                //柱形图圆角，初始化效果
                barBorderRadius: [6, 6, 0, 0],
              },
            },
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#4271FF",
                //柱形图圆角，初始化效果
                barBorderRadius: [6, 6, 0, 0],
              },
            },
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#194DE8",
                //柱形图圆角，初始化效果
                barBorderRadius: [6, 6, 0, 0],
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
      // option && myChart.setOption(option,{replaceMerge:['xAxis']});
    },
  },
};
</script>