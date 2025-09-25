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
        this.createLoadingScreen();
        this.startLoading();
        this.createMatrixEffect();
    }

    createLoadingScreen() {
        // Create loading screen HTML
        const loadingHTML = `
            <div class="loading-screen" id="loadingScreen">
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

        // Add to body
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    createMatrixEffect() {
        const matrixBg = document.getElementById('matrixBg');
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        const createMatrixChar = () => {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.animationDelay = Math.random() * 2 + 's';
            
            matrixBg.appendChild(char);
            
            // Remove char after animation
            setTimeout(() => {
                if (char.parentNode) {
                    char.parentNode.removeChild(char);
                }
            }, 5000);
        };

        // Create matrix chars periodically
        this.matrixInterval = setInterval(createMatrixChar, 200);
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
        
        // Remove loading screen and restore scrolling
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
            document.body.style.overflow = '';
            
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

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create loading screen
    const loadingScreen = new LoadingScreen({
        duration: 5000,
        onComplete: () => {
            console.log('Loading completed - Portfolio ready!');
            // Initialize any other portfolio functionality here
        }
    });
    
    // Allow users to skip loading by pressing any key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
            loadingScreen.skip();
        }
    });
    
    // Allow clicking to skip
    document.addEventListener('click', (e) => {
        if (e.target.closest('.loading-screen')) {
            loadingScreen.skip();
        }
    });
});

// Export for manual usage
window.LoadingScreen = LoadingScreen;