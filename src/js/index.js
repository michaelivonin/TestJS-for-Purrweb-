'use strict';

let buttonPrevious = slider.querySelector(".slider__button-previous"),
  buttonNext = slider.querySelector(".slider__button-next"),
  box = slider.querySelector(".slider__box"),
  slides = box.querySelectorAll(".slider__item"),
  slideWidth = parseInt(getComputedStyle(slider.querySelector(".slider__item")).width),
  dots = slider.querySelector(".slider__dots"),
  //start = 0,
  //end = -slideWidth * ( slides.length - 1 ),
  //position = start,
  selectedDot,
  disable = false;

function highlight(item) {
  if (selectedDot) {
    selectedDot.classList.toggle("slider__dot_active");
  }

  selectedDot = item;
  selectedDot.classList.toggle("slider__dot_active");
}

highlight(slider.querySelectorAll(".slider__dot")[0]);

(function rebuildSlides() {
  box.append(slides[0].cloneNode(true));
  box.prepend(slides[slides.length - 1].cloneNode(true));
})();

let slidesRebuild = box.querySelectorAll(".slider__item");

function rebuildEdge() {
  let position = parseInt(getComputedStyle(box).marginLeft);

  if ( position > ( (slidesRebuild.length - 1) * (-slideWidth) ) && position < 0 || position < 0 && position > 0 ) {

    return;

  } else if ( position === ( (slidesRebuild.length - 1) * (-slideWidth) ) ) {

    box.style.marginLeft = `${ (-slideWidth) }px`;

    while (box.children.length !== 2) {
      box.firstElementChild.remove();
    }

    for (let i = 2; i < slidesRebuild.length; i++) {
      box.append(slidesRebuild[i].cloneNode(true));
    }

  } else {

    box.style.marginLeft = `${ (slidesRebuild.length - 2) * (-slideWidth) }px`;

    while (box.children.length !== 2) {
      box.lastElementChild.remove();
    }

    for (let i = slidesRebuild.length - 3; i >= 0; i--) {
      box.prepend(slidesRebuild[i].cloneNode(true));
    }

  }
}

function animate({duration, timing, draw}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      disable = false;
      rebuildEdge();
    }
  });
}

function moveRight() {
  if (disable) return;

  disable = true;

  let position = parseInt(getComputedStyle(box).marginLeft);

  animate({
    duration: 500,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ (progress * slideWidth) + position }px`;
    }
  });

  if ( dots.firstElementChild.classList.contains("slider__dot_active") ) {
    highlight(dots.lastElementChild);
    return;
  }

  highlight(dots.querySelector(".slider__dot_active").previousElementSibling);
}

function moveLeft() {
  if (disable) return;

  disable = true;

  let position = parseInt(getComputedStyle(box).marginLeft);

  animate({
    duration: 500,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ ( progress * (-slideWidth) ) + position }px`;
    }
  });

  if ( dots.lastElementChild.classList.contains("slider__dot_active") ) {
    highlight(dots.firstElementChild);
    return;
  }

  highlight(dots.querySelector(".slider__dot_active").nextElementSibling);
}

buttonPrevious.addEventListener("click", moveRight);

buttonNext.addEventListener("click", moveLeft);

dots.addEventListener("click", (event) => {
  let target = event.target;

  if (target.tagName !== "LI") return;

  if (target.classList.contains("slider__dot_active")) return;

  highlight(target);
});