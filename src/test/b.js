

const obj = {
  name:"lizhan",
  play(){
    console.log(this.name)
  }
}
const o = {
  age:12,
  play() {
    console.log(this.age)
  }

}

function test(obj) {

}
test.r = function(obj){
  console.log(obj);

}

function t(test,obj){
  eval("test.r(obj)")
}

t(test,o)

