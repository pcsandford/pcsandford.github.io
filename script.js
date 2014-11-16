$(document).ready(function(){
 console.log('ready');


 var rightCover = $('.rightCover'),
     leftCover = $('.leftCover'),
     headerText = $('.headerText'),
     logoAreaMain = $('.logoAreaMain')
     tl = new TimelineMax();


 //setting up the opening timeline for the animation
 var automaticSliderTimer
 var automaticCloseTimer
 var automaticOpenTimer
 var manualCloseTimer
 var openTimeline = new TimelineMax();

 //you can change the timing of the curtain closing after a user has touched the screen here.
 //currently 10000 = 10 seconds
 var manualClosingTime = 10000;

//you can change the timing of the automatic curtain closing here.
 //currently 40000 = 45 seconds
 var automaticClosingTime = 45000;

 function getOpenAnimation(){
       openTimeline.to(headerText,3,{opacity:'1'});
       openTimeline.to(headerText,0,{opacity:'0'});
       openTimeline.to(headerText,0,{top:'-100%'})
       openTimeline.to(rightCover,0, {right:'-50vw'});
       openTimeline.to(leftCover,0, {left:'-50vw'});
       openTimeline.to(logoAreaMain,0,{opacity:'1'})
       openTimeline.addLabel('openComplete');

     return openTimeline;
   }

 //add the items to the opening timeline
     
   tl.add('headerText')
     .add('leftCover')
     .add('rightCover')
     .add('logoAreaMain')

 //the function that plays the opening animation
 function playOpenAnimation(){
     console.log("open");
     tl.play(getOpenAnimation());
     // numberofSlides = 0;
      stopAutoPlay();
     automaticSliderTimer = setTimeout(startAutoPlay, 1000 );
     automaticCloseTimer = setTimeout(playCloseAnimation, automaticClosingTime );
     clearTimeout(automaticOpenTimer);
    };
 playOpenAnimation();
 

 //auto open on touch
 $('.leftCover, .rightCover, .headerText').on('click',function(){
     console.log('jump to open and pause');
     openTimeline.progress(5, false);
     manualCloseTimer = setTimeout(playCloseAnimation, manualClosingTime );
     clearTimeout(automaticCloseTimer);
     clearTimeout(playOpenAnimation);
     clearTimeout(automaticSliderTimer);
   });

 //setting up the closing timeline animaition
  
 var tl2 = new TimelineMax();

 var closeTimeline = new TimelineMax();



 function getCloseAnimation(){
       closeTimeline.to(rightCover,0, {right:'0'});
       closeTimeline.to(leftCover,0, {left:'0'});
       closeTimeline.to(headerText,0,{top:'50%'})
       closeTimeline.to(logoAreaMain,0,{opacity:'0'})
       closeTimeline.addLabel('closeComplete');
       automaticOpenTimer = setTimeout

     return closeTimeline;
   }


 //add the items to the opening timeline
     
   tl2.add('leftCover')
      .add('rightCover')
      .add('logoAreaMain')
      .add('headerText')

 
      //the function that plays the opening animation
      function playCloseAnimation(){
          console.log("close");
          tl2.play(getCloseAnimation());
          stopAutoPlay();
          clearTimeout(automaticCloseTimer);
          clearTimeout(automaticSliderTimer);
          automaticOpenTimer = setTimeout(playOpenAnimation, 3000);
         };













//=======
//slide controls
//=======
var $slider = $(".slider");
var $slides = $slider.find(".slider-item");
var $navPrev = $(".previousTrigger");
var $navNext = $(".nextTrigger");


var slidesNum = $slides.length;
var prevSlideID = null;
var currentSlideID = 0;
var isAnimating = false;
var isAutoPlay = false;




$('.mainBackground').on('swiperight', function(){
  console.log('go previous');
  gotoPrevSlide();
  clearTimeout(automaticSliderTimer);
  clearTimeout(automaticOpenTimer);
  clearTimeout(manualCloseTimer);
  clearTimeout(automaticCloseTimer);
  manualCloseTimer = setTimeout(playCloseAnimation, manualClosingTime );
});

$('.mainBackground').on('swipeleft', function(){
  console.log('go next');
  gotoNextSlide();
  clearTimeout(automaticSliderTimer);
  clearTimeout(automaticOpenTimer);
  clearTimeout(manualCloseTimer);
  clearTimeout(automaticCloseTimer);
  manualCloseTimer = setTimeout(playCloseAnimation, manualClosingTime );
});


function init() {
  TweenLite.set($slides, {
    left: "-100%"
  });
  $navPrev.on("click", gotoPrevSlide);
  $navNext.on("click", gotoNextSlide);
  gotoSlide(0, 0);
}

function gotoPrevSlide() {
  var slideToGo = currentSlideID - 1;
  if (slideToGo <= -1) {
    slideToGo = slidesNum - 1;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 1, "prev");
}

function gotoNextSlide() {
  var slideToGo = currentSlideID + 1;
  if (slideToGo >= slidesNum) {
    slideToGo = 0;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 1, "next");
}

function gotoSlide(slideID, _time, _direction) {
  if (!isAnimating) {
    isAnimating = true;
    prevSlideID = currentSlideID;
    currentSlideID = slideID;
    var $prevSlide = $slides.eq(prevSlideID);
    var $currentSlide = $slides.eq(currentSlideID);
    var time = 1;
    if (_time !== null) {
      time = _time;
    }
    var direction = "next";
    if (_direction != null) {
      direction = _direction;
    }
    if (direction == "next") {
      TweenLite.to($prevSlide, time, {
        left: "-100%"
      });
      TweenLite.fromTo($currentSlide, time, {
        left: "100%"
      }, {
        left: "0"
      });
    } else {
      TweenLite.to($prevSlide, time, {
        left: "100%"
      });
      TweenLite.fromTo($currentSlide, time, {
        left: "-100%"
      }, {
        left: "0"
      });
    }
    TweenLite.delayedCall(time, function() {
      isAnimating = false;
    });
  }
}

function play(){
  gotoNextSlide();
  TweenLite.delayedCall(10, play);
}

function startAutoPlay(immediate) {
  // clearTimeout(activityTimeout);
  if (immediate != null) {
    immediate = false;
  }
    
  if (immediate) {
    gotoNextSlide();
  }
  TweenLite.delayedCall(10, play);
}

// var activityTimeout = setTimeout(startAutoPlay, 5000);

function stopAutoPlay() {
  // activityTimeout = setTimeout(startAutoPlay, 5000);
  isAutoPlay = false;
  TweenLite.killDelayedCallsTo(play);
}


init();



});//close document ready