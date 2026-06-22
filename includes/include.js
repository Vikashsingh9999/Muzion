// include.js - Simple HTML include system
document.addEventListener('DOMContentLoaded', function() {
  
  // Load header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('includes/header.html')
      .then(response => response.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;
        // Re-attach event listeners after header loads
        attachMenuListeners();
        // Highlight active nav link
        highlightActiveNavLink();
      })
      .catch(err => console.error('Error loading header:', err));
  }
  
  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('includes/footer.html')
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(err => console.error('Error loading footer:', err));
  }
  
  // Load social sidebar
  const socialPlaceholder = document.getElementById('social-sidebar-placeholder');
  if (socialPlaceholder) {
    fetch('includes/social-sidebar.html')
      .then(response => response.text())
      .then(data => {
        socialPlaceholder.innerHTML = data;
        // Execute any scripts in the loaded content
        const scripts = socialPlaceholder.querySelectorAll('script');
        scripts.forEach(script => {
          eval(script.innerHTML);
        });
      })
      .catch(err => console.error('Error loading social sidebar:', err));
  }
});

function attachMenuListeners() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
}

function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = '#00D2FF';
    }
  });
}
