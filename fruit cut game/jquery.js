var playing = false;
var scorevalue;
var trailsleft;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var action;
var steps;

$(function(){
    $('#startreset').click(function(){
//check wheather we are playing are not
        if(playing == true){
            location.reload();
        }else{

            playing == true;                 //game intiated

            //hide game over box
            $('#gameover').hide();

            scorevalue = 0;                      //set score to 0
            $('#scorevalue').html(scorevalue);

            //show trail left box
            $('#trails_left').show();       
            trailsleft = 3;
            addHearts();

            

            //change button text to reset game
            $('#startreset').html("RESET GAME");    
            
            //to create a random fruits
            startAction();                          

        }

    });

    // slice a fruit
//      play sound
//      explode fruit

    $('#fruit').mouseover(function(){

        scorevalue++;
        $('#scorevalue').html(scorevalue);

        $('#slicesound')[0].play();

        //stop fruit movement 
        clearInterval(action);
        

        // hide fruit with an animation (requires jQueryUI)
        $("#fruit").hide("explode", 500);

        //send new fruit after explosion finishes
        setTimeout(startAction, 500);                         

   
        
        
    });



//Functions

function addHearts (){
    $('#trails_left').empty();
    for(i=0 ; i<trailsleft; i++){
        $('#trails_left').append('<img src="Images/pic.png" class="life">');
    }
    
}

function startAction(){
    //to generate a random fruit
    $('#fruit').show();
    choosefruit();

    // position the fruit above the fruitContainer to start
    $("#fruit").css({'left': Math.round(550*Math.random()), 'top': -50});
    // each pic has a width of 100 px, setting them at a random horizontal
    // position in the 650 px container, left property is between 0 and 550
    //left has to be random 
    //$('#fruit').css({'left':300,'top':-50});

    
    

    //generate random steps to move frits down by one step every 10ms
    steps = 1+ Math.round(5*Math.random());
    console.log(steps);

    action = setInterval(function(){
        $('#fruit').css('top',$('#fruit').position().top + steps); 
        
        //check if the fruit is too low 
        if($('#fruit').position().top > 
        $('#main').height()){

            //check if we have trails or not
            if(trailsleft > 1){

                //generate fruit (i.e repeate all the 4 steps)
                $('#fruit').show();
                choosefruit();
                $('#fruit').css({'left': Math.round(550*Math.random()),'top':-50});
                steps = 1+ Math.round(5*Math.random());

                //reduce trailsleft by 1
                trailsleft--;

                //populate trailsleft box
                addHearts();

            }else{
                //game over
                playing = false;
                stopAction();
                $('#startreset').html('START GAME');
                $('#gameover').show();
                $('#gameover').html('<p>game over!</p><p>Your score is :' +scorevalue+'</p>');
                $('#trails_left').hide();
                
            }

        }


    },10);

}

function choosefruit(){
    $('#fruit').attr('src', 'images/'+fruits[Math.round(8*Math.random())]+'.png');
}

function stopAction(){
    clearInterval(action);
    $('#fruit').hide();
}

});