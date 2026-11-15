/* =========================================================
   SANJAY G. L. — INTERACTIVE & ANIMATION ENGINE (v3.0.0)
   Features: Custom Cursor, Orbit Animation, Scroll Progress,
             AOS Reveals, Typed Role, Particles Canvas,
             Live Contact Form API, Interactive AI Assistant
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Loading Screen ---------- */
  const loader = document.getElementById('loader');
  const dismissLoader = () => {
    if (loader && !loader.classList.contains('hide')) {
      loader.classList.add('hide');
    }
  };
  window.addEventListener('load', () => setTimeout(dismissLoader, 300));
  setTimeout(dismissLoader, 1800); // Fallback

  /* ---------- 2. Dark / Light Theme Toggle ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sanjay-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('sanjay-theme', next);
    });
  }

  /* ---------- 3. Scroll Progress Bar & Navbar Scroll ---------- */
  const progressBar = document.getElementById('scroll-progress');
  const backTop = document.getElementById('back-to-top');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrollTotal = doc.scrollHeight - doc.clientHeight;
    const scrolled = scrollTotal > 0 ? (doc.scrollTop / scrollTotal) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
    if (navbar) {
      navbar.classList.toggle('scrolled', doc.scrollTop > 30);
    }
    if (backTop) {
      backTop.classList.toggle('show', doc.scrollTop > 450);
    }
  }, { passive: true });

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 4. Mobile Navigation Menu ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- 5. Custom Smooth Trailing Cursor ---------- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const hoverTargets = 'a, button, .btn, .skill-card, .tool-card, .proj-card, .cert-card, .interest-card';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }

  /* ---------- 6. Ripple Effect on Buttons ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 7. AOS (Animate on Scroll) Initialization ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  /* Fallback Reveal Observer */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------- 8. Dynamic Role Typing with Typed.js ---------- */
  const typedEl = document.getElementById('typed-role');
  if (typedEl && window.Typed) {
    new Typed('#typed-role', {
      strings: [
        'Full Stack Web Developer',
        'AI Workflow Engineer',
        'Python & Backend Developer',
        'BCA Student @ PESIAMS',
        'Problem Solver & Builder'
      ],
      typeSpeed: 44,
      backSpeed: 26,
      backDelay: 1500,
      loop: true,
      smartBackspace: true
    });
  }

  /* ---------- 9. Particles.js Interactive Hero Background ---------- */
  if (document.getElementById('particles-hero') && window.particlesJS) {
    particlesJS('particles-hero', {
      particles: {
        number: { value: 45, density: { enable: true, value_area: 800 } },
        color: { value: ['#2F6FED', '#7C6FED', '#6FA8FF'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#6FA8FF',
          opacity: 0.22,
          width: 1
        },
        move: { enable: true, speed: 1.1, out_mode: 'out' }
      },
      interactivity: {
        events: { onhover: { enable: true, mode: 'grab' }, resize: true },
        modes: { grab: { distance: 150, line_linked: { opacity: 0.45 } } }
      },
      retina_detect: true
    });
  }

  /* ---------- 10. Multi-Ring Orbit Animation Around Profile ---------- */
  const orbitWrap = document.querySelector('.orbit-wrap');
  if (orbitWrap) {
    const orbitIcons = [
      // Ring 1 (Inner)
      { ring: 1, icon: 'devicon-python-plain colored' },
      { ring: 1, icon: 'devicon-javascript-plain colored' },
      { ring: 1, icon: 'devicon-html5-plain colored' },
      { ring: 1, icon: 'devicon-css3-plain colored' },

      // Ring 2 (Middle)
      { ring: 2, icon: 'devicon-postgresql-plain colored' },
      { ring: 2, icon: 'devicon-docker-plain colored' },
      { ring: 2, icon: 'devicon-cplusplus-plain colored' },
      { ring: 2, icon: 'devicon-bootstrap-plain colored' },
      { ring: 2, icon: 'fa-solid fa-brain' },

      // Ring 3 (Outer)
      { ring: 3, icon: 'devicon-git-plain colored' },
      { ring: 3, icon: 'devicon-github-original' },
      { ring: 3, icon: 'devicon-vscode-plain colored' },
      { ring: 3, icon: 'devicon-figma-plain colored' },
      { ring: 3, icon: 'fa-solid fa-shield-halved' }
    ];

    [1, 2, 3].forEach(ringNum => {
      const items = orbitIcons.filter(o => o.ring === ringNum);
      const radiusPct = ringNum === 1 ? 33 : ringNum === 2 ? 44 : 54;
      const duration = ringNum === 1 ? 28 : ringNum === 2 ? 42 : 58;

      items.forEach((item, index) => {
        const startAngle = (360 / items.length) * index;
        const el = document.createElement('div');
        el.className = 'orbit-icon';
        el.innerHTML = `<i class="${item.icon}"></i>`;
        orbitWrap.appendChild(el);

        const placeIcon = (angleDeg) => {
          const rad = angleDeg * (Math.PI / 180);
          const x = 50 + radiusPct * Math.cos(rad);
          const y = 50 + radiusPct * Math.sin(rad);
          el.style.left = x + '%';
          el.style.top = y + '%';
        };

        let currentAngle = startAngle;
        const dir = ringNum === 2 ? -1 : 1;
        const speed = (360 / duration) * dir;
        placeIcon(currentAngle);

        let lastTime = performance.now();
        const animateStep = (now) => {
          const dt = (now - lastTime) / 1000;
          lastTime = now;
          currentAngle += speed * dt;
          placeIcon(currentAngle);
          requestAnimationFrame(animateStep);
        };
        requestAnimationFrame(animateStep);
      });
    });
  }

  /* ---------- 11. Count-Up Statistics & Skill Bars on Scroll ---------- */
  const statCounters = document.querySelectorAll('[data-count]');
  const skillBars = document.querySelectorAll('.skill-bar');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Animate Skill Bars
      if (entry.target.classList.contains('skill-bar')) {
        const fill = entry.target.querySelector('i');
        const level = entry.target.dataset.level || 0;
        if (fill) {
          fill.style.width = level + '%';
        }
      }

      // Animate Number Counters
      if (entry.target.hasAttribute('data-count')) {
        const targetNum = parseInt(entry.target.dataset.count, 10) || 0;
        let currentNum = 0;
        const step = Math.max(1, Math.floor(targetNum / 40));
        const timer = setInterval(() => {
          currentNum += step;
          if (currentNum >= targetNum) {
            currentNum = targetNum;
            clearInterval(timer);
          }
          entry.target.textContent = currentNum;
        }, 25);
      }

      animationObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  statCounters.forEach(el => animationObserver.observe(el));
  skillBars.forEach(el => animationObserver.observe(el));

  /* ---------- 12. Category Filter Buttons ---------- */
  document.querySelectorAll('#projects .filter-row, #certificates .filter-row').forEach(row => {
    const scope = row.closest('section');
    const buttons = row.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        scope.querySelectorAll('[data-cats]').forEach(card => {
          const cats = card.dataset.cats.split(',');
          const matches = filter === 'all' || cats.includes(filter);
          card.style.display = matches ? '' : 'none';
        });
      });
    });
  });

  /* ---------- 13. Active Nav Link on Scroll ---------- */
  const observedSections = document.querySelectorAll('main section[id]');
  if (observedSections.length) {
    const navAnchors = document.querySelectorAll('.nav-links a');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-70px 0px -50% 0px' });
    observedSections.forEach(s => navObserver.observe(s));
  }

  /* ---------- 14. Live Contact Form Handler (/api/contact) ---------- */
  const contactForm = document.getElementById('contact-form');
  const contactMsg = document.getElementById('contact-msg');

  if (contactForm && contactMsg) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('from_name') || formData.get('name') || '',
        email: formData.get('from_email') || formData.get('email') || '',
        subject: formData.get('subject') || 'Portfolio Contact Message',
        message: formData.get('message') || ''
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
          contactMsg.textContent = data.message || '✓ Message sent successfully! Sanjay will get back to you shortly.';
          contactMsg.className = 'form-msg show ok';
          contactForm.reset();
        } else {
          contactMsg.textContent = '✕ ' + (data.message || data.error || 'Failed to send message. Please try again.');
          contactMsg.className = 'form-msg show err';
        }
      } catch (err) {
        contactMsg.textContent = '✕ Network error. Please email directly at sanjaygl3006@gmail.com.';
        contactMsg.className = 'form-msg show err';
      } finally {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        setTimeout(() => contactMsg.classList.remove('show'), 6000);
      }
    });
  }

  /* ---------- 15. Resume Request Form Toggle & Submission ---------- */
  const resumeBtn = document.getElementById('resume-request-btn');
  const resumeForm = document.getElementById('resume-form');
  const resumeMsg = document.getElementById('resume-msg');

  if (resumeBtn && resumeForm) {
    resumeBtn.addEventListener('click', () => {
      resumeForm.classList.toggle('hidden');
      resumeForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    resumeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = resumeForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Requesting...';
      submitBtn.disabled = true;

      const emailInput = resumeForm.querySelector('input[type="email"]');
      const userEmail = emailInput ? emailInput.value : '';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Resume Requester',
            email: userEmail,
            subject: 'Resume Access Request',
            message: `A visitor (${userEmail}) requested Sanjay's latest Resume via the portfolio website.`
          })
        });

        const data = await response.json();
        resumeMsg.textContent = data.status === 'success' ? '✓ Resume request delivered! Thank you.' : '✓ Request logged. You can also download directly above.';
        resumeMsg.className = 'form-msg show ok';
        resumeForm.reset();
      } catch (err) {
        resumeMsg.textContent = '✓ Request noted. Feel free to use the direct download button!';
        resumeMsg.className = 'form-msg show ok';
      } finally {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        setTimeout(() => resumeMsg.classList.remove('show'), 5000);
      }
    });
  }

  /* ---------- 16. Q&A Chat Assistant Widget ---------- */
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatSuggest = document.getElementById('chat-suggest');

  const KNOWLEDGE_BASE = [
    {
      keys: ['name', 'who are you', 'who is sanjay'],
      answer: "I'm Sanjay G. L. — a BCA student, AI workflow engineer, and full-stack Python/web developer based in Shivamogga, Karnataka."
    },
    {
      keys: ['education', 'college', 'degree', 'bca', 'university', 'study'],
      answer: "Sanjay is pursuing his Bachelor of Computer Applications (BCA) at PES Institute of Advanced Management Studies (PESIAMS), Shivamogga (2024–2026, 3rd Year, 5th Sem)."
    },
    {
      keys: ['internship', 'experience', 'work', 'job', 'milano', 'oasis'],
      answer: "Sanjay is currently an AI, ML & Python Developer Intern at Milano Infotech (Aug 2026 – Present), and previously completed an internship at Oasis Infobyte (AICTE OIB-SIP Star Performer, Mar 2026)."
    },
    {
      keys: ['skills', 'tech', 'stack', 'languages', 'tools'],
      answer: "Core skills: Python, JavaScript, HTML5/CSS3, Bootstrap, C, C++, Java, SQL, PostgreSQL, SQLite, Docker, Blockchain, Cyber Security, Git, VS Code, Cursor AI, Figma, and Vercel."
    },
    {
      keys: ['projects', 'portfolio', 'built', 'work'],
      answer: "Sanjay has built over 100 projects! Key highlights include PureWeaves (handloom saree e-commerce), Vinayaka Construction platform, GrabNotes (BCA notes hub), Vibe Chat (AI assistant), and AI agents using Google AI APIs."
    },
    {
      keys: ['certificates', 'certification', 'openai', 'skill india'],
      answer: "Sanjay holds 60+ verified certificates, including OpenAI Academy: Apply AI at Work, Skill India Cyber Security & Software Testing, Skill India Python & Full-Stack, and government CPR / Road Safety awards."
    },
    {
      keys: ['contact', 'email', 'phone', 'reach', 'hire'],
      answer: "You can email Sanjay directly at sanjaygl3006@gmail.com, call +91 81232 40049, or use the contact form on this page!"
    },
    {
      keys: ['resume', 'cv', 'download'],
      answer: "You can download Sanjay's verified resume PDF directly from the top navigation bar or the Resume section (assets/Sanjay_GL_Resume.pdf)."
    },
    {
      keys: ['volunteer', 'community', 'blood', 'cpr'],
      answer: "Sanjay actively gives back through voluntary blood donation camps, CPR Save a Life award programs, and national road safety initiatives."
    },
    {
      keys: ['hello', 'hi', 'hey', 'start'],
      answer: "Hello there! 👋 I am Sanjay's portfolio AI assistant. Ask me anything about Sanjay's education, skills, projects, certifications, or work experience!"
    }
  ];

  const FALLBACK_REPLY = "I'm here to help with information on Sanjay's education (PESIAMS), skills, internships (Milano Infotech & Oasis Infobyte), projects, or how to contact him. What would you like to know?";

  function getAnswer(query) {
    const text = query.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keys.some(k => text.includes(k))) {
        return item.answer;
      }
    }
    return FALLBACK_REPLY;
  }

  function appendChatMessage(text, sender) {
    if (!chatBody) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + sender;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function initChatAssistant() {
    if (chatBody && chatBody.children.length === 0) {
      appendChatMessage("Hi! 👋 I'm Sanjay's AI assistant. Ask me anything about his projects, internships at Milano Infotech, skills, or certifications.", 'bot');

      const suggestions = ['Education?', 'Internships?', 'Top Projects?', 'Skills?', 'Contact Info?'];
      if (chatSuggest) {
        chatSuggest.innerHTML = suggestions.map(s => `<button type="button">${s}</button>`).join('');
        chatSuggest.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            const q = btn.textContent;
            appendChatMessage(q, 'user');
            setTimeout(() => appendChatMessage(getAnswer(q), 'bot'), 300);
          });
        });
      }
    }
  }

  if (chatToggle && chatPanel) {
    chatToggle.addEventListener('click', () => {
      const isOpen = chatPanel.classList.toggle('open');
      chatToggle.classList.toggle('open', isOpen);
      if (isOpen) {
        initChatAssistant();
        if (chatInput) chatInput.focus();
      }
    });
  }

  function sendUserChatMessage() {
    if (!chatInput) return;
    const val = chatInput.value.trim();
    if (!val) return;
    appendChatMessage(val, 'user');
    chatInput.value = '';

    // Simulate smart thinking delay
    setTimeout(() => {
      appendChatMessage(getAnswer(val), 'bot');
    }, 320);
  }

  if (chatSend) {
    chatSend.addEventListener('click', sendUserChatMessage);
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendUserChatMessage();
    });
  }

  console.log("Welcome to Sanjay G. L. Portfolio Website!");
});
