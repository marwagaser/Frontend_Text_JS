
var circle;

function init() {
        
     //Create a stage by getting a reference to the canvas
    stage = new createjs.Stage("demoCanvas");
    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawRect(0, 0, 40, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    stage.update();

 }

var steps = ["Change Y by: 100"];


//var steps = ["MOVE 10", "Change X by: 45", "TURN 45","Set X by:"];


function GreenButtonClicked(){
 

 for(var i=0; i<steps.length; i++)
 {
      var command = steps[i];
      var times   = command.match(/(\d+)/)[0];
      
      console.log(times);
      if(command.includes("MOVE"))
        for (var j = 1; j <=times; j++){circle.x+=1;}
     
      if(command.includes("TURN"))
        for(var j = 1 ; j<=times ; j++) {circle.rotation+=1;}

      if(command.includes("Set X by:"))


      if(command.includes("Change X by:"))
         for(var j = 1 ; j<=times ; j++) {circle.x++;}


      if(command.includes("Change Y by:"))
         for(var j = 1 ; j<=times ; j++) {circle.y++;}

        
      
      //createjs.Tween.get(circle).to({x: 275, y: 200}

     // if(command.includes("Set Y by:"))


      // if(command.includes("Change Y by:"))
      //   circle.y+=times;

      
      //if(command.includes(""))
     

    

    stage.update();  

 } //end of for loop



}// end of Green Button Clicked





    

        


 
