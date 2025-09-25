// ScrollStack - Vanilla JavaScript implementation with Lenis smooth scrolling
class ScrollStack {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    
    if (!this.container) {
      console.error('ScrollStack: Container element not found');
      return;
    }

    // Default options
    this.options = {
      itemDistance: 100,
      itemScale: 0.03,
      itemStackDistance: 30,
      stackPosition: '20%',
      scaleEndPosition: '10%',
      baseScale: 0.85,
      scaleDuration: 0.5,
      rotationAmount: 0,
      blurAmount: 0,
      useWindowScroll: false,
      onStackComplete: null,
      ...options
    };

    this.scrollerRef = null;
    this.stackCompleted = false;
    this.animationFrameId = null;
    this.lenis = null;
    this.cards = [];
    this.lastTransforms = new Map();
    this.isUpdating = false;

    this.init();
  }

  init() {
    this.setupHTML();
    this.setupCards();
    this.setupLenis();
    this.updateCardTransforms();
  }

  setupHTML() {
    // Create the scroller structure
    this.container.classList.add('scroll-stack-scroller');
    
    // Wrap existing content in scroll-stack-inner
    const existingContent = Array.from(this.container.children);
    const inner = document.createElement('div');
    inner.className = 'scroll-stack-inner';
    
    existingContent.forEach(child => {
      if (child.classList.contains('scroll-stack-card')) {
        inner.appendChild(child);
      }
    });
    
    // Add spacer element
    const spacer = document.createElement('div');
    spacer.className = 'scroll-stack-end';
    inner.appendChild(spacer);
    
    this.container.appendChild(inner);
    this.scrollerRef = this.container;
  }

  setupCards() {
    this.cards = Array.from(
      this.options.useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : this.scrollerRef.querySelectorAll('.scroll-stack-card')
    );

    this.cards.forEach((card, i) => {
      if (i < this.cards.length - 1) {
        card.style.marginBottom = `${this.options.itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });
  }

  calculateProgress(scrollTop, start, end) {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }

  parsePercentage(value, containerHeight) {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }

  getScrollData() {
    if (this.options.useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = this.scrollerRef;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }

  getElementOffset(element) {
    if (this.options.useWindowScroll) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    } else {
      return element.offsetTop;
    }
  }

  updateCardTransforms() {
    if (!this.cards.length || this.isUpdating) return;

    this.isUpdating = true;

    const { scrollTop, containerHeight } = this.getScrollData();
    const stackPositionPx = this.parsePercentage(this.options.stackPosition, containerHeight);
    const scaleEndPositionPx = this.parsePercentage(this.options.scaleEndPosition, containerHeight);

    const endElement = this.options.useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : this.scrollerRef?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? this.getElementOffset(endElement) : 0;

    this.cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = this.getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - this.options.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - this.options.itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = this.calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = this.options.baseScale + i * this.options.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = this.options.rotationAmount ? i * this.options.rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (this.options.blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < this.cards.length; j++) {
          const jCardTop = this.getElementOffset(this.cards[j]);
          const jTriggerStart = jCardTop - stackPositionPx - this.options.itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * this.options.blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + this.options.itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + this.options.itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = this.lastTransforms.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        this.lastTransforms.set(i, newTransform);
      }

      if (i === this.cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !this.stackCompleted) {
          this.stackCompleted = true;
          this.options.onStackComplete?.();
        } else if (!isInView && this.stackCompleted) {
          this.stackCompleted = false;
        }
      }
    });

    this.isUpdating = false;
  }

  handleScroll() {
    this.updateCardTransforms();
  }

  setupLenis() {
    if (!window.Lenis) {
      console.error('ScrollStack: Lenis library not found. Please include Lenis in your project.');
      return;
    }

    if (this.options.useWindowScroll) {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      this.lenis.on('scroll', () => this.handleScroll());

      const raf = (time) => {
        this.lenis.raf(time);
        this.animationFrameId = requestAnimationFrame(raf);
      };
      this.animationFrameId = requestAnimationFrame(raf);
    } else {
      const scroller = this.scrollerRef;
      if (!scroller) return;

      this.lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        wheelMultiplier: 1,
        touchInertiaMultiplier: 35,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertia: 0.6
      });

      this.lenis.on('scroll', () => this.handleScroll());

      const raf = (time) => {
        this.lenis.raf(time);
        this.animationFrameId = requestAnimationFrame(raf);
      };
      this.animationFrameId = requestAnimationFrame(raf);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.lenis) {
      this.lenis.destroy();
    }
    this.stackCompleted = false;
    this.cards = [];
    this.lastTransforms.clear();
    this.isUpdating = false;
  }
}

// Export for use in other files
window.ScrollStack = ScrollStack;