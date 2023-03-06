var constructRectangle = function(area) {
  const arr = [];
  for(let i = 1, n = (area >>1); i <=  n; i++){
      if(area %i == 0){
        console.log(i);
          arr.push([i, area/i])
      
        }

  }
  let prev = Infinity;
  let result = []
  arr.forEach(list => {
      const tmp = Math.abs(list[0] - list[1]);
      console.log(tmp);
      if(tmp < prev){
             result = list;
             prev = tmp;
      }
  })

  return result;
}

constructRectangle(4)