// Scramble Text Effect (for "UNDISCLOSED" locations)
document.querySelectorAll('.scramble').forEach(el => {
    const originalText = el.getAttribute('data-text');
    let scrambled = originalText.replace(/./g, '█');
    el.textContent = scrambled;
    
    el.addEventListener('mouseover', () => {
        el.textContent = originalText;
    });
    
    el.addEventListener('mouseout', () => {
        el.textContent = scrambled;
    });
});

// Typewriter Effect for Skills
document.querySelectorAll('.typing').forEach(el => {
    const text = el.getAttribute('data-text');
    let i = 0;
    const speed = 100; // Typing speed (ms)
    
    function typeWriter() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    setTimeout(typeWriter, 1000); // Delay start
});