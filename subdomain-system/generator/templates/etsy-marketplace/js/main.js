// Base JavaScript
console.log('Site loaded successfully');

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle (if needed)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
}