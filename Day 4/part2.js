//importing modules
const fs = require("fs");

/*function to remove newline escape characters in each input*/
function removeNewLine(value){
  let index;
  while(true){
    index = value.indexOf("\n");
    if(index===-1){
      break;
    }
    value = value.replace("\n"," ");
  }
  return value;
}

//function to check for validity of parameters
function checkValue(value,parameter){

  if(parameter==="byr"){
    const num = Number(value);
    if(num<1920 || num>2002){
      return false;
    }
  }

  else if(parameter==="iyr"){
    const num = Number(value);
    if(num<2010 || num>2020){
      return false;
    }
  }

  else if(parameter==="eyr"){
    const num = Number(value);
    if(num<2020 || num>2030){
      return false;
    }
  }

  else if(parameter==="hgt"){
    const units = value.slice(value.length-2,value.length);
    if(units==="cm"){
      const num = Number(value.slice(0,value.length-2));
      if(num<150 || num>193){
        return false;
      }
    }
    else if(units==="in"){
      const num = Number(value.slice(0,value.length-2));
      if(num<59 || num>76){
        return false;
      }
    }
    else{
      return false;
    }
  }

  else if(parameter==="hcl"){
    if(value.length!=7){
      return false;
    }
    else if(value[0]!=="#"){
      return false;
    }
    else{
      for(let i=1;i<value.length;i++){
        if(Number.isNaN(value[i])){
          if(value[i]<"a" || value[i]>"f"){
            return false;
          }
        }
        else{
          if(Number(value[i])<0 || Number(value[i])>9){
            return false;
          }
        }
      }
    }
  }

  else if(parameter==="ecl"){
    if(value!=="amb" && value !=="blu" && value!=="brn" && value!=="grn" && value!=="gry" && value!=="hzl" && value!=="oth"){
      return false;
    }
  }

  else if(parameter==="pid"){
    if(value.length!==9){
      return false;
    }
  }
  return true;
}

/*function that takes each string input and checks whether the parameters are included in the passport and if the value of each parameter is valid */
function checkValidity(str){
   const parameters = ["byr","iyr","eyr","hgt","hcl","ecl","pid"];

   //checks for inclusion of parameters
   for(let i=0;i<parameters.length;i++){
     if(!str.includes(parameters[i])) return false;
   }

   str = str.split(" ");
   //checking for valid values for each parameter
   for(let i=0;i<str.length;i++){
     const value = str[i].slice(str[i].indexOf(":")+1,str[i].length);
     const parameter = str[i].slice(0,str[i].indexOf(":"));
     if(!checkValue(value,parameter)){
       return false;
     }
   }
  return true;
}

//read input from file
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    let input = data.split("\n\n");
    //remove space between each line of input
    const arr = input.map(removeNewLine);
    //filters all those inputs that are valid 
    const result = arr.filter(checkValidity);
    console.log(result.length);
  }
})