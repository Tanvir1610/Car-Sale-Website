// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.body.className = `${this.theme}-theme`;
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (this.theme === 'dark') {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'rotate(180deg)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'rotate(0deg)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'rotate(0deg)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'rotate(-180deg)';
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.header = document.getElementById('header');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveLink();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll event for header styling
        window.addEventListener('scroll', () => this.handleScroll());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.animateMobileMenuButton();
    }

    animateMobileMenuButton() {
        const spans = this.mobileMenuBtn.querySelectorAll('span');
        const isActive = this.mobileMenu.classList.contains('active');
        
        if (isActive) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = this.header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                this.mobileMenu.classList.remove('active');
                this.animateMobileMenuButton();
                
                // Update active link
                this.setActiveLink(href);
            }
        }
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.header.classList.toggle('scrolled', scrolled);
        
        // Update active link based on scroll position
        this.updateActiveLinkOnScroll();
    }

    updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + this.header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.setActiveLink(`#${sectionId}`);
            }
        });
    }

    setActiveLink(activeHref = null) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeHref && link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
    }

    handleOutsideClick(e) {
        if (!this.header.contains(e.target) && this.mobileMenu.classList.contains('active')) {
            this.mobileMenu.classList.remove('active');
            this.animateMobileMenuButton();
        }
    }
}

// 3D Effects Manager
class EffectsManager {
    constructor() {
        this.heroTitle = document.getElementById('heroTitle');
        this.init();
    }

    init() {
        this.bind3DEffects();
        this.bindScrollAnimations();
    }

    bind3DEffects() {
        // 3D mouse movement effect for hero title
        document.addEventListener('mousemove', (e) => {
            if (this.heroTitle) {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
                
                this.heroTitle.style.transform = `perspective(1000px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
            }
        });

        // Reset 3D effect when mouse leaves
        document.addEventListener('mouseleave', () => {
            if (this.heroTitle) {
                this.heroTitle.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            }
        });
    }

    bindScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.feature-card, .stat-item, .sponsor-card, .partner-card, .contact-card, .info-item'
        );
        
        animateElements.forEach(el => observer.observe(el));
    }
}

// Form Management
class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.emailInput = document.getElementById('emailInput');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        if (email) {
            const subject = encodeURIComponent('Conference Inquiry');
            const body = encodeURIComponent(`Email: ${email}`);
            const mailtoLink = `mailto:cvmuconference.sdstd2025@cvmu.edu.in?subject=${subject}&body=${body}`;
            
            window.open(mailtoLink);
            this.emailInput.value = '';
            
            // Show success feedback
            this.showFeedback('Email client opened successfully!', 'success');
        }
    }

    showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 0.5rem;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Performance Optimizations
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeScrollEvents();
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    optimizeScrollEvents() {
        // Throttle scroll events for better performance
        const throttledScroll = Utils.throttle(() => {
            // Scroll-dependent operations
            this.updateScrollProgress();
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    updateScrollProgress() {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        
        // Update any scroll-dependent UI elements
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    }

    lazyLoadImages() {
        // Implement lazy loading for images if needed
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadCriticalResources() {
        // Preload critical fonts and resources
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
    }

    handleError(error) {
        console.error('JavaScript Error:', error);
        // Could send to analytics or error reporting service
    }

    handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        event.preventDefault();
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all managers
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.effectsManager = new EffectsManager();
            this.formManager = new FormManager();
            this.performanceManager = new PerformanceManager();
            this.errorHandler = new ErrorHandler();

            // Add custom CSS animations
            this.addCustomStyles();
            
            console.log('🚀 ICNIIS 2026 Website Initialized Successfully!');
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .feedback {
                animation: slideIn 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
}

// Start the application
new App();