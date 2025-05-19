// script.js for Portfolio Template

// ========== 1. Social Icons ==========
document.querySelectorAll('.social-icons a').forEach(a => {
  a.href = 'https://github.com/Fevigia';
  a.target = '_blank';
});

// ========== 2. Portfolio Modal ==========
const projectData = [
  {
    title: 'Tonic',
    company: 'CANOPY',
    role: 'Back End Dev',
    year: '2015',
    image: 'pic1.png',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required.',
    tags: ['html', 'CSS', 'javaScript'],
    github: 'https://github.com/Fevigia'
  },
  {
    title: 'Multi-Post Stories',
    company: 'FACEBOOK',
    role: 'Full Stack Dev',
    year: '2015',
    image: 'pic2.png',
    description: 'Experimental content creation feature that allows users to add to an existing story over the course of a day without spamming their friends.',
    tags: ['html', 'Ruby on rails', 'CSS', 'javaScript'],
    github: 'https://github.com/Fevigia'
  },
  {
    title: 'Facebook 360',
    company: 'FACEBOOK',
    role: 'Full Stack Dev',
    year: '2015',
    image: 'pic3.png',
    description: 'Exploring the future of media in Facebook\'s first Virtual Reality app; a place to discover and enjoy 360 photos and videos on Gear VR.',
    tags: ['html', 'Ruby on rails', 'CSS', 'javaScript'],
    github: 'https://github.com/Fevigia'
  },
  {
    title: 'Uber Navigation',
    company: 'Uber',
    role: 'Lead Developer',
    year: '2018',
    image: 'pic4.png',
    description: 'A smart assistant to make driving more safe, efficient, and fun by unlocking your most expensive computer: your car.',
    tags: ['html', 'Ruby on rails', 'CSS', 'javaScript'],
    github: 'https://github.com/Fevigia'
  }
];

function createModal(project) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-card">
      <span class="modal-close">&times;</span>
      <img src="${project.image}" alt="${project.title}" class="modal-img">
      <h2>${project.title}</h2>
      <div class="project-meta">
        <span class="company">${project.company}</span>
        <span class="dot"></span>
        <span class="role">${project.role}</span>
        <span class="dot"></span>
        <span class="year">${project.year}</span>
      </div>
      <p>${project.description}</p>
      <div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
      <a href="${project.github}" target="_blank" class="modal-github">View on GitHub</a>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
  modal.querySelector('.modal-close').onclick = () => {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  };
  modal.onclick = e => { if (e.target === modal) modal.querySelector('.modal-close').onclick(); };
}

document.querySelectorAll('.see-project').forEach((btn, i) => {
  btn.onclick = () => createModal(projectData[i]);
});

// ========== 3. Skills Dropdowns ==========
const skills = {
  Languages: [
    { img: 'javascript.png', name: 'JavaScript' },
    { img: 'html.png', name: 'HTML' },
    { img: 'css.png', name: 'CSS' }
  ],
  Frameworks: [
    { img: '', name: 'React' },
    { img: '', name: 'Node.js' },
    { img: '', name: 'Express' }
  ],
  Skills: [
    { img: '', name: 'Git' },
    { img: '', name: 'Teamwork' },
    { img: '', name: 'Problem Solving' }
  ]
};

function renderSkills() {
  document.querySelectorAll('.skill-category').forEach(cat => {
    const header = cat.querySelector('.skill-header h3').textContent.trim();
    const items = cat.querySelector('.skill-items');
    if (items && skills[header]) {
      items.innerHTML = skills[header].map(s =>
        `<div class="skill-item">${s.img ? `<img src="${s.img}" alt="${s.name}" />` : ''}<span>${s.name}</span></div>`
      ).join('');
    }
  });
}
renderSkills();

// Dropdown toggle and persistence
const skillCats = document.querySelectorAll('.skill-category');
skillCats.forEach((cat, idx) => {
  const header = cat.querySelector('.skill-header');
  const items = cat.querySelector('.skill-items');
  const icon = cat.querySelector('.dropdown-icon i');
  const key = 'skillCatOpen' + idx;
  // Restore state
  if (localStorage.getItem(key) === 'open') {
    items && (items.style.display = 'block');
    icon && (icon.className = 'fas fa-chevron-down');
  } else {
    items && (items.style.display = 'none');
    icon && (icon.className = 'fas fa-chevron-right');
  }
  header.onclick = () => {
    if (!items) return;
    const open = items.style.display === 'block';
    items.style.display = open ? 'none' : 'block';
    icon.className = open ? 'fas fa-chevron-right' : 'fas fa-chevron-down';
    localStorage.setItem(key, open ? 'closed' : 'open');
  };
});

// ========== 4. Hamburger Menu ==========
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.hamburger')) {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    document.querySelector('header').appendChild(hamburger);
  }
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navKey = 'navOpen';
  // Restore state
  if (localStorage.getItem(navKey) === 'open') {
    nav.classList.add('open');
    hamburger.classList.add('open');
  }
  hamburger.onclick = () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
    localStorage.setItem(navKey, nav.classList.contains('open') ? 'open' : 'closed');
  };
  // Close nav when a link is clicked (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 800) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        localStorage.setItem(navKey, 'closed');
      }
    });
  });
});

// ========== 5. Smooth Scrolling ==========
document.querySelectorAll('nav a').forEach(link => {
  link.onclick = function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  };
});

// ========== 6. Contact Form Validation ==========
const form = document.querySelector('.contact-form');
if (form) {
  form.onsubmit = function(e) {
    e.preventDefault();
    const [name, email, message] = form.querySelectorAll('input, textarea');
    let valid = true;
    // Remove old errors
    form.querySelectorAll('.error').forEach(el => el.remove());
    // Name validation
    if (!name.value.trim()) {
      valid = false;
      name.insertAdjacentHTML('afterend', '<div class="error">Name is required.</div>');
    }
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      valid = false;
      email.insertAdjacentHTML('afterend', '<div class="error">Valid email is required.</div>');
    }
    // Message validation
    if (!message.value.trim() || message.value.length < 10) {
      valid = false;
      message.insertAdjacentHTML('afterend', '<div class="error">Message must be at least 10 characters.</div>');
    }
    if (valid) {
      form.reset();
      form.insertAdjacentHTML('beforeend', '<div class="success">Message sent successfully!</div>');
      setTimeout(() => {
        form.querySelector('.success')?.remove();
      }, 3000);
    }
  };
}

// ========== 7. Resume Button ==========
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
  resumeBtn.onclick = function() {
    // If you have a real file, use: window.location = 'resume.pdf';
    alert('Resume download coming soon!');
  };
}

// ========== 8. Animations ==========
// Fade-in on scroll
const fadeEls = document.querySelectorAll('.project-card, .about-content, .skills-section, .contact-content');
function fadeInOnScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('fade-in');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Button hover effect
const btns = document.querySelectorAll('button, .see-project');
btns.forEach(btn => {
  btn.onmouseenter = () => btn.classList.add('btn-hover');
  btn.onmouseleave = () => btn.classList.remove('btn-hover');
});

// ========== 9. Modal/Card Styles ==========
// Add minimal styles for modal and hamburger if not present
const style = document.createElement('style');
style.textContent = `
.modal-overlay { position: fixed; z-index: 1000; left:0; top:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.3s; }
.modal-overlay.show { opacity:1; }
.modal-card { background:#fff; border-radius:10px; padding:2rem; max-width:400px; width:90vw; position:relative; box-shadow:0 8px 32px rgba(0,0,0,0.2); animation: popIn 0.3s; }
@keyframes popIn { from { transform:scale(0.8); opacity:0; } to { transform:scale(1); opacity:1; } }
.modal-close { position:absolute; top:10px; right:20px; font-size:2rem; cursor:pointer; }
.modal-img { width:100%; border-radius:8px; margin-bottom:1rem; }
.modal-github { display:inline-block; margin-top:1rem; color:#fff; background:#333; padding:0.5rem 1rem; border-radius:5px; text-decoration:none; }
.hamburger { display:none; flex-direction:column; cursor:pointer; gap:5px; margin-left:1rem; width:40px; height:40px; justify-content:center; align-items:center; transition:background 0.2s; border-radius:8px; }
.hamburger.open, .hamburger:hover { background:#f0f0f0; }
.hamburger span { display:block; width:28px; height:4px; background:#333; border-radius:2px; margin:3px 0; transition:all 0.3s; }
.hamburger.open span:nth-child(1) { transform:translateY(8px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity:0; }
.hamburger.open span:nth-child(3) { transform:translateY(-8px) rotate(-45deg); }
nav.open { left:0 !important; }
@media (max-width: 800px) {
  nav { position:fixed; left:-100vw; top:0; width:60vw; height:100vh; background:#fff; transition:left 0.3s; z-index:999; display:flex; flex-direction:column; justify-content:center; align-items:center; }
  nav ul { flex-direction:column; gap:2rem; }
  nav.open { left:0; }
  .hamburger { display:flex; }
}
.fade-in { opacity:1 !important; transform:translateY(0) !important; transition:all 0.7s; }
.project-card, .about-content, .skills-section, .contact-content { opacity:0; transform:translateY(40px); }
.btn-hover { box-shadow:0 4px 16px #3333; transform:scale(1.05); transition:all 0.2s; }
.error { color:red; font-size:0.9em; margin:0.2em 0 0.5em 0; }
.success { color:green; font-size:1em; margin:0.5em 0; }
`;
document.head.appendChild(style);
