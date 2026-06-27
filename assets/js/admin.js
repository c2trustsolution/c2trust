// ===== C2 News – Admin Panel (localStorage, sem servidor) =====
const STORAGE_KEY  = 'c2news-posts';
const ADMIN_SESSION = 'c2news-admin';

// Seed posts embutidos diretamente — sem depender do window.C2Blog
const SEED_POSTS = [
  {
    id: 'post-001',
    slug: 'risco-portuario-nao-acontece-em-silos',
    title: 'Risco portuário não acontece em silos',
    category: 'Risco Integrado',
    date: '2026-06-03',
    readTime: '5 min',
    excerpt: 'Por que segurança física, sistemas, conformidade e impacto financeiro precisam estar no mesmo mapa decisório.',
    cover: './images/porto-logistica.jpg',
    content: '<p class="lead-paragraph">Uma interrupção portuária raramente permanece restrita ao ponto em que começou.</p><p>A gestão madura começa por uma visão compartilhada do risco, conectando segurança física, conformidade e impacto financeiro em uma matriz única.</p>'
  },
  {
    id: 'post-002',
    slug: 'continuidade-operacional-comeca-antes-da-crise',
    title: 'Continuidade operacional começa antes da crise',
    category: 'Crises',
    date: '2026-05-21',
    readTime: '6 min',
    excerpt: 'Planos só funcionam quando responsabilidades, gatilhos e decisões foram exercitados sob pressão real.',
    cover: './images/porto-operacao.jpg',
    content: '<p class="lead-paragraph">Ter um Plano de Continuidade de Negócios documentado não é suficiente.</p><p>O que distingue organizações que sobrevivem a crises é a qualidade do exercício prévio desse plano.</p>'
  },
  {
    id: 'post-003',
    slug: 'quanto-custa-uma-hora-de-operacao-interrompida',
    title: 'Quanto custa uma hora de operação interrompida?',
    category: 'Vektor',
    date: '2026-05-07',
    readTime: '7 min',
    excerpt: 'A quantificação financeira conecta prioridades técnicas à linguagem de investimento e governança corporativa.',
    cover: './images/inteligencia-financeira.jpg',
    content: '<p class="lead-paragraph">Decisões de investimento em segurança frequentemente esbarram na dificuldade de traduzir risco técnico em impacto financeiro.</p><p>Quando não se sabe quanto custa uma hora parada, é impossível dimensionar o investimento em prevenção.</p>'
  }
];

// ===== Auth =====
function isLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION) === 'true';
}
function doLogout() {
  sessionStorage.removeItem(ADMIN_SESSION);
  location.href = './login.html';
}

// ===== Storage =====
function getPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const posts = raw ? JSON.parse(raw) : [];
    if (posts.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS.slice();
    }
    return posts;
  } catch (err) {
    return SEED_POSTS.slice();
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function genId() {
  return 'post-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

// ===== Helpers =====
function fmtDate(str) {
  if (!str) return '—';
  try {
    return new Date(str + 'T12:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  } catch (e) { return str; }
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===== Message =====
function msg(text, ok) {
  if (ok === undefined) ok = true;
  var el = document.querySelector('[data-admin-message]');
  if (!el) return;
  el.textContent = text;
  el.className = 'message ' + (ok ? 'success' : 'error');
  setTimeout(function () {
    if (el.textContent === text) {
      el.textContent = '';
      el.className = 'message';
    }
  }, 3500);
}

// ===== Tab navigation =====
function setTab(name) {
  document.querySelectorAll('[data-tab]').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.tab === name);
  });
  document.querySelectorAll('[data-view]').forEach(function (v) {
    v.classList.toggle('active', v.dataset.view === name);
  });
  var labelEl = document.querySelector('.admin-menu [data-tab="' + name + '"]');
  var label = labelEl ? labelEl.textContent : 'Painel';
  var titleEl = document.querySelector('[data-admin-page-title]');
  if (titleEl) titleEl.textContent = label;
  var sidebar = document.querySelector('[data-admin-sidebar]');
  if (sidebar) sidebar.classList.remove('open');
}

// ===== Metrics =====
function computeMetrics(posts) {
  var now = new Date();
  var cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
  var recentes = 0;
  var cats = {};
  posts.forEach(function (p) {
    if (p.date) {
      var d = new Date(p.date + 'T12:00:00');
      if (d >= cutoff) recentes++;
    }
    if (p.category) cats[p.category] = true;
  });
  return {
    posts: posts.length,
    publicadas: posts.length,
    categorias: Object.keys(cats).length,
    recentes: recentes
  };
}

function renderMetrics(metrics, target) {
  if (!target) target = '[data-metrics]';
  var el = document.querySelector(target);
  if (!el) return;
  var labels = [
    ['posts',      'Publicações'],
    ['publicadas', 'Publicadas'],
    ['categorias', 'Categorias'],
    ['recentes',   'Últimos 30 dias']
  ];
  el.innerHTML = labels.map(function (pair) {
    var k = pair[0], label = pair[1];
    var val = (metrics && metrics[k] != null) ? metrics[k] : 0;
    return '<article class="metric-card"><span>' + label + '</span><strong>' + val + '</strong></article>';
  }).join('');
}

function computeChart(posts) {
  var counts = {};
  posts.forEach(function (p) {
    var c = p.category || 'Sem categoria';
    counts[c] = (counts[c] || 0) + 1;
  });
  return Object.keys(counts).sort(function (a, b) {
    return counts[b] - counts[a];
  }).map(function (label) {
    return { label: label, value: counts[label] };
  });
}

function renderChart(items, target) {
  if (!target) target = '[data-chart]';
  var el = document.querySelector(target);
  if (!el) return;
  if (!items || !items.length) {
    el.innerHTML = '<p class="muted-box">Sem publicações ainda.</p>';
    return;
  }
  var max = Math.max.apply(null, items.map(function (i) { return Number(i.value) || 0; }));
  if (max < 1) max = 1;
  el.innerHTML = items.map(function (item) {
    var pct = Math.max(8, (item.value / max) * 100);
    return '<div class="bar-row"><span>' + esc(item.label) + '</span><div><i style="width:' + pct + '%"></i></div><b>' + item.value + '</b></div>';
  }).join('');
}

// ===== Overview =====
function loadOverview() {
  var posts = getPosts();
  var metrics = computeMetrics(posts);

  renderMetrics(metrics, '[data-metrics]');
  renderMetrics(metrics, '[data-stats-metrics]');
  renderChart(computeChart(posts), '[data-chart]');
  renderChart(computeChart(posts), '[data-stats-chart]');

  var actEl = document.querySelector('[data-activity-list]');
  if (actEl) {
    if (!posts.length) {
      actEl.innerHTML = '<p class="muted-box">Nenhuma publicação ainda.</p>';
    } else {
      actEl.innerHTML = posts.slice(0, 5).map(function (p) {
        return '<p><strong>' + esc(p.title) + '</strong><br><span class="meta" style="color:var(--muted);font-size:12px">' + esc(p.category || '—') + ' · ' + fmtDate(p.date) + '</span></p>';
      }).join('');
    }
  }

  var alertEl = document.querySelector('[data-alerts-list]');
  if (alertEl) {
    var items = [];
    if (!posts.length) items.push('⚠ Nenhuma publicação criada ainda. Use "Nova Publicação" para começar.');
    var semCapa = posts.filter(function (p) { return !p.cover; }).length;
    var semResumo = posts.filter(function (p) { return !p.excerpt; }).length;
    if (semCapa > 0) items.push('⚠ ' + semCapa + ' publicação(ões) sem imagem de capa.');
    if (semResumo > 0) items.push('⚠ ' + semResumo + ' publicação(ões) sem resumo.');
    items.push('✓ Painel operacional — ' + posts.length + ' publicação(ões) em localStorage.');
    alertEl.innerHTML = items.map(function (a) {
      return '<p class="muted-box">' + esc(a) + '</p>';
    }).join('');
  }
}

// ===== Articles list =====
function loadArticles() {
  var posts = getPosts();
  var list = document.querySelector('[data-articles-list]');
  if (!list) return;
  if (!posts.length) {
    list.innerHTML = '<p class="muted-box">Nenhuma publicação. Clique em "+ Nova Publicação" para criar a primeira.</p>';
    return;
  }
  list.innerHTML = posts.map(function (p) {
    return '<article class="admin-item searchable">' +
      '<strong>' + esc(p.title) + '</strong>' +
      '<span class="meta" style="color:var(--muted);font-size:12px">' + esc(p.category || '—') + ' · ' + fmtDate(p.date) + ' · ' + esc(p.readTime || '—') + '</span>' +
      '<p>' + esc(p.excerpt || '') + '</p>' +
      '<div class="admin-actions">' +
        '<a class="btn alt" href="c2news-artigo.html?slug=' + esc(p.slug) + '" target="_blank">Ver</a>' +
        '<button class="btn" data-edit="' + esc(p.id) + '">Editar</button>' +
        '<button class="btn danger" data-delete="' + esc(p.id) + '">Excluir</button>' +
      '</div>' +
    '</article>';
  }).join('');
}

// ===== Categories list =====
function loadCategories() {
  var CATS = ['Risco Integrado', 'Crises', 'Vektor', 'Defense', 'Nexus'];
  var select = document.querySelector('[name="categoria"]');
  if (select) {
    select.innerHTML = CATS.map(function (c) {
      return '<option value="' + c + '">' + c + '</option>';
    }).join('');
  }
  var list = document.querySelector('[data-categories-list]');
  if (!list) return;
  var posts = getPosts();
  list.innerHTML = CATS.map(function (cat) {
    var n = posts.filter(function (p) { return p.category === cat; }).length;
    return '<article class="admin-item">' +
      '<strong>' + esc(cat) + '</strong>' +
      '<span class="meta" style="color:var(--muted);font-size:12px">' + n + ' publicação' + (n !== 1 ? 'ões' : '') + '</span>' +
      '<div class="admin-actions">' +
        '<a class="btn alt" href="c2news-categoria.html?cat=' + encodeURIComponent(cat) + '" target="_blank">Ver no blog</a>' +
      '</div>' +
    '</article>';
  }).join('');
}

// ===== Editor =====
var editingId = null;

function fillForm(post) {
  var form = document.querySelector('[data-article-form]');
  if (!form) return;
  form.reset();
  editingId = post ? post.id : null;

  var setVal = function (name, val) {
    var el = form.querySelector('[name="' + name + '"]');
    if (el) el.value = val || '';
  };

  setVal('id',              post ? post.id        : genId());
  setVal('titulo',          post ? post.title      : '');
  setVal('slug',            post ? post.slug       : '');
  setVal('resumo',          post ? post.excerpt    : '');
  setVal('conteudo',        post ? post.content    : '');
  setVal('imagem_capa_url', post ? post.cover      : '');
  setVal('data',            post ? post.date       : new Date().toISOString().slice(0, 10));
  setVal('leitura',         post ? post.readTime   : '');

  var catSel = form.querySelector('[name="categoria"]');
  if (catSel && post && post.category) catSel.value = post.category;

  var slugEl = form.querySelector('[name="slug"]');
  if (slugEl) delete slugEl.dataset.manual;

  var h = document.querySelector('[data-form-title]');
  if (h) h.textContent = post ? 'Editar publicação' : 'Nova publicação';

  setTab('editor');
}

// ===== Theme toggle =====
function initTheme() {
  var root = document.documentElement;
  var saved = localStorage.getItem('c2-theme');
  if (saved === 'light') root.classList.remove('dark');
  else root.classList.add('dark');

  var btn = document.querySelector('[data-theme]');
  if (!btn) return;
  function updateIcon() {
    btn.textContent = root.classList.contains('dark') ? '☀' : '☾';
  }
  updateIcon();
  btn.addEventListener('click', function () {
    root.classList.toggle('dark');
    localStorage.setItem('c2-theme', root.classList.contains('dark') ? 'dark' : 'light');
    updateIcon();
  });
}

// ===== Boot =====
document.addEventListener('DOMContentLoaded', function () {

  // Auth gate — login inline (sem depender de login.html)
  if (!isLoggedIn()) {
    document.body.style.cssText = 'margin:0;padding:0;min-height:100vh;display:grid;place-items:center;background:#090909;font-family:Inter,Arial,sans-serif;';
    document.body.innerHTML =
      '<div style="width:min(420px,94vw);padding:0 16px">' +
        '<div style="text-align:center;margin-bottom:32px">' +
          '<img src="./images/logo_escudo.png" alt="C2 Trust" style="width:72px;height:72px;object-fit:contain;margin:0 auto 16px;display:block">' +
          '<p style="color:#8a9ab0;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;font-weight:700">Área restrita</p>' +
          '<h1 style="color:#F2B632;font-family:Sora,Inter,sans-serif;font-size:28px;margin:0">Painel C2 News</h1>' +
        '</div>' +
        '<form id="admin-login-form" style="background:#111;border:1px solid rgba(242,182,50,.2);padding:28px;display:grid;gap:14px;">' +
          '<label style="display:grid;gap:6px;font:700 11px Inter,sans-serif;color:#8a9ab0;text-transform:uppercase;letter-spacing:.6px">E-mail' +
            '<input id="al-email" type="email" required autocomplete="email" style="padding:10px 12px;border:1px solid #262626;background:#0a0a0a;color:#eef6fb;font:14px Inter,sans-serif;outline:none;width:100%;box-sizing:border-box">' +
          '</label>' +
          '<label style="display:grid;gap:6px;font:700 11px Inter,sans-serif;color:#8a9ab0;text-transform:uppercase;letter-spacing:.6px">Senha' +
            '<input id="al-senha" type="password" required autocomplete="current-password" style="padding:10px 12px;border:1px solid #262626;background:#0a0a0a;color:#eef6fb;font:14px Inter,sans-serif;outline:none;width:100%;box-sizing:border-box">' +
          '</label>' +
          '<p id="al-err" style="color:#e85c3c;font-size:13px;font-weight:700;margin:0;display:none">E-mail ou senha incorretos.</p>' +
          '<button type="submit" style="padding:12px 0;background:#F2B632;color:#040404;font:700 14px Sora,Inter,sans-serif;border:none;cursor:pointer;margin-top:4px">Entrar no painel</button>' +
        '</form>' +
      '</div>';

    document.getElementById('admin-login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('al-email').value.trim().toLowerCase();
      var senha = document.getElementById('al-senha').value;
      var err   = document.getElementById('al-err');
      if (email === 'samuelcarone@yahoo.com.br' && senha === '16172898S@ca') {
        sessionStorage.setItem(ADMIN_SESSION, 'true');
        location.reload();
      } else {
        err.style.display = 'block';
        document.getElementById('al-senha').value = '';
        document.getElementById('al-senha').focus();
      }
    });
    return;
  }

  initTheme();

  // Tab clicks
  document.querySelectorAll('[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if ('newArticle' in btn.dataset) {
        fillForm(null);
        return;
      }
      var tab = btn.dataset.tab;
      setTab(tab);
      if (tab === 'posts')      loadArticles();
      if (tab === 'categories') loadCategories();
      if (tab === 'overview' || tab === 'stats') loadOverview();
    });
  });

  // Mobile sidebar
  var menuToggle = document.querySelector('[data-admin-menu]');
  var sidebar = document.querySelector('[data-admin-sidebar]');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
  }

  // Logout
  var logoutBtn = document.querySelector('[data-admin-logout]');
  if (logoutBtn) logoutBtn.addEventListener('click', doLogout);

  // Search
  var searchInput = document.querySelector('[data-admin-search]');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = this.value.trim().toLowerCase();
      document.querySelectorAll('.searchable').forEach(function (el) {
        el.style.display = el.textContent.toLowerCase().indexOf(q) >= 0 ? '' : 'none';
      });
    });
  }

  // Article form submit
  var articleForm = document.querySelector('[data-article-form]');
  if (articleForm) {
    articleForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.currentTarget;
      var getVal = function (name) {
        var el = f.querySelector('[name="' + name + '"]');
        return el ? el.value.trim() : '';
      };
      var id    = getVal('id') || genId();
      var title = getVal('titulo');
      var slug  = getVal('slug') || slugify(title);

      if (!title) { msg('O título é obrigatório.', false); return; }
      if (!slug)  { msg('Não foi possível gerar o slug.', false); return; }

      var post = {
        id:       id,
        title:    title,
        slug:     slug,
        excerpt:  getVal('resumo'),
        content:  (f.querySelector('[name="conteudo"]') || {}).value || '',
        cover:    getVal('imagem_capa_url'),
        category: getVal('categoria'),
        date:     getVal('data'),
        readTime: getVal('leitura')
      };

      var posts = getPosts();
      if (editingId) {
        posts = posts.map(function (p) { return p.id === editingId ? post : p; });
      } else {
        posts = [post].concat(posts);
      }
      savePosts(posts);

      msg('Publicação salva com sucesso!');
      loadArticles();
      loadOverview();
      editingId = null;
      setTab('posts');
    });
  }

  // Auto-slug
  var tituloInput = document.querySelector('[name="titulo"]');
  if (tituloInput) {
    tituloInput.addEventListener('input', function () {
      var slugEl = document.querySelector('[name="slug"]');
      if (slugEl && !slugEl.dataset.manual) {
        slugEl.value = slugify(this.value);
      }
    });
  }
  var slugInput = document.querySelector('[name="slug"]');
  if (slugInput) {
    slugInput.addEventListener('input', function () {
      this.dataset.manual = this.value ? 'true' : '';
    });
  }

  // Edit / delete delegation
  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    var delBtn  = e.target.closest('[data-delete]');

    if (editBtn) {
      var id = editBtn.dataset.edit;
      var posts = getPosts();
      var found = null;
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === id) { found = posts[i]; break; }
      }
      if (found) fillForm(found);
    }

    if (delBtn) {
      if (!confirm('Excluir esta publicação?\n\nEsta ação não pode ser desfeita.')) return;
      var delId = delBtn.dataset.delete;
      savePosts(getPosts().filter(function (p) { return p.id !== delId; }));
      msg('Publicação excluída.');
      loadArticles();
      loadOverview();
    }
  });

  // Initial load
  loadOverview();
  loadArticles();
  loadCategories();
  setTab('overview');
});
