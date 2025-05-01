document.getElementById('verify-btn').addEventListener('click', function() {
    const number = document.getElementById('whatsapp-number').value;
    const errorMsg = document.getElementById('error-msg');
    const status = document.getElementById('status');

    // Fake verification logic (replace with real API call)
    if (number.trim() === '' || !number.includes('+')) {
        errorMsg.textContent = 'ERROR: Invalid number. Use +[country code]';
    } else {
        errorMsg.textContent = '';
        status.textContent = 'VERIFICATION SUCCESS';
        status.style.color = '#00ff41';
        
        // Show hidden content after 1.5s
        setTimeout(() => {
            document.getElementById('hidden-content').classList.remove('hidden');
        }, 1500);
    }
});