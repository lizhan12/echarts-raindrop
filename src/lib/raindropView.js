import * as echarts from 'echarts/lib/echarts.js';
import raindropShape from './raindropShape';

echarts.extendChartView({
  type: "raindrop",
  render: function (seriesModel, ecModely, api) {
    const self = this;
    const group = this.group;
    // const group = new echarts.graphic.Group()
    var wavePath = null;
    var isFillContainer = true;
    var width = api.getWidth();
    var height = api.getHeight();
    let radius = height / 2;
    var symbol = seriesModel.get('shape');
    const showLabel = seriesModel.get("label.show")

    group.removeAll()
    const data = seriesModel.getData();
    // console.log(data);
    const itemModel = data.getItemModel(0)
    var center = itemModel.get('center');
    center = [parseInt(center[0]) / 100 * width, parseInt(center[1]) / 100 * height]
    // console.log(center);
    const radiusPercentage = parseInt(itemModel.get('radius')) / 100;
    const pointStyle = itemModel.get("pointStyle")
    const oldData = this._data;
    const waves = []
    data.diff(oldData).add(function (idex) {
      const wave = getWave()
      // console.log(wave.shape.waterLevel);
      group.add(wave)
      waves.push(wave)
      if (showLabel) {

        group.add(getTxt())
      }

      setWaveAnimation(idex, wave, null)


    }).update(function (newIdx, olcIdx) {
      const waveElement = oldData.getItemGraphicEl(oldIdx);
      const newWave = getWave()
      echarts.graphic.updateProps(waveElement, {}, seriesModel)
      group.add(waveElement)
      waves.push(waveElement)

      // console.log(newIdx, "23444")

    }).remove(function (idx) {
      var wave = oldData.getItemGraphicEl(idx);
      group.remove(wave);
    }).execute()
    /**
     * 
     */
    function getTxt () {
      var labelModel = itemModel.getModel('label');
      var style = labelModel.get("style")
      const txtOffset = parseInt(style.fontSize)
      // console.log(style, txtOffset);
      function formatLabel () {
        var formatted = seriesModel.getFormattedLabel(0, 'normal');
        var defaultVal = (data.get('value', 0) * 100);
        var defaultLabel = data.getName(0) || seriesModel.name;
        if (!isNaN(defaultVal)) {
          defaultLabel = defaultVal.toFixed(0);
        }
        return formatted == null ? defaultLabel : formatted;
      }
      var textRectOption = {
        z2: 10,
        shape: {
          x: 0,
          y: 0,
          width: 500,
          height: 800
        },
        style: {
          fill: 'red',
          stroke: "blue",
          lineWidth: 2
        },
        // textConfig: {
        //   position: labelModel.get('position') || 'inside'
        // },
        // silent: true
      };
      var textOption = {
        style: {
          text: formatLabel(),
          // fontSize:'20px',
          textAlign: labelModel.get('align'),
          textVerticalAlign: labelModel.get('baseline'),
          fill: "#fff",
          ...style
        },
        position: [width / 2 - txtOffset / 2, height / 2]
      };
      var insideTextRect = new echarts.graphic.Rect(textRectOption);
      insideTextRect.disableLabelAnimation = true;
      const labelOp = echarts.helper.createTextStyle(labelModel);
      // labelOp.style = {...}
      textOption = { ...textOption, ...labelOp, }
      // console.log(textOption);
      var insideText = new echarts.graphic.Text(textOption);
      // insideTextRect.setTextContent(insideText);
      // var insColor = labelModel.get('insideColor');
      // insideText.style.fill = insColor;
      // const group = new echarts.graphic.Group();
      // group.add(insideTextRect);
      // return group
      return insideText;


    }


    function getR () {
      const dis = 5;
      // const { width, height } = ctx.canvas
      center = [width / 2, height - dis];
      const minLen = Math.min(width, height);
      radius = ~~((minLen - 2 * dis) / 3 * 1.3 * radiusPercentage)
      return { center, radius, cy: dis }
    }
    function getWave (idx, isInverse, oldWave) {
      const itemModel = data.getItemModel(idx);
      const itemStyleModel = itemModel.getModel('itemStyle');
      const normalStyle = itemStyleModel.getItemStyle();
      const obj = getR()
      const seriesColor = seriesModel.get('color');
      normalStyle.color = seriesColor
      let val = data.get('value', 0)

      val = val ? val : 0;
      obj.waveHeight = obj.radius * 3 * val;


      // console.log();
      // var phase = itemModel.get('phase');
      // var amplitude = parsePercent(itemModel.get('amplitude'),
      //   radiusY * 2);
      // var waveLength = parsePercent(itemModel.get('waveLength'),
      //   radiusX * 2);

      // var value = data.get('value', idx);
      // var waterLevel = radiusY - value * radiusY * 2;
      // phase = oldWave ? oldWave.shape.phase
      //   : (phase === 'auto' ? idx * Math.PI / 4 : phase);
      // var normalStyle = itemStyleModel.getItemStyle();
      // if (!normalStyle.fill) {
      //   var seriesColor = seriesModel.get('color');
      //   var id = idx % seriesColor.length;
      //   normalStyle.fill = seriesColor[id];
      // }
      // var x = radiusX * 2;

      const wave = new raindropShape({
        pointStyle:pointStyle,
        shape: {
          phase: 200,
          width,
          height,
          ...obj
        },
        normalStyle: normalStyle
      })

      // wave.shape._waterLevel = waterLevel;

      // var hoverStyle = itemModel.getModel('emphasis.itemStyle')
      //   .getItemStyle();
      // hoverStyle.lineWidth = 0;
      // debugger


      return wave;
    }


    function setWaveAnimation (idx, wave, lodWave) {
      // console.log(wave);
      const itemModel = data.getItemModel(idx);
      const maxSpeed = itemModel.get('period')
      let phase = itemModel.get('phase')
      let value = data.get("value", idx);
      phase = phase == 'auto' ? idx * Math.PI : phase
      const defaultSpeed = function (maxSpeed) {
        const cnt = data.count();
        return cnt == 0 ? maxSpeed : maxSpeed * (0.2 + (cnt - idx) / cnt * 0.8);
      }
      let speed = 0;
      if (maxSpeed == 'auto') {
        speed = defaultSpeed(10000)
      } else {
        speed = typeof maxSpeed == 'function' ? maxSpeed(value, idx) : maxSpeed
      }

      let phaseOffset = Math.PI;
      if (itemModel.get("waveAnimation")) {
        wave
          .animate('shape', true)
          .when(0, { phase: phase })
          .when(speed / 2, { phase: phaseOffset + phase })
          .when(speed, { phase: phaseOffset * 2 + phase })
          .during(function () {

          })
          .start()

      }
      // let phase =  wave.shape.phase
      // console.log(phase)

    }
    return group; // 返回 Group，供 ECharts 进行渲染

  }
})
