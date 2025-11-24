const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// سنة تلقائية في الفوتر
document.getElementById("year").textContent = new Date().getFullYear();

// موبايل ناف
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // إغلاق القائمة بعد الضغط على رابط
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// أول تحميل الصفحة
header.classList.add("not-scrolled");

// عند السكرول
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
    header.classList.remove("not-scrolled");
  } else {
    header.classList.remove("scrolled");
    header.classList.add("not-scrolled");
  }
});

// سكرول ناعم + تفعيل اللينكات في النيفيجيشن
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 120; // تعويض الهيدر
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      const id = section.getAttribute("id");
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
});

// سكاشن الظهور عند السكول
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // يظهر مرة واحدة فقط
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // للمتصفحات القديمة
  revealElements.forEach((el) => el.classList.add("in-view"));
}

// دعم الضغط على الموبايل لكروت "למה לבחור בנו"
document.querySelectorAll(".flip-card").forEach((card) => {
  let flipped = false;

  card.addEventListener("click", () => {
    flipped = !flipped; // كبسة = قلب / كبسة ثانية = رجوع
    if (flipped) {
      card.classList.add("active"); // انقلب
    } else {
      card.classList.remove("active"); // رجع للواجهة
    }
  });
});

// سلايدر الهيرو
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.querySelector(".hero-dots");

let currentSlide = 0;
let sliderInterval;

// إنشاء النقاط
slides.forEach((_, index) => {
  const btn = document.createElement("button");
  if (index === 0) btn.classList.add("active");
  btn.addEventListener("click", () => goToSlide(index, true));
  dotsContainer.appendChild(btn);
});

const dots = dotsContainer.querySelectorAll("button");

function goToSlide(index, manual = false) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = index;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");

  if (manual) {
    restartSlider();
  }
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  goToSlide(nextIndex);
}

function startSlider() {
  sliderInterval = setInterval(nextSlide, 7000);
}

function restartSlider() {
  clearInterval(sliderInterval);
  startSlider();
}

if (slides.length > 1) {
  startSlider();
}

// منع الإرسال الفعلي للفورم (لحد ما تربطه ببك إند)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("תודה! פנייתכם התקבלה. נחזור אליכם בהקדם.");
    contactForm.reset();
  });
}
