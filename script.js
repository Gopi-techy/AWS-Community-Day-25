// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized active navigation link highlighting
let scrollTimeout;
let isScrolling = false;

const activeNavHandler = () => {
    if (isScrolling) return; // Prevent overlapping calls
    isScrolling = true;
    
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = [];
        
        // Get all sections that have corresponding nav links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    sections.push({ id: sectionId, element: section, link: link });
                }
            }
        });
        
        if (sections.length === 0) {
            isScrolling = false;
            return;
        }
        
        const scrollPosition = window.pageYOffset;
        const navbarHeight = 80;
        
        let current = sections[0].id; // Default to first section
        
        // Check each section to find which one is most prominent in viewport
        sections.forEach((section, index) => {
            const sectionTop = section.element.offsetTop - navbarHeight - 20;
            
            if (scrollPosition >= sectionTop - 50) {
                if (index === sections.length - 1 || scrollPosition < sections[index + 1].element.offsetTop - navbarHeight - 20) {
                    current = section.id;
                }
            }
        });
        
        // Special case: if we're at the very top of the page
        if (scrollPosition < 50) {
            current = sections[0].id;
        }
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${current}`) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.warn('Navigation highlight error:', error);
    } finally {
        isScrolling = false;
    }
};

// Optimized scroll handler for navigation
const optimizedScrollHandler = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(activeNavHandler, isMobileDevice ? 100 : 16);
};

// Apply optimized scroll handler
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Also trigger on resize to recalculate positions
window.addEventListener('resize', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(activeNavHandler, 200);
});

// Initialize navbar highlighting when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(activeNavHandler, 200);
    });
} else {
    setTimeout(activeNavHandler, 200);
}

// Optimized scroll handlers with mobile performance in mind
let scrollTimer;
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Optimized navbar scroll handler
const optimizedNavbarScroll = () => {
    if (scrollTimer) return; // Throttle scroll events
    
    scrollTimer = setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        scrollTimer = null;
    }, isMobileDevice ? 50 : 16); // Slower on mobile for better performance
};

// Apply optimized navbar scroll
window.addEventListener('scroll', optimizedNavbarScroll, { passive: true });

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .speaker-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Registration form handling removed - no longer needed

// Legacy countdown function removed to prevent conflicts with CountdownTimer class

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Lazy loading for speaker images
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
}, imageOptions);

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .ripple {
        width: 20px;
        height: 20px;
        pointer-events: none;
    }
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);

// Performance optimization: Debounce scroll events - Disabled to prevent mobile conflicts
function debounce(func, wait) {
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

// Generic debounced scroll handler (not actively used to prevent conflicts)
// window.addEventListener('scroll', debounce(() => {
//     // Reserved for future scroll handlers if needed
// }, 100));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
);

// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
    if (navMenu.classList.contains('active') && e.key === 'Tab') {
        const focusableMenuElements = navMenu.querySelectorAll('a[href]');
        const firstFocusable = focusableMenuElements[0];
        const lastFocusable = focusableMenuElements[focusableMenuElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// About Section Slideshow - Disabled to prevent mobile conflicts
let slideIndex = 1;
// slideInterval removed to prevent mobile page reload issues

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return; // Exit if no slides exist
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function currentSlide(n) {
    // Auto-interval removed to prevent mobile conflicts
    showSlides(slideIndex = n);
}

// nextSlide function removed to prevent auto-advancement

// Static slideshow initialization without auto-advance
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlides(slideIndex);
        console.log('Static slideshow initialized (auto-advance disabled for mobile compatibility)');
    }
});

// Countdown Timer Functionality - Optimized for Mobile
class CountdownTimer {
    constructor() {
        // Event date: September 20, 2025 at 8:00 AM IST
        this.eventDate = new Date('2025-09-20T08:00:00+05:30');
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            daysProgress: document.getElementById('days-progress'),
            hoursProgress: document.getElementById('hours-progress'),
            minutesProgress: document.getElementById('minutes-progress'),
            secondsProgress: document.getElementById('seconds-progress'),
            message: document.getElementById('countdown-message'),
            section: document.querySelector('.countdown')
        };
        
        // Responsive circumference calculation
        this.circumference = this.getCircumference();
        this.isEventStarted = false;
        this.isEventEnded = false;
        this.isDestroyed = false;
        
        this.init();
    }
    
    getCircumference() {
        // Check screen size and return appropriate circumference
        if (window.innerWidth <= 360) {
            return 2 * Math.PI * 25; // Extra small mobile
        } else if (window.innerWidth <= 480) {
            return 2 * Math.PI * 30; // Small mobile
        } else if (window.innerWidth <= 768) {
            return 2 * Math.PI * 37.5; // Tablet
        } else {
            return 2 * Math.PI * 45; // Desktop
        }
    }
    
    init() {
        if (!this.elements.days || this.isDestroyed) return;
        
        this.initProgressRings();
        this.updateCountdown();
        this.startTimer();
    }
    
    initProgressRings() {
        // Initialize progress rings with error handling
        try {
            Object.values(this.elements).forEach(element => {
                if (element && element.id && element.id.includes('progress')) {
                    element.style.strokeDasharray = this.circumference;
                    element.style.strokeDashoffset = this.circumference;
                }
            });
        } catch (error) {
            console.warn('Progress ring initialization error:', error);
        }
    }
    
    updateCountdown() {
        if (this.isDestroyed) return;
        
        try {
            const now = new Date().getTime();
            const eventTime = this.eventDate.getTime();
            const timeDifference = eventTime - now;
            
            if (timeDifference <= 0) {
                this.handleEventStarted();
                return;
            }
            
            // Calculate time units
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            // Update display
            this.updateDisplay(days, hours, minutes, seconds);
            this.updateProgressRings(days, hours, minutes, seconds);
        } catch (error) {
            console.error('Countdown update error:', error);
            this.destroy();
        }
    }
    
    updateDisplay(days, hours, minutes, seconds) {
        try {
            if (this.elements.days) this.elements.days.textContent = this.formatNumber(days);
            if (this.elements.hours) this.elements.hours.textContent = this.formatNumber(hours);
            if (this.elements.minutes) this.elements.minutes.textContent = this.formatNumber(minutes);
            if (this.elements.seconds) this.elements.seconds.textContent = this.formatNumber(seconds);
        } catch (error) {
            console.warn('Display update error:', error);
        }
    }
    
    updateProgressRings(days, hours, minutes, seconds) {
        try {
            // Calculate progress percentages with bounds checking
            const daysProgress = Math.min(1, Math.max(0, 1 - (days % 365) / 365));
            const hoursProgress = Math.min(1, Math.max(0, 1 - hours / 24));
            const minutesProgress = Math.min(1, Math.max(0, 1 - minutes / 60));
            const secondsProgress = Math.min(1, Math.max(0, 1 - seconds / 60));
            
            this.setProgress(this.elements.daysProgress, daysProgress);
            this.setProgress(this.elements.hoursProgress, hoursProgress);
            this.setProgress(this.elements.minutesProgress, minutesProgress);
            this.setProgress(this.elements.secondsProgress, secondsProgress);
        } catch (error) {
            console.warn('Progress rings update error:', error);
        }
    }
    
    setProgress(element, progress) {
        if (!element || this.isDestroyed) return;
        
        try {
            const offset = this.circumference - (progress * this.circumference);
            element.style.strokeDashoffset = offset;
        } catch (error) {
            console.warn('Progress setting error:', error);
        }
    }
    
    handleEventStarted() {
        try {
            const now = new Date();
            const eventEndTime = new Date(this.eventDate);
            eventEndTime.setHours(eventEndTime.getHours() + 12); // Assume 12-hour event
            
            if (now < eventEndTime) {
                this.showEventStartedMessage();
                this.isEventStarted = true;
            } else {
                this.showEventEndedMessage();
                this.isEventEnded = true;
            }
            
            this.updateDisplay(0, 0, 0, 0);
            this.updateProgressRings(0, 0, 0, 0);
        } catch (error) {
            console.error('Event started handling error:', error);
        }
    }
    
    showEventStartedMessage() {
        try {
            if (this.elements.message) {
                this.elements.message.innerHTML = `
                    <p style="color: #28a745; font-weight: 600;">
                        🎉 The AWS Student Community Day 2025 is happening now! 🎉
                    </p>
                `;
            }
            
            if (this.elements.section) {
                this.elements.section.classList.add('event-started');
            }
        } catch (error) {
            console.warn('Event started message error:', error);
        }
    }
    
    showEventEndedMessage() {
        try {
            if (this.elements.message) {
                this.elements.message.innerHTML = `
                    <p style="color: #6c757d; font-weight: 600;">
                        Thank you for joining AWS Student Community Day 2025! 
                    </p>
                `;
            }
            
            if (this.elements.section) {
                this.elements.section.classList.add('event-ended');
            }
        } catch (error) {
            console.warn('Event ended message error:', error);
        }
    }
    
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    startTimer() {
        if (this.isDestroyed) return;
        
        // Update immediately
        this.updateCountdown();
        
        // Then update every second with error handling
        this.interval = setInterval(() => {
            if (this.isDestroyed) {
                clearInterval(this.interval);
                return;
            }
            this.updateCountdown();
        }, 1000);
    }
    
    destroy() {
        this.isDestroyed = true;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Mobile-Optimized Initialization
let countdownTimer;
let initializationInProgress = false;

// Safe initialization with mobile optimization
function initializeCountdown() {
    if (initializationInProgress) return;
    initializationInProgress = true;
    
    try {
        // Clean up existing timer
        if (countdownTimer) {
            countdownTimer.destroy();
            countdownTimer = null;
        }
        
        // Wait for DOM to be fully ready
        setTimeout(() => {
            countdownTimer = new CountdownTimer();
            window.countdownTimer = countdownTimer; // For debugging
            initializationInProgress = false;
        }, 100);
    } catch (error) {
        console.error('Countdown initialization failed:', error);
        initializationInProgress = false;
    }
}

// Optimized resize handler with debouncing
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (countdownTimer && !countdownTimer.isDestroyed) {
            countdownTimer.circumference = countdownTimer.getCircumference();
            countdownTimer.initProgressRings();
        }
    }, 150); // Debounced resize
}

// Initialize countdown when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile performance optimization
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Delay initialization on mobile for better performance
        setTimeout(initializeCountdown, 300);
    } else {
        initializeCountdown();
    }
    
    // Initialize other components
    initSimpleAnimations();
});

// Optimized resize listener
window.addEventListener('resize', handleResize);

// Page visibility optimization - Modified to prevent reload conflicts
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Tab hidden - preserving countdown timer');
        // Keep timer running but at reduced frequency to save resources
        // Don't destroy timer to prevent reload issues
    } else {
        console.log('Tab visible - countdown timer active');
        // Timer continues normally
        if (!countdownTimer || countdownTimer.isDestroyed) {
            setTimeout(initializeCountdown, 100);
        }
    }
});

// Memory cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (countdownTimer) {
        countdownTimer.destroy();
        countdownTimer = null;
    }
});

// Simple scroll animations for Why Attend section
function initSimpleAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Add simple CSS for animations
const simpleCSS = `
    [data-aos] {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject simple styles
const simpleStyle = document.createElement('style');
simpleStyle.textContent = simpleCSS;
document.head.appendChild(simpleStyle);

// Tilt Effect for Benefit Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transformStyle = 'preserve-3d';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Enhanced Speaker Card Interactions
function initSpeakerCardEffects() {
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    speakerCards.forEach(card => {
        // Add click to expand functionality
        card.addEventListener('click', (e) => {
            // Prevent default if clicking on social links
            if (e.target.closest('.speaker-social')) return;
            
            // Add pulse effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            const speakerImage = card.querySelector('.speaker-image img');
            if (speakerImage) {
                speakerImage.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const speakerImage = card.querySelector('.speaker-image img');
            if (speakerImage) {
                speakerImage.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize speaker card effects when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initSpeakerCardEffects();
});

// Professional Speaker Card Interactions
function initProfessionalSpeakerEffects() {
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    // Add professional entrance animation
    speakerCards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Staggered entrance
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Add sophisticated hover interactions with proper alignment
    speakerCards.forEach(card => {
        let isHovering = false;
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovering || window.innerWidth <= 768) return; // Only on desktop when hovering
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // More subtle tilt effect
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            // Apply transform with consistent translateY
            card.style.transform = `translateY(-12px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });

        // Add click interaction
        card.addEventListener('click', (e) => {
            // Prevent default if clicking on social links
            if (e.target.closest('.speaker-social')) return;
            
            // Add professional click feedback
            const originalTransform = card.style.transform;
            card.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = originalTransform || 'translateY(-12px)';
            }, 150);
        });
    });
}

// Add floating particles for background animation
function createFloatingParticles() {
    const speakersSection = document.querySelector('.speakers');
    if (!speakersSection) return;

    // Create fewer, more elegant particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 25;
        const delay = Math.random() * 15;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 153, 0, 0.4) 0%, rgba(255, 153, 0, 0.1) 70%, transparent 100%);
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            animation: floatParticle ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            z-index: 1;
            filter: blur(0.5px);
        `;
        speakersSection.appendChild(particle);
    }
}

// Add CSS for enhanced particle animation
const particleCSS = `
@keyframes floatParticle {
    0% {
        transform: translateY(100vh) translateX(0) rotate(0deg);
        opacity: 0;
        scale: 0;
    }
    5% {
        opacity: 1;
        scale: 1;
    }
    50% {
        transform: translateY(50vh) translateX(${Math.random() * 60 - 30}px) rotate(180deg);
        opacity: 0.8;
    }
    95% {
        opacity: 0.2;
    }
    100% {
        transform: translateY(-10vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
        opacity: 0;
        scale: 0.5;
    }
}

.floating-particle {
    will-change: transform, opacity;
}
`;

// Add enhanced styles
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Professional scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe stats items
    const statsItems = document.querySelectorAll('.stat-item');
    statsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe speaker counter
    const speakerCounter = document.querySelector('.speakers-counter');
    if (speakerCounter) {
        speakerCounter.style.opacity = '0';
        speakerCounter.style.transform = 'translateY(30px)';
        speakerCounter.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(speakerCounter);
    }
}

// Enhanced counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 16);
    });
}

// Professional loading sequence
function initProfessionalLoadingSequence() {
    // Wait for page to load
    setTimeout(() => {
        initProfessionalSpeakerEffects();
        initScrollAnimations();
        createFloatingParticles(); // Add background particles
        
        // Trigger counter animation when stats come into view
        const statsSection = document.querySelector('.speakers-stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => animateCounters(), 500);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statsObserver.observe(statsSection);
        }
    }, 300);
}

// Initialize professional animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) - check if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    } else {
        console.warn('AOS library not loaded, using fallback animations');
        // Initialize simple fallback animations
        initSimpleAnimations();
    }
    
    // Initialize all functionalities
    // createCountdown(); // Removed - using CountdownTimer class instead
    initSpeakerCardEffects();
    initProfessionalLoadingSequence();
    initFAQAccordion();
    
    // Initialize navbar scroll highlighting
    activeNavHandler();
});

// Speaker Card Flip Functionality
function flipCard(button) {
    const speakerCard = button.closest('.speaker-card');
    speakerCard.classList.toggle('flipped');
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Static Gallery for Previous Event Section (Auto-slide removed to prevent mobile conflicts)
function initStaticGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    
    if (slides.length === 0) return;
    
    // Start with first slide active only
    slides[0].classList.add('active');
    
    // Manual navigation only (no auto-slide to prevent mobile issues)
    console.log('Static gallery initialized with', slides.length, 'slides');
}

console.log('AWS Community Day 2025 - Mobile-Optimized Script Loaded! 🚀 (Auto-slide disabled for stability)');
