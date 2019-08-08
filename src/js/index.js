'use strict';

let buttonPrevious = slider.querySelector(".slider__button-previous"),
  buttonNext = slider.querySelector(".slider__button-next"),
  box = slider.querySelector(".slider__box"),
  items = box.querySelectorAll(".slider__item"),
  itemWidth = parseInt(getComputedStyle(slider.querySelector(".slider__item")).width),
  start = 0,
  end = -itemWidth * ( items.length - 1 ),
  position = start;

box.append(items[0].cloneNode(true));
box.prepend(items[items.length - 1].cloneNode(true));

let itemsRebuild = box.querySelectorAll(".slider__item");
itemsRebuild[1].classList.add("slider__item_active");

/*for (let i = 0; i <= (itemsRebuild.length - 1); i++) {
  if (i === 0) {
    items[i].classList.add("slider__item_active");
  } else if (i === 1) {
    items[i].classList.add("slider__item_next-active");
  } else {
    items[i].classList.add("slider__item_hidden");
  }
}*/

//items[items.length - 1].classList.add("slider__item_last");


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

buttonPrevious.onclick = () => {
  if (position === start) {
    position -= itemWidth;
  } else {
    position += itemWidth;
  }
  //let position = parseInt(getComputedStyle(box).marginLeft);
  console.log(position);

  animate({
    duration: 250,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ (progress * itemWidth) + position }px`;
    }
  });
};


buttonNext.onclick = () => {
  if (position === start) {
    position -= itemWidth;
  } else if (position >= itemWidth) {
    position += itemWidth;
  } else {
    position -= itemWidth;
  }
  //let position = parseInt(getComputedStyle(box).marginLeft);
  console.log(position);

  animate({
    duration: 250,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      box.style.marginLeft = `${ ( progress * (-itemWidth) ) + position }px`;
    }
  });

  /*let itemActive = box.querySelector(".slider__item_active");
  let itemNextActive = box.querySelector(".slider__item_next-active");
  let itemHidden = box.querySelector(".slider__item_hidden");
  let itemPreviousActive = box.querySelector(".slider__item_previous-active");*/

  /*if (position === start) {

    position -= itemWidth;

    itemNextActive.classList.toggle("slider__item_next-active");
    itemNextActive.classList.toggle("slider__item_active");

    itemNextActive.nextElementSibling.classList.toggle("slider__item_hidden");
    itemNextActive.nextElementSibling.classList.toggle("slider__item_next-active");

    itemActive.classList.toggle("slider__item_active");
    itemActive.classList.toggle("slider__item_previous-active");

    //itemPreviousActive.classList.toggle("slider__item_previous-active");
    //itemPreviousActive.classList.toggle("slider__item_hidden");

  }else if (position === (end + itemWidth)) {
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

    position -= itemWidth;

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

  if (position === end) {
    position = start;
  } else {
    position -= itemWidth;
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