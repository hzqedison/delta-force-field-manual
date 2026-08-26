import { loadoutPlans } from './loadout-data.js';

const root = document.querySelector('[data-home-loadout]');

if (root) {
  const isZh = document.documentElement.lang.toLowerCase().startsWith('zh');
  const copy = isZh ? {
    modes: { all: '全部模式', '烽火地带': '烽火地带', '全面战场': '全面战场' },
    weapon: '枪械',
    weaponTypes: {},
    stats: { recoilControl: '后座', stability: '稳定', handling: '操控', parts: '配件', cost: '成本' },
    open: '查看方案',
    count: (total, visible) => `${total} 条方案 / 当前展示 ${visible} 条`,
  } : {
    modes: { all: 'All modes', '烽火地带': 'Extraction Zone', '全面战场': 'Warfare' },
    weapon: 'WEAPON',
    weaponTypes: { '步枪': 'RIFLE', '冲锋枪': 'SMG', '狙击步枪': 'SNIPER', '轻机枪': 'LMG', '精准射手步枪': 'DMR', '手枪': 'PISTOL', '霰弹枪': 'SHOTGUN', '特殊武器': 'SPECIAL' },
    stats: { recoilControl: 'RECOIL', stability: 'STABILITY', handling: 'HANDLING', parts: 'PARTS', cost: 'COST' },
    open: 'Inspect plan',
    count: (total, visible) => `${total} PLANS / ${visible} SHOWN`,
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const formatCost = (value) => Number(value) > 0 ? new Intl.NumberFormat(isZh ? 'zh-CN' : 'en-US').format(Number(value)) : '—';
  const modeButtons = [...root.querySelectorAll('[data-home-mode]')];
  const list = root.querySelector('[data-home-loadout-list]');
  const count = root.querySelector('[data-home-loadout-count]');

  const getPlans = (mode) => {
    const matching = mode === 'all' ? loadoutPlans : loadoutPlans.filter((plan) => plan.mode === mode);
    const seen = new Set();
    return matching.filter((plan) => {
      const key = `${plan.mode}|${plan.weaponName}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 4);
  };

  const render = (mode = 'all') => {
    const matching = mode === 'all' ? loadoutPlans : loadoutPlans.filter((plan) => plan.mode === mode);
    const plans = getPlans(mode);
    modeButtons.forEach((button) => button.classList.toggle('active', button.dataset.homeMode === mode));
    count.textContent = copy.count(matching.length, plans.length);
    list.innerHTML = plans.map((plan) => `
      <article class="home-plan-row">
        <div class="home-plan-main">
          <div><span class="home-plan-mode">${escapeHtml(copy.modes[plan.mode] || plan.mode)} / ${escapeHtml(copy.weaponTypes[plan.weaponType] || plan.weaponType || copy.weapon)}</span><h3>${escapeHtml(plan.weaponName)}</h3><small>${escapeHtml(plan.planName)}</small></div>
          <a class="home-plan-open" href="guides/loadout-lab.html?q=${encodeURIComponent(plan.weaponName)}" aria-label="${escapeHtml(copy.open)}: ${escapeHtml(plan.weaponName)}">↗</a>
        </div>
        <div class="home-plan-stats"><span><b>${escapeHtml(copy.stats.recoilControl)}</b>${plan.stats.final.recoilControl}</span><span><b>${escapeHtml(copy.stats.stability)}</b>${plan.stats.final.stability}</span><span><b>${escapeHtml(copy.stats.handling)}</b>${plan.stats.final.handling}</span><span><b>${escapeHtml(copy.stats.parts)}</b>${plan.attachments.length}</span><span><b>${escapeHtml(copy.stats.cost)}</b>${formatCost(plan.cost)}</span></div>
        <code class="home-plan-code">${escapeHtml(plan.code)}</code>
      </article>
    `).join('');
  };

  modeButtons.forEach((button) => button.addEventListener('click', () => render(button.dataset.homeMode)));
  render();
}
