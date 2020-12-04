//importing modules
const fs = require("fs");

//reading input from file
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n\n");
    console.log(input);
    const parameters = ["byr","iyr","eyr","hgt","hcl","ecl","pid"];
    //filters those inputs that have the parameters
    const result = input.filter(value=>{
      const str = value;
      for(let i=0;i<parameters.length;i++){
        if(!str.includes(parameters[i])) return false;
      }
      return true;
    });
    console.log(result.length);
  }
})