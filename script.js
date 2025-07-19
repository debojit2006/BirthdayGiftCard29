document.addEventListener('DOMContentLoaded', () => {
    // --- Scene & General Elements ---
    const bgMusic = document.getElementById('bg-music');
    const welcomeScene = document.getElementById('welcome-scene');
    const letterModal = document.getElementById('letter-modal');
    const constellationScene = document.getElementById('constellation-scene');
    const wishingJarScene = document.getElementById('wishing-jar-scene');

    // --- Scene 1: Button Game Logic ---
    const runawayBtn = document.getElementById('runaway-btn');
    let clicksNeeded = Math.floor(Math.random() * 5) + 5;
    runawayBtn.textContent = `Catch me!`;
    function moveButton() { const w = window.innerWidth, h = window.innerHeight; runawayBtn.style.top = `${Math.random() * (h - 150)}px`; runawayBtn.style.left = `${Math.random() * (w - 200)}px`; }
    runawayBtn.addEventListener('click', () => { if (bgMusic.paused) { bgMusic.volume = 0.2; bgMusic.play().catch(() => {}); } clicksNeeded--; if (clicksNeeded > 0) { moveButton(); } else { runawayBtn.textContent = '✅ Got it!'; runawayBtn.style.pointerEvents = 'none'; setTimeout(() => { bgMusic.pause(); letterModal.style.display = 'block'; }, 500); } });

    // --- Scene 2: Letter Modal Logic ---
    const closeModalBtn = document.querySelector('.close-btn');
    closeModalBtn.addEventListener('click', () => {
        letterModal.style.display = 'none';
        welcomeScene.classList.remove('active');
        constellationScene.classList.add('active');
        bgMusic.play();
        initConstellationGame();
    });

    // --- Scene 3: Constellation Game Logic ---
    const starCanvas = document.getElementById('star-canvas');
    const revealSentence = document.getElementById('reveal-sentence');
    const instructionText = document.getElementById('instruction-text');
    const nextToWishBtn = document.getElementById('next-to-wish-btn');
    const starPoints = [{x: 20, y: 40}, {x: 40, y: 70}, {x: 65, y: 60}, {x: 80, y: 30}];
    let currentStarIndex = 0;
    let gameInitialized = false;

    function initConstellationGame() {
        if (gameInitialized) return;
        gameInitialized = true;
        createBackgroundStars(80);
        starPoints.forEach((point, i) => { const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); star.setAttribute('cx', `${point.x}%`); star.setAttribute('cy', `${point.y}%`); star.setAttribute('r', '5'); star.setAttribute('class', 'interactive-star'); star.dataset.index = i; star.addEventListener('click', handleStarClick); starCanvas.appendChild(star); });
    }

    function createBackgroundStars(count) { for (let i = 0; i < count; i++) { const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); const x = Math.random() * 100, y = Math.random() * 100, r = Math.random() * 1.5 + 0.5; star.setAttribute('cx', `${x}%`); star.setAttribute('cy', `${y}%`); star.setAttribute('r', `${r}`); star.setAttribute('class', 'background-star'); star.style.animationDelay = `${Math.random() * 4}s`; starCanvas.appendChild(star); } }

    function handleStarClick(event) {
        const clickedIndex = parseInt(event.target.dataset.index);
        if (clickedIndex === currentStarIndex) {
            const star = event.target;
            star.classList.remove('interactive-star'); star.classList.add('connected-star'); star.style.pointerEvents = 'none';
            if (currentStarIndex > 0) { const prevPoint = starPoints[currentStarIndex - 1], currentPoint = starPoints[currentStarIndex]; const line = document.createElementNS('http://www.w3.org/2000/svg', 'line'); line.setAttribute('x1', `${prevPoint.x}%`); line.setAttribute('y1', `${prevPoint.y}%`); line.setAttribute('x2', `${currentPoint.x}%`); line.setAttribute('y2', `${currentPoint.y}%`); line.setAttribute('class', 'constellation-line'); starCanvas.insertBefore(line, starCanvas.firstChild); }
            currentStarIndex++;
            if (currentStarIndex === starPoints.length) {
                instructionText.style.opacity = '0';
                revealSentence.style.opacity = '1';
                nextToWishBtn.classList.add('visible');
            }
        }
    }

    // --- Scene 4: Wishing Jar Logic (Final Simplified Version) ---
    const wishInput = document.getElementById('wish-input');
    const makeWishBtn = document.getElementById('make-wish-btn');
    const finalMessage = document.getElementById('final-message');
    const jarContainer = document.querySelector('.jar-container');

    nextToWishBtn.addEventListener('click', () => {
        constellationScene.classList.remove('active');
        wishingJarScene.classList.add('active');
    });

    makeWishBtn.addEventListener('click', () => {
        if (wishInput.value.trim() === '') return; 

        const orb = document.createElement('div');
        orb.className = 'wish-orb';
        jarContainer.appendChild(orb);
        orb.style.left = `50%`;

        wishInput.disabled = true;
        makeWishBtn.disabled = true;

        setTimeout(() => {
            orb.remove();
            finalMessage.style.opacity = '1';
            finalMessage.innerHTML = `May all your hopes and dreams come true. Happy Birthday.`;
        }, 2000);
    });
});
