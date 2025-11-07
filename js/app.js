console.log("app.js loaded");
const controller = new ScrollMagic.Controller();

const spyEls = document.querySelectorAll("section.scroll-spy");

spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl,
    triggerHook: 0.5,
  })
    .setClassToggle(spyEl, "show")
    .addTo(controller);
});

//현재 연도 표시
//날짜 정보를 가진 js의 date객체를 활용
const currentDate = new Date().getFullYear();
document.querySelector(".this-year").innerHTML = currentDate;

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".aside ul li");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeItem = document.querySelector(
        `.aside ul li a[href="#${id}"]`
      )?.parentElement;

      if (entry.isIntersecting) {
        navItems.forEach((li) => li.classList.remove("active"));
        if (activeItem) activeItem.classList.add("active");
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => observer.observe(section));

//PROJECT
const projects = [
  {
    bg: "url(/images/pic00.png)",
    date: "2024-",
    name: "Book App",
    desc: "도서 검색/북마크",
    site: "https://jj-bookapp.netlify.app/",
  },
  {
    bg: "url(/images/pic01.png)",
    date: "2024-",
    name: "Trip.com",
    desc: "숙소 검색 / 근처 놀거리 검색",
    site: "https://tripcom.netlify.app/",
  },
  {
    bg: "url(/images/pic02.png)",
    date: "2025/03 - 2025/06",
    name: "Pro-Cal",
    desc: "자격증 캘린더",
    site: "https://capstone-procal.netlify.app/",
  },
  {
    bg: "url(/images/pic03.png)",
    date: "2025/10//29 - 2025/10/31",
    name: "Dobble Game",
    desc: "웹으로 하는 도블 게임",
    site: "https://dobble-game.netlify.app/",
  },
];

const stage = document.querySelector(".project__card");
const btnPrev = document.querySelector(".button-prev");
const btnNext = document.querySelector(".button-next");
const textDate = document.getElementById("p-date");
const textName = document.getElementById("p-name");
const textDesc = document.getElementById("p-desc");
const textSite = document.getElementById("p-site");

const mod = (n, m) => ((n % m) + m) % m;

let current = 0; 
let clickLock = false;
const LOCK_MS = 520; 

function setCardBG(el, bg) {
  if (bg.startsWith("url(")) {
    el.style.backgroundImage = bg;
    el.style.backgroundPosition = "center";
    el.style.backgroundSize = "cover";
    el.style.backgroundRepeat = "no-repeat";
  } else {
    el.style.background = bg;
  }
}

function applyVisual() {
  const prevEl   = stage.querySelector(".card.prev");
  const centerEl = stage.querySelector(".card.center");
  const nextEl   = stage.querySelector(".card.next");

  const prevIdx = mod(current - 1, projects.length);
  const nextIdx = mod(current + 1, projects.length);

  setCardBG(prevEl,   projects[prevIdx].bg);
  setCardBG(centerEl, projects[current].bg);
  setCardBG(nextEl,   projects[nextIdx].bg);

  if (textDate && textName && textDesc && textSite) {
    const d = projects[current];
    textDate.textContent = d.date || "-";
    textName.textContent = d.name || "-";
    textDesc.textContent = d.desc || "-";
    textSite.textContent  = d.site ? "Open Site" : "-";
    textSite.href         = d.site || "#";
  }
}

function rotate(to) {
  if (clickLock) return;
  clickLock = true;

  const prevEl = stage.querySelector(".card.prev");
  const centerEl = stage.querySelector(".card.center");
  const nextEl = stage.querySelector(".card.next");

  if (to === "next") {
    prevEl.className = "card center";
    centerEl.className = "card next";
    nextEl.className = "card prev";

    current = mod(current + 1, projects.length);
  } else {
    prevEl.className = "card next";
    centerEl.className = "card prev";
    nextEl.className = "card center";
    current = mod(current - 1, projects.length);
  }

  setTimeout(() => {
    applyVisual();
    clickLock = false;
  }, LOCK_MS);
}

applyVisual();

btnPrev.addEventListener("click", () => rotate("prev"));
btnNext.addEventListener("click", () => rotate("next"));

let startX = null;
stage.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
stage.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) rotate("next");
    else rotate("prev");
  }
  startX = null;
});



