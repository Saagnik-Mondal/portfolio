// ===========================================
// LOADING SCREEN FUNCTIONALITY
// ===========================================

function initLoaderAnimation() {
    console.log('Digital Canvas Awakening - Initializing...');
    
    const loader = document.getElementById('loader');
    const percentageElement = document            // Complete loading after a brief pause
            setTimeout(() => completeNeuralLoading(laserFlow), 600);uerySelector('.loading-percentage');
    const progressBar = document.querySelector('.progress-bar');
    const canvas = document.getElementById('loader-canvas');
    const messages = document.querySelectorAll('.message');
    const skipLoader = document.getElementById('skip-loader');
    
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
        
        // Create fewer, higher quality particles for better performance
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 8 + 3,
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                alpha: Math.random() * 0.6 + 0.4,
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
            // Create smoother fade effect
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
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
            messages[currentMessageIndex].textContent = canvasMessages[currentMessageIndex];
            messages[currentMessageIndex].classList.add('active');
        }
        currentMessageIndex = (currentMessageIndex + 1) % canvasMessages.length;
    }

    // Start message cycling with faster updates
    updateMessage();
    const messageInterval = setInterval(updateMessage, 800);

    // Improved loading progress with better timing
    const loadingSteps = [
        { duration: 1500, end: 25, effect: 'beam-intensity' },
        { duration: 1200, end: 50, effect: 'color-shift' },
        { duration: 1000, end: 75, effect: 'speed-boost' },
        { duration: 800, end: 95, effect: 'final-surge' },
        { duration: 500, end: 100, effect: 'completion' }
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
            setTimeout(() => completeNeuralLoading(laserFlow), 800);
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

    // Add skip loader functionality  
    if (skipLoader) {
        skipLoader.addEventListener('click', () => {
            console.log('Skip loader clicked');
            clearInterval(messageInterval);
            if (animationId) cancelAnimationFrame(animationId);
            completeNeuralLoading(laserFlow);
        });
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
            duration: 1.2,
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
            loader.style.transition = 'opacity 1.2s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
                console.log('Loader hidden (fallback), site loaded');
            }, 1200);
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

// Initialize the complete welcome sequence when page loads
window.addEventListener('load', () => {
    console.log('Page fully loaded - Starting welcome sequence');
    
    // Fallback timeout in case something goes wrong
    const fallbackTimeout = setTimeout(() => {
        console.log('Loading fallback triggered');
        completeNeuralLoading();
    }, 20000); // 20 second maximum for full sequence
    
    // Clear fallback if animation completes normally
    window.addEventListener('loaderComplete', () => {
        clearTimeout(fallbackTimeout);
    });
    
    // Start the complete welcome sequence
    setTimeout(() => {
        startWelcomeSequence();
    }, 500);
    
    // Add reload function for debugging
    window.reloadPage = function() {
        console.log('Manual page reload requested');
        location.reload(true); // Force reload from server, not cache
    };
});

// Simplified Welcome Sequence: Welcome → Enhanced Loader
function startWelcomeSequence() {
    console.log('Starting simplified welcome sequence');
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const realmEntry = document.getElementById('realm-entry');
    const loader = document.getElementById('loader');
    const skipIntro = document.getElementById('skip-intro');
    
    // Ensure proper display
    if (welcomeScreen) welcomeScreen.style.display = 'flex';
    if (realmEntry) realmEntry.style.display = 'none'; // Skip realm entry
    if (loader) loader.style.display = 'flex';
    
    // Add skip intro functionality
    if (skipIntro) {
        skipIntro.addEventListener('click', () => {
            console.log('Skip intro clicked');
            if (welcomeScreen) welcomeScreen.style.display = 'none';
            initLoaderAnimation();
        });
    }
    
    // Phase 1: Welcome with shorter duration (2 seconds)
    console.log('Phase 1: Welcome');
    
    setTimeout(() => {
        console.log('Phase 2: Enhanced Loader');
        
        // Start fade out welcome
        if (welcomeScreen) {
            welcomeScreen.classList.add('fade-out');
        }
        
        // Start loader after brief overlap
        setTimeout(() => {
            if (welcomeScreen) welcomeScreen.style.display = 'none';
            initLoaderAnimation();
        }, 1000);
        
    }, 2000);
}

// Create Revolutionary Neural Network Genesis Effect
function createDimensionalPortal(container) {
    // Create Neural Network Nodes
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const neuralNode = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const x = Math.random() * 80 + 10; // 10% to 90% of container width
            const y = Math.random() * 80 + 10; // 10% to 90% of container height
            
            neuralNode.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(138, 43, 226, 1), rgba(75, 0, 130, 0.5));
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: 0;
                animation: neural-node-genesis ${2 + Math.random() * 3}s ease-out forwards;
                box-shadow: 
                    0 0 ${size * 2}px rgba(138, 43, 226, 0.8),
                    0 0 ${size * 4}px rgba(75, 0, 130, 0.4);
                z-index: 100;
            `;
            
            container.appendChild(neuralNode);
            
            // Create connecting synapses between nodes
            if (i > 0) {
                const synapseDelay = Math.random() * 1000;
                setTimeout(() => {
                    const synapse = document.createElement('div');
                    const angle = Math.random() * 360;
                    const length = Math.random() * 200 + 50;
                    
                    synapse.style.cssText = `
                        position: absolute;
                        width: ${length}px;
                        height: 1px;
                        background: linear-gradient(90deg, 
                            rgba(138, 43, 226, 0), 
                            rgba(138, 43, 226, 0.6) 50%, 
                            rgba(138, 43, 226, 0)
                        );
                        left: ${x}%;
                        top: ${y}%;
                        transform-origin: 0 0;
                        transform: rotate(${angle}deg);
                        opacity: 0;
                        animation: synapse-formation 2s ease-out forwards;
                        box-shadow: 0 0 3px rgba(138, 43, 226, 0.8);
                        z-index: 50;
                    `;
                    
                    container.appendChild(synapse);
                }, synapseDelay);
            }
            
            // Remove nodes after animation completes
            setTimeout(() => {
                if (neuralNode.parentNode) {
                    neuralNode.style.animation = 'neural-node-dissolution 1s ease-out forwards';
                    setTimeout(() => {
                        if (neuralNode.parentNode) {
                            neuralNode.parentNode.removeChild(neuralNode);
                        }
                    }, 1000);
                }
            }, 8000);
            
        }, i * 200);
    }
    
    // Create Consciousness Emergence Waves
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const consciousnessWave = document.createElement('div');
            consciousnessWave.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(138, 43, 226, 0.9);
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                animation: consciousness-wave-expansion 3s ease-out forwards;
                z-index: 25;
            `;
            
            container.appendChild(consciousnessWave);
            
            setTimeout(() => {
                if (consciousnessWave.parentNode) {
                    consciousnessWave.parentNode.removeChild(consciousnessWave);
                }
            }, 3000);
        }, i * 500);
    }
}

// Create magical particles for realm entry
function createRealmParticles(container) {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
    `;
    
    container.appendChild(particleContainer);
    
    // Create floating magical particles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const colors = ['#FF79C6', '#8B5CF6', '#4ECDC4', '#FF6B6B', '#FFEAA7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${randomColor};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: realm-particle-float ${Math.random() * 3 + 2}s ease-in-out infinite;
                box-shadow: 0 0 10px ${randomColor};
            `;
            
            particleContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }, i * 50);
    }
}
