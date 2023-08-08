import * as echarts from "echarts"
// import a from "../dist/main"
import "./lib/index"


window.onload = function () {
  // a()
  const chart = echarts.init(document.querySelector(".app"))
  chart.setOption({
    series: [{
      type: "raindrop",
      // pointStyle:{
      //   color:"#f0f"
      // },
      // center:[70,50],
      // color:["#ff0", "#f0f"],
      data: [0.4],
      label: {
        style: {
          fontSize: "30px",
          fill: "rgba(255,255,255,0.7)"
        }
      }
    }]
  })

  // const chart1 =  echarts.init(document.querySelector(".app1"))
  // chart1.setOption({
  //   series:[{
  //     type:"raindrop",
  //     // color:["#ff0", "#f0f"],
  //     data:[0.5]
  //   }]
  // })

}