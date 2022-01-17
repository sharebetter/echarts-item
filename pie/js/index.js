/*
 * @Author: 曾海明
 * @Date: 2022-01-17 09:23:26
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-17 10:50:53
 * @Description:
 */
new Vue({
  el: '#app',
  data() {
    return {
      dataList: [{
        name: '已用额度',
        value: 5.6
      },
      {
        name: '贸易融资额度',
        value: 1
      },
      {
        name: '低风险额度',
        value: 0.8
      },
      {
        name: '流动资金贷款额度',
        value: 0.5
      },
      {
        name: '供应链融资额度',
        value: 0.5
      },
      {
        name: '可用额度',
        value: 3.8
      }],
      pieChart: null,
      pieSum: {
        name: '授信总额度',
        money: '20000',
        unit: '万元'
      },
      pieItem: null
    }
  },
  created () {
    this.pieItem = {...this.pieSum}
  },
  mounted() {
    this.pieInit()
  },
  methods: {
    pieInit() {
      this.$nextTick(() => {
        const chartDom = document.getElementById('pie');
        this.pieChart = echarts.init(chartDom);
        const option = {
          // title: {
          //   text: '阅读书籍分布',
          //   x: '20%',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          //       y: 'top',
          //   textStyle: {
          //     color: '#333333',
          //     fontWeight: 'normal',
          //     fontSize: 14
          //   }
          // },
          // graphic: [{
          //   type: 'text',
          //   left: '34%',
          //   top: '55%',
          //   z: 10,
          //   style: {
          //     fill: '#1a1a1a',
          //     text: '23432',
          //     font: '16px Microsoft YaHei'
          //   }
          // }],
          color: ['#579CFB', '#37CFBD', '#4CCB72', '#FDAB67', '#FF7D7D', '#AF76FF'],
          series: [{
            type: 'pie',
            radius: ['45%', '70%'],
            left: 'center',
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              alignTo: 'edge',
              // formatter: '{name|{b}}',
              // 鼠标hover显示，四个字换行
              formatter: function (params) {
                if (params.name.length > 4) {
                  return '{label|' + params.name.slice(0, 4) + "\n" + params.name.slice(5) + '}'
                } else {
                  return '{label|' + params.name.slice(0) + '}'
                }
              },
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                label: {
                  fontSize: 13,
                  color: '#666'
                }
              }
            },
            labelLine: {
              length: 15,
              length2: 50,
              maxSurfaceAngle: 80
              // normal: {
              //   length: 50
              // }
            },
            labelLayout: function (params) {
              const isLeft = params.labelRect.x < this.pieChart.getWidth() / 2;
              const points = params.labelLinePoints;
              // Update the end point.
              points[2][0] = isLeft ?
                params.labelRect.x :
                params.labelRect.x + params.labelRect.width;
              return {
                labelLinePoints: points
              }
            },
            data: this.dataList
          }]
        }
        this.pieChart.on('mouseover', (params) => {
          const { name, value } = params
          this.pieItem = {
            name,
            money: value,
            unit: '万元'
          }
        })
        this.pieChart.on('mouseout', (params) => {
          this.pieItem = {...this.pieSum}
        })


        option && this.pieChart.setOption(option);
      })
    }
  },
})