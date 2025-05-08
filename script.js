
document.addEventListener('DOMContentLoaded', function() {
  // Initialize current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu functionality
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
  
  // Header background change on scroll
  const header = document.getElementById('header');
  
  function checkScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check
  
  // Scroll to top button
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // Log data (in a real application, you would send this to your backend)
      console.log('Form submitted:', formData);
      
      // Show success message
      showToast('Thanks for reaching out! I\'ll get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Toast notification system
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastContent = document.getElementById('toast-content');
    
    toastContent.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const yOffset = -70; // Header offset
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize animation for sections
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-fade');
        observer.unobserve(entry.target);
      }
    });
  }
  
  // Set up the Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  // Target elements to animate
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (section.id !== 'hero') { // Skip hero section as it already has animations
      observer.observe(section);
    }
  });
});