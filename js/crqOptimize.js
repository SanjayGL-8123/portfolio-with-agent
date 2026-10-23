// CRQ Optimize — Interactive Cybersecurity Analytics & Simulator
// SPVM3 Tech Solutions · Hackathon 3.0 (SIH26105)

document.addEventListener('DOMContentLoaded', () => {
  initRiskSimulator();
  initOverlapCalculator();
  initErdInteractive();
  initCopyButtons();
});

// 1. Interactive Budget & Overlap-Aware Mitigation Simulator
function initRiskSimulator() {
  const budgetSlider = document.getElementById('crqBudgetSlider');
  const budgetDisplay = document.getElementById('crqBudgetValue');
  const controlCheckboxes = document.querySelectorAll('.crq-control-checkbox');
  
  const totalCostEl = document.getElementById('simTotalCost');
  const combinedEffEl = document.getElementById('simCombinedEff');
  const baselineEalEl = document.getElementById('simBaselineEal');
  const residualEalEl = document.getElementById('simResidualEal');
  const riskReducedEl = document.getElementById('simRiskReduced');
  const budgetWarningEl = document.getElementById('simBudgetWarning');
  const p50ResidualEl = document.getElementById('simP50Residual');
  const p90ResidualEl = document.getElementById('simP90Residual');
  const p95ResidualEl = document.getElementById('simP95Residual');

  const BASELINE_EAL = 242500;
  const BASELINE_P50 = 185000;
  const BASELINE_P90 = 490000;
  const BASELINE_P95 = 675000;

  function recalculate() {
    const budgetLimit = budgetSlider ? parseInt(budgetSlider.value, 10) : 65000;
    if (budgetDisplay) {
      budgetDisplay.textContent = `$${budgetLimit.toLocaleString()}`;
    }

    let totalCost = 0;
    let nonMitigatedFactor = 1.0;
    let selectedCount = 0;

    controlCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseInt(cb.getAttribute('data-cost'), 10) || 0;
        const eff = parseFloat(cb.getAttribute('data-eff')) || 0;
        totalCost += cost;
        nonMitigatedFactor *= (1.0 - eff);
        selectedCount++;
      }
    });

    const combinedEffectiveness = selectedCount > 0 ? (1.0 - nonMitigatedFactor) : 0;
    const residualEAL = Math.round(BASELINE_EAL * (1.0 - combinedEffectiveness));
    const riskReduced = BASELINE_EAL - residualEAL;

    const residualP50 = Math.round(BASELINE_P50 * (1.0 - combinedEffectiveness));
    const residualP90 = Math.round(BASELINE_P90 * (1.0 - combinedEffectiveness));
    const residualP95 = Math.round(BASELINE_P95 * (1.0 - combinedEffectiveness));

    // Update UI elements
    if (totalCostEl) totalCostEl.textContent = `$${totalCost.toLocaleString()}`;
    if (combinedEffEl) combinedEffEl.textContent = `${(combinedEffectiveness * 100).toFixed(1)}%`;
    if (baselineEalEl) baselineEalEl.textContent = `$${BASELINE_EAL.toLocaleString()}`;
    if (residualEalEl) residualEalEl.textContent = `$${residualEAL.toLocaleString()}`;
    if (riskReducedEl) riskReducedEl.textContent = `−$${riskReduced.toLocaleString()}`;

    if (p50ResidualEl) p50ResidualEl.textContent = `$${residualP50.toLocaleString()}`;
    if (p90ResidualEl) p90ResidualEl.textContent = `$${residualP90.toLocaleString()}`;
    if (p95ResidualEl) p95ResidualEl.textContent = `$${residualP95.toLocaleString()}`;

    // Budget over-allocation check
    if (budgetWarningEl) {
      if (totalCost > budgetLimit) {
        const excess = totalCost - budgetLimit;
        budgetWarningEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:var(--crq-red)"></i> <strong style="color:var(--crq-red)">Over Budget by $${excess.toLocaleString()}!</strong> Portfolio exceeds allocated budget constraint.`;
        budgetWarningEl.style.display = 'block';
      } else {
        const remaining = budgetLimit - totalCost;
        budgetWarningEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--crq-green)"></i> <strong style="color:var(--crq-green)">Within Budget Constraint:</strong> $${remaining.toLocaleString()} remaining capacity.`;
        budgetWarningEl.style.display = 'block';
      }
    }
  }

  if (budgetSlider) {
    budgetSlider.addEventListener('input', recalculate);
  }
  controlCheckboxes.forEach(cb => {
    cb.addEventListener('change', recalculate);
  });

  recalculate();
}

// 2. Interactive Overlap Formula Demonstration
function initOverlapCalculator() {
  const p1Slider = document.getElementById('calcP1Slider');
  const p2Slider = document.getElementById('calcP2Slider');
  const p1Val = document.getElementById('calcP1Val');
  const p2Val = document.getElementById('calcP2Val');
  const naiveVal = document.getElementById('calcNaiveVal');
  const combinedVal = document.getElementById('calcCombinedVal');
  const diffVal = document.getElementById('calcDiffVal');

  function updateOverlap() {
    if (!p1Slider || !p2Slider) return;
    const p1 = parseFloat(p1Slider.value) / 100;
    const p2 = parseFloat(p2Slider.value) / 100;

    if (p1Val) p1Val.textContent = `${Math.round(p1 * 100)}%`;
    if (p2Val) p2Val.textContent = `${Math.round(p2 * 100)}%`;

    const naive = Math.min(100, Math.round((p1 + p2) * 100));
    const combined = (1.0 - (1.0 - p1) * (1.0 - p2)) * 100;
    const diff = (naive - combined);

    if (naiveVal) naiveVal.textContent = `${naive}%`;
    if (combinedVal) combinedVal.textContent = `${combined.toFixed(1)}%`;
    if (diffVal) diffVal.textContent = `+${diff.toFixed(1)}% (False Confidence Avoided)`;
  }

  if (p1Slider) p1Slider.addEventListener('input', updateOverlap);
  if (p2Slider) p2Slider.addEventListener('input', updateOverlap);
  updateOverlap();
}

// 3. Interactive Data Model (ERD) Explorer
function initErdInteractive() {
  const erdNodes = document.querySelectorAll('.crq-erd-node');
  const detailBox = document.getElementById('crqErdDetails');

  const ERD_DICTIONARY = {
    "organizations": {
      title: "Organizations",
      table: "organizations",
      desc: "Top-level enterprise tenant representing the company or business unit.",
      fields: [
        "id: UUID (Primary Key)",
        "name: VARCHAR(255)",
        "industry_sector: VARCHAR(100)",
        "annual_revenue: NUMERIC",
        "created_at: TIMESTAMP WITH TIME ZONE"
      ],
      purpose: "Enforces multi-tenancy and sets financial loss context based on enterprise scale."
    },
    "users": {
      title: "Users",
      table: "users",
      desc: "Platform accounts assigned to specific organizational roles.",
      fields: [
        "id: UUID (Primary Key)",
        "org_id: UUID (FK -> organizations.id)",
        "email: VARCHAR(255)",
        "role: ENUM ('admin', 'analyst', 'executive', 'auditor')",
        "last_login: TIMESTAMP"
      ],
      purpose: "Governs Role-Based Access Control (RBAC) and user action attribution."
    },
    "business_services": {
      title: "Business Services",
      table: "business_services",
      desc: "Critical business processes dependent on digital assets (e.g., Payment Gateway, Patient Records).",
      fields: [
        "id: UUID (Primary Key)",
        "org_id: UUID (FK -> organizations.id)",
        "name: VARCHAR(255)",
        "criticality_tier: ENUM ('Tier-1', 'Tier-2', 'Tier-3')",
        "hourly_outage_cost: NUMERIC"
      ],
      purpose: "Translates technical system outages into quantified financial downtime losses."
    },
    "assets": {
      title: "Assets",
      table: "assets",
      desc: "Physical, virtual, and cloud infrastructure supporting business services.",
      fields: [
        "id: UUID (Primary Key)",
        "service_id: UUID (FK -> business_services.id)",
        "hostname: VARCHAR(255)",
        "ip_address: INET",
        "asset_type: VARCHAR(50)",
        "data_classification: VARCHAR(50)"
      ],
      purpose: "Primary target for vulnerability mapping and risk aggregation."
    },
    "findings": {
      title: "Findings",
      table: "findings",
      desc: "Vulnerabilities, misconfigurations, and telemetry ingested from scanners or CSV/JSON.",
      fields: [
        "id: UUID (Primary Key)",
        "asset_id: UUID (FK -> assets.id, nullable if unmatched)",
        "cve_id: VARCHAR(50)",
        "severity: ENUM ('Critical', 'High', 'Medium', 'Low')",
        "exploitability_score: NUMERIC",
        "ingested_at: TIMESTAMP"
      ],
      purpose: "Supplies raw threat intelligence and vulnerability inputs to the risk engine."
    },
    "scenarios": {
      title: "Scenarios",
      table: "scenarios",
      desc: "Modeled cyber loss event combinations (Threat Actor + Vector + Asset Target).",
      fields: [
        "id: UUID (Primary Key)",
        "org_id: UUID (FK -> organizations.id)",
        "name: VARCHAR(255)",
        "threat_event_frequency: NUMERIC (annual distribution)",
        "vulnerability_prob: NUMERIC (0.0 - 1.0)"
      ],
      purpose: "Encapsulates FAIR framework loss event frequency and severity parameters."
    },
    "risk_results": {
      title: "Risk Results",
      table: "risk_results",
      desc: "Deterministic and Monte Carlo outputs computed for scenarios.",
      fields: [
        "id: UUID (Primary Key)",
        "scenario_id: UUID (FK -> scenarios.id)",
        "simulation_runs: INTEGER (default: 10000)",
        "eal_mean: NUMERIC",
        "p50_loss: NUMERIC",
        "p90_loss: NUMERIC",
        "p95_loss: NUMERIC",
        "data_quality_score: NUMERIC (0-100)"
      ],
      purpose: "Stores quantified loss distribution points for dashboards and reports."
    },
    "mitigations": {
      title: "Mitigations",
      table: "mitigations",
      desc: "Catalog of candidate security controls available for deployment.",
      fields: [
        "id: UUID (Primary Key)",
        "name: VARCHAR(255)",
        "control_category: VARCHAR(100)",
        "cost_annual: NUMERIC",
        "effectiveness_pct: NUMERIC (0.0 - 1.0)",
        "framework_ref: VARCHAR(100) (e.g. NIST CSF PR.AC-1)"
      ],
      purpose: "Input repository for budget-constrained optimization solvers."
    },
    "optimization_runs": {
      title: "Optimization Runs",
      table: "optimization_runs",
      desc: "Records of solver executions under given budget constraints.",
      fields: [
        "id: UUID (Primary Key)",
        "org_id: UUID (FK -> organizations.id)",
        "budget_limit: NUMERIC",
        "selected_control_ids: JSONB",
        "combined_effectiveness: NUMERIC",
        "achieved_risk_reduction: NUMERIC",
        "run_timestamp: TIMESTAMP"
      ],
      purpose: "Provides mathematical justification and reproducible audit history for security investments."
    },
    "audit_events": {
      title: "Audit Events",
      table: "audit_events",
      desc: "Immutable operational log of data imports, parameter updates, and model runs.",
      fields: [
        "id: UUID (Primary Key)",
        "user_id: UUID (FK -> users.id)",
        "event_type: VARCHAR(100)",
        "entity_affected: VARCHAR(100)",
        "parameters_snapshot: JSONB",
        "created_at: TIMESTAMP WITH TIME ZONE"
      ],
      purpose: "Guarantees forensic traceability and regulatory audit defensibility."
    }
  };

  erdNodes.forEach(node => {
    node.addEventListener('click', () => {
      erdNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const entityKey = node.getAttribute('data-entity');
      const data = ERD_DICTIONARY[entityKey];
      if (!data || !detailBox) return;

      detailBox.innerHTML = `
        <div style="animation: fadeIn 0.3s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <span class="crq-badge crq-badge-teal" style="font-family:var(--crq-font-code); font-size:0.75rem;">TABLE: ${data.table}</span>
              <h4 style="font-size:1.3rem; font-weight:800; color:var(--crq-white); margin-top:4px;">${data.title}</h4>
            </div>
            <span class="crq-badge crq-badge-orange"><i class="fa-solid fa-database"></i> Entity Detail</span>
          </div>
          <p style="color:var(--crq-muted); font-size:0.92rem; line-height:1.6; margin-bottom:16px;">${data.desc}</p>
          
          <div style="background:rgba(7,20,38,0.9); border:1px solid var(--crq-border); border-radius:8px; padding:14px; margin-bottom:16px;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--crq-teal); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;">Schema Attributes</div>
            <ul style="list-style:none; padding:0; margin:0; font-family:var(--crq-font-code); font-size:0.8rem; color:#cbd5e1; line-height:1.7;">
              ${data.fields.map(f => `<li><span style="color:var(--crq-cyan);">▪</span> ${f}</li>`).join('')}
            </ul>
          </div>

          <div style="font-size:0.85rem; color:var(--crq-muted); border-left:3px solid var(--crq-cyan); padding-left:12px;">
            <strong style="color:var(--crq-white);">Risk Engine Purpose:</strong> ${data.purpose}
          </div>
        </div>
      `;
    });
  });
}

// 4. Utility Copy & Toast helper
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.crq-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--crq-green)"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2000);
        });
      }
    });
  });
}
