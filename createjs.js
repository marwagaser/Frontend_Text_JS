        var stage;
        var image;
        var bitmap;

        function init() {
            

            stage = new createjs.Stage("myCanvas");

            var image = new Image();
            image.src = "sprite1.png";
            image.onload = handleImageLoad;
        }

        function handleImageLoad(event) {
            var image = event.target;
            bitmap = new createjs.Bitmap(image);
            bitmap.scaleX=0.5;
            bitmap.scaleY=0.5;
            bitmap.x = 50;
            bitmap.y= 50;
            stage.addChild(bitmap);
            console.log(bitmap);
            stage.update();
        }
      
 var steps = ["Change Y by: 1"];


//var steps = ["MOVE 10", "Change X by: 45", "TURN 45","Set X by:"];


function GreenButtonClicked(){
 

 for(var i=0; i<steps.length; i++)
 {
      var command = steps[i];
      var times   = command.match(/(\d+)/)[0];
      
      console.log(times);
      if(command.includes("MOVE"))
        bitmap.x+=times;
     
      if(command.includes("TURN"))
           bitmap.rotation+=times;


      if(command.includes("Change X by:"))
           bitmap.x+=times;


      if(command.includes("Change Y by:"))
         bitmap.y+=times;

      if(command.includes("POINT"))
         bitmap.rotation = times; 

        
      
      //createjs.Tween.get(circle).to({x: 275, y: 200}

     // if(command.includes("Set Y by:"))


      // if(command.includes("Change Y by:"))
      //   circle.y+=times;

      
      //if(command.includes(""))
     

    

    stage.update();  

 } //end of for loop



}// end of Green Button Clicked






    

        


 
