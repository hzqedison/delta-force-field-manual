import { loadoutMeta, loadoutPlans } from './loadout-data.js';

const root = document.querySelector('[data-loadout-lab]');
if (root) {
  const isZh = document.documentElement.lang.toLowerCase().startsWith('zh');
  const copy = isZh ? {
    allModes: '全部模式', allTypes: '全部枪械', allWeapons: '全部枪械', search: '搜索方案、枪名、标签或配件',
    results: '个方案匹配', reset: '清除筛选', showAll: '展开全部方案', showLess: '收起列表', details: '查看属性与配件',
    closeDetails: '收起属性与配件', cost: '成本', free: '全面战场', code: '改枪码', copyCode: '复制改枪码', copied: '已复制',
    stats: ['伤害', '射程', '后座控制', '稳定性', '操控', '腰射'], attachment: '配件清单', noResults: '没有匹配方案。换个模式、标签或关键词试试。',
    mode: '模式', type: '类型', weapon: '枪械', observed: `本地快照 · ${loadoutMeta.observedAt}`,
    labels: { '烽火地带': '烽火地带', '全面战场': '全面战场', '步枪': '步枪', '冲锋枪': '冲锋枪', '狙击步枪': '狙击步枪', '轻机枪': '轻机枪', '精准射手步枪': '精准射手步枪', '手枪': '手枪', '霰弹枪': '霰弹枪', '特殊武器': '特殊武器' },
    tags: {}
  } : {
    allModes: 'ALL MODES', allTypes: 'ALL WEAPON TYPES', allWeapons: 'ALL WEAPONS', search: 'Search plans, weapons, tags, or parts',
    results: 'PLANS MATCH', reset: 'RESET FILTERS', showAll: 'SHOW ALL PLANS', showLess: 'COLLAPSE LIST', details: 'VIEW STATS & ATTACHMENTS',
    closeDetails: 'HIDE STATS & ATTACHMENTS', cost: 'COST', free: 'FREE / WARFARE', code: 'LOADOUT CODE', copyCode: 'COPY CODE', copied: 'COPIED',
    stats: ['DAMAGE', 'RANGE', 'RECOIL', 'STABILITY', 'HANDLING', 'HIP-FIRE'], attachment: 'ATTACHMENTS', noResults: 'No plans match. Try another mode, tag, or keyword.',
    mode: 'MODE', type: 'TYPE', weapon: 'WEAPON', observed: `LOCAL SNAPSHOT · ${loadoutMeta.observedAt}`,
    labels: { '烽火地带': 'OPERATIONS', '全面战场': 'WARFARE', '步枪': 'RIFLE', '冲锋枪': 'SMG', '狙击步枪': 'SNIPER', '轻机枪': 'LMG', '精准射手步枪': 'DMR', '手枪': 'PISTOL', '霰弹枪': 'SHOTGUN', '特殊武器': 'SPECIAL' },
    tags: { '赛事同款': 'TOURNAMENT', '高性价比': 'HIGH VALUE', '火力压制': 'SUPPRESSION', '高稳定性': 'HIGH STABILITY', '后座力稳': 'RECOIL CONTROL', '高阶操作': 'ADVANCED', '远程作战': 'RANGED', '近战适用': 'CLOSE RANGE' }
  };

  const modeSelect = root.querySelector('[data-filter-mode]');
  const typeSelect = root.querySelector('[data-filter-type]');
  const weaponSelect = root.querySelector('[data-filter-weapon]');
  const queryInput = root.querySelector('[data-filter-query]');
  const tagsRoot = root.querySelector('[data-filter-tags]');
  const resultsRoot = root.querySelector('[data-loadout-results]');
  const resultCount = root.querySelector('[data-loadout-count]');
  const emptyState = root.querySelector('[data-loadout-empty]');
  const moreButton = root.querySelector('[data-loadout-more]');
  const resetButton = root.querySelector('[data-loadout-reset]');
  let activeTag = '';
  let visibleLimit = 18;

  const initialQuery = new URLSearchParams(location.search).get('q');
  if (initialQuery) queryInput.value = initialQuery;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const labelFor = (value) => copy.labels[value] || value;
  const tagFor = (value) => copy.tags[value] || value;
  const formatCost = (value) => Number(value) > 0 ? new Intl.NumberFormat(isZh ? 'zh-CN' : 'en-US').format(Number(value)) : '—';
  const safeValue = (value) => Math.max(0, Math.min(100, Number(value) || 0));
  const delta = (plan, key) => {
    const base = Number(plan.stats?.base?.[key]);
    const final = Number(plan.stats?.final?.[key]);
    if (!Number.isFinite(base) || !Number.isFinite(final) || base === final) return '';
    return `<small>${final > base ? '+' : ''}${final - base}</small>`;
  };

  const populateSelect = (select, values, placeholder, formatter = labelFor) => {
    select.innerHTML = `<option value="">${placeholder}</option>` + values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(formatter(value))}</option>`).join('');
  };

  populateSelect(modeSelect, loadoutMeta.modes, copy.allModes);
  populateSelect(typeSelect, loadoutMeta.weaponTypes, copy.allTypes);
  const weaponNames = [...new Set(loadoutPlans.map((plan) => plan.weaponName))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
  populateSelect(weaponSelect, weaponNames, copy.allWeapons, (value) => isZh ? value : value);

  tagsRoot.innerHTML = loadoutMeta.tags.map((tag) => `<button type="button" class="loadout-tag${activeTag === tag ? ' active' : ''}" data-filter-tag="${escapeHtml(tag)}">${escapeHtml(tagFor(tag))}</button>`).join('');
  tagsRoot.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter-tag]');
    if (!button) return;
    activeTag = activeTag === button.dataset.filterTag ? '' : button.dataset.filterTag;
    visibleLimit = 18;
    tagsRoot.querySelectorAll('[data-filter-tag]').forEach((tagButton) => tagButton.classList.toggle('active', tagButton.dataset.filterTag === activeTag));
    render();
  });

  const matches = () => {
    const mode = modeSelect.value;
    const type = typeSelect.value;
    const weapon = weaponSelect.value;
    const query = queryInput.value.trim().toLowerCase();
    return loadoutPlans.filter((plan) => {
      if (mode && plan.mode !== mode) return false;
      if (type && plan.weaponType !== type) return false;
      if (weapon && plan.weaponName !== weapon) return false;
      if (activeTag && !plan.tags.includes(activeTag)) return false;
      if (query) {
        const haystack = [plan.planName, plan.weaponName, plan.weaponType, plan.mode, ...plan.tags, ...(plan.attachments || []).map((part) => part.name)].join(' ').toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  };

  const renderStats = (plan) => plan.stats ? `<div class="loadout-stat-grid">${['damage', 'range', 'recoilControl', 'stability', 'handling', 'hipFire'].map((key, index) => {
    const value = Number(plan.stats.final?.[key] ?? plan.stats.base?.[key] ?? 0);
    return `<div class="loadout-stat"><span>${copy.stats[index]}</span><div class="loadout-bar"><i style="width:${safeValue(value)}%"></i></div><b>${value}</b>${delta(plan, key)}</div>`;
  }).join('')}</div>` : '';

  const renderCard = (plan) => {
    const number = String(plan.rank || 0).padStart(3, '0');
    const parts = (plan.attachments || []).map((part) => `<li><span>${escapeHtml(part.slot)}</span><strong>${escapeHtml(part.name)}</strong><small>${formatCost(part.price)}</small></li>`).join('');
    return `<article class="loadout-card"><div class="loadout-card-top"><span class="loadout-rank">#${number}</span><span class="loadout-mode">${escapeHtml(labelFor(plan.mode))}</span></div><h3>${escapeHtml(plan.planName)}</h3><p class="loadout-weapon">${escapeHtml(plan.weaponName)} <span>/ ${escapeHtml(labelFor(plan.weaponType))}</span></p><div class="loadout-tags">${plan.tags.map((tag) => `<span>${escapeHtml(tagFor(tag))}</span>`).join('')}</div><div class="loadout-card-meta"><span>${copy.cost}</span><strong>${formatCost(plan.cost)}${Number(plan.cost) > 0 ? '' : ` <small>${copy.free}</small>`}</strong></div>${renderStats(plan)}<details><summary>${copy.details}<span>＋</span></summary><div class="loadout-detail"><div class="loadout-detail-label">${copy.attachment}</div><ul class="loadout-attachments">${parts || `<li><span>—</span><strong>${copy.noResults}</strong></li>`}</ul><div class="loadout-code-label">${copy.code}</div><div class="loadout-code"><code>${escapeHtml(plan.code)}</code><button type="button" data-copy-code="${escapeHtml(plan.code)}">${copy.copyCode}</button></div></div></details></article>`;
  };

  const render = () => {
    const plans = matches();
    resultCount.textContent = `${plans.length} ${copy.results}`;
    emptyState.hidden = plans.length !== 0;
    resultsRoot.innerHTML = plans.slice(0, visibleLimit).map(renderCard).join('');
    moreButton.hidden = plans.length <= visibleLimit;
    moreButton.textContent = visibleLimit >= plans.length ? copy.showLess : copy.showAll;
  };

  [modeSelect, typeSelect, weaponSelect].forEach((select) => select.addEventListener('change', () => { visibleLimit = 18; render(); }));
  queryInput.addEventListener('input', () => { visibleLimit = 18; render(); });
  moreButton.addEventListener('click', () => { visibleLimit = visibleLimit >= matches().length ? 18 : matches().length; render(); });
  resetButton.addEventListener('click', () => {
    modeSelect.value = '';
    typeSelect.value = '';
    weaponSelect.value = '';
    queryInput.value = '';
    activeTag = '';
    visibleLimit = 18;
    tagsRoot.querySelectorAll('[data-filter-tag]').forEach((button) => button.classList.remove('active'));
    render();
  });
  resultsRoot.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy-code]');
    if (!button) return;
    try {
      await navigator.clipboard.writeText(button.dataset.copyCode);
      const original = button.textContent;
      button.textContent = copy.copied;
      window.setTimeout(() => { button.textContent = original; }, 1400);
    } catch {
      button.textContent = button.dataset.copyCode;
    }
  });
  render();
}
