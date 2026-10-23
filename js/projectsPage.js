// Projects Page Interactive Filtering, Sort, Search, Pagination & Modal Controls
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROJECTS_DATA === 'undefined') return;

  const grid = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('projectSearch');
  const categoryContainer = document.getElementById('categoryFilters');
  const techSelect = document.getElementById('techFilter');
  const sortSelect = document.getElementById('sortSelect');
  const visibleCountEl = document.getElementById('visibleCount');
  const paginationContainer = document.getElementById('paginationControls');

  const PAGE_SIZE = 12;
  let currentPage = 1;

  // Categories list per requirements (Part 7, Item 36)
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
  const allTechs = ['all', ...new Set(PROJECTS_DATA.flatMap(p => p.tech || []))].sort();

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
    let list = [...PROJECTS_DATA];

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

    paginatedItems.forEach(p => {
      const desc = p.description || p.desc || p.tagline || '';
      const techList = p.tech || [];
      const hasLive = Boolean(p.live && p.live.trim());
      const liveHtml = hasLive ? `
        <a href="${p.live}" class="btn btn-primary btn-sm ripple-btn" style="flex:1;font-weight:700;height:38px;display:flex;align-items:center;justify-content:center;gap:6px;">
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Live demo
        </a>
      ` : `
        <button type="button" class="btn btn-outline btn-sm" style="flex:1;font-size:0.8rem;opacity:0.75;cursor:default;" title="Live demo coming soon">
          <i class="fa-solid fa-clock" aria-hidden="true"></i> Demo coming soon
        </button>
      `;

      const imageHtml = p.image ? `
        <img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;background:rgba(255,255,255,0.03);">
          <i class="fa-solid ${p.icon || 'fa-code'}" style="font-size:3rem;color:var(--emerald-primary)" aria-hidden="true"></i>
        </div>
      ` : `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.03);">
          <i class="fa-solid ${p.icon || 'fa-code'}" style="font-size:3rem;color:var(--emerald-primary)" aria-hidden="true"></i>
        </div>
      `;

      html += `
        <div class="glass flip-card" id="project-card-${p.id}" style="display:flex;flex-direction:column;height:100%;padding:20px;border-radius:var(--radius-lg);border:1px solid var(--border-glass);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            ${p.featured ? '<span class="project-featured-tag">★ Featured</span>' : `<span></span>`}
            <span class="tech-pill" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:var(--emerald-primary);font-weight:700;font-size:0.75rem;">
              ${p.category}
            </span>
          </div>

          <div style="margin:4px 0 14px 0;border-radius:var(--radius-md);overflow:hidden;position:relative;height:150px;border:1px solid var(--border-glass);background:#03070c;">
            ${imageHtml}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
            <span style="font-size:0.75rem;color:var(--golden-yellow);font-family:var(--ff-code);font-weight:700;">Year ${p.year}</span>
          </div>

          <h3 class="project-title" style="margin-top:0;font-size:1.15rem;line-height:1.4;">${p.title}</h3>
          <p class="project-tagline" style="margin:8px 0 16px 0;font-size:0.86rem;color:var(--text-muted);flex:1;line-height:1.6;">
            ${desc}
          </p>

          <div class="project-tech-pills" style="margin-bottom:18px;gap:6px;">
            ${techList.slice(0, 4).map(t => `<span class="tech-pill" style="font-size:0.72rem;padding:3px 8px;">${t}</span>`).join('')}
            ${techList.length > 4 ? `<span class="tech-pill" style="font-size:0.72rem;padding:3px 8px;">+${techList.length - 4}</span>` : ''}
          </div>

          <div style="display:flex;gap:10px;margin-top:auto;">
            ${liveHtml}
            
            <button type="button" onclick="openPremiumProjectModal('${p.id}')" class="btn btn-outline btn-sm ripple-btn" style="width:38px;height:38px;display:flex;align-items:center;justify-content:center;" title="View project details" aria-label="View details for ${p.title}">
              <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    renderPagination(list.length);
  }

  // Premium Project Detailed Modal Controls
  window.openPremiumProjectModal = function(id) {
    const p = PROJECTS_DATA.find(item => String(item.id) === String(id));
    if (!p) return;

    let modal = document.getElementById('premiumProjectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'premium-modal-overlay';
      modal.id = 'premiumProjectModal';
      document.body.appendChild(modal);
    }

    const desc = p.description || p.desc || p.tagline || '';
    const imageHtml = p.image ? `
      <img class="modal-project-img" src="${p.image}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" style="width:100%;max-height:240px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:16px;">
      <div style="display:none;width:100%;height:180px;align-items:center;justify-content:center;background:rgba(255,255,255,0.03);border-radius:var(--radius-md);border:1px solid var(--border-glass);">
        <i class="fa-solid ${p.icon || 'fa-laptop-code'}" style="font-size:3.5rem;color:var(--emerald-primary)" aria-hidden="true"></i>
      </div>
    ` : `
      <div style="width:100%;height:180px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.03);border-radius:var(--radius-md);border:1px solid var(--border-glass);margin-bottom:16px;">
        <i class="fa-solid ${p.icon || 'fa-laptop-code'}" style="font-size:3.5rem;color:var(--emerald-primary)" aria-hidden="true"></i>
      </div>
    `;

    modal.innerHTML = `
      <div class="premium-modal-box glass" style="max-width:700px;width:90%;margin:40px auto;padding:28px;border-radius:var(--radius-lg);position:relative;max-height:90vh;overflow-y:auto;border:1px solid var(--border-glass);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
          <div>
            <span class="tech-pill" style="color:var(--emerald-primary);margin-bottom:6px;display:inline-block;">${p.category} &bull; ${p.year}</span>
            <h2 style="font-size:1.35rem;font-weight:800;color:var(--text-main);">${p.title}</h2>
          </div>
          <button type="button" class="premium-modal-close icon-btn" onclick="closePremiumProjectModal()" aria-label="Close modal">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        ${imageHtml}

        <p style="color:var(--text-muted);line-height:1.7;margin-bottom:20px;font-size:0.95rem;">
          ${desc}
        </p>

        <h4 style="font-size:0.95rem;font-weight:700;color:var(--text-main);margin-bottom:10px;">Tech Stack</h4>
        <div class="project-tech-pills" style="margin-bottom:24px;">
          ${(p.tech || []).map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>

        <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
          ${p.live ? `<a href="${p.live}" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Demo</a>` : ''}
          
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
});
