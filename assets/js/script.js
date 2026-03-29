'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * SIDEBAR MENU ITEM CLICK - CLOSE SIDEBAR
 */

const initSidebarMenuClick = function () {
  const navbarLinks = document.querySelectorAll('.navbar-link');

  navbarLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      // Close sidebar after a short delay to allow smooth scroll to start
      setTimeout(closeNavbar, 100);
    });
  });
};

/**
 * SCROLL-BASED ACTIVE MENU HIGHLIGHTING
 */

const initScrollActiveMenu = function () {
  const sections = document.querySelectorAll('section[id]');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  const updateActiveMenu = function () {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remove active class from all links
        navbarLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to corresponding link
        const activeLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  // Update active menu on scroll
  window.addEventListener('scroll', updateActiveMenu);

  // Update active menu on page load
  updateActiveMenu();
};

initSidebarMenuClick();
initScrollActiveMenu();



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * SOCIAL MEDIA LINKS (DYNAMIC)
 */

const socialLinks = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  youtube: "#",
  maps: "https://www.google.com/maps?q=Bandra,Mumbai"
};

/**
 * Initialize social media links
 */

const initSocialLinks = function () {
  // Footer social media links
  const footerLinks = document.querySelectorAll('.footer-list a');

  footerLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();

    switch (linkText) {
      case 'facebook':
        link.href = socialLinks.facebook;
        link.target = '_blank';
        break;
      case 'instagram':
        link.href = socialLinks.instagram;
        link.target = '_blank';
        break;
      case 'twitter':
        link.href = socialLinks.twitter;
        link.target = '_blank';
        break;
      case 'youtube':
        link.href = socialLinks.youtube;
        link.target = '_blank';
        break;
      case 'google map':
        link.href = socialLinks.maps;
        link.target = '_blank';
        break;
    }
  });

  // Make address clickable to open Google Maps
  const addressElements = document.querySelectorAll('.topbar-item address span, .footer-brand address, .navbar address, .form-right address');

  addressElements.forEach(address => {
    if (address.textContent.includes('Bandra')) {
      // Wrap address in a clickable link if not already wrapped
      if (!address.parentElement.href) {
        const wrapper = document.createElement('a');
        wrapper.href = socialLinks.maps;
        wrapper.target = '_blank';
        wrapper.style.textDecoration = 'none';
        wrapper.style.color = 'inherit';

        address.parentElement.insertBefore(wrapper, address);
        wrapper.appendChild(address);
      }
    }
  });
};

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

/**
 * SMOOTH SCROLLING TO RESERVATION SECTION
 */

const initSmoothScrolling = function () {
  // Get the reservation section
  const reservationSection = document.getElementById('reservation-section');

  if (reservationSection) {
    // Function to scroll to reservation section
    const scrollToReservation = function (event) {
      event.preventDefault();
      reservationSection.scrollIntoView({ behavior: 'smooth' });
    };

    // Navbar "Find A Table" button
    const findTableBtn = document.querySelector('.btn-secondary');
    if (findTableBtn && findTableBtn.textContent.includes('Find A Table')) {
      findTableBtn.addEventListener('click', scrollToReservation);
    }

    // Hero section "Book A Table" button
    const heroBookTableBtn = document.querySelector('.hero-btn');
    if (heroBookTableBtn && heroBookTableBtn.textContent.includes('Book A Table')) {
      heroBookTableBtn.addEventListener('click', scrollToReservation);
    }

    // Navbar "Contact" link
    const navbarContactLinks = document.querySelectorAll('.navbar-link');
    navbarContactLinks.forEach(link => {
      if (link.textContent.trim() === 'Contact') {
        link.addEventListener('click', scrollToReservation);
      }
    });

    // Footer navigation links (Home, Menus, About Us, Contact)
    const footerNavLinks = document.querySelectorAll('.footer-link');
    footerNavLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};

/**
 * WHATSAPP BOOKING FUNCTIONALITY
 */

const initWhatsAppBooking = function () {
  const reservationForm = document.querySelector('.form-left');
  const bookTableBtn = reservationForm.querySelector('button[type="submit"]');

  if (bookTableBtn) {
    bookTableBtn.addEventListener('click', function (event) {
      event.preventDefault();

      // Get form field values
      const name = reservationForm.querySelector('input[name="name"]').value.trim();
      const persons = reservationForm.querySelector('select[name="person"]').value;
      const date = reservationForm.querySelector('input[name="reservation-date"]').value;
      // Get the time field (now correctly named)
      const time = reservationForm.querySelector('select[name="time"]').value;
      const message = reservationForm.querySelector('textarea[name="message"]').value.trim();

      // Validation (only name required)
      if (!name) {
        alert('Please fill required fields');
        return;
      }

      // Create WhatsApp message (without phone)
      const whatsappMessage = `Booking Request:
Name: ${name}
People: ${persons}
Date: ${date}
Time: ${time}
Message: ${message}`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // WhatsApp URL (mobile-friendly wa.me format)
      const whatsappUrl = `https://wa.me/917718096969?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    });
  }
};

/**
 * Initialize all functionality
 */

window.addEventListener("load", function () {
  initSocialLinks();
  initSmoothScrolling();
  initWhatsAppBooking();
  initSidebarMenuClick();
  initScrollActiveMenu();
});