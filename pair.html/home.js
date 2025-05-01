// ===== MATRIX BACKGROUND =====
const initMatrix = () => {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Matrix characters
  const matrixChars = "01ルヴァレントアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = 18;
  const columns = canvas.width / fontSize;
  
  // Set drops
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }
  
  // Draw function
  const draw = () => {
    // Black background with opacity
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set font and color
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Draw character
      ctx.fillText(text, x, y);
      
      // Reset drop if it reaches bottom
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move drop down
      drops[i]++;
    }
  };
  
  // Start animation
  setInterval(draw, 50);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};

// ===== TERMINAL TYPING EFFECT =====
const initTerminalTyping = () => {
  const lines = document.querySelectorAll('.typing-animation');
  
  lines.forEach((line, index) => {
    // Set initial state
    line.style.width = '0';
    line.style.opacity = '1';
    
    // Start typing animation with delay
    setTimeout(() => {
      line.style.animation = `typing ${3 + index}s steps(${line.textContent.length}, end) forwards`;
      
      // Play typing sound
      const typingSound = document.getElementById('typingSound');
      if (typingSound) {
        typingSound.currentTime = 0;
        typingSound.play();
      }
    }, index * 1500);
  });
};

// ===== HACK BUTTON FUNCTIONALITY =====
const initHackButton = () => {
  const hackBtn = document.getElementById('hackBtn');
  const output = document.getElementById('output');
  
  if (!hackBtn || !output) return;
  
  hackBtn.addEventListener('click', () => {
    // Play click sound
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    
    // Show loading state
    hackBtn.disabled = true;
    hackBtn.querySelector('.button-text').textContent = 'SCANNING...';
    
    // Clear output with animation
    output.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      output.innerHTML = '';
      output.style.animation = 'fadeIn 0.5s forwards';
      
      // Simulate hacking process
      const commands = [
        { text: "$ Initializing port scanner...", delay: 500 },
        { text: "$ Targeting mainframe...", delay: 1000 },
        { text: "$ Bypassing firewall...", delay: 1500 },
        { text: "$ Accessing root directory...", delay: 2000 },
        { text: "$ WARNING: INTRUSION DETECTED", delay: 2500, class: 'error' },
        { text: "$ Deploying countermeasures...", delay: 3000 },
        { text: "$ Establishing secure connection...", delay: 3500 },
        { text: "$ ACCESS GRANTED", delay: 4000, class: 'success' }
      ];
      
      commands.forEach((cmd, i) => {
        setTimeout(() => {
          const p = document.createElement('p');
          p.textContent = cmd.text;
          if (cmd.class) p.classList.add(cmd.class);
          
          // Add typing animation
          p.style.width = '0';
          p.style.animation = `typing 2s steps(${cmd.text.length}, end) forwards`;
          p.style.opacity = '1';
          
          output.appendChild(p);
          output.scrollTop = output.scrollHeight;
          
          // Play typing sound for each line
          if (typingSound) {
            typingSound.currentTime = 0;
            typingSound.play();
          }
          
          // Update status on last command
          if (i === commands.length - 1) {
            const statusLight = document.querySelector('#connectionStatus .status-light');
            if (statusLight) {
              statusLight.classList.add('online');
              statusLight.style.animation = 'none';
              void statusLight.offsetWidth; // Trigger reflow
              statusLight.style.animation = 'status-pulse 1s infinite';
            }
          }
        }, cmd.delay);
      });
      
      // Reset button after completion
      setTimeout(() => {
        hackBtn.disabled = false;
        hackBtn.querySelector('.button-text').textContent = 'SYSTEM SCAN COMPLETE';
        setTimeout(() => {
          hackBtn.querySelector('.button-text').textContent = 'INITIATE SYSTEM SCAN';
        }, 2000);
      }, commands[commands.length - 1].delay + 2000);
    }, 500);
  });
};

// ===== CLEAR TERMINAL BUTTON =====
const initClearButton = () => {
  const clearBtn = document.getElementById('clearBtn');
  const output = document.getElementById('output');
  
  if (!clearBtn || !output) return;
  
  clearBtn.addEventListener('click', () => {
    // Play click sound
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    
    // Clear with animation
    output.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      output.innerHTML = '';
      output.style.animation = 'fadeIn 0.5s forwards';
      
      // Add default message
      const p = document.createElement('p');
      p.textContent = "$ Terminal cleared. Type 'help' for commands.";
      p.style.width = '0';
      p.style.animation = 'typing 3s steps(40, end) forwards';
      p.style.opacity = '1';
      output.appendChild(p);
    }, 500);
  });
};

// ===== REAL-TIME CLOCK =====
const initClock = () => {
  const timeElement = document.getElementById('terminalTime');
  if (!timeElement) return;
  
  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  };
  
  updateClock();
  setInterval(updateClock, 1000);
};

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initTerminalTyping();
  initHackButton();
  initClearButton();
  initClock();
  
  // Set copyright year
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  
  // Connection status animation
  const connectionStatus = document.getElementById('connectionStatus');
  if (connectionStatus) {
    setTimeout(() => {
      connectionStatus.querySelector('.status-light').style.animation = 'status-pulse 2s infinite';
    }, 3000);
  }
});