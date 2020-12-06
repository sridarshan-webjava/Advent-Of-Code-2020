//declaring modules
const fs = require("fs");

//reading file for input
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n\n");

    //generating an array of terms (questions for groups)
    const arr = input.map(value=>{
      let index=0,i=0;
      while(true){
        index = value.indexOf("\n",i);
        if(index!==-1){
          value = value.replace("\n","");
          i = index+1;
        }
        else{
          break;
        }
      }
      return value;
    });

    /*gives count of the total number of question answered by anyone of the group - distinct elements or questions*/
    const count = arr.reduce((acc,value)=>{
      //using set for finding number of distinct terms
      let set = new Set();
      for(let i=0;i<value.length;i++){
        set.add(value[i]);
      }
      acc += set.size;
      return acc;
    },0);

    //printing the number of questions
    console.log(count);
  }
});