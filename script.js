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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

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

// Countdown timer using existing HTML structure
function createCountdown() {
    // Use the existing countdown elements from HTML
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement) return; // Exit if countdown elements don't exist
    
    const eventDate = new Date('2025-09-13T08:00:00+05:30'); // September 13, 2025 at 8:00 AM IST
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Update progress rings
            updateProgressRing('days-progress', days, 365);
            updateProgressRing('hours-progress', hours, 24);
            updateProgressRing('minutes-progress', minutes, 60);
            updateProgressRing('seconds-progress', seconds, 60);
        } else {
            const countdownMessage = document.getElementById('countdown-message');
            if (countdownMessage) {
                countdownMessage.innerHTML = '<p style="color: #FF9900; font-weight: 600;">🎉 Event is Live! 🎉</p>';
            }
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }
    
    function updateProgressRing(id, current, max) {
        const progressElement = document.getElementById(id);
        if (progressElement) {
            const circumference = 2 * Math.PI * 54; // radius of 54
            const progress = 1 - (current / max);
            const offset = circumference - (progress * circumference);
            progressElement.style.strokeDasharray = circumference;
            progressElement.style.strokeDashoffset = offset;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Countdown will be initialized in DOMContentLoaded event

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

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Your scroll event handlers here
}, 10));

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

// About Section Slideshow
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
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
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startSlideInterval();
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    startSlideInterval();
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
});

// Countdown Timer Functionality
class CountdownTimer {
    constructor() {
        // Event date: September 13, 2025 at 8:00 AM IST
        this.eventDate = new Date('2025-09-13T08:00:00+05:30');
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
        
        this.init();
    }
    
    getCircumference() {
        // Check screen size and return appropriate circumference
        if (window.innerWidth <= 480) {
            return 2 * Math.PI * 34; // Mobile radius
        } else if (window.innerWidth <= 768) {
            return 2 * Math.PI * 44; // Tablet radius
        } else {
            return 2 * Math.PI * 54; // Desktop radius
        }
    }
    
    init() {
        if (!this.elements.days) return; // Exit if countdown elements don't exist
        
        this.initProgressRings();
        this.updateCountdown();
        this.startTimer();
    }
    
    initProgressRings() {
        // Initialize progress rings
        Object.values(this.elements).forEach(element => {
            if (element && element.id && element.id.includes('progress')) {
                element.style.strokeDasharray = this.circumference;
                element.style.strokeDashoffset = this.circumference;
            }
        });
    }
    
    updateCountdown() {
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
        this.addPulseEffect();
    }
    
    updateDisplay(days, hours, minutes, seconds) {
        if (this.elements.days) this.elements.days.textContent = this.formatNumber(days);
        if (this.elements.hours) this.elements.hours.textContent = this.formatNumber(hours);
        if (this.elements.minutes) this.elements.minutes.textContent = this.formatNumber(minutes);
        if (this.elements.seconds) this.elements.seconds.textContent = this.formatNumber(seconds);
    }
    
    updateProgressRings(days, hours, minutes, seconds) {
        // Calculate progress percentages
        const daysProgress = 1 - (days % 365) / 365;
        const hoursProgress = 1 - hours / 24;
        const minutesProgress = 1 - minutes / 60;
        const secondsProgress = 1 - seconds / 60;
        
        this.setProgress(this.elements.daysProgress, daysProgress);
        this.setProgress(this.elements.hoursProgress, hoursProgress);
        this.setProgress(this.elements.minutesProgress, minutesProgress);
        this.setProgress(this.elements.secondsProgress, secondsProgress);
    }
    
    setProgress(element, progress) {
        if (!element) return;
        const offset = this.circumference - (progress * this.circumference);
        element.style.strokeDashoffset = offset;
    }
    
    addPulseEffect() {
        // Add pulse effect to seconds for visual feedback
        const secondsBox = document.getElementById('seconds-box');
        if (secondsBox) {
            secondsBox.style.animation = 'none';
            setTimeout(() => {
                secondsBox.style.animation = 'timerPulse 1s ease-in-out';
            }, 10);
        }
    }
    
    handleEventStarted() {
        const now = new Date();
        const eventEndTime = new Date(this.eventDate);
        eventEndTime.setHours(eventEndTime.getHours() + 12); // Assume 12-hour event
        
        if (now < eventEndTime) {
            // Event is currently happening
            this.showEventStartedMessage();
            this.isEventStarted = true;
        } else {
            // Event has ended
            this.showEventEndedMessage();
            this.isEventEnded = true;
        }
        
        this.updateDisplay(0, 0, 0, 0);
        this.updateProgressRings(0, 0, 0, 0);
    }
    
    showEventStartedMessage() {
        if (this.elements.message) {
            this.elements.message.innerHTML = `
                <p style="color: #28a745; font-weight: 600;">
                    <i class="fas fa-play-circle" style="margin-right: 0.5rem;"></i>
                    The AWS Student Community Day 2025 is happening now! 🎉
                </p>
            `;
        }
        
        if (this.elements.section) {
            this.elements.section.classList.add('event-started');
        }
        
        this.addConfetti();
    }
    
    showEventEndedMessage() {
        if (this.elements.message) {
            this.elements.message.innerHTML = `
                <p style="color: #6c757d; font-weight: 600;">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Thank you for joining AWS Student Community Day 2025! 
                </p>
            `;
        }
        
        if (this.elements.section) {
            this.elements.section.classList.add('event-ended');
        }
    }
    
    addConfetti() {
        // Simple confetti effect when event starts
        const confettiColors = ['#FF9900', '#FFAD33', '#FFD700', '#FFA500'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 8px;
                height: 8px;
                background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                z-index: 1000;
                border-radius: 50%;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
        
        // Add confetti animation
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-10px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    startTimer() {
        // Update immediately
        this.updateCountdown();
        
        // Then update every second
        this.interval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize countdown timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const countdown = new CountdownTimer();
    
    // Store countdown instance globally for debugging
    window.countdownTimer = countdown;
    
    // Handle window resize for responsive circumference
    window.addEventListener('resize', () => {
        if (window.countdownTimer) {
            window.countdownTimer.circumference = window.countdownTimer.getCircumference();
            window.countdownTimer.initProgressRings();
        }
    });

    // Initialize simple animations
    initSimpleAnimations();
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

// Add visibility change listener to pause/resume timer when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (window.countdownTimer) {
        if (document.hidden) {
            window.countdownTimer.destroy();
        } else {
            window.countdownTimer = new CountdownTimer();
        }
    }
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
    createCountdown(); // Initialize countdown timer
    initSpeakerCardEffects();
    initProfessionalLoadingSequence();
    initFAQAccordion();
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

// Perfect Auto-Sliding Gallery for Previous Event Section
let currentGallerySlideIndex = 0;
let galleryInterval;

function initPerfectAutoGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    
    if (slides.length === 0) return;
    
    // Start with first slide active
    slides[0].classList.add('active');
    
    function nextSlide() {
        // Remove active class from current slide
        slides[currentGallerySlideIndex].classList.remove('active');
        
        // Move to next slide
        currentGallerySlideIndex = (currentGallerySlideIndex + 1) % slides.length;
        
        // Add active class to new slide with smooth transition
        setTimeout(() => {
            slides[currentGallerySlideIndex].classList.add('active');
        }, 50);
    }
    
    // Auto-advance slides every 4 seconds
    galleryInterval = setInterval(nextSlide, 4000);
    
    // Pause on hover for better user experience
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(galleryInterval);
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            galleryInterval = setInterval(nextSlide, 4000);
        });
    }
}

// Initialize perfect auto gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for images to load before starting gallery
    window.addEventListener('load', () => {
        setTimeout(initPerfectAutoGallery, 1000);
    });
});

console.log('AWS Community Day 2025 - Perfect Auto Gallery Loaded! 🎯');
