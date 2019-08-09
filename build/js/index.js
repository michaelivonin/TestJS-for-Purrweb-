'use strict';

let buttonPrevious = slider.querySelector(".slider__button-previous"),
  buttonNext = slider.querySelector(".slider__button-next"),
  box = slider.querySelector(".slider__box"),
  slides = box.querySelectorAll(".slider__item"),
  slideWidth = parseInt(getComputedStyle(slider.querySelector(".slider__item")).width),
  start = 0,
  end = -slideWidth * ( slides.length - 1 ),
  position = start,
  disable = false;

function rebuildSlides() {
  box.append(slides[0].cloneNode(true));
  box.prepend(slides[slides.length - 1].cloneNode(true));
}

rebuildSlides();

let slidesRebuild = box.querySelectorAll(".slider__item");
//slidesRebuild[1].classList.add("slider__item_active");

function rebuildEdge() {
  let position = parseInt(getComputedStyle(box).marginLeft);

  if ( position > ( (slidesRebuild.length - 1) * (-slideWidth) ) && position < 0 || position < 0 && position > 0 ) {
    return;
  } else if ( position === ( (slidesRebuild.length - 1) * (-slideWidth) ) ) {
    box.style.marginLeft = `${ (-slideWidth) }px`;

    while (box.children.length !== 2) {
      box.firstChild.remove();
    }

    for (let i = 2; i < slidesRebuild.length; i++) {
      box.append(slidesRebuild[i].cloneNode(true));
    }
  }
}



/*for (let i = 0; i <= (slidesRebuild.length - 1); i++) {
  if (i === 0) {
    slides[i].classList.add("slider__item_active");
  } else if (i === 1) {
    slides[i].classList.add("slider__item_next-active");
  } else {
    slides[i].classList.add("slider__item_hidden");
  }
}*/

//slides[slides.length - 1].classList.add("slider__item_last");


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

buttonPrevious.onclick = () => {
  if (disable) return;

  /*console.log(position);
  if (position === start) {
    position -= slideWidth;
  } else if ( position <= ( (-slideWidth) * 2 ) ) {
    //position += slideWidth
  } else {
    //position += slideWidth;
  }*/

  disable = true;

  let position = parseInt(getComputedStyle(box).marginLeft);
  //console.log(position);



  animate({
    duration: 500,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ (progress * slideWidth) + position }px`;
    }
  });
};


buttonNext.onclick = () => {
  if (disable) return;
  /*console.log(position);
  if (position === start) {
    position -= slideWidth;
  } else if (position >= slideWidth) {
    position += slideWidth;
  } else {
    position -= slideWidth;
  }*/

  disable = true;

  let position = parseInt(getComputedStyle(box).marginLeft);
  //console.log(position);

  animate({
    duration: 500,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ ( progress * (-slideWidth) ) + position }px`;
    }
  });

  /*let itemActive = box.querySelector(".slider__item_active");
  let itemNextActive = box.querySelector(".slider__item_next-active");
  let itemHidden = box.querySelector(".slider__item_hidden");
  let itemPreviousActive = box.querySelector(".slider__item_previous-active");*/

  /*if (position === start) {

    position -= slideWidth;

    itemNextActive.classList.toggle("slider__item_next-active");
    itemNextActive.classList.toggle("slider__item_active");

    itemNextActive.nextElementSibling.classList.toggle("slider__item_hidden");
    itemNextActive.nextElementSibling.classList.toggle("slider__item_next-active");

    itemActive.classList.toggle("slider__item_active");
    itemActive.classList.toggle("slider__item_previous-active");

    //itemPreviousActive.classList.toggle("slider__item_previous-active");
    //itemPreviousActive.classList.toggle("slider__item_hidden");

  }else if (position === (end + slideWidth)) {
    //position = start;

    itemNextActive.classList.toggle("slider__item_next-active");
    itemNextActive.classList.toggle("slider__item_active");

    //itemNextActive.nextElementSibling.classList.toggle("slider__item_hidden");
    //itemNextActive.nextElementSibling.classList.toggle("slider__item_next-active");

    itemActive.classList.toggle("slider__item_active");
    itemActive.classList.toggle("slider__item_previous-active");

    itemPreviousActive.classList.toggle("slider__item_previous-active");
    itemPreviousActive.classList.toggle("slider__item_hidden");
    box.firstChild.classList.toggle();


  } else {

    position -= slideWidth;

    itemNextActive.classList.toggle("slider__item_next-active");
    itemNextActive.classList.toggle("slider__item_active");

    itemNextActive.nextElementSibling.classList.toggle("slider__item_hidden");
    itemNextActive.nextElementSibling.classList.toggle("slider__item_next-active");

    itemActive.classList.toggle("slider__item_active");
    itemActive.classList.toggle("slider__item_previous-active");

    itemPreviousActive.classList.toggle("slider__item_previous-active");
    itemPreviousActive.classList.toggle("slider__item_hidden");

  }*/
};

/*function moveLeft() {
  if (!position) {
    position = end;
  } else {
    position += slideWidth;
  }
  box.style.marginLeft = `${position}px`;
}

function moveRight() {
  if (position === end) {
    position = start;
  } else {
    position -= slideWidth;
  }
  box.style.marginLeft = `${position}px`;
}

buttonPrevious.onclick = () => moveLeft();
buttonNext.onclick = () => moveRight();*/

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
      position += slideWidth;
    }
    console.log(position);
    box.style.marginLeft = `${ ( timePassed * 0.004 ) + position }px`;
  }
};

buttonNext.onclick = () => {
  let start = Date.now();

  if (position === end) {
    position = start;
  } else {
    position -= slideWidth;
  }

  let timer = setInterval(() => {
    let timePassed = Date.now() - start;

    if (timePassed >= 220) {
      clearInterval(timer);
      return;
    }

    draw(timePassed);

  }, 20);

  function draw(timePassed) {
    box.style.marginLeft = `${ Math.round(timePassed * (-2)) }px`;
  }
};*/