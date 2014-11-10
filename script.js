
  $(document).ready(function(){
   console.log('ready');
   $('.diamondTrigger').on('click',function(){
    $('.leftCover').css("left","-50vw");
    $('.rightCover').css("right","-50vw");
   });

   // For dev purposes, if the user does not touch the screen for 10 seconds, reset the screen.
// This value should be changed to around 60 seconds/retailer's preference. 
var activityTimeout = setTimeout(inActive, 10000);

function resetActive(){
    $(document.body).attr('class', 'browsing');
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(inActive, 10000);
}

// No activity will reset the screen and bring back the title in transition.
function inActive(){
    $(document.body).attr('class', 'inactive');
     $('.leftCover').css("left","0vw");
    $('.rightCover').css("right","0vw");
}

// Check to see if the user has clicked left or right and if so reset the timer.
$(document).bind('click', function(){resetActive()});


//slider functionality

$('.sp').first().addClass('active');
$('.sp').hide();    
$('.active').show();

    $('.nextTrigger').click(function(){
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

  });//close main function








  