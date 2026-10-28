/**
 * SANJAY G. L. — Clean Portfolio Redesign Engine
 * Modern, Minimal, Performant
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Dynamic Footer Year
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // 1. Theme Manager
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-theme');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon';
      }
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun';
      }
    }
  }

  // Load saved preference or default to light mode
  const savedTheme = localStorage.getItem('sanjay_portfolio_theme') || 'light';
  applyTheme(savedTheme === 'light');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-theme');
      const newTheme = !isCurrentlyLight;
      applyTheme(newTheme);
      localStorage.setItem('sanjay_portfolio_theme', newTheme ? 'light' : 'dark');
    });
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Subtle Fade-in on Scroll
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('in-view'));
  }

  // 4. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10) || 0;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 30));
          const duration = 1200;
          const intervalTime = Math.max(15, Math.floor(duration / (target / step)));

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target + (target >= 50 ? '+' : '');
              clearInterval(timer);
            } else {
              el.textContent = current;
            }
          }, intervalTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    statNumbers.forEach(num => counterObserver.observe(num));
  }

  // 5. Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      // Honeypot check: if the hidden website field is filled, it's a bot
      const honeypot = document.getElementById('contact-website')?.value;
      if (honeypot) {
        // Silently succeed to confuse bots
        showStatus('Thank you, your message has been received!', 'success');
        contactForm.reset();
        return;
      }

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();

        if (response.ok && data.success !== false) {
          showStatus('Thank you, Sanjay has received your message!', 'success');
          contactForm.reset();
        } else {
          showStatus(data.error || 'Failed to send message. Please try emailing directly.', 'error');
        }
      } catch (err) {
        // Fallback for static servers
        showStatus('Message noted! You can also reach Sanjay directly at sanjaygl2006@gmail.com', 'success');
        contactForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  }
  // 6. Resume PDF → DOCX Fallback
  document.querySelectorAll('a[href*="Resume"], .nav-resume-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const href = btn.getAttribute('href') || '';
      if (!href.includes('.pdf')) return; // skip DOCX links
      try {
        const res = await fetch(href, { method: 'HEAD' });
        if (!res.ok) {
          e.preventDefault();
          // PDF doesn't exist — fall back to DOCX
          const docxHref = href.replace('.pdf', '.docx');
          const docxRes = await fetch(docxHref, { method: 'HEAD' });
          if (docxRes.ok) {
            btn.setAttribute('href', docxHref);
            btn.setAttribute('download', 'Sanjay_GL_Resume.docx');
            btn.querySelector('i')?.classList.replace('fa-file-pdf', 'fa-file-lines');
            btn.lastChild.textContent && (btn.lastChild.textContent = btn.lastChild.textContent.replace('PDF', 'DOCX'));
          } else {
            // Neither exists, scroll to contact form
            const contactSec = document.getElementById('contact');
            if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
            const subjectInput = document.getElementById('contact-subject');
            if (subjectInput) {
              subjectInput.value = 'Resume Request - Sanjay G. L.';
              subjectInput.focus();
            }
          }
        }
      } catch (err) {
        // Network error — scroll to contact
        e.preventDefault();
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
