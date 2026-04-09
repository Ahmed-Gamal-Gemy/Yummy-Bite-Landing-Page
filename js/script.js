// scroll to top
scrollTop();
function scrollTop() {
  const scrollTopBtn = document.querySelector(".scroll-top");
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY >= 450);
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// nav bar component
navBar();
function navBar() {
  const navLinks = document.querySelector(".nav-links");
  const toggleMenuBtn = document.querySelector(".nav-toggles .toggle-menu");
  const closeNavBtn = document.querySelector(".nav-links .close-btn");

  toggleMenuBtn.addEventListener("click", () => {
    navLinks.classList.add("show");
    toggleMenuBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  });
  // for accessbility
  toggleMenuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      navLinks.classList.add("show");
    }
  });

  closeNavBtn.addEventListener("click", () => {
    navLinks.classList.remove("show");
    toggleMenuBtn.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// switch to  dark theme
setDarkTheme();
function setDarkTheme() {
  const themeSwitcher = document.querySelector(".nav-toggles .theme-switcher");
  const iniTheme = localStorage.getItem("theme");

  document.documentElement.classList.toggle("dark", iniTheme === "dark");
  document.documentElement.classList.toggle("light", iniTheme === "light");

  themeSwitcher.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    themeSwitcher.classList.toggle("active", !isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    document.documentElement.classList.toggle("light", isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  });
  const isDarkNow = localStorage.getItem("theme");
  if (isDarkNow === "dark") {
    themeSwitcher.classList.add("active");
  } else {
    themeSwitcher.classList.remove("active");
  }
}

// add animation to hero section
addAnimateToHero();
function addAnimateToHero() {
  const heroSec = document.querySelector(".hero-sec");

  window.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => {
      heroSec.classList.add("active");
    });
  });
}

// add animation to special dishes section

const specialSec = document.querySelector(".special");
const aboutUsSec = document.querySelector(".about-us");
const orderNowSec = document.querySelector(".order-now");
const chefSec = document.querySelector(".chef");
function AddObserverAndAnimation(sectionName, className) {
  const observer = new IntersectionObserver(
    (entries, observe) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          sectionName.classList.add(className);
        });
        observer.unobserve(sectionName);
      }
    },
    {
      threshold: 0.1,
    }
  );
  observer.observe(sectionName);
}
AddObserverAndAnimation(specialSec, "active");
AddObserverAndAnimation(aboutUsSec, "active");
AddObserverAndAnimation(orderNowSec, "active");
AddObserverAndAnimation(chefSec, "active");

function clientSlider() {
  const clientBox = Array.from(
    document.querySelectorAll(".box-container .box")
  );
  const boxLength = clientBox.length;
  let currentSlide = 1;
  const paginationUl = document.querySelector(".comment-counts");
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= boxLength; i++) {
    const paginationLi = document.createElement("li");
    paginationLi.setAttribute("data-count", i);
    fragment.appendChild(paginationLi);
  }
  paginationUl.append(fragment);
  const paginationItems = Array.from(
    document.querySelectorAll(".comment-counts li")
  );
  paginationUl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li && li.dataset.count) {
      currentSlide = parseInt(li.dataset.count, 10);
      checker();
    }
  });
  function checker() {
    paginationItems.forEach((li, index) => {
      li.classList.toggle("active", index === currentSlide - 1);
    });
    clientBox.forEach((li, index) => {
      li.classList.toggle("active", index === currentSlide - 1);
    });
  }
  checker();
}
clientSlider();
