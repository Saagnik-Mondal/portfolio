/**
 * Simple, Reliable Loading Screen
 */
class SimpleLoader {
    constructor() {
        this.progress = 0;
        this.isComplete = false;
        this.duration = 4000; // 4 seconds
        
        this.init();
    }
    
    init() {
        this.createLoader();
        this.startLoading();
        this.setupSkipHandlers();
    }
    
    createLoader() {
        // Create loading screen HTML
        const loaderHTML = `
            <div id="loading-screen">
                <div class="loader-content">
                    <h1 class="loader-title">SAAGNIK MONDAL</h1>
                    <p class="loader-subtitle">Digital Artist Portfolio</p>
                    
                    <div class="progress-container">
                        <div class="progress-bar" id="progress-bar"></div>
                    </div>
                    
                    <div class="loading-percent" id="loading-percent">0%</div>
                    <div class="loading-status" id="loading-status">Initializing...</div>
                </div>
            </div>
        `;
        
        // Insert at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Ensure we start at the top
        window.scrollTo(0, 0);
    }
    
    startLoading() {
        const progressBar = document.getElementById('progress-bar');
        const percentElement = document.getElementById('loading-percent');
        const statusElement = document.getElementById('loading-status');
        
        const statuses = [
            "Initializing...",
            "Loading assets...",
            "Preparing interface...",
            "Almost ready...",
            "Complete!"
        ];
        
        const startTime = Date.now();
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / this.duration) * 100, 100);
            
            // Update progress bar and percentage
            progressBar.style.width = progress + '%';
            percentElement.textContent = Math.floor(progress) + '%';
            
            // Update status based on progress
            const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
            statusElement.textContent = statuses[statusIndex];
            
            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                this.completeLoading();
            }
        };
        
        // Start the progress animation
        requestAnimationFrame(updateProgress);
    }
    
    completeLoading() {
        this.isComplete = true;
        
        // Wait a moment then fade out
        setTimeout(() => {
            this.fadeOut();
        }, 500);
    }
    
    fadeOut() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            
            // Remove loading screen and restore normal state
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
                
                // Remove loading class
                document.body.classList.remove('loading');
                
                // Initialize main site functionality
                this.initMainSite();
                
            }, 1000);
        }
    }
    
    initMainSite() {
        // Initialize other portfolio functionality
        if (typeof initMainSite === 'function') {
            initMainSite();
        }
        
        console.log('Portfolio loaded successfully!');
    }
    
    setupSkipHandlers() {
        // Allow skipping with Enter, Space, or Escape
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') && !this.isComplete) {
                this.skip();
            }
        });
        
        // Allow clicking to skip
        document.addEventListener('click', (e) => {
            if (e.target.closest('#loading-screen') && !this.isComplete) {
                this.skip();
            }
        });
    }
    
    skip() {
        if (!this.isComplete) {
            this.completeLoading();
        }
    }
}

// Initialize immediately when script loads
window.addEventListener('DOMContentLoaded', () => {
    new SimpleLoader();
});

// Also initialize if DOM is already ready
if (document.readyState !== 'loading') {
    new SimpleLoader();
}