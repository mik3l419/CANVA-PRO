// Scramble effect
document.querySelectorAll('.scramble').forEach(el => {
    el.addEventListener('mouseover', () => {
        el.textContent = el.getAttribute('data-text');
    });
    el.addEventListener('mouseout', () => {
        el.textContent = el.textContent.replace(/./g, '█');
    });
});

// Typewriter effect
document.querySelectorAll('.typing').forEach(el => {
    const text = el.getAttribute('data-text');
    let i = 0;
    const speed = 100;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 1000);
});