# raindrop chart
Raindrop chart plugin for Echarts.

## Install Echarts
```
npm install echarts
npm install echarts-raindrop
```
NOTE:
echarts-raindrop depends on Echarts version 5 or above.

## Examples
### A simple Example
```js
  const option = 
    {
    series:[{
      type:"raindrop",
      data:[0.4],
      label:{
        style:{
          fontSize:"30px",
          fill:"rgba(255,255,255,0.7)"
        }
      }
    }
  }

```

[A simple raindrop chart](https://book.lizhan1227.xyz/img/raindrop.gif)