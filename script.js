// script.js
(function() {
  'use strict';

  // Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when nav link clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  const allLinks = document.querySelectorAll('a[href^="#"]');
  
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 80; // navbar height offset
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        history.pushState(null, null, href);
      }
    });
  });

  // Form submission handler
  const form = document.getElementById('interestForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! A member of IDR will reach out soon.');
      form.reset();
    });
  }

  // Active navigation link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.style.color = '';
      link.style.borderBottomColor = 'transparent';
      const linkHash = link.getAttribute('href').substring(1);
      if (linkHash === current) {
        link.style.color = 'var(--orange)';
        link.style.borderBottomColor = 'var(--orange)';
      }
    });
  });
})();