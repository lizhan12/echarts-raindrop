//@ts-ignore
import * as echarts from 'echarts/lib/echarts';
export default echarts.graphic.extendShape({
  type: 'ec-raindrop',
  shape: {
    radius: 100,
    cy: 10,
    width: 100,
    height: 100,
    waveHeight: 50,
    amplitude: 10,
    phase: 200,
    frequency: 0.04,
  },
  normalStyle: {},
  buildPath: function (_ctx, shape, normalStyle) {
    // console.log(_ctx)
    // console.log(23)/
    // console.log(this.normalStyle)
    // console.log(shape);
    const ctx = _ctx._ctx
    this.drawRaindrop(ctx, shape)
    this.drawWave(ctx, shape)
  },

  getColor (ctx, h) {
    const { color } = this.normalStyle
    const { cy } = this.shape
    const n = ~~((1 / color.length) * 100) / 100;
    const colors = ctx.createLinearGradient(0, cy, 0, h);
    color.forEach((c, i) => {
      const tmp = (i + 1) == color.length ? 1 : i * n;
      colors.addColorStop(tmp, c)

    });
    return colors

  },

  drawRaindrop (ctx, shape) {
    const { center, radius, width, height } = shape
    const offsetX = ~~(radius / 4), offsetY = 5;
    ctx.clearRect(0, 0, width, height);
    ctx.save()
    ctx.globalAlpha = 0.8;
    const colors = this.getColor(ctx, radius * 3);
    ctx.fillStyle = colors
    ctx.strokeStyle = colors
    ctx.lineWidth = 4
    ctx.translate(...center)
    ctx.scale(1, -1)
    ctx.moveTo(0, 3 * radius)
    ctx.bezierCurveTo(offsetX, 3 * radius - offsetY, radius, 2 * radius, radius, radius)
    ctx.arc(0, 1 * radius, radius, 0, Math.PI, true);
    ctx.bezierCurveTo(-radius, 2 * radius, -offsetX, 3 * radius - offsetY, 0, 3 * radius)
    ctx.fill()
    ctx.clip()
    // ctx.restore()
  },

  drawWave (ctx, shape) {
    const { phase, radius, amplitude, frequency, waveHeight,center, } = shape
    // ctx.translate(...center)
    // ctx.scale(1, -1)
    // ctx.moveTo(0, 3 * radius)
    // ctx.strokeStyle = 'rgba(255,255,255,0)';
    ctx.lineWidth = 2;
    const startY = waveHeight ;
    ctx.beginPath()
    ctx.moveTo(-radius - 10, startY)
    for (let i = -radius; i < radius + 10; i += 5) {
      const y = amplitude * Math.sin(frequency * i + phase) + startY
      ctx.lineTo(i, y)
    }
    // ctx.stroke()
    // ctx.save()

    // ctx.fill()
    // ctx.restore()

  }
})