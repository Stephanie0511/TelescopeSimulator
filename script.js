const slides = Array.from(document.querySelectorAll(".carousel__slide"));
const dotsContainer = document.querySelector(".carousel__dots");
const prevButton = document.querySelector(".carousel__control--prev");
const nextButton = document.querySelector(".carousel__control--next");

let currentIndex = 0;
let intervalId = null;

const setActiveSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });

  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll(".carousel__dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  }
};

const goToSlide = (index) => {
  currentIndex = (index + slides.length) % slides.length;
  setActiveSlide(currentIndex);
};

const startAutoRotate = () => {
  if (intervalId) {
    return;
  }
  intervalId = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 4000);
};

const stopAutoRotate = () => {
  clearInterval(intervalId);
  intervalId = null;
};

if (slides.length > 0) {
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to screenshot ${i + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(i);
        stopAutoRotate();
        startAutoRotate();
      });
      dotsContainer.appendChild(dot);
    });
  }

  setActiveSlide(currentIndex);
  startAutoRotate();
}

if (prevButton && nextButton) {
  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    stopAutoRotate();
    startAutoRotate();
  });

  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    stopAutoRotate();
    startAutoRotate();
  });
}

const carousel = document.querySelector(".carousel");
if (carousel) {
  carousel.addEventListener("mouseenter", stopAutoRotate);
  carousel.addEventListener("mouseleave", startAutoRotate);
}
