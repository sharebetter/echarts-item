/*
 * @Author: 曾海明
 * @Date: 2022-01-17 09:23:26
 * @LastEditors: 曾海明
 * @LastEditTime: 2022-01-17 09:51:45
 * @Description:
 */
new Vue({
  el: '#app',
  data() {
    return {
      dataList: mapData,
      mapChart: null
    }
  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      this.$nextTick(() => {
        this.mapChart = echarts.init(document.getElementById('china-map'))
        const option = {
          tooltip: {
            formatter: (params, ticket, callback) => {
              return (params.data && params.data.text) || ""
            } //数据格式化
          },
          // 左下角图注
          visualMap: {
            min: 0,
            max: 0,
            // left: 'left',
            // top: 'bottom',
            // text: ['高','低'],//取值范围的文字
            inRange: {
              color: ['#FFE300'] //取值范围的颜色,打点颜色
            },
            show: false //图注
          },
          geo: {
            map: 'china',
            roam: false, //不开启缩放和平移
            zoom: 1.23, //视角缩放比例
            label: {
              normal: {
                show: true,
                fontSize: '10',
                color: 'rgba(0,0,0,0.7)'
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#579CFB',
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: '#F3B329', //鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            name: '信息',
            // type: 'map',
            // geoIndex: 0,
            type: 'scatter', //标注圆点
            coordinateSystem: 'geo',
            data: this.dataList
          }]
        };
        this.mapChart.setOption(option)
        this.mapChart.on('click', (params) => {
          // alert(params.name);
          console.log(params.name)
        })
      })
    }
  },
})