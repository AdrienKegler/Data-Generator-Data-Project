const ddg = require("./DynamicDataGenerator");

let num = 5;
var testArray = [0, 0, 0, 0, 0];

for(let b=0; b < 1000; b++){
   let i = Math.floor(Math.pow(Math.pow(ddg.gaussRand() * num, 2), 1/2)%num);


   testArray[i]++

}

console.log(testArray);