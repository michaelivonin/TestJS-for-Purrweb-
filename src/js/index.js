'use strict';

let buttonPrevious = slider.querySelector(".slider__button-previous"),
  buttonNext = slider.querySelector(".slider__button-next"),
  box = slider.querySelector(".slider__box"),
  slides = box.querySelectorAll(".slider__item"),
  slideWidth = parseInt(getComputedStyle(slider.querySelector(".slider__item")).width),
  dots = slider.querySelector(".slider__dots"),
  selectedDot,
  disable = false;

function highlight(item) {
  if (selectedDot) {
    selectedDot.classList.toggle("slider__dot_active");
  }

  selectedDot = item;
  selectedDot.classList.toggle("slider__dot_active");
}

highlight(dots.children[0]);

(function rebuildSlides() {
  box.append(slides[0].cloneNode(true));
  box.prepend(slides[slides.length - 1].cloneNode(true));
})();

function rebuildEdge() {
  let slidesRebuild = box.querySelectorAll(".slider__item");
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

function moveRight({offset = slideWidth}) {
  let position = parseInt(getComputedStyle(box).marginLeft);

  animate({
    duration: 250,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ (progress * offset) + position }px`;
    }
  });
}

function moveLeft({offset = slideWidth}) {
  let position = parseInt(getComputedStyle(box).marginLeft);

  animate({
    duration: 250,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ ( progress * (-offset) ) + position }px`;
    }
  });
}

buttonPrevious.addEventListener("click", () => {
  if (disable) return;

  disable = true;

  moveRight({});

  if ( dots.firstElementChild === selectedDot ) {
    highlight(dots.lastElementChild);
    return;
  }

  highlight(selectedDot.previousElementSibling);
});

buttonNext.addEventListener("click", () => {
  if (disable) return;

  disable = true;

  moveLeft({});

  if ( dots.lastElementChild === selectedDot ) {
    highlight(dots.firstElementChild);
    return;
  }

  highlight(selectedDot.nextElementSibling);
});

dots.addEventListener("click", (event) => {
  let target = event.target;

  if (target.tagName !== "LI") return;

  if (target === selectedDot) return;

  if (disable) return;

  disable = true;

  let next = Array.from(dots.children).indexOf(target);
  let previous = Array.from(dots.children).indexOf(selectedDot);
  let multiplier;

  if (next > previous) {
    multiplier = (next - previous) * slideWidth;
    moveLeft({offset: multiplier});
  }
  if (next < previous) {
    multiplier = (previous - next) * slideWidth;
    moveRight({offset: multiplier});
  }

  highlight(target);
});