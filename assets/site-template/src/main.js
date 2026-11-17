import './style.css';

const projects = [
  {
    slug: 'work',
    name: '工作经历',
    date: '2019.12 — 至今',
    employer: '字节跳动',
    description: '持续在字节跳动任职，先后参与 Data-内容与安全风控两个部门的产品建设，负责中台产品与火山引擎办公安全商业化。',
    previews: ['安全与风控', 'Data · 内容'],
    previewCaptions: ['2021.06 — 至今 · 杭州', '2019.12 — 2021.06 · 北京'],
    detail: `
      <p class="detail-lead">2019 年起持续在字节跳动任职，以下为同一家公司内的两段部门经历。</p>
      <section><span class="detail-date">2021.06 — 至今 · 杭州</span><h3>安全与风控 · 商业化平台产品经理</h3><ul><li>负责火山引擎办公安全产品的终端业务，包括桌管、终端数据防泄露和终端防病毒。</li><li>2021 年完成 0→1 商业化验证。</li><li>2022 年整体营收完成度 250%+。</li><li>2023 / 2024 年负责模块营收完成率分别为 170%+ / 130%+。</li></ul></section>
      <section><span class="detail-date">2019.12 — 2021.06 · 北京（含实习）</span><h3>Data-内容 · 中台产品经理</h3><ul><li>从 0→1 建设审核业务权限中台，并搭建早期产品运营体系。</li><li>完成 50+ 系统权限接入，覆盖审核、广审、客服等业务线。</li><li>系统权限开发成本从 2 个月降低到 1 周。</li><li>海外团队权限审批时长从 24h 降低到 1h。</li></ul></section>
      <p class="missing-note">#此部分缺失内容：可公开的业务截图和项目展示素材。</p>`
  },
  {
    slug: 'education',
    name: '教育经历',
    date: '2013.09 — 2020.06',
    description: '厦门大学广告学硕士，兰州大学广告学本科，并于台湾交通大学传播与科技学系交换。',
    previews: ['厦门大学·硕士', '兰州大学·本科', '台湾交通大学·交换'],
    detail: `
      <p class="detail-lead">完整的广告学与传播研究训练，兼具定量、定性研究方法与业务洞察能力。</p>
      <section><span class="detail-date">2017.09 — 2020.06</span><h3>厦门大学</h3><ul><li>广告学，全日制学术型硕士。</li><li>GPA 3.96 / 4，专业排名 3 / 45。</li><li>主要研究方法包括定量与定性研究。</li></ul></section>
      <section><span class="detail-date">2016.02 — 2016.06</span><h3>台湾交通大学</h3><ul><li>传播与科技学系交换学习。</li></ul></section>
      <section><span class="detail-date">2013.09 — 2017.06</span><h3>兰州大学</h3><ul><li>广告学统招本科。</li><li>GPA 4.91 / 5，专业排名 1 / 29。</li><li>连续三年获得国家奖学金。</li></ul></section>
      <p class="missing-note">#此部分缺失内容：学校照片、校园项目和可展示的研究成果。</p>`
  },
  {
    slug: 'projects',
    name: '项目经历',
    date: '0→1→N',
    description: '从种子客户验证到规模化交付，主导 EDLP、软件资产管理和权限中台等企业级产品项目。',
    previews: ['EDLP·数据防泄露', '软件资产管理', '权限中台'],
    detail: `
      <p class="detail-lead">围绕企业安全、资产管理与权限治理，建立从产品洞察、种子客户验证到商业化规模复制的完整路径。</p>
      <section><span class="detail-date">0→1→N 商业化</span><h3>数据防泄露（EDLP / DLP）</h3><ul><li>源于字节跳动内部 DLP 需求，完成国内业务对三方采购产品的替换，节省数百万采购成本。</li><li>向外输出落地经验，完成 50+ 泛互联网客户成单。</li><li>通过赢单、竞对、场景和市场分析建立商业画布，拿下多家行业头部客户。</li></ul></section>
      <section><span class="detail-date">0→1</span><h3>软件资产管理系统</h3><ul><li>调研字节跳动内部 IT 软件管理经验，落地飞连软件管理方案。</li><li>助力 Top 电商百万级项目签单。</li><li>拉通客户集团多个职能，梳理几十万员工场景下的软件全生命周期，打通主数据、预算、审批、OA 等系统。</li></ul></section>
      <section><span class="detail-date">0→1</span><h3>权限中台</h3><ul><li>整合公司级权限能力，为审核平台搭建登录、用户、权限三大基础模块。</li><li>完成 50+ 系统接入。</li><li>支持海外审核团队形成权限审批自闭环。</li></ul></section>
      <p class="missing-note">#此部分缺失内容：脱敏产品截图、客户案例、设计稿和可公开项目链接。</p>`
  }
];

const categories = [
  { id: 'product', label: '产品方法', color: 'blue' },
  { id: 'ai', label: 'AI 工具', color: 'orange' },
  { id: 'career', label: '职场经验', color: 'pink' },
  { id: 'content', label: '内容创作', color: 'black' }
];

const explorations = [
  { marker: '64', title: '建议找工作的朋友，都去做一个 AI 作品集！', category: 'career', url: 'https://www.xiaohongshu.com/discovery/item/6ae5d6ad000000000e02f631?source=webshare&xhsshare=pc_web&xsec_token=AB8_KT272tbjb5dibLM4C6ftJIsv62kK4mlV9caFcH7Ag=&xsec_source=pc_share', left: 45, top: 215, rotate: -1, width: 4, height: 3, kind: 'landscape', tone: 'violet' },
  { marker: '07', title: '没有团队，我靠 AI 写产品 PRD 创业赚了几十个 W', category: 'product', url: 'https://www.xiaohongshu.com/discovery/item/6ae4925a0000000006031e28?source=webshare&xhsshare=pc_web&xsec_token=ABawVm_P3NDYs9JhGjdnG3yxLf5u-I6g1f6a-mIznI2zE=&xsec_source=pc_share', left: 80, top: 0, rotate: 3, width: 4, height: 3, kind: 'landscape', tone: 'yellow' },
  { marker: '62', title: '每天都看到，但到底啥是 Skill？', category: 'ai', url: 'https://www.xiaohongshu.com/discovery/item/6a1d63dc0000000007023e15?source=webshare&xhsshare=pc_web&xsec_token=AB7NDbv38lvLYWzvoYJV7JzXikouBLm_6uDBeuBpWrG-Y=&xsec_source=pc_share', left: -5, top: 180, rotate: -4, width: 2, height: 3, kind: 'portrait', tone: 'blue' },
  { marker: '45', title: 'EP01：我想当 AI 产品经理，我该从何学起？', category: 'career', url: 'https://www.xiaohongshu.com/discovery/item/69cfd889000000001f002566?source=webshare&xhsshare=pc_web&xsec_token=ABazm7M-IHERtivf-aKDqfwcB3x67KNwkYi9SMGRGFvTc=&xsec_source=pc_share', left: 34, top: 10, rotate: 0, width: 4, height: 3, kind: 'landscape', tone: 'peach' },
  { marker: '30', title: '小白友好｜10 分钟讲透“小龙虾”！', category: 'ai', url: 'https://www.xiaohongshu.com/discovery/item/69aaf798000000000d00b74e?source=webshare&xhsshare=pc_web&xsec_token=ABtdKNQ2AWE_9nDClU7kwrdONq-W8KRzVBr5fkVywmsg4=&xsec_source=pc_share', left: 66, top: 0, rotate: 1, width: 2, height: 3, kind: 'portrait', tone: 'green' },
  { marker: '41', title: '让我们回归到起点：到底什么是 Vibe Coding？', category: 'ai', url: 'https://www.xiaohongshu.com/discovery/item/69a0745c000000002800a1e8?source=webshare&xhsshare=pc_web&xsec_token=ABiBAxbhm2EE4urAwHU0K2yaoYKF4OlZ2Kg5MbJuyEzvU=&xsec_source=pc_share', left: 1, top: 325, rotate: -3, width: 4, height: 3, kind: 'landscape', tone: 'blue' },
  { marker: '45', title: '完全不碰代码怎么做产品，纯小白教学全流程', category: 'product', url: 'https://www.xiaohongshu.com/discovery/item/6985e8d5000000001a023702?source=webshare&xhsshare=pc_web&xsec_token=ABarZFtgJ-v-UQoBJAwZSiEfeiFeWUQzJJJST-QbS83i8=&xsec_source=pc_share', left: 80, top: 245, rotate: 0, width: 2, height: 3, kind: 'portrait', tone: 'violet' },
  { marker: '84', title: '把 GitHub 开源项目扒下来，纯小白教学全流程', category: 'content', url: 'https://www.xiaohongshu.com/discovery/item/6977923c0000000028009352?source=webshare&xhsshare=pc_web&xsec_token=ABWf3sGif4n2gMhSD8TgJT--fZURCDw8RonkEVjcuCGJ4=&xsec_source=pc_share', left: 20, top: 260, rotate: 0, width: 4, height: 3, kind: 'landscape', tone: 'green' },
  { marker: '28', title: '从 0 到 1 学 AI 的第一步，真的不是学语言！', category: 'ai', url: 'https://www.xiaohongshu.com/discovery/item/69734d4e000000002801ea2f?source=webshare&xhsshare=pc_web&xsec_token=ABmELCpY3JMCx-F2byzcSjgrX27DFm3SYaNoaWh_8gGM8=&xsec_source=pc_share', left: 63, top: 290, rotate: 3, width: 2, height: 3, kind: 'portrait', tone: 'yellow' }
];

const experiences = [
  ['2021.06 – 至今', '字节跳动·杭州', '商业化产品经理'],
  ['2019.12 – 2021.06', '字节跳动·北京', '中台产品经理']
];

const projectRows = projects.map((project, index) => {
  const employer = project.employer ? `<span class="employer-label"><strong>${project.employer}</strong><span>ByteDance · 两段部门经历</span></span>` : '';
  const previews = project.previews.map((label, imageIndex) => `<div class="project-preview preview-${imageIndex} experience-poster theme-${index}"><span>${project.employer ? `${project.employer} / ByteDance` : `0${imageIndex + 1}`}</span><strong>${label}</strong><small>${project.previewCaptions?.[imageIndex] || 'ATUNTUN / PROFILE'}</small></div>`).join('');
  const slides = project.previews.map((label, imageIndex) => `<button class="mobile-slide" type="button" data-detail="${index}" aria-label="查看${project.employer ? `${project.employer}·${label}` : project.name}详情"><span class="mobile-poster theme-${index}"><i>${project.employer ? `${project.employer} / ByteDance` : `0${imageIndex + 1}`}</i><strong>${label}</strong><small>${project.previewCaptions?.[imageIndex] || 'ATUNTUN / PROFILE'}</small></span></button>`).join('');
  const dots = project.previews.map((_, imageIndex) => `<span class="${imageIndex === 0 ? 'on' : ''}"></span>`).join('');
  return `
    <button type="button" class="project-row" data-project="${index}" data-detail="${index}">
      <div class="project-label">
        <h2>${project.name}</h2>
        ${employer}
        <p>${project.description}</p>
        <p class="date">${project.date}</p>
      </div>
      <div class="project-previews ${project.employer ? 'department-previews' : ''}" aria-hidden="true">${previews}</div>
    </button>
    <article class="mobile-project" aria-labelledby="${project.slug}-title">
      <header><h2 id="${project.slug}-title"><button class="mobile-title" type="button" data-detail="${index}">${project.name}</button></h2><p class="date">${project.date}</p></header>
      ${employer}
      <div class="mobile-strip">${slides}</div>
      <div class="mobile-dots" aria-hidden="true">${dots}</div>
      <p class="mobile-description">${project.description}</p>
      <button type="button" class="read-case" data-detail="${index}">查看经历详情 <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    </article>`;
}).join('');

const categoryMarkup = categories.map((category, index) => {
  const ending = index === 0 ? ',<br>' : index === 1 ? ', ' : index === 2 ? ', and ' : '.';
  return `<button type="button" class="category" data-category="${category.id}" aria-pressed="false"><span class="category-pill ${category.color}">${category.label}</span></button>${ending}`;
}).join('');

const explorationCards = explorations.map((item, index) => `
  <li class="exploration-card ${item.kind}" data-index="${index}" data-category="${item.category}" style="--left:${item.left}%;--top:${item.top}px;--rotate:${item.rotate}deg;--z:${index + 1}">
    <a class="exploration-media" href="${item.url}" target="_blank" rel="noopener noreferrer" draggable="false" aria-label="在小红书查看：${item.title}" style="aspect-ratio:3/4">
      <img class="post-cover" src="/explorations/covers/xhs-${String(index + 1).padStart(2, '0')}.jpg" alt="${item.title}封面" loading="lazy" draggable="false">
      <span class="post-link-badge">查看原帖 ↗</span>
    </a>
    <span class="pin" aria-hidden="true" style="background-image:url('/explorations/pins/${categories.find((category) => category.id === item.category).color}.webp')"></span>
  </li>`).join('');

const experienceMarkup = experiences.map(([years, company, role]) => `<li><span class="years">${years}</span><span class="company">${company}</span><span class="role">${role}</span></li>`).join('');

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#work">Skip to work</a>
  <main>
    <section class="hero" aria-label="Introduction">
      <p class="hero-intro">I build enterprise products and the<br>systems behind them. <button type="button" class="more" data-open-about aria-haspopup="dialog">[more]</button></p>
      <p class="hero-education">Commercial Product Manager<br>Security · Risk · Enterprise</p>
      <h1 aria-label="Atuntun"><span>Atun</span><span>tun</span></h1>
      <div class="badge-stage">
        <div class="badge-rig" role="img" tabindex="0" aria-label="Atuntun’s interactive badge. Drag to move it.">
          <span class="badge-shadow" aria-hidden="true"></span>
          <img src="/assets/badge-still.webp" alt="" width="704" height="1768" fetchpriority="high" draggable="false">
          <span class="custom-badge-card"><img class="badge-photo" src="/assets/atutun-avatar.jpg" alt=""><span class="badge-person"><b>Atun</b><b>tun</b></span><span class="badge-role"><i>Atuntun</i><strong>Commercial Product Manager</strong><small>Security · Risk · Growth</small></span></span>
        </div>
      </div>
      <div class="mobile-lanyard">
        <div class="mobile-lanyard-visual"><img src="/assets/badge-lanyard.webp" alt="Atuntun’s badge" width="900" height="1997" fetchpriority="high" draggable="false"><span class="custom-badge-card"><img class="badge-photo" src="/assets/atutun-avatar.jpg" alt=""><span class="badge-person"><b>Atun</b><b>tun</b></span><span class="badge-role"><i>Atuntun</i><strong>Commercial Product Manager</strong><small>Security · Risk · Growth</small></span></span></div>
      </div>
      <div class="mobile-hero-copy">
        <p class="lead">I build enterprise products and the systems behind them.</p>
        <p class="meta">Commercial Product Manager · Security / Risk / Enterprise. <button type="button" class="more" data-open-about aria-haspopup="dialog">[more]</button></p>
      </div>
    </section>

    <section id="work" class="work" aria-label="Selected work">${projectRows}</section>

    <section class="explorations" aria-labelledby="explorations-title">
      <div class="explorations-head">
        <h2 id="explorations-title">小红书爆款</h2>
        <p><span>这里会展示我的</span> ${categoryMarkup}</p>
      </div>
      <ul class="explorations-board">${explorationCards}</ul>
    </section>
  </main>

  <footer class="footer">
    <h2>Find me online,<br>let’s connect</h2>
    <p>
      <span class="contact-line">欢迎通过 <a class="social" href="${explorations[0].url}" target="_blank" rel="noopener noreferrer"><span class="social-pill instagram">小红书 @Atuntun</span></a> 找到我，</span>
      <span class="contact-line">也可以发邮件至 <a class="social" href="mailto:panggungun24@163.com"><span class="social-pill email">panggungun24@163.com</span></a>。</span>
      <span class="contact-missing">#此部分缺失内容：小红书账号主页链接。</span>
    </p>
  </footer>

  <dialog id="about-dialog" class="about-dialog" aria-labelledby="about-title">
    <div class="about-panel">
      <div class="about-drag">
        <div class="about-grab" aria-hidden="true"><span></span></div>
        <header><h2 id="about-title">About</h2><button type="button" class="about-close" aria-label="Close"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></header>
      </div>
      <div class="about-body">
        <div class="bio"><p>我是 Atuntun，一名聚焦安全、风控、权限与终端产品的 B 端商业化产品经理。</p><p>我擅长将复杂企业场景拆成可交付、可复制、可规模化的产品系统，从种子客户验证一直做到商业增长。</p></div>
        <div class="headshot"><img class="profile-photo" src="/assets/atutun-avatar.jpg" alt="Atuntun portrait"></div>
        <section aria-labelledby="experience-title"><h3 id="experience-title">职业经历</h3><ol class="experience">${experienceMarkup}</ol></section>
      </div>
    </div>
  </dialog>

  <dialog id="detail-dialog" class="detail-dialog" aria-labelledby="detail-title">
    <div class="detail-panel">
      <header><div><span id="detail-meta"></span><h2 id="detail-title"></h2></div><button type="button" class="detail-close" aria-label="Close"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></header>
      <div id="detail-content" class="detail-content"></div>
    </div>
  </dialog>
`;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileQuery = window.matchMedia('(max-width: 700px)');

function setupBadge() {
  const stage = document.querySelector('.badge-stage');
  let scene;
  let loading = false;
  let disposed = false;

  async function load() {
    if (mobileQuery.matches || scene || loading || disposed) return;
    loading = true;
    try {
      const { createBadgeScene } = await import('./badge-scene.js');
      if (disposed) return;
      scene = await createBadgeScene(stage, { reducedMotion, mobileQuery });
      if (disposed) scene.dispose();
    } catch (error) {
      console.error('Could not initialize the interactive badge:', error);
      stage.dataset.renderer = 'fallback';
    } finally {
      loading = false;
    }
  }

  mobileQuery.addEventListener('change', load);
  load();
  if (import.meta.hot) import.meta.hot.dispose(() => {
    disposed = true;
    mobileQuery.removeEventListener('change', load);
    scene?.dispose();
  });
}

function setupMobileLanyard() {
  const image = document.querySelector('.mobile-lanyard-visual');
  let angle = 0;
  let velocity = reducedMotion.matches ? 0 : -0.35;
  let lastScroll = window.scrollY;
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(2, (now - last) / 16.67);
    last = now;
    if (!reducedMotion.matches) {
      velocity += -angle * 0.028 * dt;
      velocity *= Math.pow(0.9, dt);
      angle += velocity * dt;
      angle = Math.max(-6, Math.min(6, angle));
      image.style.transform = `rotate(${angle.toFixed(3)}deg)`;
    }
    requestAnimationFrame(tick);
  }
  image.addEventListener('pointerdown', () => {
    if (mobileQuery.matches && !reducedMotion.matches) velocity += 7.5;
  });
  window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    if (mobileQuery.matches && window.scrollY < window.innerHeight && !reducedMotion.matches) velocity -= Math.max(-3, Math.min(3, delta * 0.045));
  }, { passive: true });
  requestAnimationFrame(tick);
}

function setupProjects() {
  const work = document.querySelector('.work');
  const rows = [...document.querySelectorAll('.project-row')];
  const activate = (row) => {
    rows.forEach((candidate) => {
      candidate.classList.toggle('active', candidate === row);
      candidate.classList.toggle('muted', candidate !== row);
    });
  };
  const clear = () => rows.forEach((row) => row.classList.remove('active', 'muted'));
  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => activate(row));
    row.addEventListener('focus', () => activate(row));
    row.addEventListener('blur', clear);
  });
  work.addEventListener('pointerleave', clear);

  document.querySelectorAll('.mobile-strip').forEach((strip) => {
    const dots = [...strip.nextElementSibling.children];
    strip.addEventListener('scroll', () => {
      const slide = strip.firstElementChild;
      const index = Math.round(strip.scrollLeft / (slide.offsetWidth + 8));
      dots.forEach((dot, dotIndex) => dot.classList.toggle('on', dotIndex === index));
    }, { passive: true });
  });
}

function setupExplorations() {
  const board = document.querySelector('.explorations-board');
  const cards = [...document.querySelectorAll('.exploration-card')];
  const buttons = [...document.querySelectorAll('.category')];
  let selected = null;
  let topZ = cards.length + 1;

  function applyFilter(category) {
    board.dataset.filter = category || '';
    cards.forEach((card, index) => {
      const matches = !category || card.dataset.category === category;
      card.classList.toggle('aside', !matches);
      card.style.setProperty('--filter-x', '0px');
      card.style.setProperty('--filter-y', '0px');
      card.style.setProperty('--filter-scale', '1');
      if (category && matches && !mobileQuery.matches) {
        const peers = cards.filter((candidate) => candidate.dataset.category === category);
        const peerIndex = peers.indexOf(card);
        const rowWidth = Math.min(board.clientWidth * 0.7, peers.length * 300);
        const targetX = board.clientWidth / 2 - rowWidth / 2 + peerIndex * (rowWidth / Math.max(1, peers.length - 1)) - (parseFloat(getComputedStyle(card).left) || 0) - card.offsetWidth / 2;
        const targetY = board.clientHeight * 0.48 - (parseFloat(getComputedStyle(card).top) || 0) - card.offsetHeight / 2;
        card.style.setProperty('--filter-x', `${targetX}px`);
        card.style.setProperty('--filter-y', `${targetY}px`);
        card.style.setProperty('--filter-scale', '1');
        card.style.zIndex = `${topZ + index}`;
      } else if (category && !matches && !mobileQuery.matches) {
        const direction = index % 2 ? 1 : -1;
        card.style.setProperty('--filter-x', `${direction * (180 + index * 12)}px`);
        card.style.setProperty('--filter-y', `${(index % 3 - 1) * 60}px`);
        card.style.setProperty('--filter-scale', '.7');
      } else {
        card.style.zIndex = `${index + 1}`;
      }
    });
    buttons.forEach((button) => {
      button.classList.toggle('off', Boolean(category) && button.dataset.category !== category);
      button.setAttribute('aria-pressed', String(selected === button.dataset.category));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      selected = selected === button.dataset.category ? null : button.dataset.category;
      applyFilter(selected);
    });
    button.addEventListener('pointerenter', (event) => {
      if (!selected && event.pointerType === 'mouse') applyFilter(button.dataset.category);
    });
    button.addEventListener('pointerleave', (event) => {
      if (!selected && event.pointerType === 'mouse') applyFilter(null);
    });
  });

  cards.forEach((card, index) => {
    const media = card.querySelector('.exploration-media');
    let drag = null;
    let moved = false;
    let offsetX = 0;
    let offsetY = 0;
    let angle = explorations[index].rotate;

    function update() {
      card.style.setProperty('--drag-x', `${offsetX}px`);
      card.style.setProperty('--drag-y', `${offsetY}px`);
      card.style.setProperty('--drag-rotate', `${angle}deg`);
    }

    card.addEventListener('pointerdown', (event) => {
      moved = false;
      if (mobileQuery.matches || event.button !== 0 || selected) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: offsetX, startY: offsetY };
      card.style.zIndex = `${++topZ}`;
    });
    window.addEventListener('pointermove', (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!moved) {
        if (Math.hypot(dx, dy) < 6) return;
        moved = true;
        // Capture only a real drag; capturing on pointerdown steals the link's click.
        card.setPointerCapture(event.pointerId);
        card.classList.add('held');
      }
      offsetX = drag.startX + dx;
      offsetY = drag.startY + dy;
      angle = Math.max(-10, Math.min(10, explorations[index].rotate + dx * 0.025));
      update();
    });
    const release = (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      drag = null;
      card.classList.remove('held');
      if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
      if (event.type === 'pointercancel') moved = false;
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    card.addEventListener('lostpointercapture', release);
    card.addEventListener('keydown', (event) => {
      const delta = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] }[event.key];
      if (!delta) return;
      event.preventDefault();
      offsetX += delta[0];
      offsetY += delta[1];
      update();
    });
    media.addEventListener('dragstart', (event) => event.preventDefault());
    card.addEventListener('click', (event) => {
      if (moved && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
      }
      moved = false;
    }, true);
  });

  window.addEventListener('resize', () => applyFilter(selected));
}

function setupDetails() {
  const dialog = document.querySelector('#detail-dialog');
  const title = dialog.querySelector('#detail-title');
  const meta = dialog.querySelector('#detail-meta');
  const content = dialog.querySelector('#detail-content');

  function open(index) {
    const project = projects[index];
    if (!project || dialog.open) return;
    title.textContent = project.employer || project.name;
    meta.textContent = project.employer ? `${project.name} · ${project.date}` : project.date;
    content.innerHTML = project.detail;
    dialog.showModal();
    document.documentElement.classList.add('modal-open');
    requestAnimationFrame(() => dialog.classList.add('shown'));
  }

  function close() {
    if (!dialog.open) return;
    dialog.classList.remove('shown');
    const finish = () => {
      dialog.close();
      document.documentElement.classList.remove('modal-open');
    };
    reducedMotion.matches ? finish() : window.setTimeout(finish, 420);
  }

  document.querySelectorAll('[data-detail]').forEach((button) => button.addEventListener('click', () => open(Number(button.dataset.detail))));
  dialog.querySelector('.detail-close').addEventListener('click', close);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
}

function setupAbout() {
  const dialog = document.querySelector('#about-dialog');
  const panel = dialog.querySelector('.about-panel');
  const dragArea = dialog.querySelector('.about-drag');
  let drag = null;

  function open() {
    if (dialog.open) return;
    dialog.showModal();
    document.documentElement.classList.add('modal-open');
    requestAnimationFrame(() => dialog.classList.add('shown'));
  }
  function close() {
    if (!dialog.open) return;
    dialog.classList.remove('shown');
    panel.style.transform = '';
    dialog.style.backgroundColor = '';
    const finish = () => {
      dialog.close();
      document.documentElement.classList.remove('modal-open');
    };
    reducedMotion.matches ? finish() : window.setTimeout(finish, 500);
  }

  document.querySelectorAll('[data-open-about]').forEach((button) => button.addEventListener('click', open));
  dialog.querySelector('.about-close').addEventListener('click', close);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });

  dragArea.addEventListener('pointerdown', (event) => {
    if (!mobileQuery.matches || event.button !== 0 || event.target.closest('button')) return;
    drag = { id: event.pointerId, y: event.clientY, offset: 0, lastY: event.clientY, lastT: event.timeStamp, velocity: 0 };
    dragArea.setPointerCapture(event.pointerId);
    panel.classList.add('dragging');
  });
  dragArea.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const raw = event.clientY - drag.y;
    drag.offset = raw >= 0 ? raw : -6 * Math.sqrt(-raw);
    drag.velocity = (event.clientY - drag.lastY) / Math.max(1, event.timeStamp - drag.lastT);
    drag.lastY = event.clientY;
    drag.lastT = event.timeStamp;
    panel.style.transform = `translateY(${drag.offset}px)`;
    dialog.style.backgroundColor = `rgb(0 0 0 / ${Math.max(0, 0.18 * (1 - Math.max(0, drag.offset) / panel.offsetHeight))})`;
  });
  const release = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const shouldClose = drag.offset > panel.offsetHeight / 4 || (drag.offset > 0 && drag.velocity > 0.4);
    drag = null;
    panel.classList.remove('dragging');
    panel.style.transform = '';
    dialog.style.backgroundColor = '';
    if (shouldClose) close();
  };
  dragArea.addEventListener('pointerup', release);
  dragArea.addEventListener('pointercancel', release);
  dialog.querySelector('.about-close').addEventListener('pointerdown', (event) => event.stopPropagation());
}

setupBadge();
setupMobileLanyard();
setupProjects();
setupExplorations();
setupAbout();
setupDetails();
