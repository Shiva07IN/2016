let backgroundMusic = null;

document.addEventListener('DOMContentLoaded', function() {
    backgroundMusic = document.getElementById('backgroundMusic');
    const video = document.getElementById('surpriseVideo');
    
    // Simple music auto-start
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
    
    // Simple video controls
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
    
    // Enhanced sparkle effects on hover
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            createEnhancedSparkles(item);
        });
        
        item.addEventListener('touchstart', () => {
            createEnhancedSparkles(item);
        }, { passive: true });
    });
    
    // Smooth scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInSmooth 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        observer.observe(item);
    });
});

function createEnhancedSparkles(element) {
    const sparkleCount = 5;
    const sparkleTypes = ['✨', '💫', '🌟'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const sparkleType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        
        sparkle.innerHTML = sparkleType;
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 0.5 + 0.8}em;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * element.offsetWidth}px;
            top: ${Math.random() * element.offsetHeight}px;
            animation: enhancedSparkle ${Math.random() * 0.5 + 1}s ease-out forwards;
            filter: drop-shadow(0 2px 4px rgba(255, 107, 157, 0.3));
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// Enhanced animations
const style = document.createElement('style');
style.textContent = `
    @keyframes enhancedSparkle {
        0% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg) translateY(0px); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1.2) rotate(180deg) translateY(-10px); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0) rotate(360deg) translateY(-20px); 
        }
    }
    
    @keyframes slideInSmooth {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
