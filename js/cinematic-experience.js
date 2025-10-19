/**
 * CINEMATIC PORTFOLIO ANIMATIONS
 * Next-level interactions inspired by award-winning sites
 */

class CinematicExperience {
    constructor() {
        this.sections = [];
        this.currentSection = 0;
        this.isAnimating = false;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.setupSections();
        this.setupCustomCursor();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        this.setupParallaxEffects();
        this.setupSocialCards();
        
        console.log('🎬 Cinematic experience initialized');
    }
    
    setupSections() {
        this.sections = document.querySelectorAll('.cinematic-section');
        
        // Observe sections for entrance animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.animateSectionEntrance(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        this.sections.forEach(section => {
            section.classList.add('section-transition');
            observer.observe(section);
        });
    }
    
    animateSectionEntrance(section) {
        if (typeof gsap === 'undefined') return;
        
        const title = section.querySelector('h1, h2');
        const content = section.querySelectorAll('p, .project-card-cinematic, .social-card');
        
        if (title) {
            gsap.from(title, {
                duration: 1.2,
                y: 100,
                opacity: 0,
                ease: 'power4.out'
            });
        }
        
        if (content.length > 0) {
            gsap.from(content, {
                duration: 1,
                y: 80,
                opacity: 0,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3
            });
        }
    }
    
    setupCustomCursor() {
        // Create custom cursor elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const follower = document.createElement('div');
        follower.className = 'custom-cursor-follower';
        document.body.appendChild(follower);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Smooth cursor follow animation
        const animateCursor = () => {
            // Cursor follows immediately
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Follower has delay
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        
        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card-cinematic, .social-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                follower.style.transform = 'scale(2)';
                cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }
    
    setupScrollAnimations() {
        if (typeof gsap === 'undefined' || !gsap.registerPlugin) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section parallax
        gsap.to('#hero-cinematic .hero-cinematic-content', {
            y: -100,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero-cinematic',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
        
        // About section reveal
        gsap.from('.about-split-layout', {
            opacity: 0,
            x: -100,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#about-cinematic',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Project cards stagger
        gsap.from('.project-card-cinematic', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#projects-cinematic',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Social cards reveal
        gsap.from('.social-card', {
            rotateY: 90,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#hall-of-art',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    setupInteractiveElements() {
        // Project cards 3D tilt effect
        const projectCards = document.querySelectorAll('.project-card-cinematic');
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    translateY(-20px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });
        
        // Image parallax on scroll
        const images = document.querySelectorAll('.about-image-3d, .project-image-cinematic');
        images.forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                
                img.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
    
    setupParallaxEffects() {
        // Parallax backgrounds
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('.cinematic-bg').forEach((bg, index) => {
                const speed = 0.5 + (index * 0.1);
                bg.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    setupSocialCards() {
        const socialCards = document.querySelectorAll('.social-card');
        
        socialCards.forEach(card => {
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 5;
                const rotateY = (centerX - x) / 5;
                
                card.style.transform = `
                    translateY(-20px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale(1.05)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
            
            // Click animation
            card.addEventListener('click', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        scale: 0.95,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power2.inOut'
                    });
                }
            });
        });
    }
    
    // Smooth scroll to section
    scrollToSection(index) {
        if (index >= 0 && index < this.sections.length && !this.isAnimating) {
            this.isAnimating = true;
            this.currentSection = index;
            
            this.sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 1000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading screen to complete
    setTimeout(() => {
        window.cinematicExp = new CinematicExperience();
    }, 100);
});

// Also initialize if DOM is already loaded
if (document.readyState !== 'loading') {
    setTimeout(() => {
        window.cinematicExp = new CinematicExperience();
    }, 100);
}

// Export for manual usage
window.CinematicExperience = CinematicExperience;
