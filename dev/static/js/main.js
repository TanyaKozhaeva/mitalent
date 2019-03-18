;
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
      customCursor.classList.add("cursor_yellow")
      var currentTarget = e.currentTarget;
      var currentTargetBox = currentTarget.getBoundingClientRect()
      isStuck = true;
    };
    var handleMouseLeave = function() {
      customCursor.classList.remove("cursor_yellow")
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

(function() {
var navBtn = document.getElementById('toggle-navigation-btn');
//var mainNav = document.getElementById('mainNav')
navBtn.onclick = function() {
	navBtn.classList.toggle('toggle-navigation-btn_closed');
	//mainNav.classList.toggle('nav_open')
}
}());






$('.js-portfolio-slider ').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: true
});
