//declaring modules
const fs = require("fs");

/* function for calculating Id's using upper,lower values
for F and B : Upper = 127 and Lower = 0
for R and L : Upper = 7 and Lower = 0*/
function calculateId(ch1,ch2,lower,upper,count,length,value){
  while(count < length){
    const num = (upper + lower)/2;
    const mid = parseInt(num.toString());
    if(value[count]===ch1){
      upper = mid;
    }
    else if(value[count]===ch2){
      lower = mid+1;
    }
    count++;
  }
  return lower;
}

//reading input from file
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n");
    //returns an array with ID's for inputs
    const resultId = input.map(value=>{
      let id=0;
      const row = calculateId("F","B",0,127,0,7,value);
      const col = calculateId("L","R",0,7,7,10,value)
      id = row * 8 + col;
      return id;
    });
    //sorting the ID's in descending order
    resultId.sort((a,b)=>{
      return b-a;
    });
    console.log(resultId[0]);

    //Part 02
    /*getting the Id which is (ID +1) and (ID-1) from the found ID's in the array due to missing seats*/ 
    let i;
    for(i=resultId.length-1;i>=0;i--){
      if(resultId[i]+1 !== resultId[i-1]){
        break;
      }
    }
    console.log(resultId[i]+1);
  }
});