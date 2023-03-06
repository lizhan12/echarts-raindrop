import * as echarts from 'echarts/lib/echarts';
export default echarts.graphic.extendShape({
  type: 'ec-raindrop',
  shape: {
    cx: 0,
    cy: 0,
    width: 100,
    height: 100,
    radius: 50,
    waveHeight: 10,
    amplitude: 5,
    phase: 0,
    frequency: 0.03,
    colorStops: [
      { offset: 0, color: '#36cfc9' },
      { offset: 1, color: '#73e8f4' },
    ],
  },
  style: {
    fill: null,
    stroke: null,
  },
  buildPath: function (_ctx, shape) {
    const ctx = _ctx._ctx
    const { cx, cy, width, height, radius, waveHeight, amplitude, phase, frequency } = shape
    const startX = -radius - 10
    const endX = radius + 10
    const startY = radius + waveHeight / 2
    const endY = cy + radius + waveHeight / 2
    const colorStops = shape.colorStops.map(({ offset, color }) => [offset, color])
    const gradient = new echarts.graphic.LinearGradient(0, startY, 0, endY, colorStops)

    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.translate(cx, cy)
    ctx.scale(1, -1)
    ctx.beginPath()
    for (let x = startX; x <= endX; x += 5) {
      const y = amplitude * Math.sin(frequency * x + phase) + startY
      ctx.lineTo(x, y)
    }
    ctx.lineTo(endX, endY)
    ctx.lineTo(startX, endY)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.restore()
  },
})
