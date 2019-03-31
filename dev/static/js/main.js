;
//CUstom Cursor
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
makeCustomCursor();

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
              "translate3d(" + innerTranslate + "px, 0, 0)";
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
              speed + "ms";
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
makeMainScreenSlider();

//Nav
(function() {
var navBtn = document.getElementById('toggle-navigation-btn'),
    mainNav = document.getElementById('main-nav'),
    closeBtn = document.querySelector('.main-nav__close-btn');

navBtn.onclick = function() {
	//navBtn.classList.toggle('toggle-navigation-btn_closed');
	mainNav.classList.add('main-nav_show')
};

closeBtn.onclick = function(){
  mainNav.classList.remove('main-nav_show')
}
}());

//Slider
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



//CUSTOM VIDEO CONTROLS
(function() {
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
}());



//Barba.js
Barba.Pjax.start();
// var HideShowTransition = Barba.BaseTransition.extend({
//   start: function() {
//     console.log('start')
//     this.newContainerLoading.then(this.finish.bind(this));
//   },
//
//   finish: function() {
//     console.log('finish')
//     document.body.scrollTop = 0;
//     this.done();
//   }
// });
// Barba.Pjax.getTransition = function() {
//   return HideShowTransition;
// };



var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
      Promise
      .all([this.newContainerLoading, this.zoom()])
      .then(this.showNew.bind(this));
  },

  zoom: function() {
    var deferred = Barba.Utils.deferred();
    deferred.resolve();
    return deferred.promise;
  },

  showNew: function() {
    this.done();
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});
Barba.Pjax.getTransition = function() {
  return FadeTransition;
};
