// ===== C2 News – Blog JS =====

const STORAGE_KEY = 'c2news-posts';
const THEME_KEY   = 'c2news-theme';

// ===== Seed posts (usados se localStorage vazio) =====
const SEED_POSTS = [
  {
    id: 'post-001',
    slug: 'risco-portuario-nao-acontece-em-silos',
    title: 'Risco portuário não acontece em silos',
    category: 'Risco Integrado',
    date: '2026-06-03',
    excerpt: 'Por que segurança física, sistemas, conformidade e impacto financeiro precisam estar no mesmo mapa decisório.',
    cover: './images/porto-logistica.jpg',
    readTime: '5 min',
    content: `<p class="lead-paragraph">Uma interrupção portuária raramente permanece restrita ao ponto em que começou. Um incidente em sistemas pode paralisar a operação, gerar retenções, comprometer compromissos contratuais e ampliar a exposição reputacional.</p>
<p>A gestão madura começa por uma visão compartilhada do risco. Isso exige conectar segurança física, ambiente informacional, conformidade e impacto financeiro em uma matriz única, priorizada pela consequência para o negócio.</p>
<h2>Uma linguagem comum para decisões críticas</h2>
<p>O diagnóstico integrado não substitui especialistas. Ele cria uma linguagem comum para que cada especialidade trabalhe sobre as mesmas prioridades e para que a liderança possa decidir com clareza.</p>
<p class="quote">Quando cada área enxerga apenas seu próprio silo, o risco total permanece invisível para quem decide.</p>
<h2>Conectando segurança física e sistemas</h2>
<p>A segurança física de um porto não existe isolada de sua segurança informacional. Uma brecha em sistemas de controle de acesso pode comprometer protocolos físicos; uma falha em câmeras de monitoramento pode deixar áreas críticas sem cobertura.</p>
<p>A conformidade regulatória adiciona outra dimensão: não basta operar com segurança se os registros, procedimentos e documentações não estiverem em ordem para uma auditoria ou inspeção.</p>
<div class="strategy-box">
  <h3>Pilares do risco integrado portuário</h3>
  <ul>
    <li>Segurança física: controle de acesso, monitoramento, resposta a incidentes</li>
    <li>Segurança de sistemas: OT/IT, controle de cargas, comunicações</li>
    <li>Conformidade regulatória: ISPS Code, normas ambientais, auditoria</li>
    <li>Impacto financeiro: quantificação de perdas, seguros, continuidade contratual</li>
  </ul>
</div>
<p>A visão integrada permite priorizar onde investir em proteção com base no impacto real para a operação — não apenas na probabilidade isolada de cada evento.</p>
<div class="article-cta">
  <span>C2 Trust Defense</span>
  <h2>Sua operação tem um mapa integrado de riscos?</h2>
  <p>A C2 Trust conecta inteligência, segurança e decisão em um framework único para operações críticas.</p>
  <a class="btn" href="./defense.html">Conheça o Defense</a>
</div>
<div class="article-tags">
  <span>Risco Integrado</span><span>Portos</span><span>Segurança Física</span><span>Conformidade</span>
</div>`
  },
  {
    id: 'post-002',
    slug: 'continuidade-operacional-comeca-antes-da-crise',
    title: 'Continuidade operacional começa antes da crise',
    category: 'Crises',
    date: '2026-05-21',
    excerpt: 'Planos só funcionam quando responsabilidades, gatilhos e decisões foram exercitados sob pressão real.',
    cover: './images/porto-operacao.jpg',
    readTime: '6 min',
    content: `<p class="lead-paragraph">Ter um Plano de Continuidade de Negócios (PCN) documentado não é suficiente. O que distingue organizações que sobrevivem a crises das que se paralisam é a qualidade do exercício prévio desse plano.</p>
<p>Planos testados apenas no papel falham no momento crítico porque as pessoas não internalizaram os gatilhos, as autoridades de decisão e os protocolos de comunicação.</p>
<h2>O problema dos planos não exercitados</h2>
<p>A maioria das organizações cria documentos detalhados de continuidade e os arquiva até que uma auditoria os solicite. Quando a crise chega, o tempo gasto localizando o documento, entendendo quem é responsável e decidindo o que ativar já comprometeu a resposta.</p>
<p class="quote">Uma crise real não espera que a equipe leia o manual. O plano precisa estar na memória muscular da organização.</p>
<h2>Exercícios que preparam para a realidade</h2>
<p>Exercícios de mesa (tabletop exercises) e simulações funcionais são ferramentas essenciais. Eles expõem falhas no plano antes da crise, calibram o tempo de resposta e revelam ambiguidades nas cadeias de decisão.</p>
<div class="strategy-box">
  <h3>Componentes de um plano de continuidade efetivo</h3>
  <ul>
    <li>Mapeamento de processos críticos e suas dependências operacionais</li>
    <li>Definição clara de gatilhos e níveis de ativação</li>
    <li>Cadeia de comando e autoridade decisória inequívoca</li>
    <li>Protocolos de comunicação internos e externos</li>
    <li>Exercícios regulares com registro e melhoria contínua</li>
  </ul>
</div>
<p>A continuidade operacional não é um evento. É uma capacidade organizacional que precisa ser desenvolvida, testada e mantida continuamente.</p>
<div class="article-cta">
  <span>C2 Trust Nexus</span>
  <h2>Sua organização está pronta para responder sob pressão?</h2>
  <p>O C2 Trust Nexus integra planejamento de continuidade, gestão de crises e simulação operacional.</p>
  <a class="btn" href="./nexus.html">Conheça o Nexus</a>
</div>
<div class="article-tags">
  <span>Continuidade</span><span>Crises</span><span>PCN</span><span>Gestão de Riscos</span>
</div>`
  },
  {
    id: 'post-003',
    slug: 'quanto-custa-uma-hora-de-operacao-interrompida',
    title: 'Quanto custa uma hora de operação interrompida?',
    category: 'Vektor',
    date: '2026-05-07',
    excerpt: 'A quantificação financeira conecta prioridades técnicas à linguagem de investimento e governança corporativa.',
    cover: './images/inteligencia-financeira.jpg',
    readTime: '7 min',
    content: `<p class="lead-paragraph">Decisões de investimento em segurança e continuidade frequentemente esbarram em uma lacuna: a dificuldade de traduzir risco técnico em impacto financeiro compreensível para conselhos e investidores.</p>
<p>Quando não se sabe quanto custa uma hora parada, é impossível dimensionar corretamente o investimento em prevenção e resposta.</p>
<h2>A equação do impacto financeiro</h2>
<p>Uma interrupção operacional raramente tem um custo simples. O impacto se desdobra em múltiplas dimensões: receita não realizada, penalidades contratuais, custos de resposta à crise, danos reputacionais e responsabilidade regulatória.</p>
<p class="quote">Quando você coloca número no risco, a conversa sobre prevenção muda completamente de nível.</p>
<div class="metric-strip" aria-label="Componentes do custo de interrupção">
  <span>Receita Perdida</span>
  <span>Penalidades Contratuais</span>
  <span>Custos de Resposta</span>
  <span>Dano Reputacional</span>
  <span>Exposição Regulatória</span>
</div>
<h2>Quantificação como ferramenta de decisão</h2>
<p>Metodologias como FAIR (Factor Analysis of Information Risk) permitem estimar intervalos de perda provável para diferentes cenários de interrupção, transformando percepções subjetivas em dados acionáveis.</p>
<div class="outcomes">
  <h3>Benefícios da quantificação financeira de risco</h3>
  <ul>
    <li>Justifica investimentos em segurança com linguagem de negócio</li>
    <li>Prioriza ações por impacto financeiro, não por percepção técnica</li>
    <li>Melhora o diálogo com conselhos, seguradores e investidores</li>
    <li>Calibra coberturas de seguro e reservas de contingência</li>
    <li>Suporta decisões de M&amp;A e due diligence de risco</li>
  </ul>
</div>
<div class="article-cta">
  <span>C2 Trust Vektor</span>
  <h2>Sua organização conhece o custo real de uma crise?</h2>
  <p>O C2 Trust Vektor integra análise financeira de risco com decisões de investimento e proteção de portfólio.</p>
  <a class="btn" href="./vektor.html">Conheça o Vektor</a>
</div>
<div class="article-tags">
  <span>Finanças</span><span>Quantificação de Risco</span><span>Investimento</span><span>Vektor</span>
</div>`
  }
];

// ===== Storage =====
function getPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const posts = raw ? JSON.parse(raw) : [];
    if (!posts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS;
    }
    return posts;
  } catch { return SEED_POSTS; }
}

function getPostBySlug(slug) {
  return getPosts().find(p => p.slug === slug) || null;
}

// ===== Helpers =====
function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

const BADGE_MAP = {
  'Risco Integrado': 'gold',
  'Crises': '',
  'Vektor': 'blue',
  'Defense': 'blue',
  'Nexus': 'green',
};
function badgeCls(cat) {
  const c = BADGE_MAP[cat];
  return c !== undefined ? (c ? ` ${c}` : '') : '';
}

function fallbackImg() {
  return 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=900&q=80';
}

// ===== Render functions =====
function renderHero(posts) {
  const el = document.getElementById('blog-hero');
  if (!el || !posts.length) return;
  const lead = posts[0];
  const sides = posts.slice(1, 3);
  el.innerHTML = `
    <article class="lead">
      <a href="c2news-artigo.html?slug=${lead.slug}">
        <div class="lead-img"><img src="${lead.cover || fallbackImg()}" alt="" loading="lazy"></div>
        <div class="story-copy">
          <span class="badge${badgeCls(lead.category)}">${lead.category}</span>
          <h1>${lead.title}</h1>
          <p>${lead.excerpt}</p>
          <span class="meta">C2 Trust &middot; ${lead.readTime || '5 min'} de leitura</span>
        </div>
      </a>
    </article>
    <div class="side-grid">
      ${sides.map(p => `
        <article class="side-story">
          <a href="c2news-artigo.html?slug=${p.slug}">
            <div class="thumb"><img src="${p.cover || fallbackImg()}" alt="" loading="lazy"></div>
            <div class="story-copy">
              <span class="badge${badgeCls(p.category)}">${p.category}</span>
              <h2>${p.title}</h2>
              <span class="meta">${fmtDate(p.date)} &middot; ${p.readTime || '5 min'}</span>
            </div>
          </a>
        </article>`).join('')}
    </div>`;
}

function renderGrid(posts, id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!posts.length) { el.innerHTML = '<div class="empty-state"><h3>Nenhuma publicação no momento.</h3></div>'; return; }
  el.innerHTML = posts.slice(0, 3).map(p => `
    <article class="card">
      <a href="c2news-artigo.html?slug=${p.slug}">
        <div class="thumb"><img src="${p.cover || fallbackImg()}" alt="" loading="lazy"></div>
        <div class="story-copy">
          <span class="badge${badgeCls(p.category)}">${p.category}</span>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <span class="meta">${fmtDate(p.date)}</span>
        </div>
      </a>
    </article>`).join('');
}

function renderList(posts, id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!posts.length) { el.innerHTML = '<div class="empty-state"><h3>Nenhuma publicação encontrada.</h3></div>'; return; }
  el.innerHTML = posts.map(p => `
    <article class="list-item">
      <div class="thumb"><img src="${p.cover || fallbackImg()}" alt="" loading="lazy"></div>
      <div>
        <span class="badge${badgeCls(p.category)}">${p.category}</span>
        <h3><a href="c2news-artigo.html?slug=${p.slug}">${p.title}</a></h3>
        <p>${p.excerpt}</p>
        <span class="meta">${fmtDate(p.date)} &middot; ${p.readTime || '5 min'} de leitura</span>
      </div>
    </article>`).join('');
}

function renderMini(posts, id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = posts.slice(0, 3).map(p => `
    <div class="mini">
      <div class="thumb"><img src="${p.cover || fallbackImg()}" alt="" loading="lazy"></div>
      <b><a href="c2news-artigo.html?slug=${p.slug}">${p.title}</a></b>
    </div>`).join('');
}

// ===== Pages =====
function initHomepage() {
  const all = getPosts();
  renderHero(all);
  renderGrid(all.slice(3), 'news-grid');
  renderList(all.slice(0, 5), 'reportagens-list');
  renderMini(all, 'mais-lidas');
}

function initArticle() {
  const slug = new URLSearchParams(location.search).get('slug');
  if (!slug) return;
  const post = getPostBySlug(slug);
  const notFound = document.getElementById('article-not-found');

  if (!post) {
    notFound?.classList.remove('hidden');
    document.getElementById('article-wrap')?.classList.add('hidden');
    return;
  }
  document.title = `${post.title} | C2 Trust News`;

  const set = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  const setHTML = (id, val) => { const e = document.getElementById(id); if (e) e.innerHTML = val; };

  const badge = document.getElementById('article-badge');
  if (badge) { badge.textContent = post.category; badge.className = `badge${badgeCls(post.category)}`; }
  set('article-title', post.title);
  set('article-deck', post.excerpt);
  set('article-meta', `C2 Trust · ${fmtDate(post.date)} · ${post.readTime || '5 min'} de leitura`);
  const cover = document.getElementById('article-cover');
  if (cover) { cover.src = post.cover || ''; if (!post.cover) cover.parentElement?.classList.add('hidden'); }
  setHTML('article-body', post.content || '');
  set('summary-title', post.title);
  set('summary-text', post.excerpt);

  const related = getPosts()
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);
  const fallback = getPosts().filter(p => p.id !== post.id).slice(0, 2);
  renderMini(related.length ? related : fallback, 'related-posts');
}

function initArchive() {
  renderList(getPosts(), 'archive-list');
}

function initCategory() {
  const cat = new URLSearchParams(location.search).get('cat') || '';
  const titleEl = document.getElementById('cat-title');
  const badgeEl = document.getElementById('cat-badge');
  const descEl  = document.getElementById('cat-desc');
  if (titleEl) titleEl.textContent = cat || 'Todas as categorias';
  if (badgeEl) { badgeEl.textContent = cat || 'Arquivo'; badgeEl.className = `badge${badgeCls(cat)}`; }
  if (descEl) descEl.textContent = cat ? `Todas as análises sobre ${cat}` : 'Todas as publicações do C2 News';
  const filtered = cat ? getPosts().filter(p => p.category === cat) : getPosts();
  renderList(filtered, 'category-list');
}

// ===== Date display =====
function renderDate() {
  const el = document.getElementById('blog-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ===== Theme =====
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light') document.body.classList.add('light');
  updateThemeBtn();
}
function updateThemeBtn() {
  const btn = document.querySelector('[data-theme]');
  if (btn) btn.textContent = document.body.classList.contains('light') ? '☾' : '☀';
}
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem(THEME_KEY, document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeBtn();
}

// ===== Nav mobile =====
function initMenu() {
  const btn = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));
}

// ===== Search popup =====
function initSearch() {
  const open  = document.querySelector('[data-search]');
  const pop   = document.querySelector('[data-search-pop]');
  const close = document.querySelector('[data-close-search]');
  if (open && pop) open.addEventListener('click', () => { pop.classList.add('open'); pop.querySelector('input')?.focus(); });
  if (close && pop) close.addEventListener('click', () => pop.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && pop) pop.classList.remove('open'); });
}

// ===== Newsletter =====
function initNewsletter() {
  document.querySelectorAll('[data-newsletter]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = form.querySelector('[data-message]');
      if (msg) msg.textContent = 'Cadastro registrado! Você receberá as análises da C2 Trust.';
    });
  });
}

// ===== WhatsApp button (todas as páginas) =====
function addWhatsApp() {
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/5553999011628';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Fale conosco pelo WhatsApp');
  wa.style.cssText = 'position:fixed;bottom:24px;left:24px;z-index:9999;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:#25D366;box-shadow:0 4px 16px rgba(37,211,102,.45);transition:transform .2s,box-shadow .2s;';
  wa.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
  wa.addEventListener('mouseenter', () => { wa.style.transform = 'scale(1.1)'; wa.style.boxShadow = '0 6px 20px rgba(37,211,102,.6)'; });
  wa.addEventListener('mouseleave', () => { wa.style.transform = 'scale(1)';   wa.style.boxShadow = '0 4px 16px rgba(37,211,102,.45)'; });
  document.body.appendChild(wa);
}

// ===== Boot =====
document.addEventListener('DOMContentLoaded', () => {
  initNewsletter();

  if (document.getElementById('blog-hero'))     initHomepage();
  if (document.getElementById('article-title')) initArticle();
  if (document.getElementById('archive-list'))  initArchive();
  if (document.getElementById('category-list')) initCategory();
});

// Exposto para admin.js
window.C2Blog = { getPosts, STORAGE_KEY, SEED_POSTS };
