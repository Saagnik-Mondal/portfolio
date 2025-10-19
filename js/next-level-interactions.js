/**
 * NEXT-LEVEL IGLOO.INC INSPIRED INTERACTIONS
 * Award-winning smooth animations and interactions
 */

class NextLevelExperience {
    constructor() {
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        this.createScrollProgress();
        this.createNavigationDots();
        this.setupMagneticButtons();
        this.setupTextReveal();
        this.setupSmoothMouseTrail();
        this.setupRippleEffect();
        this.enhanceHeroTitle();
        this.setupParallaxLayers();
        this.setupDynamicBackground();
        this.updateScrollProgress();
        
        console.log('🚀 Next-level experience initialized');
    }
    
    createScrollProgress() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        progress.id = 'scroll-progress';
        document.body.appendChild(progress);
    }
    
    createNavigationDots() {
        const sections = document.querySelectorAll('.cinematic-section');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'nav-dots';
        
        const sectionNames = ['Hero', 'About', 'Works', 'Connect'];
        
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.dataset.section = sectionNames[index] || `Section ${index + 1}`;
            dot.dataset.index = index;
            
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            
            dotsContainer.appendChild(dot);
        });
        
        document.body.appendChild(dotsContainer);
        
        // Update active dot on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                    this.currentSection = index;
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    setupMagneticButtons() {
        // Add magnetic effect to all social cards and project cards
        const magneticElements = document.querySelectorAll('.social-card, .project-card-cinematic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = 1 - (distance / maxDistance);
                    const moveX = x * strength * 0.3;
                    const moveY = y * strength * 0.3;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(0)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    enhanceHeroTitle() {
        const heroTitle = document.querySelector('.hero-title-cinematic');
        if (!heroTitle) return;
        
        // Split text into characters
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.classList.add('text-reveal');
            heroTitle.appendChild(span);
        });
        
        // Add magnetic effect to each character
        heroTitle.querySelectorAll('span').forEach(span => {
            span.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(span, {
                        y: -20,
                        scale: 1.3,
                        color: '#00ffff',
                        duration: 0.3,
                        ease: 'back.out(2)'
                    });
                }
            });
            
            span.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(span, {
                        y: 0,
                        scale: 1,
                        color: 'inherit',
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                }
            });
        });
    }
    
    setupTextReveal() {
        // Reveal text on scroll
        const textElements = document.querySelectorAll('h2, h3, p');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    entry.target.classList.add('stagger-fade', 'visible');
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        textElements.forEach(el => {
            el.classList.add('stagger-fade');
            observer.observe(el);
        });
    }
    
    setupSmoothMouseTrail() {
        const trails = [];
        const trailCount = 10;
        
        // Create trail elements
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            document.body.appendChild(trail);
            trails.push({
                element: trail,
                x: 0,
                y: 0
            });
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animate trails
        const animateTrails = () => {
            trails.forEach((trail, index) => {
                const delay = index * 0.05;
                trail.x += (mouseX - trail.x) * (0.2 - delay * 0.01);
                trail.y += (mouseY - trail.y) * (0.2 - delay * 0.01);
                
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
                trail.element.style.opacity = 1 - (index / trailCount);
                trail.element.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.08})`;
            });
            
            requestAnimationFrame(animateTrails);
        };
        
        animateTrails();
    }
    
    setupRippleEffect() {
        const rippleContainers = document.querySelectorAll('.social-card, .project-card-cinematic');
        
        rippleContainers.forEach(container => {
            container.classList.add('ripple-container');
            
            container.addEventListener('click', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = ripple.style.height = '10px';
                
                container.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 1000);
            });
        });
    }
    
    setupParallaxLayers() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Parallax background elements
            document.querySelectorAll('.cinematic-bg').forEach((bg, index) => {
                const speed = 0.3 + (index * 0.1);
                bg.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Parallax images
            document.querySelectorAll('.about-image-3d, .project-image-cinematic').forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                    img.style.transform = `translateY(${scrollPercent * -30}px) scale(1.1)`;
                }
            });
        });
    }
    
    setupDynamicBackground() {
        const body = document.body;
        body.classList.add('dynamic-bg');
        
        const sections = document.querySelectorAll('.cinematic-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    body.className = body.className.replace(/section-\d+/, '');
                    body.classList.add(`section-${index + 1}`);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateScrollProgress() {
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            
            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            requestAnimationFrame(updateProgress);
        };
        
        updateProgress();
    }
    
    // Advanced GSAP Animations
    initAdvancedGSAPAnimations() {
        if (typeof gsap === 'undefined' || !gsap.registerPlugin) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Smooth parallax with GSAP
        gsap.utils.toArray('.cinematic-section').forEach((section, index) => {
            // Pin sections while scrolling
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: '+=100%',
                pin: false,
                scrub: 1
            });
            
            // Fade and scale content
            gsap.from(section.querySelector('.cinematic-content'), {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1
                }
            });
        });
        
        // Project cards stagger with rotation
        gsap.from('.project-card-cinematic', {
            rotateY: 90,
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            stagger: {
                each: 0.15,
                from: 'start',
                ease: 'power2.out'
            },
            scrollTrigger: {
                trigger: '#projects-cinematic',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Social cards with bounce effect
        gsap.from('.social-card', {
            y: 100,
            opacity: 0,
            scale: 0,
            rotation: 180,
            duration: 1,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: '#hall-of-art',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Parallax text
        gsap.to('.hero-title-cinematic', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero-cinematic',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const nextLevel = new NextLevelExperience();
        
        // Initialize advanced GSAP animations after a delay
        setTimeout(() => {
            nextLevel.initAdvancedGSAPAnimations();
        }, 500);
        
        // Store globally
        window.nextLevelExp = nextLevel;
    }, 100);
});

// Export
window.NextLevelExperience = NextLevelExperience;
