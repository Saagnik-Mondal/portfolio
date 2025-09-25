// ===========================================
// AWWWARDS-LEVEL EFFECTS & INTERACTIONS
// ===========================================

class AwwwardsEffects {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.magneticElements = [];
        this.parallaxElements = [];
        this.init();
    }

    init() {
        this.setupMouseTracking();
        this.setupMagneticEffects();
        this.setupSmoothScroll();
        this.setupParallaxEffects();
        this.setupAdvancedCursor();
        this.setupTextAnimations();
        this.setupSectionTransitions();
        this.setupSmoothNavigation();
        console.log('🌟 Awwwards-level effects initialized');
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Update CSS custom properties for advanced effects
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }

    setupMagneticEffects() {
        // Enhanced magnetic effect for buttons and links
        const magneticElements = document.querySelectorAll('.magnetic, button, .hero__cta, .contact__link, .nav-links a');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('magnetic-active');
            });

            element.addEventListener('mouseleave', () => {
                element.classList.remove('magnetic-active');
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });

            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupSmoothScroll() {
        // Smooth scroll with momentum
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
            
            // Custom smooth scroll
            const smoothScroll = {
                current: 0,
                target: 0,
                ease: 0.08,
                
                init() {
                    document.body.style.height = document.body.scrollHeight + 'px';
                    this.bindEvents();
                    this.render();
                },
                
                bindEvents() {
                    window.addEventListener('scroll', () => {
                        this.target = window.scrollY;
                    });
                },
                
                render() {
                    this.current += (this.target - this.current) * this.ease;
                    
                    // Apply transform to main content
                    const mainContent = document.querySelector('.main-content') || document.body;
                    if (mainContent) {
                        gsap.set(mainContent, {
                            y: -this.current
                        });
                    }
                    
                    requestAnimationFrame(() => this.render());
                }
            };
            
            // Initialize smooth scroll (optional - can be resource intensive)
            // smoothScroll.init();
        }
    }

    setupParallaxEffects() {
        if (!gsap.plugins.ScrollTrigger) {
            console.warn('ScrollTrigger plugin not loaded - parallax effects disabled');
            return;
        }

        // Background parallax
        const parallaxBgs = document.querySelectorAll('.hero__bg-image, .parallax-bg');
        parallaxBgs.forEach(bg => {
            gsap.to(bg, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: bg,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // Text parallax
        const parallaxTexts = document.querySelectorAll('.hero__title, .section__title');
        parallaxTexts.forEach(text => {
            gsap.to(text, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: text,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // Floating elements
        const floatingElements = document.querySelectorAll('.floating-element, .about__slider-container');
        floatingElements.forEach(element => {
            gsap.to(element, {
                y: -50,
                rotation: 5,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                }
            });
        });
    }

    setupAdvancedCursor() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;

        // Enhanced cursor with trail effect
        const cursorTrail = [];
        const trailLength = 8;

        // Create cursor trail elements
        for (let i = 0; i < trailLength; i++) {
            const trail = document.createElement('div');
            trail.className = `cursor-trail cursor-trail-${i}`;
            trail.style.cssText = `
                position: fixed;
                width: ${24 - i * 2}px;
                height: ${24 - i * 2}px;
                border-radius: 50%;
                background: rgba(74, 158, 255, ${0.3 - i * 0.03});
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                opacity: 0;
            `;
            document.body.appendChild(trail);
            cursorTrail.push(trail);
        }

        let trailIndex = 0;
        document.addEventListener('mousemove', (e) => {
            // Update trail
            cursorTrail.forEach((trail, index) => {
                setTimeout(() => {
                    trail.style.left = e.clientX + 'px';
                    trail.style.top = e.clientY + 'px';
                    trail.style.opacity = '1';
                }, index * 20);
            });
        });

        // Cursor morph on different elements
        const morphElements = {
            'a, button': { scale: 2, blend: 'difference' },
            '.hero__bg-image': { scale: 3, blend: 'multiply' },
            'h1, h2': { scale: 4, blend: 'exclusion' }
        };

        Object.keys(morphElements).forEach(selector => {
            const elements = document.querySelectorAll(selector);
            const config = morphElements[selector];
            
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(cursor, {
                        scale: config.scale,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    cursor.style.mixBlendMode = config.blend;
                });
                
                element.addEventListener('mouseleave', () => {
                    gsap.to(cursor, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    cursor.style.mixBlendMode = 'normal';
                });
            });
        });
    }

    setupTextAnimations() {
        // Split text into characters for advanced animations
        const animatedTexts = document.querySelectorAll('.hero__title, .section__title, .animated-text');
        
        animatedTexts.forEach(text => {
            if (text.dataset.animated) return; // Prevent double initialization
            text.dataset.animated = 'true';
            
            const originalText = text.textContent;
            const chars = originalText.split('');
            
            text.innerHTML = chars.map(char => 
                char === ' ' ? ' ' : `<span class="char" style="display: inline-block;">${char}</span>`
            ).join('');
            
            const charElements = text.querySelectorAll('.char');
            
            // Stagger animation on scroll
            gsap.fromTo(charElements, {
                y: 50,
                opacity: 0,
                rotationX: -90
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: text,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });

            // Hover effect for individual characters
            charElements.forEach(char => {
                char.addEventListener('mouseenter', () => {
                    gsap.to(char, {
                        y: -10,
                        color: '#FF79C6',
                        scale: 1.2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                char.addEventListener('mouseleave', () => {
                    gsap.to(char, {
                        y: 0,
                        color: 'inherit',
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        });
    }

    setupSectionTransitions() {
        // Advanced section reveal animations
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach((section, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            
            // Initial state
            gsap.set(section, {
                opacity: 0,
                x: 100 * direction,
                rotationY: 15 * direction
            });
            
            // Animate in
            gsap.to(section, {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                    onEnter: () => {
                        // Add floating animation
                        gsap.to(section, {
                            y: -20,
                            duration: 2,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: -1
                        });
                    }
                }
            });
        });
    }

    // Method to add advanced hover effects to any element
    addAdvancedHover(element, options = {}) {
        const defaults = {
            scale: 1.05,
            rotate: 5,
            duration: 0.3,
            glowColor: '#FF79C6'
        };
        const config = { ...defaults, ...options };
        
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: config.scale,
                rotation: config.rotate,
                boxShadow: `0 20px 40px rgba(255, 121, 198, 0.3)`,
                duration: config.duration,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                rotation: 0,
                boxShadow: `0 0 0 rgba(255, 121, 198, 0)`,
                duration: config.duration,
                ease: "power2.out"
            });
        });
    }

    // Particle system for enhanced backgrounds
    createParticleSystem(container) {
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'awwwards-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(74, 158, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            particles.push(particle);
            
            // Animate particle
            gsap.set(particle, {
                x: Math.random() * container.offsetWidth,
                y: Math.random() * container.offsetHeight
            });
            
            gsap.to(particle, {
                x: Math.random() * container.offsetWidth,
                y: Math.random() * container.offsetHeight,
                duration: Math.random() * 20 + 10,
                ease: "none",
                repeat: -1,
                yoyo: true
            });
        }
        
        return particles;
    }

    // Smooth scroll navigation
    setupSmoothNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Fallback smooth scroll if ScrollTo plugin not available
                    if (gsap.plugins.ScrollToPlugin) {
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: {
                                y: targetSection,
                                offsetY: 80
                            },
                            ease: "power2.inOut"
                        });
                    } else {
                        // Native smooth scroll fallback
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        try {
            window.awwwardsEffects = new AwwwardsEffects();
        } catch (error) {
            console.error('Error initializing Awwwards effects:', error);
            // Fallback - at least enable basic interactions
            document.querySelectorAll('.magnetic').forEach(el => {
                el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.05)');
                el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
            });
        }
    } else {
        console.warn('GSAP not loaded - Awwwards effects disabled');
        // Basic fallback effects
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.05)');
            el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
        });
    }
});