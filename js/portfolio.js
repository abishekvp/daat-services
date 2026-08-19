/* ============================================================
   DAAT SERVICES — Portfolio Filter + Case Study Modals
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initCaseStudyModals();
});

/* ─── Portfolio Data ─────────────────────────────────────── */
const PORTFOLIO = [
  // {
  //   id: 'fintech-dashboard',
  //   category: 'web',
  //   title: 'FinEdge Analytics Platform',
  //   client: 'FinEdge Technologies, Bengaluru',
  //   tag: 'Web Engineering',
  //   image: 'assets/port_1.jpg',
  //   color: 'cyan',
  //   problem: 'FinEdge\'s legacy PHP monolith was crashing under peak trading hours, causing data loss and zero-downtime deployments were impossible. Their 50k daily users experienced 8–12 second page loads.',
  //   solution: 'Rebuilt on Django microservices with PostgreSQL read replicas and Redis caching. Implemented React frontend with lazy-loaded data visualization components. Deployed on AWS ECS with auto-scaling groups and an Nginx load balancer.',
  //   architecture: ['Django REST Framework API', 'PostgreSQL + Redis caching layer', 'React 18 + Recharts visualization', 'AWS ECS + CloudFront CDN', 'GitHub Actions CI/CD pipeline'],
  //   metrics: [
  //     { num: '92%', label: 'Load time reduction' },
  //     { num: '99.97%', label: 'Uptime achieved' },
  //     { num: '3x', label: 'Peak traffic handled' },
  //     { num: '₹0', label: 'Data loss incidents' },
  //   ]
  // },
  // {
  //   id: 'ecomm-seo',
  //   category: 'seo',
  //   title: 'StyleVault Organic Growth',
  //   client: 'StyleVault.in, Mumbai',
  //   tag: 'SEO',
  //   image: 'assets/port_2.jpg',
  //   color: 'purple',
  //   problem: 'StyleVault\'s D2C fashion site had 0 organic presence. They were spending ₹3L/month on paid ads with no brand search volume and a toxic backlink profile from previous black-hat SEO.',
  //   solution: 'Executed a full technical SEO audit, disavowed 1,200 toxic links, restructured site architecture with proper canonical tags, and built a 6-month content cluster strategy around 340 long-tail keywords.',
  //   architecture: ['Technical SEO audit + crawl fix', 'Toxic backlink disavow campaign', 'Content cluster strategy (340 KW)', 'Schema markup implementation', 'Core Web Vitals optimization'],
  //   metrics: [
  //     { num: '420%', label: 'Organic traffic growth' },
  //     { num: '#1', label: 'Rankings for 28 keywords' },
  //     { num: '68%', label: 'Reduction in paid spend' },
  //     { num: '4.2x', label: 'ROI in 6 months' },
  //   ]
  // },
  // {
  //   id: 'youtube-editing',
  //   category: 'video',
  //   title: 'TechTalks YouTube Channel',
  //   client: 'TechTalks Media, Hyderabad',
  //   tag: 'Video Production',
  //   image: 'assets/port_3.jpg',
  //   color: 'purple',
  //   problem: 'TechTalks had 12k subscribers with average 28% retention rate and 800 monthly views. Content felt unstructured, thumbnails had <2% CTR, and audio quality was deterring viewers.',
  //   solution: 'Full post-production pipeline using DaVinci Resolve: color grading, motion graphics, dynamic chapter intros. Redesigned thumbnails with A/B testing. Implemented a structured editorial calendar with hook-first scripting.',
  //   architecture: ['DaVinci Resolve color grading', 'Custom motion graphics package', 'Thumbnail A/B testing system', 'Hook-first script framework', 'Audio mastering + noise removal'],
  //   metrics: [
  //     { num: '67%', label: 'Avg. retention rate' },
  //     { num: '8.4%', label: 'CTR achieved' },
  //     { num: '94k', label: 'Subscribers in 8 months' },
  //     { num: '₹2.1L', label: 'Monthly AdSense revenue' },
  //   ]
  // },
  {
    id: 'saas-security',
    category: 'web',
    title: 'Securefields — Password Vault - SaaS Platform',
    client: 'Secure Password Manager, Tamil Nadu, India',
    tag: 'Web Engineering',
    image: 'assets/port_4.jpg',
    color: 'cyan',
    problem: 'Enterprises required a highly secure, centralized vault to manage credentials and secrets without exposing plaintext data to the server. Existing solutions lacked granular access controls and suffered from performance bottlenecks during bulk decryption operations.',
    solution: 'Engineered a robust, high-performance password vault using Django and PostgreSQL with a strict security-first backend architecture. Implemented a zero-knowledge encryption model (AES-256), secure credential sharing protocols, and comprehensive audit logging to ensure complete data integrity.',
    architecture: [
      'Django backend with security-first architecture',
      'PostgreSQL for robust data persistence',
      'Zero-knowledge encryption model (AES-256-GCM)',
      'Granular Role-Based Access Control (RBAC)',
      'Immutable audit trail logging'
    ],
    metrics: [
      { num: '0', label: 'Security breaches' },
      { num: 'AES-256', label: 'End-to-end encryption' },
      { num: '<50ms', label: 'Avg. decryption latency' },
      { num: '100%', label: 'Audit compliance' }
    ]
  },
  {
    id: 'fxea-vault',
    category: 'web',
    title: 'FXEAVault — Algorithmic Trading EA SaaS',
    client: 'FXEAVault',
    tag: 'Web Engineering & Licensing',
    image: 'assets/port_2.jpg',
    color: 'blue',
    problem: 'Forex algorithm developers needed a secure platform to distribute Expert Advisors (MT4/MT5) without exposing their proprietary code to piracy. The system required ultra-low-latency license validation to ensure trading execution was not delayed by server checks.',
    solution: 'Built a high-performance distribution and licensing backend using Django and PostgreSQL. Engineered a secure-first architecture featuring automated cryptographic license generation, real-time API validation for MT4/MT5 terminals, and encrypted file delivery tied directly to active user subscriptions.',
    architecture: [
      'Django backend for subscription and license management',
      'PostgreSQL for robust, high-volume transactional data',
      'Ultra-low-latency API for real-time terminal validation',
      'Encrypted payload delivery for EA files',
      'Automated payment gateway integration'
    ],
    metrics: [
      { num: '99.9%', label: 'API Uptime for live trading' },
      { num: '<80ms', label: 'License validation latency' },
      { num: 'MT4/MT5', label: 'Seamless terminal integration' },
      { num: '0', label: 'Unauthorized software leaks' }
    ]
  },
  // {
  //   id: 'product-photos',
  //   category: 'creative',
  //   title: 'OrganicRoots Product Catalog',
  //   client: 'OrganicRoots, Delhi NCR',
  //   tag: 'Creative Production',
  //   image: 'assets/port_5.jpg',
  //   color: 'purple',
  //   problem: 'OrganicRoots\' Amazon listing had poor-quality, inconsistent product photography leading to 1.2% conversion rate. Competitor products with better visuals were consistently outranking them.',
  //   solution: 'Comprehensive product photo editing: background removal, color consistency, shadow normalization, lifestyle composite creation, and Infographic design. Delivered 320 final images across 8 product lines.',
  //   architecture: ['Photoshop batch processing workflow', 'Lifestyle composite creation', 'Amazon-optimized image sizing', 'A+ Content design (6 ASINs)', 'Brand style guide creation'],
  //   metrics: [
  //     { num: '3.8%', label: 'Conversion rate achieved' },
  //     { num: '217%', label: 'Revenue growth (3 months)' },
  //     { num: '320', label: 'Images delivered' },
  //     { num: '#1', label: 'Best Seller badge (2 ASINs)' },
  //   ]
  // },
  // {
  //   id: 'digital-marketing',
  //   category: 'marketing',
  //   title: 'EdTech Lead Generation Campaign',
  //   client: 'SkillBridge Academy, Chennai',
  //   tag: 'Digital Marketing',
  //   image: 'assets/port_6.jpg',
  //   color: 'cyan',
  //   problem: 'SkillBridge was spending ₹1.5L/month on Meta ads with ₹3,200 cost-per-lead, which made their ₹12,000 courses barely profitable. Attribution was broken and retargeting audiences were cold.',
  //   solution: 'Full-funnel rebuild: audience segmentation, creative A/B testing matrix (32 ad variants), conversion-optimized landing pages, WhatsApp Business API integration for instant lead nurturing, and Google Analytics 4 attribution modeling.',
  //   architecture: ['Meta Ads campaign restructure', '32-variant creative A/B test', 'Conversion-optimized landing pages', 'WhatsApp API lead nurturing', 'GA4 attribution modeling'],
  //   metrics: [
  //     { num: '₹840', label: 'Cost per lead achieved' },
  //     { num: '4.2x', label: 'ROAS improvement' },
  //     { num: '68%', label: 'Lead-to-enrollment rate' },
  //     { num: '₹46L', label: 'Revenue in first quarter' },
  //   ]
  // },
];

let activeFilter = 'all';

/* ─── Filter Tabs ─────────────────────────────────────────── */
function initPortfolioFilter() {
  const container = document.getElementById('portfolio-grid');
  const tabs = document.querySelectorAll('.filter-tab');
  if (!container || !tabs.length) return;

  renderPortfolio(container);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderPortfolio(container);
    });
  });
}

function renderPortfolio(container) {
  const items = activeFilter === 'all'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.category === activeFilter);

  container.innerHTML = '';

  items.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'portfolio-card glass-card reveal';
    card.style.transitionDelay = `${i * 60}ms`;
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="portfolio-card-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,rgba(0,240,255,0.08),rgba(112,0,255,0.08))'">
        <div class="portfolio-card-overlay">
          <span class="btn btn-sm btn-primary">View Case Study →</span>
        </div>
      </div>
      <span class="portfolio-card-tag">${p.tag}</span>
      <h3 style="font-size:1.1rem;margin-bottom:0.5rem">${p.title}</h3>
      <p style="font-size:0.82rem;color:var(--text-muted)">${p.client}</p>
    `;
    container.appendChild(card);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('visible'));
    });
  });
}

/* ─── Case Study Modals ───────────────────────────────────── */
function initCaseStudyModals() {
  const backdrop = document.getElementById('case-modal');
  if (!backdrop) return;

  document.addEventListener('click', e => {
    const card = e.target.closest('[data-id]');
    if (!card) return;

    const project = PORTFOLIO.find(p => p.id === card.dataset.id);
    if (!project) return;

    openCaseStudy(project, backdrop);
  });

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal(backdrop);
  });

  document.getElementById('modal-close')?.addEventListener('click', () => closeModal(backdrop));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal(backdrop);
  });
}

function openCaseStudy(p, backdrop) {
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="case-section">
      <div class="case-section-label"><span class="num">01</span> The Problem</div>
      <p>${p.problem}</p>
    </div>
    <div class="case-section">
      <div class="case-section-label"><span class="num">02</span> The Solution & Architecture</div>
      <p style="margin-bottom:1rem">${p.solution}</p>
      <ul style="display:flex;flex-direction:column;gap:0.5rem">
        ${p.architecture.map(a => `
          <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:var(--text-body)">
            <span style="color:var(--cyan);font-size:0.8rem">→</span>${a}
          </li>`).join('')}
      </ul>
    </div>
    <div class="case-section" style="border-bottom:none">
      <div class="case-section-label"><span class="num">03</span> The Impact</div>
      <div class="impact-metrics">
        ${p.metrics.map(m => `
          <div class="impact-metric">
            <div class="impact-num">${m.num}</div>
            <div class="impact-label">${m.label}</div>
          </div>`).join('')}
      </div>
    </div>
  `;

  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-client').textContent = p.client;
  document.getElementById('modal-tag').textContent = p.tag;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(backdrop) {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}
