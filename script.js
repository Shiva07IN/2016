let backgroundMusic = null;

document.addEventListener('DOMContentLoaded', function() {
    backgroundMusic = document.getElementById('backgroundMusic');
    const video = document.getElementById('surpriseVideo');
    const timeline = document.querySelector('.timeline');
    
    // Add timeline track element
    const timelineTrack = document.createElement('div');
    timelineTrack.className = 'timeline-track';
    timeline.appendChild(timelineTrack);
    
    // Enhanced music auto-start
    const startMusic = () => {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.volume = 0.7;
            backgroundMusic.play().catch(() => {});
        }
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
    };
    
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true, passive: true });
    
    // Enhanced video controls
    if (video) {
        video.addEventListener('play', () => {
            if (backgroundMusic && !backgroundMusic.paused) {
                backgroundMusic.pause();
            }
        });
        
        video.addEventListener('pause', () => {
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play().catch(() => {});
            }
        });
        
        video.addEventListener('ended', () => {
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play().catch(() => {});
            }
        });
    }
    
    // Traveling timeline indicator
    function updateTimelineIndicator() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const timelineStart = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        
        // Calculate progress through timeline
        const progress = Math.max(0, Math.min(1, 
            (scrollTop + windowHeight / 2 - timelineStart) / timelineHeight
        ));
        
        // Update indicator position
        const indicator = document.querySelector('.timeline::after') || 
                         document.querySelector('.timeline');
        
        if (indicator) {
            const newTop = Math.max(100, Math.min(window.innerHeight - 100, 
                windowHeight * 0.3 + (progress * windowHeight * 0.4)
            ));
            
            document.documentElement.style.setProperty('--timeline-indicator-top', `${newTop}px`);
        }
    }
    
    // Throttled scroll handler for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTimelineIndicator();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Enhanced Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }, index * 50);
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
        observer.observe(item);
    });
    
    // Optimized sparkle effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const addSparkles = (e) => {
            e.preventDefault();
            createOptimizedSparkles(item);
        };
        
        item.addEventListener('mouseenter', addSparkles);
        item.addEventListener('touchstart', addSparkles, { passive: false });
    });
    
    // Initialize timeline indicator
    updateTimelineIndicator();
});

function createOptimizedSparkles(element) {
    const sparkleCount = window.innerWidth < 768 ? 3 : 5;
    const sparkleTypes = ['✨', '💫'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const sparkleType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        
        sparkle.innerHTML = sparkleType;
        sparkle.className = 'optimized-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 0.5 + 0.8}em;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * element.offsetWidth}px;
            top: ${Math.random() * element.offsetHeight}px;
            animation: optimizedSparkle ${Math.random() * 0.3 + 0.7}s ease-out forwards;
            will-change: transform, opacity;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add optimized animations
const style = document.createElement('style');
style.textContent = `
    :root {
        --timeline-indicator-top: 50vh;
    }
    
    .timeline::after {
        top: var(--timeline-indicator-top) !important;
    }
    
    @keyframes optimizedSparkle {
        0% { 
            opacity: 0; 
            transform: scale(0) translateY(0px); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1) translateY(-10px); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0) translateY(-20px); 
        }
    }
    
    .animate-in {
        animation: slideInOptimized 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
    
    @keyframes slideInOptimized {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .optimized-sparkle {
        will-change: transform, opacity;
    }
    
    /* Performance optimizations */
    .timeline-content,
    .timeline-image,
    .surprise-container {
        will-change: transform;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);
