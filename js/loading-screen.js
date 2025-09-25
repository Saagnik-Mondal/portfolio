/**
 * Loading Screen with DecryptedText Effect
 */
class LoadingScreen {
    constructor(options = {}) {
        this.options = {
            duration: 5000, // 5 seconds
            steps: [
                { text: "INITIALIZING SYSTEM", delay: 0 },
                { text: "LOADING PORTFOLIO", delay: 1000 },
                { text: "DECRYPTING FILES", delay: 2000 },
                { text: "PREPARING INTERFACE", delay: 3000 },
                { text: "ALMOST READY", delay: 4000 }
            ],
            onComplete: null,
            ...options
        };
        
        this.currentStep = 0;
        this.progress = 0;
        this.isComplete = false;
        this.decryptedTexts = [];
        
        this.init();
    }

    init() {
        try {
            console.log('Initializing loading screen...');
            this.createLoadingScreen();
            this.startLoading();
            this.createMatrixEffect();
            console.log('Loading screen initialized successfully');
        } catch (error) {
            console.error('Error during loading screen initialization:', error);
            this.handleError(error);
        }
    }

    handleError(error) {
        console.error('Loading screen error:', error);
        
        // Remove loading state to prevent infinite loading
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('loading');
        document.body.style.overflow = '';
        document.body.style.position = '';
        
        // Try to remove any partial loading screen
        const existingScreen = document.getElementById('loadingScreen');
        if (existingScreen && existingScreen.parentNode) {
            existingScreen.parentNode.removeChild(existingScreen);
        }
        
        // Call completion callback even in error state
        if (this.options.onComplete && typeof this.options.onComplete === 'function') {
            try {
                this.options.onComplete();
            } catch (callbackError) {
                console.error('Error in completion callback:', callbackError);
            }
        }
    }

    createLoadingScreen() {
        try {
            console.log('Creating loading screen HTML...');
            
            // Ensure we start at top
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Check if loading screen already exists
            if (document.getElementById('loadingScreen')) {
                console.log('Loading screen already exists, skipping creation');
                return;
            }
            
            // Create loading screen HTML
            const loadingHTML = `
                <div class="loading-screen" id="loadingScreen" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999;">
                    <div class="matrix-bg" id="matrixBg"></div>
                    <div class="loading-content">
                        <h1 class="loading-title" 
                            data-decrypt
                            data-text="SAAGNIK MONDAL"
                            data-animate-on="immediate"
                            data-speed="80"
                            data-max-iterations="15"
                            data-reveal-direction="center">
                            SAAGNIK MONDAL
                        </h1>
                        
                        <p class="loading-subtitle"
                           data-decrypt
                           data-text="DIGITAL ARTIST & DEVELOPER"
                           data-animate-on="view"
                           data-speed="60"
                           data-sequential="true"
                           data-reveal-direction="start">
                            DIGITAL ARTIST & DEVELOPER
                        </p>
                        
                        <div class="loading-progress">
                            <div class="loading-progress-fill" id="progressFill"></div>
                        </div>
                        
                        <div class="loading-percentage" id="loadingPercentage">0%</div>
                        
                        <div class="loading-status"
                             data-decrypt
                             data-text="INITIALIZING SYSTEM"
                             data-animate-on="immediate"
                             data-speed="50"
                             data-max-iterations="8"
                             id="loadingStatus">
                            INITIALIZING SYSTEM
                        </div>
                        
                        <span class="terminal-cursor"></span>
                    </div>
                </div>
            `;

            // Add to body at the very beginning
            document.body.insertAdjacentHTML('afterbegin', loadingHTML);
            console.log('Loading screen HTML inserted');
            
            // Add loading class to body and ensure we start at top
            document.body.classList.add('loading');
            document.documentElement.classList.add('loading');
            
            // Force scroll to top multiple times
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Force loading screen to be visible
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
                loadingScreen.style.position = 'fixed';
                loadingScreen.style.top = '0';
                loadingScreen.style.left = '0';
                loadingScreen.style.width = '100vw';
                loadingScreen.style.height = '100vh';
                loadingScreen.style.zIndex = '99999';
                console.log('Loading screen styles applied');
                
                // Initialize DecryptedText for elements with data-decrypt
                setTimeout(() => {
                    try {
                        const decryptElements = loadingScreen.querySelectorAll('[data-decrypt]');
                        decryptElements.forEach(element => {
                            if (typeof DecryptedText !== 'undefined') {
                                new DecryptedText(element);
                            } else {
                                console.warn('DecryptedText class not available');
                            }
                        });
                    } catch (decryptError) {
                        console.warn('Error initializing DecryptedText:', decryptError);
                    }
                }, 100);
            } else {
                throw new Error('Failed to create loading screen element');
            }
            
        } catch (error) {
            console.error('Error creating loading screen:', error);
            throw error;
        }
    }

    createMatrixEffect() {
        try {
            const matrixBg = document.getElementById('matrixBg');
            if (!matrixBg) {
                console.warn('Matrix background element not found, skipping matrix effect');
                return;
            }
            
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            
            const createMatrixChar = () => {
                try {
                    const char = document.createElement('div');
                    char.className = 'matrix-char';
                    char.textContent = chars[Math.floor(Math.random() * chars.length)];
                    char.style.left = Math.random() * 100 + '%';
                    char.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    char.style.animationDelay = Math.random() * 2 + 's';
                    
                    if (matrixBg && matrixBg.appendChild) {
                        matrixBg.appendChild(char);
                        
                        // Remove char after animation
                        setTimeout(() => {
                            if (char.parentNode) {
                                char.parentNode.removeChild(char);
                            }
                        }, 5000);
                    }
                } catch (charError) {
                    console.warn('Error creating matrix character:', charError);
                }
            };

            // Create matrix chars periodically
            this.matrixInterval = setInterval(createMatrixChar, 200);
            console.log('Matrix effect initialized');
            
        } catch (error) {
            console.warn('Error creating matrix effect:', error);
        }
    }

    startLoading() {
        const progressFill = document.getElementById('progressFill');
        const percentageElement = document.getElementById('loadingPercentage');
        const statusElement = document.getElementById('loadingStatus');
        
        const startTime = Date.now();
        const duration = this.options.duration;
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            // Update progress bar
            progressFill.style.width = progress + '%';
            percentageElement.textContent = Math.floor(progress) + '%';
            
            // Update status based on progress
            this.updateStatus(progress, statusElement);
            
            // Add glitch effect at certain percentages
            if ([25, 50, 75, 90].includes(Math.floor(progress))) {
                document.querySelector('.loading-content').classList.add('glitch');
                setTimeout(() => {
                    document.querySelector('.loading-content').classList.remove('glitch');
                }, 300);
            }
            
            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                this.completeLoading();
            }
        };
        
        // Start progress animation
        setTimeout(() => {
            requestAnimationFrame(updateProgress);
        }, 500);
    }

    updateStatus(progress, statusElement) {
        const steps = this.options.steps;
        let newStep = Math.floor((progress / 100) * steps.length);
        newStep = Math.min(newStep, steps.length - 1);
        
        if (newStep !== this.currentStep && steps[newStep]) {
            this.currentStep = newStep;
            const newText = steps[newStep].text;
            
            // Update the text and trigger new decryption
            statusElement.textContent = newText;
            statusElement.setAttribute('data-text', newText);
            
            // Create new DecryptedText instance for the updated status
            setTimeout(() => {
                new DecryptedText(statusElement, {
                    speed: 50,
                    maxIterations: 8,
                    animateOn: 'immediate'
                });
            }, 100);
        }
    }

    completeLoading() {
        this.isComplete = true;
        
        // Stop matrix effect
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
        }
        
        // Final status update
        const statusElement = document.getElementById('loadingStatus');
        statusElement.textContent = 'ACCESS GRANTED';
        statusElement.setAttribute('data-text', 'ACCESS GRANTED');
        
        new DecryptedText(statusElement, {
            speed: 30,
            maxIterations: 12,
            animateOn: 'immediate',
            revealDirection: 'center'
        });
        
        // Wait a moment then fade out
        setTimeout(() => {
            this.fadeOut();
        }, 1000);
    }

    fadeOut() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen and restore normal state
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
            
            // Remove loading class and restore normal scrolling
            document.body.classList.remove('loading');
            document.documentElement.classList.remove('loading');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            
            // Ensure page starts at top after loading
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Call completion callback
            if (this.options.onComplete && typeof this.options.onComplete === 'function') {
                this.options.onComplete();
            }
        }, 1000);
    }

    // Public method to skip loading
    skip() {
        if (!this.isComplete) {
            this.completeLoading();
        }
    }
}

// Initialize loading screen IMMEDIATELY - don't wait for DOM
let globalLoadingScreen = null;

// Create loading screen as soon as this script loads
(function() {
    try {
        console.log('Loading screen script starting...');
        
        // Create loading screen immediately
        globalLoadingScreen = new LoadingScreen({
            duration: 5000,
            onComplete: () => {
                console.log('Loading completed - Portfolio ready!');
                // Initialize GSAP animations if available
                if (typeof startGSAPAnimations === 'function') {
                    startGSAPAnimations();
                }
                // Initialize main site functionality
                if (typeof initMainSite === 'function') {
                    initMainSite();
                }
            }
        });
        
        console.log('Loading screen created successfully');
        
        // Set up skip functionality immediately
        const setupSkipHandlers = () => {
            console.log('Setting up loading screen skip handlers');
            
            // Allow users to skip loading by pressing any key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                    console.log('Skip key pressed:', e.key);
                    if (globalLoadingScreen && !globalLoadingScreen.isComplete) {
                        globalLoadingScreen.skip();
                    }
                }
            });
            
            // Allow clicking to skip
            document.addEventListener('click', (e) => {
                if (e.target.closest('.loading-screen')) {
                    console.log('Loading screen clicked - skipping');
                    if (globalLoadingScreen && !globalLoadingScreen.isComplete) {
                        globalLoadingScreen.skip();
                    }
                }
            });
        };
        
        // Setup handlers immediately or when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupSkipHandlers);
        } else {
            setupSkipHandlers();
        }
        
    } catch (error) {
        console.error('Critical error in loading screen initialization:', error);
        
        // Fallback - remove loading class to prevent infinite loading
        setTimeout(() => {
            console.log('Fallback: Removing loading class due to error');
            document.body.classList.remove('loading');
            document.documentElement.classList.remove('loading');
            document.body.style.overflow = '';
            document.body.style.position = '';
            
            // Try to initialize main site functionality
            if (typeof initMainSite === 'function') {
                try {
                    initMainSite();
                } catch (mainError) {
                    console.error('Error initializing main site:', mainError);
                }
            }
        }, 1000);
    }
})();

// Export for manual usage
window.LoadingScreen = LoadingScreen;