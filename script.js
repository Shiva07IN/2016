let backgroundMusic = null;

document.addEventListener('DOMContentLoaded', function() {
    backgroundMusic = document.getElementById('backgroundMusic');
    const video = document.getElementById('surpriseVideo');
    
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
    
    // Enhanced Intersection Observer with staggered animations
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
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe timeline items with enhanced effects
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Premium sparkle effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const addSparkles = (e) => {
            e.preventDefault();
            createPremiumSparkles(item);
        };
        
        item.addEventListener('mouseenter', addSparkles);
        item.addEventListener('touchstart', addSparkles, { passive: false });
    });
    
    // Smooth parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }
    
    // Enhanced smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

function createPremiumSparkles(element) {
    const sparkleCount = window.innerWidth < 768 ? 5 : 8;
    const sparkleTypes = ['✨', '💫', '🌟', '⭐', '💖'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const sparkleType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        
        sparkle.innerHTML = sparkleType;
        sparkle.className = 'premium-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 0.8 + 0.8}em;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * element.offsetWidth}px;
            top: ${Math.random() * element.offsetHeight}px;
            animation: premiumSparkle ${Math.random() * 0.5 + 1}s ease-out forwards;
            filter: drop-shadow(0 2px 4px rgba(255, 107, 157, 0.3));
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// Add premium animations and effects
const style = document.createElement('style');
style.textContent = `
    @keyframes premiumSparkle {
        0% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg) translateY(0px); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1.2) rotate(180deg) translateY(-15px); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0) rotate(360deg) translateY(-30px); 
        }
    }
    
    .animate-in {
        animation: slideInEnhanced 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
    
    @keyframes slideInEnhanced {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .timeline-item:hover .timeline-content {
        animation: contentGlow 0.3s ease forwards;
    }
    
    @keyframes contentGlow {
        to {
            box-shadow: 
                0 25px 60px rgba(255, 107, 157, 0.25),
                0 0 40px rgba(255, 182, 193, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
    }
    
    .premium-sparkle {
        will-change: transform, opacity;
    }
    
    /* Enhanced mobile touch feedback */
    @media (hover: none) and (pointer: coarse) {
        .timeline-content:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
        }
        
        .timeline-image:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
    }
`;
document.head.appendChild(style);
