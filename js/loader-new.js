// ===========================================
// PREMIUM LOADING SCREEN - MODERN CSS APPROACH
// ===========================================

function initLoaderAnimation() {
    console.log('Premium Loader v2.0 - Starting...');
    
    const loader = document.getElementById('loader');
    const percentageElement = document.querySelector('.loading-percentage');
    const progressBar = document.querySelector('.progress-bar');
    const messages = document.querySelectorAll('.message');
    const skipLoader = document.getElementById('skip-loader');
    const canvas = document.getElementById('loader-canvas');
    
    // Hide canvas - using pure CSS animations
    if (canvas) {
        canvas.style.display = 'none';
    }
    
    // Ensure loader visibility
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.add('active');
    } else {
        console.error('Loader element not found!');
        return;
    }
    
    let progress = 0;
    let currentMessageIndex = 0;
    let animationId;
    
    // Premium loading messages
    const loadingMessages = [
        "Initializing experience...",
        "Loading creative assets...", 
        "Preparing portfolio...",
        "Optimizing performance...",
        "Almost ready...",
        "Welcome! ✨"
    ];
    
    // Initialize progress display
    if (percentageElement) {
        percentageElement.textContent = '0%';
    }
    
    // Message cycling function
    function updateMessage() {
        messages.forEach(msg => msg.classList.remove('active'));
        if (messages[currentMessageIndex]) {
            messages[currentMessageIndex].textContent = loadingMessages[currentMessageIndex];
            messages[currentMessageIndex].classList.add('active');
        }
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
    }
    
    // Start message cycling
    updateMessage();
    const messageInterval = setInterval(updateMessage, 800);
    
    // Modern loading progress - smooth and fast
    const loadingSteps = [
        { duration: 800, end: 25 },
        { duration: 600, end: 50 },
        { duration: 500, end: 75 },
        { duration: 400, end: 95 },
        { duration: 300, end: 100 }
    ];
    
    let currentStep = 0;
    let stepStartTime = Date.now();
    let stepStartProgress = 0;
    
    function updateProgress() {
        const currentTime = Date.now();
        const step = loadingSteps[currentStep];
        
        if (!step) {
            clearInterval(messageInterval);
            // Final message
            messages.forEach(msg => msg.classList.remove('active'));
            if (messages[0]) {
                messages[0].textContent = "Welcome to the Digital Realm! ✨";
                messages[0].classList.add('active');
            }
            // Complete loading
            setTimeout(() => completeLoading(), 200);
            return;
        }
        
        const stepElapsed = currentTime - stepStartTime;
        const stepProgress = Math.min(stepElapsed / step.duration, 1);
        
        // Smooth easing
        const easedProgress = stepProgress < 0.5 
            ? 2 * stepProgress * stepProgress 
            : 1 - Math.pow(-2 * stepProgress + 2, 3) / 2;
        
        progress = stepStartProgress + (step.end - stepStartProgress) * easedProgress;
        
        // Update UI with smooth animations
        if (percentageElement) {
            const displayProgress = Math.floor(progress);
            percentageElement.textContent = displayProgress + '%';
            
            // Add milestone effects
            if (displayProgress % 25 === 0 && displayProgress > 0) {
                percentageElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    percentageElement.style.transform = 'scale(1)';
                }, 200);
            }
        }
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (stepProgress >= 1) {
            currentStep++;
            stepStartTime = currentTime;
            stepStartProgress = progress;
        }
        
        if (currentStep < loadingSteps.length) {
            animationId = requestAnimationFrame(updateProgress);
        } else {
            clearInterval(messageInterval);
            setTimeout(() => completeLoading(), 200);
        }
    }
    
    // Skip loader functionality
    if (skipLoader) {
        skipLoader.addEventListener('click', () => {
            console.log('Skip loader clicked');
            clearInterval(messageInterval);
            if (animationId) cancelAnimationFrame(animationId);
            progress = 100;
            if (percentageElement) percentageElement.textContent = '100%';
            if (progressBar) progressBar.style.width = '100%';
            completeLoading();
        });
    }
    
    // Start progress animation
    updateProgress();
}

function completeLoading() {
    console.log('Loading complete - transitioning to main site');
    
    const loader = document.getElementById('loader');
    
    // Initialize main site first
    if (typeof initMainSite === 'function') {
        initMainSite();
    }
    
    // Smooth fade out
    if (typeof gsap !== 'undefined') {
        gsap.to('#loader', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                if (loader) {
                    loader.style.display = 'none';
                }
                document.body.classList.add('loaded');
                document.body.style.overflow = 'auto';
                console.log('Site loaded successfully');
            }
        });
    } else {
        // Fallback without GSAP
        if (loader) {
            loader.style.transition = 'opacity 0.6s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
                document.body.style.overflow = 'auto';
                console.log('Site loaded successfully (fallback)');
            }, 600);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Setting up premium loader');
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.visibility = 'visible';
        loader.style.opacity = '1';
        document.body.classList.remove('loaded');
    }
});

// Start complete sequence
window.addEventListener('load', () => {
    console.log('Page fully loaded - Starting premium sequence');
    
    // Fallback timeout
    const fallbackTimeout = setTimeout(() => {
        console.log('Loading fallback triggered');
        completeLoading();
    }, 10000);
    
    // Clear fallback when complete
    window.addEventListener('loaderComplete', () => {
        clearTimeout(fallbackTimeout);
    });
    
    // Dispatch complete event
    function dispatchComplete() {
        window.dispatchEvent(new CustomEvent('loaderComplete'));
    }
    
    // Start welcome sequence
    setTimeout(() => {
        startWelcomeSequence();
    }, 500);
});

// Welcome sequence (simplified)
function startWelcomeSequence() {
    console.log('Starting welcome sequence');
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const loader = document.getElementById('loader');
    const skipIntro = document.getElementById('skip-intro');
    
    // Ensure proper display
    if (welcomeScreen) welcomeScreen.style.display = 'flex';
    if (loader) loader.style.display = 'flex';
    
    // Skip functionality
    if (skipIntro) {
        skipIntro.addEventListener('click', () => {
            console.log('Skip intro clicked');
            if (welcomeScreen) welcomeScreen.style.display = 'none';
            initLoaderAnimation();
        });
    }
    
    // Auto transition after welcome
    setTimeout(() => {
        console.log('Transitioning to loader');
        
        if (welcomeScreen) {
            welcomeScreen.classList.add('fade-out');
        }
        
        setTimeout(() => {
            if (welcomeScreen) welcomeScreen.style.display = 'none';
            initLoaderAnimation();
        }, 800);
        
    }, 3000);
}