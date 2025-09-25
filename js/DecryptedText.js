/**
 * DecryptedText - Vanilla JavaScript implementation
 * Creates text decryption animations similar to hacker/matrix effects
 */
class DecryptedText {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.originalText = this.element.textContent || this.element.getAttribute('data-text') || '';
        
        // Default options
        this.options = {
            speed: 50,
            maxIterations: 10,
            sequential: false,
            revealDirection: 'start', // 'start', 'end', 'center'
            useOriginalCharsOnly: false,
            characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?',
            className: 'decrypted',
            parentClassName: 'decrypted-wrapper',
            encryptedClassName: 'encrypted',
            animateOn: 'hover', // 'hover', 'view', 'both', 'immediate'
            ...options
        };

        this.displayText = this.originalText;
        this.isAnimating = false;
        this.revealedIndices = new Set();
        this.hasAnimated = false;
        this.interval = null;

        this.init();
    }

    init() {
        this.setupElement();
        this.setupEventListeners();
        
        if (this.options.animateOn === 'immediate') {
            this.startAnimation();
        }
    }

    setupElement() {
        this.element.classList.add(this.options.parentClassName);
        this.element.style.display = 'inline-block';
        this.element.style.whiteSpace = 'pre-wrap';
        this.updateDisplay();
    }

    setupEventListeners() {
        if (this.options.animateOn === 'hover' || this.options.animateOn === 'both') {
            this.element.addEventListener('mouseenter', () => this.startAnimation());
            this.element.addEventListener('mouseleave', () => this.stopAnimation());
        }

        if (this.options.animateOn === 'view' || this.options.animateOn === 'both') {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.startAnimation();
                    this.hasAnimated = true;
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        observer.observe(this.element);
    }

    getNextIndex(revealedSet) {
        const textLength = this.originalText.length;
        switch (this.options.revealDirection) {
            case 'start':
                return revealedSet.size;
            case 'end':
                return textLength - 1 - revealedSet.size;
            case 'center': {
                const middle = Math.floor(textLength / 2);
                const offset = Math.floor(revealedSet.size / 2);
                const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

                if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
                    return nextIndex;
                }

                for (let i = 0; i < textLength; i++) {
                    if (!revealedSet.has(i)) return i;
                }
                return 0;
            }
            default:
                return revealedSet.size;
        }
    }

    getAvailableChars() {
        if (this.options.useOriginalCharsOnly) {
            return Array.from(new Set(this.originalText.split(''))).filter(char => char !== ' ');
        }
        return this.options.characters.split('');
    }

    shuffleText(currentRevealed) {
        const availableChars = this.getAvailableChars();

        if (this.options.useOriginalCharsOnly) {
            const positions = this.originalText.split('').map((char, i) => ({
                char,
                isSpace: char === ' ',
                index: i,
                isRevealed: currentRevealed.has(i)
            }));

            const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);

            // Shuffle non-space characters
            for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
            }

            let charIndex = 0;
            return positions
                .map(p => {
                    if (p.isSpace) return ' ';
                    if (p.isRevealed) return this.originalText[p.index];
                    return nonSpaceChars[charIndex++];
                })
                .join('');
        } else {
            return this.originalText
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' ';
                    if (currentRevealed.has(i)) return this.originalText[i];
                    return availableChars[Math.floor(Math.random() * availableChars.length)];
                })
                .join('');
        }
    }

    updateDisplay() {
        this.element.innerHTML = this.displayText
            .split('')
            .map((char, index) => {
                const isRevealed = this.revealedIndices.has(index) || !this.isAnimating;
                const className = isRevealed ? this.options.className : this.options.encryptedClassName;
                return `<span class="${className}">${char === ' ' ? '&nbsp;' : char}</span>`;
            })
            .join('');
    }

    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        let currentIteration = 0;

        this.interval = setInterval(() => {
            if (this.options.sequential) {
                if (this.revealedIndices.size < this.originalText.length) {
                    const nextIndex = this.getNextIndex(this.revealedIndices);
                    this.revealedIndices.add(nextIndex);
                    this.displayText = this.shuffleText(this.revealedIndices);
                    this.updateDisplay();
                } else {
                    this.completeAnimation();
                }
            } else {
                this.displayText = this.shuffleText(this.revealedIndices);
                this.updateDisplay();
                currentIteration++;
                
                if (currentIteration >= this.options.maxIterations) {
                    this.completeAnimation();
                }
            }
        }, this.options.speed);
    }

    stopAnimation() {
        if (this.options.animateOn === 'hover') {
            this.completeAnimation(true);
        }
    }

    completeAnimation(reset = false) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.isAnimating = false;

        if (reset) {
            this.displayText = this.originalText;
            this.revealedIndices.clear();
        } else {
            this.displayText = this.originalText;
        }

        this.updateDisplay();
    }

    // Public methods
    animate() {
        this.startAnimation();
    }

    reset() {
        this.completeAnimation(true);
        this.hasAnimated = false;
    }

    setText(newText) {
        this.originalText = newText;
        this.displayText = newText;
        this.revealedIndices.clear();
        this.updateDisplay();
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.element.removeEventListener('mouseenter', () => this.startAnimation());
        this.element.removeEventListener('mouseleave', () => this.stopAnimation());
    }
}

// Auto-initialize elements with data-decrypt attribute
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Initializing DecryptedText elements...');
        const elements = document.querySelectorAll('[data-decrypt]');
        console.log(`Found ${elements.length} elements with data-decrypt attribute`);
        
        elements.forEach((element, index) => {
            try {
                const options = {};
                
                // Parse data attributes
                if (element.dataset.speed) options.speed = parseInt(element.dataset.speed);
                if (element.dataset.maxIterations) options.maxIterations = parseInt(element.dataset.maxIterations);
                if (element.dataset.sequential) options.sequential = element.dataset.sequential === 'true';
                if (element.dataset.revealDirection) options.revealDirection = element.dataset.revealDirection;
                if (element.dataset.characters) options.characters = element.dataset.characters;
                if (element.dataset.animateOn) options.animateOn = element.dataset.animateOn;
                if (element.dataset.className) options.className = element.dataset.className;
                if (element.dataset.encryptedClassName) options.encryptedClassName = element.dataset.encryptedClassName;

                new DecryptedText(element, options);
                console.log(`DecryptedText initialized for element ${index + 1}`);
            } catch (elementError) {
                console.warn(`Error initializing DecryptedText for element ${index + 1}:`, elementError);
            }
        });
        
        console.log('DecryptedText initialization completed');
    } catch (error) {
        console.error('Error during DecryptedText auto-initialization:', error);
    }
});

// Export for manual usage
window.DecryptedText = DecryptedText;