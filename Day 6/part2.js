//declaring modules
const fs = require("fs");

//reading file for input
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n\n");

    /*gives count which denotes number of questions everyone answered*/
    const count = input.reduce((acc,value)=>{
      //splitting each array value
      const arr = value.split("\n");

      /* if number of people who have answered is one , then return the number of questions they have answered as yes*/
      if(arr.length===1){
        acc += arr[0].length;
      }

      else{

        //creating a map which holds the character count
        let mapChar = new Map();

        /* gives a map which consists of the count of questions each person has answered */
        mapChar = arr.reduce((a,str)=>{
          for(let i=0;i<str.length;i++){
            if(a.has(str[i])){
              a.set(str[i],a.get(str[i])+1);
            }
            else{
              a.set(str[i],1);
            }
          }
          return a;
        },mapChar);
        /* Each value of the map which corresponds to a character(question) is taken and checked if that question is answered by all the people of the group*/
        for(let amount of mapChar.values()){
          if(amount===arr.length){
            acc += 1;
          }
        }
      }
      return acc;
    },0);
    //printing the total number of questions
    console.log(count);
  }
});