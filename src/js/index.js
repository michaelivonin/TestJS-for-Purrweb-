'use strict';

let buttonPrevious = slider.querySelector(".slider__button-previous"),
  buttonNext = slider.querySelector(".slider__button-next"),
  box = slider.querySelector(".slider__box"),
  items = box.querySelectorAll(".slider__item"),
  itemWidth = parseInt(getComputedStyle(slider.querySelector(".slider__item")).width),
  start = 0,
  end = -itemWidth * ( items.length - 1 ),
  position = start;

/*function moveLeft() {
  if (!position) {
    position = end;
  } else {
    position += itemWidth;
  }
  box.style.marginLeft = `${position}px`;
}

function moveRight() {
  if (position === end) {
    position = start;
  } else {
    position -= itemWidth;
  }
  box.style.marginLeft = `${position}px`;
}

buttonPrevious.onclick = () => moveLeft();
buttonNext.onclick = () => moveRight();*/

function animate({duration, timing, draw}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

buttonPrevious.onclick = () => animate({
  duration: 250,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    if (!position) {
      position = end;
    } else {
      position += itemWidth;
    }
    box.style.marginLeft = `${progress * position}px`;
  }
});


buttonNext.onclick = () => animate({
  duration: 250,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    /*if (position === end) {
      position = start;
    } else {
      position = -itemWidth;
    }*/
    box.style.marginLeft = `${progress * -itemWidth}px`;
  }
});

/*buttonPrevious.onclick = () => {
  let start = Date.now();

  let timer = setInterval(() => {
    let timePassed = Date.now() - start;

    if (timePassed >= 250) {
      clearInterval(timer);
      return;
    }

    draw(timePassed);

  }, 20);

  function draw(timePassed) {
    console.log(position);
    if (!position) {
      position = end;
    } else {
      position += itemWidth;
    }
    console.log(position);
    box.style.marginLeft = `${ ( timePassed * 0.004 ) + position }px`;
  }
};

buttonNext.onclick = () => {
  let start = Date.now();

  let timer = setInterval(() => {
    let timePassed = Date.now() - start;

    if (timePassed >= 220) {
      clearInterval(timer);
      return;
    }

    draw(timePassed);

  }, 20);

  function draw(timePassed) {
    if (position === end) {
      position = start;
    } else {
      position -= itemWidth;
    }
    box.style.marginLeft = `${ timePassed * (-2) }px`;
  }
};*/