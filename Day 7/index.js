/* Both Part 1 and Part 2*/

//declaring modules
const fs = require("fs");

/* part -1 :
To find the outer bags that contain atleast one "shiny gold" inner bag. Queue like structure is used here to keep track of the outer bags. The value returned is a count of the number of bags that contain "shiny gold" bag*/
function findCount(input){
  //declaring variabled and queue for storing outer colors
  let count = 0,index=0;
  const queue = [];

  /*push shiny gold as initial value to find direct outer parent*/
  queue.push("shiny gold");

  /*Keep traversing the list till all the direct and indirect parents are visited (as stored in the queue)*/  
  while(index!==queue.length){
    //considering the outer color at the specified index
    const color = queue[index];

    /*iterating through the inner colors of this parent color*/
    for(let i=0;i<input.length;i++){
      const content = input[i].slice(input[i].indexOf("contain")+1);

      /*checking if any outer color includes the inner color . eg : checking if bright white consists of shiny gold as inner color*/ 

      if(content.includes(color)){
        //if true push this color into the queue
        const outerColor = input[i].slice(0,input[i].indexOf('bags')-1);

        //checking if the queue already contains the color
        if(!queue.includes(outerColor)){
          count++;
          queue.push(outerColor);
        }

      }
    }
    //increment index after every color in the queue is visited
    index++;
  }
  //return count of number of outer bags 
  return count;
}

//creating an object for mapping outer and inner colors
function mapColors(input){
  /*declaring an object which will map outer and inner colors*/
  let colorBags = {};
  /* Identify each outer color from the input and create a list of inner colors that it contains*/
    input.forEach(value=>{
      //getting the value of outer color
      const outer = value.slice(0,value.indexOf("bags")-1);
      //a temporary array for storing inner colors 
      let temp = [];
      //object which will store the value of inner colors
      let colors = {};
      /*Mapping the count of inner bags along with its inner color*/
      temp = value.slice(value.indexOf("contain")+8).split(", ").forEach(value=>{
        if(value.includes("no other bags")){
          colors = 0;
        }
        else{
          if(value.includes(" bags")){
            value = value.replace(" bags","");
          }
          if(value.includes(" bag")){
            value = value.replace(" bag","");
          }
          const innerColor = value.slice(value.indexOf(" ")+1);
          colors[innerColor] = Number(value.slice(0,1));
        }
      });
      //mapping outer color with the inner list
      colorBags[outer] = colors;
    });
    //return the mapped list
   return colorBags; 
}

/*part 2 : 
A recursive function that will calculate the number of inner bags that are requierd within a single "shiny gold bag". In this function a color value is given as input and we traverse until we find a color which does not contain any inner bags. The count value is calculated and returned after the recursion*/
function findInnerBags(input,color){
  /*If the outer color does not have any inner bag , return 0*/
  if(input[color]===0){
    return 0;
  }
  /*If it has , then iterate and pick out the color, keep traversing the list by finding out the inner bags within it*/
  else{
    let count = 0;
//calculating count value - inner bags count
    for(let innerColor in input[color]){
      count = count + input[color][innerColor] + (input[color][innerColor] * findInnerBags(input,innerColor));
    }

    return count;
  }
}

//reading file for input
fs.readFile("input.txt","utf8",(err,data)=>{
  if(err) throw err;
  else{
    //split the input srting into an array
    const input = data.split(".\n");
    //removing period from last string of input 
    input[input.length-1] = input[input.length-1].replace(".","");
    /*Calling function findCount : which returns the count of outer bags that has the "shiny gold " bag within it - part 1*/
    const bagsCount = findCount(input);
    //printing the bag count
    console.log(bagsCount);
    //map outer with inner colors
    const mapColorBags = mapColors(input)
    
  /*Calling findInnerBags : which returns the number of inner bags within the "shiny gold" bag - part 2*/
    const goldInnerBags = findInnerBags(mapColorBags,"shiny gold");
    //printing the bag count
    console.log(goldInnerBags);
  }
});