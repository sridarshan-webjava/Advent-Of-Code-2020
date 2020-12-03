/* Both Part 1 & 2 included in the same program :
Part 1 - calculating number of trees along the slope (3 Rights 1 down)
Part 2 - displaying the product of trees along various other slopes
*/

//declaring modules
const fs = require("fs");

//function to calculate number of trees along the slope
function treesCount(rowCount,colCount,input){
  console.log(rowCount,colCount);
  let treeCount = 0,row = 0,col = 0;
  while(row < input.length){
    if(input[row][col]==="#"){
      console.log(row,col,input[row][col]);
      treeCount++;
    }
    col = (col+colCount)%input[0].length;
    row += rowCount;
  }
  console.log("treeCount is : ",treeCount);
  return treeCount;
}

//function to multiply values of all slopes
function multiply(input){
  const num1 = treesCount(1,1,input);
  const num2 = treesCount(1,3,input);
  const num3 = treesCount(1,5,input);
  const num4 = treesCount(1,7,input);
  const num5 = treesCount(2,1,input);
  console.log(num1,num2,num3,num4,num5);
  return num1*num2*num3*num4*num5;
}

//reading input from file
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const tempArr = data.split("\n");
    const input = tempArr.map(value=>value.split(""));
    const n = 1;
    let trees = 0,total=1;
    result = multiply(input);
    console.log(result);
  }
});