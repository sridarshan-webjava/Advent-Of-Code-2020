//declaring modules
const fs = require("fs");

/*function to find paths for a given sequence (find possible arrangements for the input in an efficient way)
part-2*/
function checkPaths(input){
  //array to hold count of each input value
  let arr = [];
  //count of number of paths possible for each value in the input
  let count = 0;
  //index of the values
  let index;
  //loop to push initial values in the count array 
  for(let i=0;i<input.length;i++){
    arr.push(0);
  }
  //assigning value of 1 (1 possible path) for the last element since there is only one arrangement
  arr[arr.length-1] = 1;
  //loop to find arrangements for every input value
  for(let i=input.length-2;i>=0;i--){
    const num = input[i];
    count = 0;
    //loop to calculate values by adding 1,2,3 to input value . If value exists consider the count of that value 
    for(let j=1;j<4;j++){
      if(input.includes(num+j)){
        console.log("num is ",num+j);
        index = input.indexOf(num+j);
        count += arr[index];
        console.log("count is",count);
      }
    }
    //assign the final value of count to that index in the array
    arr[i] = count;
  }
  //return the starting value as it will indicate possible arrangements of the input
  return arr[0];
}

//reading input from file
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n").map(value=>Number(value)).filter(num=>Number(num));
    //sort the input in ascending order
    input.sort((a,b)=>a-b);
    //object to store values that have a difference of either 1,2 or 3
    let obj = {
      1:0,
      2:0,
      3:0,
    };
    obj[1] = obj[1] + 1;
    //loop to calculate difference between adjacent elements
    for(let i=1;i<input.length;i++){
      //calculate difference
      const value = Math.abs(input[i] - input[i-1]);
      //check the difference value
      if(value===1){
        obj[1] = obj[1] + 1;
      }
      else if(value===2){
        obj[2] = obj[2] + 1;
      }
      else if(value===3){
        obj[3] = obj[3] + 1;
      }
    }
    obj[3] = obj[3] + 1;
    //pusing 0 and the (max value +3) into the array
    input.push(input[input.length-1]+3);
    input.splice(0,0,0);
    //calling function checkPaths() to get possible arrangements of input
    const count = checkPaths(input);
    //print count value
    console.log(count);
  }
})