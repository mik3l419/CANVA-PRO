// Show PGP Key
document.getElementById('show-pgp').addEventListener('click', function() {
    const pgpKey = document.getElementById('pgp-key');
    pgpKey.classList.toggle('hidden');
    this.textContent = pgpKey.classList.contains('hidden') ? 'SHOW' : 'HIDE';
});

// Scramble Effect (Signal/Tor)
document.querySelectorAll('.scramble').forEach(el => {
    el.addEventListener('mouseover', () => {
        el.textContent = el.getAttribute('data-text');
    });
    el.addEventListener('mouseout', () => {
        el.textContent = el.textContent.includes('onion') ? '[CLICK TO REVEAL]' : '[HOVER TO REVEAL]';
    });
});

// Fake Secure Message Form
document.getElementById('send-btn').addEventListener('click', function() {
    const message = document.getElementById('message').value;
    const passphrase = document.getElementById('passphrase').value;
    const status = document.getElementById('form-status');

    if (!message || !passphrase) {
        status.textContent = 'ERROR: Message and passphrase required.';
        status.style.color = '#ff5555';
    } else {
        status.textContent = 'STATUS: Message encrypted and sent to secure queue.';
        status.style.color = '#00ff41';
    }
    status.classList.remove('hidden');
});




// new 

// Toggle PGP Key
document.getElementById('toggle-pgp').addEventListener('click', function(e) {
    e.preventDefault();
    const pgpKey = document.getElementById('pgp-key');
    pgpKey.classList.toggle('hidden');
    this.textContent = pgpKey.classList.contains('hidden') ? 'SHOW PGP KEY' : 'HIDE PGP KEY';
});

// Scramble Effect
document.querySelectorAll('.scramble').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.textContent = el.getAttribute('data-text');
    });
    el.addEventListener('mouseleave', () => {
        el.textContent = el.textContent.includes('onion') ? '[CLICK TO REVEAL]' : '[HOVER TO REVEAL]';
    });
});

// Form Submission
document.getElementById('secure-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.submit-btn');
    const loader = document.querySelector('.btn-loader');
    const status = document.getElementById('form-status');
    
    // Show loading state
    submitBtn.disabled = true;
    document.querySelector('.btn-text').classList.add('hidden');
    loader.classList.remove('hidden');
    
    // Simulate encryption delay
    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('.btn-text').classList.remove('hidden');
        submitBtn.disabled = false;
        
        status.textContent = 'STATUS: Message encrypted and sent to secure queue.';
        status.style.color = '#00ff41';
        
        // Reset form
        e.target.reset();
    }, 2000);
});