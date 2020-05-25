var input;
var vizNum;
var r = [];
var g = [];
var b = [];
var titleDisplay;

function setup() {
  textFont('Dosis');
  //QTY SELECT
  input = createInput();

  // input.position(windowWidth/2-51, windowHeight/2);
  // input.position(windowWidth*0.1, windowHeight-200);
  textAlign(CENTER,CENTER);
  titleDisplay = 255;
}

function draw() {
   createCanvas(windowWidth,windowHeight);
   background(17,17,18);
   input.position(windowWidth*0.1, windowHeight*0.145);

   fill(255,255,255,titleDisplay);
   titleDisplay = titleDisplay - 0.5;
   textAlign(CENTER,CENTER);

   textSize(33);
   text("The Number Crunch", width/2-51,height*0.2);
   textSize(13);
   // text("Enter a number in\nthe below field.", width/2,height*0.444);


   // fill(222);
   // text(input.value(),222,222);
   vizNum = input.value();
   // text(vizNum, 333,333);
   
  //CONSTRUCTOR VARS
  var tablingValue = sqrt(vizNum); //calculates optimal row/column count based on dataset.length
  var marginH = (windowWidth * 0.025);
  var marginV = (windowHeight * 0.025);
  var intervalH = ((windowWidth-100 - (marginH * 3)) / tablingValue);
  var intervalV = ((windowHeight-100 - (marginV * 2)) / tablingValue); 

  
  for (var i = 0; i < vizNum; i++){
      var rowV = floor(i % tablingValue);
      var colH = floor(i / tablingValue);
      // r[i] = random(0,255);
      // g[i] = random(0,255);
      // b[i] = random(0,255);
      
      fill(255,78,0);
      noStroke();
      rect((marginH * 1.5 + colH * intervalH)*0.9, (marginV * 1.5 + rowV * intervalV)*0.9, (intervalH * 0.90)*0.9, (intervalV * 0.90)*0.9);
  }
   
   
  
}