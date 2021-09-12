let itemClassName = "carousel_photo";
const items = document.getElementsByClassName(itemClassName);
const totalItems = items.length;
let slide = 0;
let moving = true;

// set initial classes
function setInitialClasses() {
  items[totalItems - 1].classList.add("prev");
  items[0].classList.add("active");
  items[1].classList.add("next");
}

// set event listeners
function setEventListeners() {
  let next = document.getElementsByClassName("carousel_button_next")[0];
  let prev = document.getElementsByClassName("carousel_button_prev")[0];
  next.addEventListener("click", moveNext);
  prev.addEventListener("click", movePrev);
}

// next navigation handler
function moveNext() {
  console.log("next");
  // check if moving
  if (!moving) {
    console.log("in if");
    // if it is the last slide, reset to 0, else +1
    if (slide === totalItems - 1) {
      slide = 0;
    } else {
      slide++;
    }

    // move carousel to updated slide
    moveCarouselTo(slide);
  }
}

// previous navigation handler
function movePrev() {
  // check if moving
  if (!moving) {
    // if it is the first slide, set as the last slide, else -1
    if (slide === 0) {
      slide = totalItems - 1;
    } else {
      slide++;
    }

    // move carousel to updated slide
    moveCarouselTo(slide);
  }
}

function disableInteraction() {
  console.log("in disableIteration");
  // set 'moving' to true for the same duration as our transition.
  // (0.5s)
  moving = true;
  // setTimeout runs its function onse after the given time
  setTimeout(function () {
    moving = false;
  }, 500);
}

function moveCarouselTo(slide) {
  console.log("in moveCarouselTo");
  if (!moving) {
    console.log("in moveCarouselTo in if");
    // temporarily disable interactivity
    disableInteraction();

    // update the 'old' adjacent slides with 'new' ones
    let newPrevious = slide - 1;
    let newNext = slide + 1;
    let oldPrevious = slide - 2;
    let oldNext = slide + 2;

    // text if carousel has more than three items
    if (totalItems - 1 > 3) {
      // checks and updates if the new slides are out of bounds
      if (newPrevious <= 0) {
        oldPrevious = totalItems - 1;
      } else if (newNext >= totalItems - 1) {
        oldNext = 0;
      }

      // checks and updates if slide is at the beginning/end
      if (slide === 0) {
        newPrevious = totalItems - 1;
        oldPrevious = totalItems - 2;
        oldNext = slide + 1;
      } else if (slide === totalItems - 1) {
        newPrevious = slide - 1;
        newNext = 0;
        oldNext = 1;
      }

      // now we have worked out where we are and whwere we are going
      // by adding/removing classes we will trigger the transition

      // reset old next/prev elements to default classes
      items[oldPrevious].className = itemClassName;
      items[oldNext].className = itemClassName;

      // add new classes
      items[newPrevious].className = itemClassName + " prev";
      items[slide].className = itemClassName + " active";
      items[newNext].className = itemClassName + " next";
    }
  }
}

function initCarousel() {
  console.log("classes");
  setInitialClasses();
  console.log("listeners");
  setEventListeners();

  // set moving to false so that carousel becomes interactive
  moving = false;
}

// make everithing works
initCarousel();
