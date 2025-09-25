// ===========================================
// LOADING SCREEN FUNCTIONALITY
// ===========================================

function initLoaderAnimation() {
    console.log('Digital Canvas Awakening - Initializing...');
    
    const loader = document.getElementById('loader');
    const percentageElement = document.querySelector('.loading-percentage');
    const progressBar = document.querySelector('.progress-bar');
    const canvas = document.getElementById('loader-canvas');
    const messages = document.querySelectorAll('.message');
    
    // Create unique digital canvas background
    if (loader) {
        loader.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #0a0a0a !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
            opacity: 1 !important;
            visibility: visible !important;
            overflow: hidden !important;
        `;
    } else {
        console.error('Loader element not found!');
        return;
    }
    
    let progress = 0;
    let animationId;
    let currentMessageIndex = 0;
    let laserFlow = null;
    let lastMilestone = -1; // Track milestone achievements

    // Immediately show percentage updating for testing
    if (percentageElement) {
        percentageElement.textContent = '0%';
        console.log('Initial percentage set to 0%');
    }

    // Unique Digital Canvas Awakening Messages
    const canvasMessages = [
        "Stretching digital canvas...",
        "Mixing color palettes...", 
        "Loading creative brushes...",
        "Awakening artistic soul...",
        "Blending imagination layers...",
        "Finalizing masterpiece setup...",
        "Canvas ready for creation! ✨"
    ];

    // Initialize Digital Canvas Awakening Effect
    if (canvas) {
        console.log('Initializing Digital Canvas Awakening Effect');
        
        // Setup canvas for digital painting simulation
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Digital Canvas Awakening Animation
        const particles = [];
        const brushStrokes = [];
        const colorPalette = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
        ];
        
        // Create paint particles distributed across the entire screen
        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                size: Math.random() * 6 + 2,
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                alpha: Math.random() * 0.8 + 0.3,
                life: 1.0
            });
        }
        
        // Create brush stroke trails
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;
        
        function addBrushStroke(x, y, progress) {
            const strokeColor = colorPalette[Math.floor(progress * colorPalette.length) % colorPalette.length];
            brushStrokes.push({
                x: x,
                y: y,
                size: Math.random() * 20 + 5,
                color: strokeColor,
                alpha: 0.7,
                decay: 0.02,
                angle: Math.random() * Math.PI * 2
            });
            
            // Limit brush strokes
            if (brushStrokes.length > 50) {
                brushStrokes.shift();
            }
        }
        
        // Handle window resize
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial setup
        
        function animateDigitalCanvas() {
            // Create subtle paint splatter effect
            ctx.fillStyle = 'rgba(10, 10, 15, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const time = Date.now() * 0.001;
            const progressNormalized = progress / 100;
            
            // Animate paint particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx + Math.sin(time + particle.y * 0.01) * 0.5;
                particle.y += particle.vy + Math.cos(time + particle.x * 0.01) * 0.5;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle with enhanced glow
                ctx.save();
                ctx.globalAlpha = particle.alpha * Math.max(0.3, progressNormalized);
                ctx.fillStyle = particle.color;
                ctx.shadowColor = particle.color;
                ctx.shadowBlur = 15;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            // Animate brush strokes
            brushStrokes.forEach((stroke, index) => {
                ctx.save();
                ctx.globalAlpha = stroke.alpha;
                ctx.fillStyle = stroke.color;
                ctx.shadowColor = stroke.color;
                ctx.shadowBlur = 15;
                
                // Create organic brush shape
                ctx.translate(stroke.x, stroke.y);
                ctx.rotate(stroke.angle);
                ctx.fillRect(-stroke.size/2, -stroke.size/4, stroke.size, stroke.size/2);
                ctx.restore();
                
                stroke.alpha -= stroke.decay;
                if (stroke.alpha <= 0) {
                    brushStrokes.splice(index, 1);
                }
            });
            
            // Add dynamic brush strokes based on progress - more prominent and visible
            if (Math.random() < 0.15 + progressNormalized * 0.4) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.min(canvas.width, canvas.height) * 0.3;
                const angle = time + progressNormalized * Math.PI * 4;
                
                // Create multiple brush strokes for better visibility
                for (let i = 0; i < 3; i++) {
                    const offsetAngle = angle + (i * Math.PI * 2 / 3);
                    addBrushStroke(
                        centerX + Math.cos(offsetAngle) * radius * (progressNormalized + 0.2),
                        centerY + Math.sin(offsetAngle) * radius * (progressNormalized + 0.2),
                        progressNormalized
                    );
                }
            }
            
            // Draw connecting lines between nearby particles - more visible
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120 && Math.random() < 0.15) {
                        ctx.globalAlpha = (1 - distance / 120) * 0.5 * Math.max(0.3, progressNormalized);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
            
            requestAnimationFrame(animateDigitalCanvas);
        }
        
        animateDigitalCanvas();
        console.log('Digital Canvas Awakening effect initialized');
    }

    // Start progress animation immediately
    console.log('Starting progress animation');
    updateProgress();

    // Cycle through messages
    function updateMessage() {
        messages.forEach(msg => msg.classList.remove('active'));
        if (messages[currentMessageIndex]) {
            messages[currentMessageIndex].textContent = curiousMessages[currentMessageIndex];
            messages[currentMessageIndex].classList.add('active');
        }
        currentMessageIndex = (currentMessageIndex + 1) % curiousMessages.length;
    }

    // Start message cycling
    updateMessage();
    const messageInterval = setInterval(updateMessage, 1200);

    // Simulate loading progress with dynamic laser effects
    const loadingSteps = [
        { duration: 2200, end: 20, effect: 'beam-intensity' },
        { duration: 2000, end: 45, effect: 'color-shift' },
        { duration: 1800, end: 70, effect: 'speed-boost' },
        { duration: 1500, end: 90, effect: 'final-surge' },
        { duration: 1000, end: 100, effect: 'completion' }
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
                messages[0].textContent = "Ready to enter the laser realm! ⚡";
                messages[0].classList.add('active');
            }
            // Wait a moment before completing
            setTimeout(() => completeNeuralLoading(laserFlow), 1200);
            return;
        }

        const stepElapsed = currentTime - stepStartTime;
        const stepProgress = Math.min(stepElapsed / step.duration, 1);
        
        // Smooth easing function
        const easedProgress = stepProgress < 0.5 
            ? 2 * stepProgress * stepProgress 
            : 1 - Math.pow(-2 * stepProgress + 2, 3) / 2;
        
        progress = stepStartProgress + (step.end - stepStartProgress) * easedProgress;
        
        // Apply visual effects based on loading step
        if (laserFlow && step.effect) {
            applyLaserEffect(laserFlow, step.effect, stepProgress);
        }
        
        // Update UI with animations
        if (percentageElement) {
            const displayProgress = Math.floor(progress);
            percentageElement.textContent = displayProgress + '%';
            
            // Add special effects at every 10% milestone
            if (displayProgress % 10 === 0 && displayProgress > 0 && displayProgress !== lastMilestone) {
                percentageElement.style.transform = 'scale(1.4)';
                percentageElement.style.textShadow = '0 0 50px #00FF88, 0 0 100px #00FF88';
                setTimeout(() => {
                    percentageElement.style.transform = 'scale(1)';
                    percentageElement.style.textShadow = '0 0 30px #FF79C6, 0 0 60px #FF79C6';
                }, 400);
                lastMilestone = displayProgress;
            }
        }
        if (progressBar) {
            progressBar.style.width = progress + '%';
            progressBar.style.boxShadow = `0 0 ${15 + progress * 0.5}px #FF79C6, 0 0 ${30 + progress}px #FF79C6`;
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
            // Complete loading after a brief pause
            setTimeout(() => completeNeuralLoading(laserFlow), 1500);
        }
    }

    // Apply dynamic effects to LaserFlow based on loading progress
    function applyLaserEffect(laserFlow, effect, progress) {
        switch (effect) {
            case 'beam-intensity':
                laserFlow.options.fogIntensity = 0.5 + progress * 0.3;
                laserFlow.options.wispIntensity = 6.0 + progress * 4.0;
                break;
            case 'color-shift':
                const hue = 300 + progress * 60; // Shift from magenta to blue
                laserFlow.updateColor(`hsl(${hue}, 80%, 60%)`);
                break;
            case 'speed-boost':
                laserFlow.options.flowSpeed = 0.4 + progress * 0.6;
                laserFlow.options.wispSpeed = 18.0 + progress * 12.0;
                break;
            case 'final-surge':
                const surge = Math.sin(progress * Math.PI * 4) * 0.3;
                laserFlow.options.fogIntensity = 0.8 + surge;
                laserFlow.options.wispIntensity = 10.0 + surge * 5.0;
                break;
            case 'completion':
                laserFlow.updateColor('#00FF88');
                laserFlow.options.fogIntensity = 1.0;
                laserFlow.options.wispIntensity = 15.0;
                break;
        }
    }

    // Start progress animation
    updateProgress();
}

// Test immediate execution
console.log('loader.js file loaded - testing immediate loader display');

// Test function to ensure loader is visible
function forceShowLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(45deg, #000000, #0a0e1a, #1a0a2e) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
            opacity: 1 !important;
            visibility: visible !important;
        `;
        console.log('Force show loader executed');
        return true;
    }
    console.log('Loader element not found for force show');
    return false;
}

// Try to show loader immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded - forcing loader visibility');
        forceShowLoader();
    });
} else {
    console.log('DOM already loaded - forcing loader visibility immediately');
    forceShowLoader();
}

function initBackgroundAnimation(canvas) {
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true, 
            alpha: true,
            failIfMajorPerformanceCaveat: false
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 15;

        // Create simple particle system
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x4a9eff,
            size: 2,
            transparent: true,
            opacity: 0.6
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        function animate() {
            if (document.getElementById('loader').style.display === 'none') return;
            
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.y += 0.002;
            
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        
        animate();
    } catch (error) {
        console.log('Three.js background animation failed:', error);
    }
}

function completeNeuralLoading(laserFlow = null) {
    console.log('Digital Canvas Awakening completed, starting exit animation');
    
    const loader = document.getElementById('loader');
    const canvas = document.getElementById('loader-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Create completion burst effect
        let burstProgress = 0;
        const burstColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7'];
        
        function burstAnimation() {
            burstProgress += 0.05;
            
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            
            // Create expanding rings of color
            for (let i = 0; i < 5; i++) {
                const radius = burstProgress * 300 * (i + 1);
                const alpha = Math.max(0, 1 - burstProgress * 2);
                
                ctx.globalAlpha = alpha * 0.3;
                ctx.strokeStyle = burstColors[i % burstColors.length];
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            ctx.restore();
            
            if (burstProgress < 1) {
                requestAnimationFrame(burstAnimation);
            }
        }
        
        burstAnimation();
    }
    
    // Trigger completion event to clear fallback timeout
    window.dispatchEvent(new CustomEvent('loaderComplete'));
    
    // Initialize main site first before hiding loader
    if (typeof initMainSite === 'function') {
        initMainSite();
    }
    
    // Clean up LaserFlow effect
    if (laserFlow) {
        try {
            laserFlow.destroy();
            console.log('LaserFlow effect cleaned up');
        } catch (error) {
            console.warn('Error cleaning up LaserFlow:', error);
        }
    }
    
    if (typeof gsap !== 'undefined') {
        gsap.to('#loader', {
            opacity: 0,
            duration: 2.0,
            ease: 'power2.out',
            onComplete: () => {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                document.body.classList.add('loaded');
                console.log('Loader hidden, site loaded');
            }
        });
    } else {
        // Fallback if GSAP is not loaded
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.transition = 'opacity 2.0s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
                console.log('Loader hidden (fallback), site loaded');
            }, 2000);
        }
    }
}

// Force loader to be visible on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Setting up loader');
    const loader = document.getElementById('loader');
    if (loader) {
        // Force loader to be visible
        loader.style.display = 'flex';
        loader.style.visibility = 'visible';
        loader.style.opacity = '1';
        
        // Remove any classes that might hide it
        document.body.classList.remove('loaded');
        console.log('Loader visibility enforced');
    }
});

// Initialize loading when page loads
window.addEventListener('load', () => {
    console.log('Page fully loaded - Starting loader animation');
    
    // Fallback timeout in case something goes wrong
    const fallbackTimeout = setTimeout(() => {
        console.log('Loading fallback triggered');
        completeNeuralLoading();
    }, 15000); // 15 second maximum
    
    // Clear fallback if animation completes normally
    window.addEventListener('loaderComplete', () => {
        clearTimeout(fallbackTimeout);
    });
    
    // Start loader with a small delay to ensure it's visible
    setTimeout(() => {
        initLoaderAnimation();
    }, 300);
    
    // Add reload function for debugging
    window.reloadPage = function() {
        console.log('Manual page reload requested');
        location.reload(true); // Force reload from server, not cache
    };
});
