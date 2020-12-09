//declaring modules
const fs = require("fs");

/*function to get contiguous numbers that add upto the wrong number that is included in the array. 
(Part - 2)*/
function getNumbers(input,num){
  //array to store the numbers
  let numArray = [];
  //Outer loop that will select the first number
  for(let i=0;i<input.length;i++){
    //clearing the array after every iteration 
    numArray.splice(0,numArray.length);
    //pushing outer number
    numArray.push(input[i]);
    //inner to loop to add on elements to check for sum
    for(let j=i+1;j<input.length;j++){
      //push the number into the array
      numArray.push(input[j]);
      //calculate sum of all numbers in the array
      let sum = numArray.reduce((acc,no)=>{
        return acc+no;
      },0);
      //compare sum with the incorrect value and return the array of no's if the values are equal
      if(sum===num){
        return numArray;
      }
    }
  }
  return numArray;
}

/*Function to check for the wrong number that does not have any pair of numbers adding to the sum 
Part-1 */
function checkNumber(input,num,start,end){
  //array to store 25 preambles
  let numArray = [];
  //pushing 25 numbers from the input into the array
  for(let i=start;i<end;i++){
    numArray.push(input[i]);
  }
  //sorting the array in ascending order
  numArray = numArray.sort((a,b)=>a-b);
  //two pointers: left->start and right->end
  let left=0,right=numArray.length-1;
  //Iterate through the array till the midpoint is reached(left<right)
  while(left<right){
    //if sum is greater than the number then decrement the end pointer
    if(numArray[left] + numArray[right] > num){
      right--;
    }
    //if the sum is lesser than the number then increment the start pointer
    else if(numArray[left] + numArray[right] < num){
      left++;
    }
    //else if the values are equal return true
    else{
      return true;
    }
  }
  //if there are no pairs for the number then return false
  return false;
}

//reading input from file
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    const input = data.split("\n").map(num=>Number(num)).filter(value=>Number(value));
    //num - index of the wrong number
    let num;
    //getting 25 numbers for every iteration
    let count= 25;
    //loop to get the 25 numbers and finding the wrong number by calling checkNumber() function
    for(let i=0;i<input.length;i++){
      const result = checkNumber(input,input[i+count],i,i+ count);
      //if the result is false , i.e. if there are no pairs then print the number
      if(!result){
        console.log(input[i+count]);
        num = input.indexOf(input[i+count]);
        break;
      }
    }
    //function to get a set of numbers that whose sum equals the found incorrect number
    const arr = getNumbers(input,input[num]);
    console.log(arr);
    //finding minimum and maximum from the set
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    //printing sum of min and max numbers
    console.log(min+max);
  }
})