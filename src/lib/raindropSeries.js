import * as echarts from 'echarts';
echarts.extendSeriesModel({
  type: "series.raindrop",
  optionUpdated: function () {
    var option = this.option;
    option.gridSize = Math.max(Math.floor(option.gridSize), 4);
  },
  getInitialData (option, ecModel) {
    // console.log(option);
    var dimensions = echarts.helper.createDimensions(option.data, {
      coordDimensions: ['value']
    });
    var list = new echarts.List(dimensions, this);
    if (option.data && option.data.length)
      option.data = [option.data[0]]
    list.initData(option.data);
    // console.log(option.data)

    return list
  },
  defaultOption: {
    color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
    center: ['50%', '50%'],
    radius: '80%',
    phase: 'auto',
    period: 'auto',
    direction: 'right',
    shape: 'circle',
    waveAnimation: true,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    animationDuration: 2000,
    gridSize:14,
    animationDurationUpdate: 1000,

    outline: {
      show: true,
      borderDistance: 8,
      itemStyle: {
        color: 'none',
        borderColor: '#294D99',
        borderWidth: 8,
        shadowBlur: 20,
        shadowColor: 'rgba(0, 0, 0, 0.25)'
      }
    },

    backgroundStyle: {
      color: '#E3F7FF'
    },

    itemStyle: {
      opacity: 0.95,
      shadowBlur: 50,
      shadowColor: 'rgba(0, 0, 0, 0.4)'
    },

    label: {
      show: true,
      color: '#294D99',
      insideColor: '#fff',
      fontSize: "40px",
      fontWeight: 'bold',

      align: 'center',
      baseline: 'middle',
      position: 'inside',
      style:{
        fontSize:"30px",
        fill:"#fff"
      }
    },

    emphasis: {
      itemStyle: {
        opacity: 0.8
      }
    }
  }
})
