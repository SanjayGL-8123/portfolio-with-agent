// Projects Page Interactive Filtering, Sort, Search, Pagination & Modal Controls
document.addEventListener('DOMContentLoaded', () => {
  const getGlobalProjects = () => {
    if (typeof window !== 'undefined') {
      if (Array.isArray(window.PROJECTS_DATA) && window.PROJECTS_DATA.length) return window.PROJECTS_DATA;
      if (Array.isArray(window.projectsData) && window.projectsData.length) return window.projectsData;
    }
    if (typeof projectsData !== 'undefined' && Array.isArray(projectsData) && projectsData.length) {
      return projectsData;
    }
    return [];
  };

  const projectsList = getGlobalProjects();

  if (!projectsList || !projectsList.length) {
    console.warn('Projects data not yet loaded. Retrying on window load...');
    window.addEventListener('load', () => {
      const retryList = getGlobalProjects();
      if (retryList && retryList.length) {
        initProjectsPage(retryList);
      }
    });
    return;
  }

  initProjectsPage(projectsList);

  function initProjectsPage(projectsList) {
    const grid = document.getElementById('projectsGrid');
    const searchInput = document.getElementById('projectSearch');
    const categoryContainer = document.getElementById('categoryFilters');
    const techSelect = document.getElementById('techFilter');
    const sortSelect = document.getElementById('sortSelect');
    const visibleCountEl = document.getElementById('visibleCount');
    const paginationContainer = document.getElementById('paginationControls');

    const PAGE_SIZE = 100;
    let currentPage = 1;

    // Categories list per requirements
    const categories = ['all', 'AI & ML', 'Web Apps', 'Tools & Security', 'Games', 'Portfolios & Profiles'];
    const categoryLabels = {
      'all': 'All Projects',
      'AI & ML': 'AI & ML',
      'Web Apps': 'Web Apps',
      'Tools & Security': 'Tools & Security',
      'Games': 'Games',
      'Portfolios & Profiles': 'Portfolios & Profiles'
    };

    // Technologies list
    const allTechs = ['all', ...new Set(projectsList.flatMap(p => p.tech || []))].sort();

  // Parse URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  let currentCategory = urlParams.get('category') || 'all';
  let currentTech = urlParams.get('tech') || 'all';
  let currentSearch = urlParams.get('search') || '';
  let currentSort = urlParams.get('sort') || 'year-desc';
  const initialPage = parseInt(urlParams.get('page'), 10);
  if (!isNaN(initialPage) && initialPage > 0) {
    currentPage = initialPage;
  }

  // Sync Input Elements with Initial State
  if (searchInput && currentSearch) {
    searchInput.value = currentSearch;
  }
  if (sortSelect) {
    sortSelect.value = currentSort;
  }

  // Populate tech select
  if (techSelect) {
    techSelect.innerHTML = allTechs.map(t => `<option value="${t}">${t === 'all' ? 'All Technologies' : t}</option>`).join('');
    techSelect.value = currentTech;
    techSelect.addEventListener('change', (e) => {
      currentTech = e.target.value;
      currentPage = 1;
      updateUrlAndRender();
    });
  }

  // Render category buttons with aria-pressed state
  function renderCategoryButtons() {
    if (!categoryContainer) return;
    categoryContainer.innerHTML = categories.map(cat => {
      const isActive = cat.toLowerCase() === currentCategory.toLowerCase();
      return `
        <button type="button" class="tab-btn ${isActive ? 'active' : ''}" data-cat="${cat}" role="button" aria-pressed="${isActive ? 'true' : 'false'}">
          ${categoryLabels[cat] || cat}
        </button>
      `;
    }).join('');

    categoryContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-cat');
        currentPage = 1;
        updateUrlAndRender();
      });
    });
  }

  // Search Input with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim().toLowerCase();
        currentPage = 1;
        updateUrlAndRender();
      }, 200);
    });
  }

  // Sort Select with active state
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      currentPage = 1;
      updateUrlAndRender();
    });
  }

  function updateUrlAndRender() {
    renderCategoryButtons();

    // Update query parameters without reloading
    const params = new URLSearchParams();
    if (currentCategory !== 'all') params.set('category', currentCategory);
    if (currentTech !== 'all') params.set('tech', currentTech);
    if (currentSort !== 'year-desc') params.set('sort', currentSort);
    if (currentSearch) params.set('search', currentSearch);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const queryString = params.toString();
    const newRelativePathQuery = window.location.pathname + (queryString ? '?' + queryString : '');
    try {
      window.history.replaceState(null, '', newRelativePathQuery);
    } catch (e) {}

    render();
  }

  function getFilteredList() {
    let list = [...projectsList];

    // Filter Category
    if (currentCategory !== 'all') {
      list = list.filter(p => (p.category || '').toLowerCase() === currentCategory.toLowerCase());
    }

    // Filter Tech
    if (currentTech !== 'all') {
      list = list.filter(p => (p.tech || []).some(t => t.toLowerCase() === currentTech.toLowerCase()));
    }

    // Search Query
    if (currentSearch) {
      list = list.filter(p =>
        (p.title && p.title.toLowerCase().includes(currentSearch)) ||
        (p.tagline && p.tagline.toLowerCase().includes(currentSearch)) ||
        (p.description && p.description.toLowerCase().includes(currentSearch)) ||
        (p.desc && p.desc.toLowerCase().includes(currentSearch)) ||
        (p.category && p.category.toLowerCase().includes(currentSearch)) ||
        ((p.tech || []).some(t => t.toLowerCase().includes(currentSearch)))
      );
    }

    // Sort
    if (currentSort === 'year-desc') {
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (currentSort === 'year-asc') {
      list.sort((a, b) => (a.year || 0) - (b.year || 0));
    } else if (currentSort === 'name-asc') {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (currentSort === 'name-desc') {
      list.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    }

    return list;
  }

  function renderPagination(totalItems) {
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = '';

    // Previous Button
    html += `
      <button type="button" class="btn btn-outline btn-sm" id="prevPageBtn" ${currentPage === 1 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} aria-label="Previous Page">
        <i class="fa-solid fa-chevron-left" aria-hidden="true"></i> Prev
      </button>
    `;

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        html += `
          <button type="button" class="tab-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" style="min-width:38px;height:38px;padding:0 12px;font-weight:700;" aria-label="Page ${i}" aria-current="${i === currentPage ? 'page' : 'false'}">
            ${i}
          </button>
        `;
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        html += `<span style="color:var(--text-muted);padding:0 4px;" aria-hidden="true">...</span>`;
      }
    }

    // Next Button
    html += `
      <button type="button" class="btn btn-outline btn-sm" id="nextPageBtn" ${currentPage === totalPages ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} aria-label="Next Page">
        Next <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>
    `;

    paginationContainer.innerHTML = html;

    const prevBtn = document.getElementById('prevPageBtn');
    if (prevBtn && currentPage > 1) {
      prevBtn.addEventListener('click', () => {
        currentPage--;
        updateUrlAndRender();
        window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' });
      });
    }

    const nextBtn = document.getElementById('nextPageBtn');
    if (nextBtn && currentPage < totalPages) {
      nextBtn.addEventListener('click', () => {
        currentPage++;
        updateUrlAndRender();
        window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' });
      });
    }

    paginationContainer.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.getAttribute('data-page'), 10);
        updateUrlAndRender();
        window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' });
      });
    });
  }

  function render() {
    const list = getFilteredList();

    if (visibleCountEl) {
      visibleCountEl.textContent = list.length;
    }

    if (!grid) return;

    // Empty state (Part 7, Item 38)
    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 60px 20px;" class="glass empty-state-box">
          <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--emerald-primary); margin-bottom: 16px;" aria-hidden="true"></i>
          <h3 style="font-size:1.4rem;font-weight:700;margin-bottom:8px;">No projects match these filters</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px; max-width:480px; margin-left:auto; margin-right:auto;">
            Try clearing your search query or selecting a different category filter to view Sanjay's projects.
          </p>
          <button type="button" class="btn btn-primary btn-sm" id="clearFiltersBtn">
            <i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Clear filters
          </button>
        </div>
      `;

      if (paginationContainer) paginationContainer.innerHTML = '';

      const clearBtn = document.getElementById('clearFiltersBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          currentCategory = 'all';
          currentTech = 'all';
          currentSearch = '';
          currentSort = 'year-desc';
          currentPage = 1;
          if (searchInput) searchInput.value = '';
          if (techSelect) techSelect.value = 'all';
          if (sortSelect) sortSelect.value = 'year-desc';
          updateUrlAndRender();
        });
      }
      return;
    }

    // Pagination slice
    const totalPages = Math.ceil(list.length / PAGE_SIZE);
    if (currentPage > totalPages) currentPage = totalPages;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedItems = list.slice(startIndex, startIndex + PAGE_SIZE);

    let html = '';

    // Helper: Detect and extract APIs & AI Keys used in project
    function extractProjectApis(p) {
      const combined = [
        ...(p.tech || []),
        p.title || '',
        p.description || '',
        p.overview || '',
        p.architecture || ''
      ].join(' ').toLowerCase();

      const apis = [];
      if (combined.includes('nasa power')) apis.push('NASA POWER Earth API');
      if (combined.includes('gemini') || combined.includes('google api') || combined.includes('google ai') || combined.includes('google cloud')) {
        apis.push('Google Gemini API');
      }
      if (combined.includes('openai') || combined.includes('gpt') || combined.includes('grok')) {
        apis.push('OpenAI / Grok API');
      }
      if (combined.includes('yolo')) apis.push('Ultralytics YOLOv8 Vision API');
      if (combined.includes('webrtc')) apis.push('WebRTC Peer-to-Peer Mesh');
      if (combined.includes('websocket')) apis.push('WebSocket Real-time API');
      if (combined.includes('firebase')) apis.push('Firebase Realtime Database API');
      if (combined.includes('supabase')) apis.push('Supabase REST & Auth API');
      if (combined.includes('fastapi')) apis.push('FastAPI Async REST API');
      else if (combined.includes('flask')) apis.push('Flask RESTful Endpoints');
      if (combined.includes('scikit') || combined.includes('random forest') || combined.includes('gradient boosting') || combined.includes('machine learning')) {
        if (!apis.some(a => a.includes('ML'))) apis.push('Scikit-Learn ML Pipelines');
      }
      if (combined.includes('tensorflow') || combined.includes('keras') || combined.includes('cnn')) {
        apis.push('TensorFlow / Keras CNN Engine');
      }
      if (combined.includes('qr') || combined.includes('qrcode')) apis.push('QR Vector & Canvas Engine');

      if (apis.length === 0) {
        if (combined.includes('python')) apis.push('Python Native APIs & Standard Library');
        else if (combined.includes('javascript') || combined.includes('html') || combined.includes('react') || combined.includes('typescript')) {
          apis.push('DOM & Web Storage APIs (LocalStorage)');
        } else {
          apis.push('Standard System & File IO APIs');
        }
      }
      return apis;
    }

    paginatedItems.forEach(p => {
      const modalApis = extractProjectApis(p);
    const desc = p.description || p.desc || p.tagline || '';
      const techList = p.tech || [];
      const hasLive = Boolean(p.live && p.live.trim());
      const apis = extractProjectApis(p);

      // Force cache-busted placeholder to bypass any stale 404 in browser disk cache
      const rawImg = p.image || '';
      const imgSrc = rawImg.includes('project_placeholder.svg')
        ? 'assets/project_placeholder.svg?v=2'
        : (rawImg || 'assets/project_placeholder.svg?v=2');

      const imageHtml = `
        <img src="${imgSrc}" alt="${p.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;background:var(--grad-soft);">
          <i class="fa-solid ${p.icon || 'fa-code'}" style="font-size:2.4rem;color:var(--blue);" aria-hidden="true"></i>
        </div>
      `;

      html += `
        <div class="flip-card" id="project-card-${p.id}" tabindex="0" role="region" aria-label="${p.title}" onclick="this.classList.toggle('flipped')">
          <div class="flip-card-inner">
            <!-- FRONT FACE (Clean White Surface) -->
            <div class="flip-card-front">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                ${p.featured ? '<span class="tag" style="background:var(--grad-primary);color:#fff;font-weight:700;">★ Featured</span>' : `<span></span>`}
                <span class="tag" style="background:var(--grad-soft);color:var(--blue);font-weight:700;">
                  ${p.category}
                </span>
              </div>

              <div style="margin:2px 0 12px 0;border-radius:var(--radius-md);overflow:hidden;position:relative;height:140px;border:1px solid var(--line);background:var(--white);">
                ${imageHtml}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
                <span style="font-size:0.75rem;color:var(--violet);font-family:var(--font-mono);font-weight:700;">Year ${p.year}</span>
              </div>

              <h3 style="margin:0 0 6px 0;font-size:1.15rem;line-height:1.35;font-family:var(--font-display);font-weight:700;color:var(--ink);">${p.title}</h3>
              <p style="margin:0 0 10px 0;font-size:0.84rem;color:var(--ink-soft);line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
                ${desc}
              </p>

              <div class="tag-row" style="margin-bottom:12px;gap:6px;">
                ${techList.slice(0, 4).map(t => `<span class="tag" style="font-size:0.72rem;padding:3px 8px;">${t}</span>`).join('')}
                ${techList.length > 4 ? `<span class="tag" style="font-size:0.72rem;padding:3px 8px;">+${techList.length - 4}</span>` : ''}
              </div>

              <div class="flip-hint">
                <i class="fa-solid fa-arrows-rotate"></i> Move cursor to flip Architecture &amp; APIs
              </div>
            </div>

            <!-- BACK FACE (Architecture & APIs - Exact Same White Surface) -->
            <div class="flip-card-back" onclick="event.stopPropagation()">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--line);">
                <span class="tag" style="background:var(--grad-soft);color:var(--blue);font-weight:700;">${p.category} &bull; ${p.year}</span>
                <span style="font-size:0.75rem;color:var(--ink-faint);font-family:var(--font-mono);"><i class="fa-solid fa-microchip" style="color:var(--violet);margin-right:4px;"></i> Architecture</span>
              </div>

              <h4 style="margin:2px 0 10px 0;font-size:1.05rem;font-family:var(--font-display);font-weight:700;color:var(--ink);line-height:1.35;">
                ${p.title}
              </h4>

              <div class="spec-box">
                <div class="spec-item">
                  <i class="fa-solid fa-desktop" style="color:var(--blue);" title="Front End"></i>
                  <div><span class="spec-label" style="color:var(--blue);">Front End Language</span> <span style="color:var(--ink);font-weight:500;">${p.frontEnd || 'HTML5, CSS3, JavaScript'}</span></div>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-server" style="color:var(--violet);" title="Back End"></i>
                  <div><span class="spec-label" style="color:var(--violet);">Back End Framework</span> <span style="color:var(--ink);font-weight:500;">${p.backEnd || 'Python'}</span></div>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-database" style="color:#d97706;" title="Database"></i>
                  <div><span class="spec-label" style="color:#d97706;">Database Storage</span> <span style="color:var(--ink);font-weight:500;">${p.database || 'None'}</span></div>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-bolt" style="color:var(--mint);" title="APIs &amp; AI Keys"></i>
                  <div><span class="spec-label" style="color:var(--mint);">APIs &amp; AI Keys</span> <span style="color:var(--ink);font-weight:500;">${apis.join(' &bull; ')}</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    renderPagination(list.length);
  }

  // Premium Project Detailed Modal Controls
  window.openPremiumProjectModal = function(id) {
    const p = projectsList.find(item => String(item.id) === String(id));
    if (!p) return;

    let modal = document.getElementById('premiumProjectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'premium-modal-overlay';
      modal.id = 'premiumProjectModal';
      document.body.appendChild(modal);
    }

    const modalApis = extractProjectApis(p);
    const desc = p.description || p.desc || p.tagline || '';
    const rawModalImg = p.image || '';
    const modalImgSrc = rawModalImg.includes('project_placeholder.svg')
      ? 'assets/project_placeholder.svg?v=2'
      : (rawModalImg || 'assets/project_placeholder.svg?v=2');

    const imageHtml = `
      <img class="modal-project-img" src="${modalImgSrc}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" style="width:100%;max-height:220px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:16px;">
      <div style="display:none;width:100%;height:160px;align-items:center;justify-content:center;background:var(--grad-soft);border-radius:var(--radius-md);border:1px solid var(--line);margin-bottom:16px;">
        <i class="fa-solid ${p.icon || 'fa-laptop-code'}" style="font-size:3rem;color:var(--blue);" aria-hidden="true"></i>
      </div>
    `;

    modal.innerHTML = `
      <div class="premium-modal-box" onclick="event.stopPropagation()">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
          <div>
            <span class="tag" style="background:var(--grad-soft);color:var(--blue);font-weight:700;margin-bottom:8px;display:inline-block;">${p.category} &bull; ${p.year}</span>
            <h3 style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;color:var(--ink);margin:0 0 4px 0;">${p.title}</h3>
            <p style="color:var(--ink-soft);font-size:0.88rem;margin:0;">${p.tagline || ''}</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm" onclick="closePremiumProjectModal()" aria-label="Close modal" style="padding:6px 12px;font-size:1rem;">
            &times;
          </button>
        </div>

        ${imageHtml}

        <h4 style="font-size:0.95rem;font-weight:700;color:var(--ink);margin-bottom:6px;font-family:var(--font-display);">Project Overview</h4>
        <p style="color:var(--ink-soft);font-size:0.88rem;line-height:1.6;margin-bottom:16px;">
          ${desc}
        </p>

        <h4 style="font-size:0.95rem;font-weight:700;color:var(--ink);margin-bottom:8px;font-family:var(--font-display);">Tech Stack</h4>
        <div class="tag-row" style="margin-bottom:16px;">
          ${(p.tech || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>

        <div class="spec-box" style="margin-bottom:20px;">
          <div style="font-weight:700;margin-bottom:8px;color:var(--blue);font-family:var(--font-display);"><i class="fa-solid fa-layer-group"></i> Architecture &amp; System Specs</div>
          <div><strong style="color:var(--blue);">Front End Language:</strong> <span style="color:var(--ink);">${p.frontEnd || 'HTML5, CSS3, JavaScript'}</span></div>
          <div><strong style="color:var(--violet);">Back End Framework:</strong> <span style="color:var(--ink);">${p.backEnd || 'Python'}</span></div>
          <div><strong style="color:#d97706;">Database Storage:</strong> <span style="color:var(--ink);">${p.database || 'None'}</span></div>
          <div style="margin-top:4px;"><strong style="color:var(--mint);">APIs &amp; AI Keys Used:</strong> <span style="color:var(--ink);">${modalApis.join(' &bull; ')}</span></div>
        </div>

        <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View Repository / Source Code</a>` : ''}
          <button type="button" class="btn btn-outline btn-sm" onclick="closePremiumProjectModal()">Close</button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.style.display = 'flex';
  };

  window.closePremiumProjectModal = function() {
    const modal = document.getElementById('premiumProjectModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closePremiumProjectModal();
    }
  });

  // Initial Render
  renderCategoryButtons();
  render();
  }
});
