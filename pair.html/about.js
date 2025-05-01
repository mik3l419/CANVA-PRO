// ===== TEAM DATA =====
const teamMembers = [
  {
    id: "shadow",
    name: "SHADOW",
    role: "Lead Security Researcher",
    email: "shadow@ciphertech.example",
    avatar: "assets/images/shadow.jpg",
    bio: "Former black hat turned white hat with 12 years of experience in penetration testing and vulnerability research. Specializes in zero-day exploits and advanced persistent threats. Has identified over 47 CVEs in major systems.",
    skills: [
      { name: "Pen Testing", level: 95 },
      { name: "Exploit Dev", level: 90 },
      { name: "Reverse Eng", level: 85 },
      { name: "Cryptanalysis", level: 80 }
    ],
    stats: {
      years: 12,
      projects: 89,
      cves: 47
    },
    contributions: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [12, 19, 8, 15, 22, 17]
    },
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  // Similar data for NEO and CRYPTO
];

// ===== INITIALIZE CONTRIBUTION CHARTS =====
const initCharts = () => {
  const ctx = document.getElementById('contributionsChart');
  
  if (ctx) {
    const member = teamMembers.find(m => m.id === currentDev);
    if (!member) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: member.contributions.labels,
        datasets: [{
          label: 'Commits',
          data: member.contributions.data,
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 255, 0, 0.1)'
            },
            ticks: {
              color: '#aaa'
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 255, 0, 0.1)'
            },
            ticks: {
              color: '#aaa'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                family: "'Share Tech Mono', monospace"
              }
            }
          }
        }
      }
    });
  }
};

// ===== CONTACT FORM HANDLING =====
const initContactForm = () => {
  const form = document.getElementById('devContactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    
    // Form data
    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      message: document.getElementById('contactMessage').value,
      to: currentDevEmail
    };
    
    // Simulate sending
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENCRYPTING...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
      setTimeout(() => {
        submitBtn.innerHTML = '<span>SEND MESSAGE</span><i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
        form.reset();
      }, 2000);
    }, 3000);
  });
};

// ===== ENHANCED AVATAR EFFECTS =====
const initAvatarEffects = () => {
  document.querySelectorAll('.dev-avatar').forEach(avatar => {
    avatar.addEventListener('mouseenter', () => {
      avatar.style.transform = 'scale(1.1)';
      avatar.style.boxShadow = '0 0 25px rgba(0, 255, 0, 0.5)';
    });
    
    avatar.addEventListener('mouseleave', () => {
      avatar.style.transform = 'scale(1)';
      avatar.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.7)';
    });
  });
};

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', () => {
  initTeamGrid();
  initModal();
  initHoverEffects();
  initClock();
  initAvatarEffects();
  initContactForm();
  
  // Animate stats counting
  animateStats();
  
  // Set copyright year
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  
  // Typing animation
  animateTyping();
});