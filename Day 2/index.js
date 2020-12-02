/* takes a string as input and generates a range/position,character to be identified and the password. The returned value is an array with all the generated inputs */
function getInputs(input){
    const temp = input.split(" ");
    const minValue = Number(temp[0].split("-")[0]);
    const maxValue = Number(temp[0].split("-")[1]);
    const char = temp[1].slice(0,1);
    let pwd = temp[2];
    const result = [];
    result.push(minValue);
    result.push(maxValue);
    result.push(char);
    result.push(pwd);
    return result;
  }
  
  /* function to check for password according to constraints
  (checks if the number of times a character appears in the password is within the given range - old policy)
  Part-1
  */
  function checkPassword(input){
  
    const updatedPwd = getInputs(input);
  
    const occurence = (updatedPwd[3].split(updatedPwd[2]).length-1);
  
  /*condition to check if count of character is within the range*/
    if(occurence>=updatedPwd[0] && occurence<=updatedPwd[1]){
      return true;
    }
    return false;
  
  }
  
  
  /* function to check for password according to constraints
  (checks if the character appears at the specified positions. If they appear at both positions or if they dont appear at both , they are invalid. If they appear at either position they are valid- new policy)
  Part-2
  */
  
  function checkForPosition(input){
  
    const updatedPwd = getInputs(input);
  
    const start = updatedPwd[0]-1;
    const end = updatedPwd[1]-1;
  
    //condition to check for character at positions
    if((updatedPwd[3][start]===updatedPwd[2] && updatedPwd[3][end]===updatedPwd[2]) || updatedPwd[3][start]!==updatedPwd[2] && updatedPwd[3][end]!==updatedPwd[2]){
      return false;
    }
    else{
      return true;
    }
  }
  
  //declaring modules
  const fs = require("fs");
  
  //reading input values from file;
  fs.readFile("input.txt","utf8",(err,data)=>{
    if(err) throw err;
    else{
      //splitting the input data t
      const inputArr = data.split("\n");
  
      /*finding the count of valid results from the input array*/
  
      const count = inputArr.reduce((acc,value)=>{
        //part-1
        // const result = checkPassword(value);
  
        //part-2
        const result = checkForPosition(value);
  
        /*if returned value is true increment accumalator value*/
  
        if(result){
          acc++;
        }
        return acc;
      },0);
  
    //print result
      console.log(count);
    }
  });