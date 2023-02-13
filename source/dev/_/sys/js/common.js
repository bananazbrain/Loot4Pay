const html = document.querySelector('html');
const body = document.querySelector('body');
const inner = document.querySelector('.inner');

document.addEventListener('DOMContentLoaded', function () {
  var loadLater = document.querySelector('.loadLater');
  var head = document.querySelector('head');
  if (loadLater && head) {
    head.insertAdjacentHTML('beforeend', loadLater.innerHTML);
  }

  // FANCYBOX SETUP
  // Fancybox.bind("[data-fancybox]", {
  //   dragToClose: false,
  //   autoFocus: false,
  // });

  // ANIMATION
  let anBlocks = document.querySelectorAll('.an');

  function animatedBlocks() {
    let Y = window.scrollY;
    let visibleHeight = window.innerHeight - 100;
    anBlocks.forEach((block) => {
      if (!block.classList.contains('--loaded')) {
        let timeout = block.getAttribute('data-timeout');
        if (timeout) {
          block.style.transitionDelay = timeout;
        }
        if (block.getBoundingClientRect().top < visibleHeight) {
          block.classList.add('--loaded');
        }
      }
    });
  }

  setTimeout(() => {
    animatedBlocks();
    document.addEventListener('scroll', () => {
      animatedBlocks();
    });
  }, 500);

  // HEADER MENU NAV
  let menuHam = document.querySelector('.ham');
  let menuNav = document.querySelector('.header');

  if (menuHam) {
    for (let i = 0; i < 3; i++) {
      let div = document.createElement('div');
      menuHam.append(div);
    }

    menuHam.addEventListener('click', () => {
      menuHam.classList.toggle('--toggle');
      menuNav.classList.toggle('--toggle');
      html.classList.toggle('overflow-disable');
      body.classList.toggle('overflow-disable');
      inner.classList.toggle('overflow-disable');
    });
  }

  // ANCHORE
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();

      const id = smoothLink.getAttribute('href');

      menuHam.classList.remove('--toggle');
      menuNav.classList.remove('--toggle');
      html.classList.remove('overflow-disable');
      body.classList.remove('overflow-disable');
      inner.classList.remove('overflow-disable');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  // ROADMAP SLIDER
  let roadmapSlider = document.querySelector('.roadmap__slider');

  if (roadmapSlider) {
    let roadmapSliderSwiper = new Swiper(roadmapSlider, {
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      initialSlide: 3,
      slidesOffsetBefore: 281,
      slidesOffsetAfter: 546,
      speed: 1000,
      navigation: {
        prevEl: '.roadmap__arrow.swiper-button-prev',
        nextEl: '.roadmap__arrow.swiper-button-next',
      },
      breakpoints: {
        0: {
          centeredSlides: true,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        992: {
          slidesOffsetAfter: 374,
          slidesOffsetBefore: 273,
        },
        1221: {
          slidesOffsetAfter: 546,
        }
      }
    });
  }

})