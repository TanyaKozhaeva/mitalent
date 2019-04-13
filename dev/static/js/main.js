;
document.addEventListener("DOMContentLoaded", function(){
  makeCustomCursor();
  makeMainScreenSlider();
  makeNavigation();
  makePortfolioSlider();
  makeMediaLinksSlider();
  customVideoControls();
  barbaNavigation();
  AOS.init();
});

//Custom Cursor
function makeCustomCursor() {
  var clientX = -100;
  var clientY = -100;
  var customCursor = document.querySelector('.cursor');
  var initCursor = function() {
    document.addEventListener('mousemove', function(e){
      clientX = e.clientX;
      clientY = e.clientY;
    })

    var render = function() {
      customCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  };
  var initHovers = function() {
    var handleMouseEnter = function(e) {
      var currentTarget = e.currentTarget;
      customCursor.classList.add("cursor_" + currentTarget.getAttribute('data-cursor'))
      var currentTargetBox = currentTarget.getBoundingClientRect()
      isStuck = true;
    };
    var handleMouseLeave = function() {
      //customCursor.classList.remove("cursor_dot");
      //!!!!!!!!!!!!!!!!!!!!!!!!
      customCursor.classList = ['cursor'];
      isStuck = false;
    };

    var hoveredItems = document.querySelectorAll(".interactive");
    [].forEach.call(hoveredItems, function(item){
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });
  }
initCursor();
initHovers();
};

//Screen Slider
function makeMainScreenSlider(){
// Params
let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;
/*
    autoplay:{
      delay:3000
    },*/
// Main Slider
let mainSliderOptions = {
      loop: true,
      speed: 1000,
      loopAdditionalSlides: 10,
      //grabCursor: true,
      watchSlidesProgress: true,
      mousewheel: {
        invert: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function(){
          //this.autoplay.stop();
        },
        imagesReady: function(){
          this.el.classList.remove('loading');
          //this.autoplay.start();
        },
        /*
        slideChangeTransitionEnd: function(){
          let swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
          for (let i = 0; i < captions.length; ++i) {
            captions[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');

          let btns = swiper.el.querySelectorAll('.swiper-link');
          for (let i = 0; i < btns.length; ++i) {
            btns[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.swiper-link').classList.add('show');
        },*/
        progress: function(){
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translate3d(" + -innerTranslate/2 + "px, 0, 0)";
          }
        },
        touchStart: function() {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed * 1.5 + "ms";
          }
        }
      }

    };
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);


// Navigation Slider
let navSliderOptions = {
      loop: true,
      loopAdditionalSlides: 10,
      speed:1000,
      direction: 'vertical',
      slidesPerView: 5,
      spaceBetween: 20,
      centeredSlides : true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        },
        click: function(){
          mainSlider.autoplay.stop();
        }
      }
    };
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
};

//Nav
function makeNavigation() {
var navBtn = document.getElementById('toggle-navigation-btn'),
    mainNav = document.getElementById('main-nav'),
    closeBtn = document.querySelector('.main-nav__close-btn'),
    screenToAnimation = document.querySelector('.main-slider'),
    screenWidth = $(window).width();
// navBtn.addEventListener('mouseenter', setWillChange);
navBtn.onclick = function() {
  var tl = new TimelineMax({
    onComplete: function() {
      mainNav.classList.add('main-nav_show')
    }
  });
  tl
  .to(screenToAnimation, .7,{ease: Expo.easeOut, scale: .95, top: 40})
  .to(mainNav, .5,{x: 0, opacity: 1}, '+=.2')
	// mainNav.classList.add('main-nav_show')
};
// function setWillChange(){
//   console.log('will')
//   mainNav.style.willChange = 'transform, opacity'
//   screenToAnimation.style.willChange = 'transform, top'
// }
closeBtn.onclick = function(){
  var tlClose = new TimelineMax({
    onStart: function() {
      mainNav.classList.remove('main-nav_show')
    }
  });
  tlClose
  .to(mainNav, .3,{x: screenWidth * 1.2, opacity: 0}, '+=1')
  .to(screenToAnimation, .3,{ease: Expo.easeOut, top: 0, scale: 1})

}
};

//Slider
function makePortfolioSlider() {
  $('.js-portfolio-slider ').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
};
function makeMediaLinksSlider() {
  $('.js-medialinks-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
};


//CUSTOM VIDEO CONTROLS
function customVideoControls() {
  var video = document.getElementById('video'),
      videoPlayBtn = document.getElementById('playBtn'),
      videoPauseBtn = document.getElementById('pauseBtn'),
      videoPoster = document.querySelector('.video__poster');
      video.controls = false;
      videoPlayBtn.onclick = function() {
        videoPoster.classList.add('video__poster_hidden');
        this.classList.add('video__playBtn_hidden');
        videoPauseBtn.classList.remove('video__pauseBtn_hidden');
        video.play();
      };

  videoPauseBtn.onclick = function() {
    videoPoster.classList.remove('video__poster_hidden');
    this.classList.add('video__pauseBtn_hidden');
    videoPlayBtn.classList.remove('video__playBtn_hidden');
    video.pause();
  };
};

//Barba.js
function barbaNavigation(){
  var lastElementClicked,
      parentElementClicked,
      socialLinks = document.querySelector('.mainSlider__social'),
      navSlides = document.querySelector('.mainSlider__navWrap'),
      contentBlock,
      captionString,
      slideBg;
  Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el;
      // !!!!!!!!!!!!!!!!!
      parentElementClicked = el.closest('.swiper-slide');
      contentBlock = parentElementClicked.querySelector('.content');
      captionString = parentElementClicked.querySelector('.caption');
      slideBg = parentElementClicked.querySelector('.slide-bgimg');
    });
  var CustomTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.zoom()]).then(
        this.showNewPage.bind(this)
      );
    },

    zoom: function() {
      var deferred = Barba.Utils.deferred(),
          screenWidth = $(window).width();
          screenHeight = $(window).height();
      var tl = new TimelineMax({
        onComplete: function() {
          deferred.resolve();
        }
      });
      tl
      .to(socialLinks,2,{ease: Expo.easeOut, left: -(screenWidth/100 * 5)}, 0)
      .to(navSlides,2,{ease: Expo.easeOut, x: 100, opacity: 0}, 0)
      .to(contentBlock,1,{top: 51, scale: 1.3, left: (screenWidth/100 * 16)}, '-=1')
      .to(lastElementClicked, .5,{opacity: 0}, '-=1.5')
      .to(captionString,.5,{y: 20, opacity: 0}, '-=1.3')
      .to(slideBg,2,{ease: Expo.easeOut, top: 104, width: screenWidth/100 * 70, height: screenWidth/100 * 29.17, left: screenWidth/100 * 15}, '-=1.2')
      return deferred.promise;
    },

    // zoom: function() {
    //   return new Promise(function(t) {
    //     var tl = new TimelineMax();
    //       tl.to('body', 1, {y:100, onComplete: function(){
    //         t();
    //       }});
    //   })
    // },

    showNewPage: function() {
      this.done();
    }
  });
  var BackTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.zoom()]).then(
        this.showNewPage.bind(this)
      );
    },

    zoom: function() {
      var deferred = Barba.Utils.deferred();

      deferred.resolve();

      return deferred.promise;
    },

    showNewPage: function() {
      this.done();
    }
  });

  Barba.Pjax.getTransition = function() {
    var transitionObj = CustomTransition;
    if (Barba.HistoryManager.prevStatus().namespace === 'profile') {
      transitionObj = BackTransition;
    }
    return transitionObj;
  };
  var SingleProfile = Barba.BaseView.extend({
      namespace: 'profile',
      onEnterCompleted: function() {
        customVideoControls();
        makePortfolioSlider();
        AOS.init();
        // makeNavigation();
      }
  });

  var MainPage = Barba.BaseView.extend({
      namespace: 'mainPage',
      onEnterCompleted: function() {
        makeCustomCursor();
        makeMainScreenSlider();
        makeNavigation();
        customVideoControls();
      }
  });

  SingleProfile.init();
  MainPage.init();


  Barba.Pjax.start();
};
