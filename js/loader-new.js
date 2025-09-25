// Progressive Content Loading System
class ProgressiveLoader {
    constructor() {
        console.log('ProgressiveLoader constructor called');
        window.loaderInitialized = true;
        
        this.loader = document.getElementById('loader');
        this.loadingOverlay = document.querySelector('.loading-overlay');
        this.contentContainer = document.querySelector('.loading-content-container');
        this.percentageElement = document.querySelector('.loading-percentage');
        this.progressBar = document.querySelector('.progress-bar');
        this.messages = document.querySelectorAll('.message');
        this.loadingElements = document.querySelectorAll('.loading-element');
        this.skipButton = document.getElementById('skip-loader');
        
        this.progress = 0;
        this.duration = 10000; // 10 seconds
        this.currentMessageIndex = 0;
        this.messageInterval = null;
        this.progressInterval = null;
        this.isSkipped = false;
        this.revealThresholds = [10, 30, 50, 70, 90]; // Progress points to reveal elements
        
        this.init();
    }
    
    init() {
        console.log('Progressive Loader - Starting...');
        console.log('Loader element:', this.loader);
        console.log('Loading overlay:', this.loadingOverlay);
        console.log('Content container:', this.contentContainer);
        console.log('Progress bar:', this.progressBar);
        console.log('Loading elements:', this.loadingElements);
        
        // Ensure loader is visible
        if (this.loader) {
            this.loader.style.display = 'flex';
            this.loader.style.opacity = '1';
            this.loader.style.visibility = 'visible';
            this.loader.style.zIndex = '9999';
        }
        
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Start loading animation
        this.startProgress();
        this.startMessageRotation();
        
        // Skip button functionality
        if (this.skipButton) {
            this.skipButton.addEventListener('click', () => this.skipLoader());
        }
        
        // Prevent scrolling during loading
        this.preventScroll();
        
        // Initialize content visibility
        this.initializeContentVisibility();
    }
    
    initializeContentVisibility() {
        if (!this.contentContainer) return;
        
        // Start with content container slightly visible
        this.contentContainer.style.opacity = '0.1';
        this.contentContainer.style.transform = 'scale(0.95)';
        
        // Hide all loading elements initially
        this.loadingElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
        });
    }
    
    startProgress() {
        const startTime = Date.now();
        
        this.progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            this.progress = Math.min((elapsed / this.duration) * 100, 100);
            
            this.updateProgress();
            this.revealContentProgressively();
            
            if (this.progress >= 100) {
                this.completeLoading();
            }
        }, 16); // ~60fps
    }
    
    updateProgress() {
        // Update percentage text
        if (this.percentageElement) {
            this.percentageElement.textContent = `${Math.floor(this.progress)}%`;
            console.log('Progress updated:', Math.floor(this.progress) + '%');
        }
        
        // Update progress bar
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
        }
        
        // Gradually make content more visible as progress increases
        if (this.contentContainer) {
            const contentOpacity = Math.min(0.1 + (this.progress / 100) * 0.9, 1);
            const contentScale = 0.95 + (this.progress / 100) * 0.05;
            
            this.contentContainer.style.opacity = contentOpacity;
            this.contentContainer.style.transform = `scale(${contentScale})`;
            
            if (this.progress % 20 === 0) {
                console.log('Content opacity:', contentOpacity, 'Scale:', contentScale);
            }
        }
    }
    
    revealContentProgressively() {
        // Reveal elements based on progress thresholds
        this.loadingElements.forEach((element, index) => {
            const threshold = element.dataset.loadProgress || this.revealThresholds[index] || (index + 1) * 20;
            
            if (this.progress >= threshold && !element.classList.contains('revealed')) {
                element.classList.add('revealed');
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200); // Stagger the reveals
            }
        });
    }
    
    startMessageRotation() {
        if (this.messages.length === 0) return;
        
        this.messageInterval = setInterval(() => {
            // Hide current message
            this.messages[this.currentMessageIndex].classList.remove('active');
            
            // Show next message
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
            this.messages[this.currentMessageIndex].classList.add('active');
        }, 1666); // Change every ~1.67 seconds for 6 messages in 10 seconds
    }
    
    completeLoading() {
        if (this.isSkipped) return;
        
        // Clear intervals
        clearInterval(this.progressInterval);
        clearInterval(this.messageInterval);
        
        // Final progress state
        this.progress = 100;
        this.updateProgress();
        if (this.percentageElement) this.percentageElement.textContent = '100%';
        if (this.progressBar) this.progressBar.style.width = '100%';
        
        // Reveal all remaining elements
        this.loadingElements.forEach((element, index) => {
            if (!element.classList.contains('revealed')) {
                element.classList.add('revealed');
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        // Show completion message
        if (this.messages.length > 0) {
            this.messages.forEach(msg => msg.classList.remove('active'));
            this.messages[this.messages.length - 1].classList.add('active');
        }
        
        // Complete the loading
        setTimeout(() => {
            this.hideLoader();
        }, 1000);
    }
    
    skipLoader() {
        this.isSkipped = true;
        
        // Clear intervals
        clearInterval(this.progressInterval);
        clearInterval(this.messageInterval);
        
        // Instantly complete progress
        this.progress = 100;
        this.updateProgress();
        if (this.percentageElement) this.percentageElement.textContent = '100%';
        if (this.progressBar) this.progressBar.style.width = '100%';
        
        // Instantly reveal all content
        if (this.contentContainer) {
            this.contentContainer.style.opacity = '1';
            this.contentContainer.style.transform = 'scale(1)';
        }
        
        this.loadingElements.forEach(element => {
            element.classList.add('revealed');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
        
        // Hide loader quickly
        setTimeout(() => {
            this.hideLoader();
        }, 300);
    }
    
    hideLoader() {
        // Remove loading class from body
        document.body.classList.remove('loading');
        
        // Enable scrolling
        this.enableScroll();
        
        // Mark loader as loaded
        if (this.loader) {
            this.loader.classList.add('loaded');
        }
        
        // Move content from loader to body before removing loader
        if (this.contentContainer) {
            // Make content fully visible and add class to maintain visibility
            this.contentContainer.style.opacity = '1';
            this.contentContainer.style.transform = 'scale(1)';
            this.contentContainer.style.position = 'relative';
            this.contentContainer.style.zIndex = '1';
            this.contentContainer.classList.add('moved-to-body');
            
            // Move content to body (before the loader)
            document.body.insertBefore(this.contentContainer, this.loader);
            
            // Ensure content is properly positioned
            const header = this.contentContainer.querySelector('#header');
            const hero = this.contentContainer.querySelector('.hero');
            
            if (header) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.left = '0';
                header.style.width = '100%';
                header.style.zIndex = '1000';
                header.style.opacity = '1';
                header.style.visibility = 'visible';
                header.style.display = 'block';
            }
            
            if (hero) {
                hero.style.opacity = '1';
                hero.style.visibility = 'visible';
                hero.style.height = '100vh';
                hero.style.minHeight = '100vh';
                hero.style.marginTop = '0';
                hero.style.paddingTop = '0';
                hero.style.display = 'block';
                hero.style.position = 'relative';
            }
            
            console.log('Content moved to body and positioned correctly');
        }
        
        // Force scroll to top
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Remove loading overlay first
        setTimeout(() => {
            if (this.loadingOverlay) {
                this.loadingOverlay.remove();
            }
        }, 500);
        
        // Remove entire loader after content is moved
        setTimeout(() => {
            if (this.loader && this.loader.parentNode) {
                this.loader.remove();
            }
            console.log('Loader removed - content should now be visible');
        }, 1000);
    }
    
    preventScroll() {
        // Disable scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // Prevent scroll events
        document.addEventListener('wheel', this.preventScrollEvent, { passive: false });
        document.addEventListener('touchmove', this.preventScrollEvent, { passive: false });
        document.addEventListener('keydown', this.preventScrollKeys, { passive: false });
    }
    
    enableScroll() {
        // Re-enable scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Remove event listeners
        document.removeEventListener('wheel', this.preventScrollEvent, { passive: false });
        document.removeEventListener('touchmove', this.preventScrollEvent, { passive: false });
        document.removeEventListener('keydown', this.preventScrollKeys, { passive: false });
    }
    
    preventScrollEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    preventScrollKeys(e) {
        const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, page up/down, end, home, arrows
        if (keys.includes(e.keyCode)) {
            e.preventDefault();
            return false;
        }
    }
}

// Immediate initialization - force loader to start
console.log('Loader script loaded');

// Force loader visibility immediately
const forceShowLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
        loader.style.visibility = 'visible';
        loader.style.zIndex = '9999';
        console.log('Loader forced to be visible');
    }
};

// Try to show loader immediately
forceShowLoader();

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Ready - Progressive Loader - Initializing...');
    forceShowLoader();
    setTimeout(() => {
        new ProgressiveLoader();
    }, 100);
});

// Backup initialization for different ready states
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document loading - initializing loader');
        forceShowLoader();
        new ProgressiveLoader();
    });
} else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log('Document already ready - initializing loader immediately');
    forceShowLoader();
    new ProgressiveLoader();
}

// Final fallback
setTimeout(() => {
    console.log('Fallback initialization after 500ms');
    forceShowLoader();
    if (!window.loaderInitialized) {
        new ProgressiveLoader();
        window.loaderInitialized = true;
    }
}, 500);