// Loading animation
const loadingScreen = document.getElementById('loading-screen');
const loaderProgress = document.querySelector('.loader-progress');
const loaderPercentage = document.querySelector('.loader-percentage');
const mainContent = document.querySelector('main');
const footer = document.querySelector('footer');

let progress = 0;
const targetProgress = 80;
const loadingDuration = 3000; // 3 seconds to reach 80%
const loadingInterval = 30; // Update every 30ms

const loadingTimer = setInterval(() => {
    progress += (targetProgress * loadingInterval) / loadingDuration;
    
    if (progress >= targetProgress) {
        progress = targetProgress;
        clearInterval(loadingTimer);
        
        // Wait a moment at 80% then show the content
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            mainContent.classList.remove('hidden');
            footer.classList.remove('hidden');
            
            // Start confetti after content is shown
            startConfetti();
        }, 500);
    }
    
    loaderProgress.style.width = `${progress}%`;
    loaderPercentage.textContent = `${Math.round(progress)}%`;
}, loadingInterval);

// Confetti effect function
function startConfetti() {
    const {confetti} = window;

    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#10B981', '#059669', '#fff', '#34D399', '#6EE7B7']
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['circle']
        });

        confetti({
            ...defaults,
            particleCount: 20,
            scalar: 2,
            shapes: ['square']
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}

// Create new confetti burst on click anywhere on the page
document.addEventListener('click', (e) => {
    const {confetti} = window;
    confetti({
        particleCount: 35,
        startVelocity: 30,
        spread: 360,
        origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
        },
        colors: ['#10B981', '#059669', '#fff', '#34D399', '#6EE7B7']
    });
});