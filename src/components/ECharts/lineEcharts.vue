<template>
    <div>
      <div :id="id" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import westeros from './theme/westeros'
  export default {
    name: 'lineEcharts',
    props: {
      id: {
        type: String,
        default: 'myChart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id),'westeros')

        this.chart.setOption({
          title: {
            text: '月任务统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['任务总数','完成总数','未完成总数','执行中总数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'任务总数',
              type:'line',
              stack: '总量',
              data:[8200, 6320, 5010, 4340, 3400, 2300, 2500, 4500, 4536, 6523, 5411, 3541]
            },
            {
              name:'完成总数',
              type:'line',
              stack: '总量',
              data:[2200, 3820, 1910, 2340, 4900, 3300, 2366, 3522, 4522, 2533, 3200, 2500]
            },
            {
              name:'未完成总数',
              type:'line',
              stack: '总量',
              data:[2500, 4302, 5010, 2540, 6900, 5300, 6410, 1100, 2300, 200, 150, 50]
            },
            {
              name:'执行中总数',
              type:'line',
              stack: '总量',
              data:[5320, 7332, 9301, 6334, 5390, 4330, 1320, 1100, 1100, 1100, 1100, 2300]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
