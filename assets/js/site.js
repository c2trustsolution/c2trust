(function () {
  const root = document.documentElement;
  const theme = localStorage.getItem("c2-theme") || "dark";
  root.classList.toggle("dark", theme === "dark");

  const header = document.querySelector("header");
  const desktopNav = header?.querySelector("nav");
  const menuButton = header?.querySelector('button[aria-label="Abrir menu"]');
  const controls = menuButton?.parentElement;

  function themeIcon(isDark) {
    return isDark
      ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>';
  }

  if (controls) {
    const placeholder = controls.firstElementChild;
    const toggle = document.createElement("button");
    toggle.className = "site-theme-toggle grid place-items-center rounded-full text-gold";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Alternar tema");
    const renderTheme = () => {
      const dark = root.classList.contains("dark");
      toggle.innerHTML = themeIcon(dark);
    };
    toggle.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("c2-theme", root.classList.contains("dark") ? "dark" : "light");
      renderTheme();
    });
    renderTheme();
    placeholder?.replaceWith(toggle);
  }

  if (header && desktopNav && menuButton) {
    const mobileNav = desktopNav.cloneNode(true);
    mobileNav.className = "static-mobile-nav";
    mobileNav.hidden = true;
    header.appendChild(mobileNav);
    menuButton.addEventListener("click", () => {
      mobileNav.hidden = !mobileNav.hidden;
      menuButton.setAttribute("aria-expanded", String(!mobileNav.hidden));
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const search = document.querySelector('input[placeholder="Buscar análises..."]');
  if (search) {
    const toolbar = search.closest(".mt-10");
    const articles = Array.from(document.querySelectorAll("main article"));
    const filters = Array.from(toolbar?.querySelectorAll("button") || []);
    let category = "Todos";
    const apply = () => {
      const query = search.value.trim().toLocaleLowerCase("pt-BR");
      articles.forEach((article) => {
        const text = article.textContent.toLocaleLowerCase("pt-BR");
        const categoryMatch = category === "Todos" || text.includes(category.toLocaleLowerCase("pt-BR"));
        article.hidden = !(text.includes(query) && categoryMatch);
      });
    };
    search.addEventListener("input", apply);
    filters.forEach((button) => {
      button.addEventListener("click", () => {
        category = button.textContent.trim();
        filters.forEach((item) => item.classList.remove("static-filter-active"));
        button.classList.add("static-filter-active");
        apply();
      });
    });
  }

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const isLogin = Boolean(form.querySelector('input[type="password"]'));
      const message = isLogin
        ? "O login e o painel administrativo funcionam na aplicação Next.js completa."
        : "Formulário demonstrativo. Na aplicação completa, este contato é validado e salvo no PostgreSQL.";
      let notice = form.querySelector(".static-form-notice");
      if (!notice) {
        notice = document.createElement("p");
        notice.className = "static-form-notice";
        form.appendChild(notice);
      }
      notice.textContent = message;
    });
  });
  const wa = document.createElement("a");
  wa.href = "https://wa.me/5553999011628";
  wa.target = "_blank";
  wa.rel = "noopener noreferrer";
  wa.setAttribute("aria-label", "Fale conosco pelo WhatsApp");
  wa.style.cssText = "position:fixed;bottom:24px;left:24px;z-index:9999;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:#25D366;box-shadow:0 4px 16px rgba(37,211,102,.45);transition:transform .2s,box-shadow .2s;";
  wa.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
  wa.addEventListener("mouseenter", () => { wa.style.transform = "scale(1.1)"; wa.style.boxShadow = "0 6px 20px rgba(37,211,102,.6)"; });
  wa.addEventListener("mouseleave", () => { wa.style.transform = "scale(1)"; wa.style.boxShadow = "0 4px 16px rgba(37,211,102,.45)"; });
  document.body.appendChild(wa);
})();
