let backgroundMusic = null;

document.addEventListener('DOMContentLoaded', function() {
    backgroundMusic = document.getElementById('backgroundMusic');
    const video = document.getElementById('surpriseVideo');
    
    // Auto-start music after user interaction
    document.addEventListener('click', function startMusic() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log('Auto-play failed:', error);
            });
        }
        document.removeEventListener('click', startMusic);
    }, { once: true });
    
    // Video controls - pause music when video plays
    if (video) {
        video.addEventListener('play', function() {
            if (backgroundMusic && !backgroundMusic.paused) {
                backgroundMusic.pause();
            }
        });
        
        video.addEventListener('pause', function() {
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play();
            }
        });
        
        video.addEventListener('ended', function() {
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play();
            }
        });
    }
    
    // Optimized sparkle effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '💫'][Math.floor(Math.random() * 2)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.2em';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.left = Math.random() * element.offsetWidth + 'px';
        sparkle.style.top = Math.random() * element.offsetHeight + 'px';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(style);