
  $(document).ready(function(){
    console.log('ready');
    $('html').on('click',function(){
    $('.leftCover').css("left","-50vw");
    $('.rightCover').css("right","-50vw");
    $('.logoAreaMain').fadeIn().css("opacity","1");
  });

//timeout resetting the curtain now set to 2 minutes so effectively 
//will work 60 seconds after initial opening if no touch detected

var activityTimeout = setTimeout(inActive, 120000);


function resetActive(){
    $(document.body).attr('class', 'browsing');
    clearTimeout(activityTimeout);
    clearTimeout(automaticSliderTimer);
    //timeout in this case set to 60s if touch has been detected
    activityTimeout = setTimeout(inActive, 60000);
    // clearInterval(openingTimer);
    // openingTimer = setInterval(autoOpen,20000);
}

// No activity will reset the screen and bring back the title in transition.
function inActive(){
    $(document.body).attr('class', 'inactive');
    $('.leftCover').css("left","0vw");
    $('.rightCover').css("right","0vw");
    $('.logoAreaMain').fadeOut().css("opacity","0");
    clearInterval(openingTimer);
    openingTimer = setInterval(autoOpen,60000);
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(inActive, 120000);
    clearTimeout(automaticSliderTimer);
    automaticSliderTimer = setInterval(slideSwitch, 10000 );
}

// Check to see if the user has clicked left or right and if so reset the timer.
$(document).bind('click', function(){resetActive()});


//slider functionality

$('.sp').first().addClass('active');
$('.sp').hide();    
$('.active').show();

    $('.nextTrigger').click(function(){
      clearTimeout(automaticSliderTimer);
      $('.active').removeClass('active').addClass('oldActive');    
        if ( $('.oldActive').is(':last-child')) {
          $('.sp').first().addClass('active');
        }
        else{
          $('.oldActive').next().addClass('active');
        }
      $('.oldActive').removeClass('oldActive');
      $('.sp').fadeOut();
      $('.active').fadeIn();  
    });//close next trigger function
    
      $('.previousTrigger').click(function(){
         clearTimeout(automaticSliderTimer);
        $('.active').removeClass('active').addClass('oldActive');    
          if ( $('.oldActive').is(':first-child')) {
        $('.sp').last().addClass('active');
        }
          else{
            $('.oldActive').prev().addClass('active');
          }
      $('.oldActive').removeClass('oldActive');
      $('.sp').fadeOut();
      $('.active').fadeIn();
    });//close previous trigger function

      
    //open the screens

      var openingTimer = setInterval(autoOpen,60000);
      var automaticSliderTimer = setInterval(slideSwitch, 10000 );

      function autoOpen(){
        console.log('autoOpen');
        $('.leftCover').css("left","-50vw");
        $('.rightCover').css("right","-50vw");
        $('.logoAreaMain').fadeIn().css("opacity","1");
        clearInterval(openingTimer);
      };
       
       function slideSwitch(){
        $('.active').removeClass('active').addClass('oldActive');    
        if ( $('.oldActive').is(':last-child')) {
          $('.sp').first().addClass('active');
        }
          else{
            $('.oldActive').next().addClass('active');
        }
      $('.oldActive').removeClass('oldActive');
      $('.sp').fadeOut();
      $('.active').fadeIn(); 
      };

  });//close main function








        
