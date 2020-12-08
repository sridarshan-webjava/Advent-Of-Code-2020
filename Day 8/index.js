//declaring modules
const fs = require("fs");

/*function which will fetch the value (Acc value and jump count) for each instruction*/
function fetchValue(str){
  return Number(str.slice(str.indexOf(" ")+1))
}

/* Function that will check for infinite loop in a set of
 instructions. i.e. on iteration if the same set of 
 instructions is executed once again , the function will
  return true as it goes into an infinite loop. Else the
   function will return false as the last instruction
    will get executed*/
function checkInfiniteLoop(input){
  //index to keep track of the indices
  let index=0;
  //an array to keep track of the instructions visited
  let visitedInst = [];
  //loop to check for infinite loop for instructions
  while(true){
    /* if index reaches the length of the input then it
     means all instructions are executed and there is no
      infinite loop case. So return false*/
      if(index===input.length){
        return false;
      }
      const inst = input[index];
      /*if array already consists of the instruction , it
       means that repetition of instructions are
        performed resulting in infinite loop. So
         therefore return true*/
      if(visitedInst.includes(index)){
        return true;
      }
      //pushing current instruction into the array
      visitedInst.push(index);
      /* if the instruction is an 'acc' or 'nop' instruction move to the next index*/
      if(inst.includes("acc") || inst.includes("nop")){
        index++;
      }
      /* if its a jump instruction then move to the index
       that corresponds to the count specified in the
        instruction relative to the current index*/
      else if(inst.includes("jmp")){
        index += fetchValue(inst);
      }
    }
}

/* function that will calculate the value of acc for a given input*/
function getAccValue(input){
  let index=0,acc=0;
  let visitedInst = [];
  while(true){
    if(index===input.length){
      break;
    }
    const inst = input[index];
    if(visitedInst.includes(index)){
      break;
    }
    visitedInst.push(index);
    if(inst.includes("acc")){
      acc += fetchValue(inst);
      index++;
    }
    else if(inst.includes("jmp")){
      index += fetchValue(inst);
    }
    else{
      index++;
    }
  }
  return acc;
}

/*function that will change 'jmp' to 'nop' instruction 
and vice-versa for checking if the change brings about a
 termination of the code that consists of the
  instructions. If a change is found and does not result
   in infinite loop , then return the accumalator value 
   as a result*/
function changeInst(input){
  //declaring index for storing indices and flag for carrying out checking of infinite loop in the case of jmp and nop instructions
  let index = 0;
  let flag = 0;
  //loop that runs till the end of the input
  while(index!==input.length){
    let str2;
    const inst = input[index];
  /*if the instruction is a jmp instruction then change
  it to a nop instruction*/
    if(inst.includes("jmp")){
      //assigning current instruction to temp variable
      str2 = inst;
      input[index] = "nop " + fetchValue(inst);
      flag=1;
    }
    /*if the instruction is a nop instruction then change
  it to a jmp instruction*/
    else if(inst.includes("nop")){
      //assigning current instruction to temp variable
      str2 = inst;
      input[index] = "jmp " + fetchValue(inst);
      flag=1;
    }
    /* checking of infinite loop in code takes place only
     when the instruction is a jmp or nop instruction. 
     After the change (jmp to nop or nop to jmp) 
    perform checking and return the value of acc if 
    it is valid*/
    if(flag===1){
      const result = checkInfiniteLoop(input);
      if(!result){
        //if there is no infinite loop , then get acc value and return it
        const acc = getAccValue(input);
        return acc;
      }
      else{
        //else assign the old instruction to the current index
        input[index] = str2;
      }
    }
    index++;
    flag=0;
  }
  return 0;
}

//reading file for input
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n");
    //gets value of acc for the input before change of instruction
    const accValueInLoop = getAccValue(input);
    //gets value of acc for the input after change of instruction
    const accValueAfterChange = changeInst(input);
    console.log(accValueInLoop,accValueAfterChange);
  }
})