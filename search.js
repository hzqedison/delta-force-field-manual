import { loadoutPlans } from './loadout-data.js';

const root = document.querySelector('[data-site-search]');
if (root) {
  const isZh = root.dataset.locale === 'zh';
  const input = root.querySelector('[data-search-input]');
  const summary = root.querySelector('[data-search-summary]');
  const guideResults = root.querySelector('[data-search-guides]');
  const planResults = root.querySelector('[data-search-plans]');
  const suggestions = root.querySelector('[data-search-suggestions]');
  const initialQuery = new URLSearchParams(location.search).get('q')?.trim() || '';
  const aliases = isZh ? {} : { 'high stability': '高稳定性', operations: '烽火地带', warfare: '全面战场', extraction: '撤离', 'pc setup': '配置' };
  const guideEntries = isZh ? [
    { title: '三角洲行动撤离入门', description: '路线、风险、战利品和撤离纪律。', href: 'guides/extraction-starter.html', keywords: '撤离 行动 路线 风险 战利品' },
    { title: '模式与干员角色', description: '区分烽火地带与全面战场，找到队伍看得懂的角色。', href: 'guides/modes-and-roles.html', keywords: '模式 干员 全面战场 推进 固守 支援' },
    { title: 'PC 配置与启动检查', description: '官方最低与推荐配置，以及启动前检查表。', href: 'guides/pc-requirements.html', keywords: 'PC 配置 系统需求 显卡 内存 启动' },
    { title: '三角洲行动改枪实验室', description: '站内查询 205 条方案，查看属性、配件、成本和改枪码。', href: 'guides/loadout-lab.html', keywords: '改枪 枪械 方案 配件 属性 改枪码 RM277' }
  ] : [
    { title: 'Delta Force Extraction Starter', description: 'Routes, risk, loot decisions, and exit discipline.', href: 'guides/extraction-starter.html', keywords: 'extraction operations route risk loot exit' },
    { title: 'Modes & Operator Roles', description: 'A plain-language map of warfare modes and readable team roles.', href: 'guides/modes-and-roles.html', keywords: 'modes warfare operators push hold support' },
    { title: 'PC Requirements & Setup', description: 'Official requirements and a clean pre-launch checklist.', href: 'guides/pc-requirements.html', keywords: 'pc requirements setup gpu memory storage' },
    { title: 'Delta Force Loadout Lab', description: 'Search 205 local plans with stats, parts, costs, and loadout codes.', href: 'guides/loadout-lab.html', keywords: 'loadout weapon build attachments stats code RM277' }
  ];
  const quickQueries = isZh ? ['RM277', '烽火地带', '高稳定性', 'PC 配置'] : ['RM277', 'OPERATIONS', 'HIGH STABILITY', 'PC setup'];
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const normalize = (value) => String(value ?? '').toLowerCase();
  const formatCost = (value) => Number(value) > 0 ? new Intl.NumberFormat(isZh ? 'zh-CN' : 'en-US').format(Number(value)) : '—';
  const planLabel = (value) => isZh ? value : ({ '烽火地带': 'OPERATIONS', '全面战场': 'WARFARE', '步枪': 'RIFLE', '冲锋枪': 'SMG', '狙击步枪': 'SNIPER', '轻机枪': 'LMG', '精准射手步枪': 'DMR', '手枪': 'PISTOL', '霰弹枪': 'SHOTGUN', '特殊武器': 'SPECIAL' }[value] || value);

  input.value = initialQuery;
  suggestions.innerHTML = quickQueries.map((item) => `<a href="search.html?q=${encodeURIComponent(item)}">${escapeHtml(item)} <span>↗</span></a>`).join('');

  const render = () => {
    const needle = normalize(input.value.trim());
    const terms = [needle, normalize(aliases[needle])].filter(Boolean);
    const matchesAny = (value) => terms.some((term) => normalize(value).includes(term));
    const matchingGuides = needle ? guideEntries.filter((entry) => matchesAny(`${entry.title} ${entry.description} ${entry.keywords}`)) : guideEntries;
    const matchingPlans = needle ? loadoutPlans.filter((plan) => matchesAny([plan.planName, plan.weaponName, plan.weaponType, plan.mode, ...plan.tags, ...(plan.attachments || []).map((part) => part.name)].join(' '))) : [];
    const guideLabel = isZh ? `${matchingGuides.length} 个关联页面` : `${matchingGuides.length} RELATED PAGES`;
    const planLabelText = isZh ? `${matchingPlans.length} 个方案命中` : `${matchingPlans.length} LOADOUTS MATCH`;
    summary.textContent = needle ? `${isZh ? '正在查询' : 'SEARCHING'} “${needle}” · ${guideLabel} · ${planLabelText}` : (isZh ? '输入一个问题、枪名、标签或配置关键词' : 'Search a question, weapon, tag, or setup keyword');
    guideResults.innerHTML = matchingGuides.length ? matchingGuides.map((entry) => `<a class="search-result-card" href="${entry.href}"><span class="search-result-kicker">${isZh ? '关联攻略' : 'RELATED GUIDE'}</span><strong>${escapeHtml(entry.title)}</strong><small>${escapeHtml(entry.description)}</small><span class="search-result-arrow">↗</span></a>`).join('') : `<p class="search-empty">${isZh ? '没有匹配的攻略页面。试试“撤离”“全面战场”或“PC”。' : 'No guide page matched. Try “extraction”, “warfare”, or “PC”.'}</p>`;
    planResults.innerHTML = needle && matchingPlans.length ? matchingPlans.slice(0, 24).map((plan) => `<a class="search-plan-card" href="guides/loadout-lab.html?q=${encodeURIComponent(needle)}"><span>#${String(plan.rank || 0).padStart(3, '0')} · ${escapeHtml(planLabel(plan.mode))}</span><strong>${escapeHtml(plan.planName)}</strong><small>${escapeHtml(plan.weaponName)} · ${escapeHtml(plan.tags.slice(0, 3).join(' · '))}</small><b>${formatCost(plan.cost)}</b></a>`).join('') : `<p class="search-empty">${isZh ? (needle ? '没有匹配的站内改枪方案。试试 RM277、枪名或标签。' : '查询枪名、标签或配件，会从站内 205 条方案中返回结果。') : (needle ? 'No local loadout matched. Try RM277, a weapon name, or a tag.' : 'Search a weapon, tag, or attachment across the 205 local plans.')}</p>`;
  };
  root.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    location.href = value ? `search.html?q=${encodeURIComponent(value)}` : 'search.html';
  });
  input.addEventListener('input', render);
  render();
}
