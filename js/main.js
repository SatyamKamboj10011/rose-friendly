/* Rose Friendly, v3: menu logic + light motion (vanilla JS, no dependencies) */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Live open / closed status (India time) */
  (function status() {
    const box = $('#status'), txt = $('#status-text');
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      const get = t => parts.find(p => p.type === t).value;
      const day = get('weekday');
      const mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
      const OPEN = 11 * 60, CLOSE = 23 * 60;
      let msg, cls;
      if (day === 'Tue') { msg = 'Closed today, opens Wednesday 11 AM'; cls = 'shut'; }
      else if (mins >= OPEN && mins < CLOSE) { msg = (CLOSE - mins <= 60) ? 'Closing soon, open until 11 PM' : 'Open now until 11 PM'; cls = 'open'; }
      else if (mins < OPEN) { msg = 'Closed, opens today at 11 AM'; cls = 'shut'; }
      else { msg = day === 'Mon' ? 'Closed, opens Wednesday 11 AM' : 'Closed, opens tomorrow 11 AM'; cls = 'shut'; }
      txt.textContent = msg; box.classList.add(cls);
    } catch (e) { /* keep static text */ }
  })();

  /* Image reveals */
  (function reveals() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduce) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in'); io.unobserve(en.target);
    }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    els.forEach(el => io.observe(el));
    setTimeout(() => els.forEach(e => e.classList.add('in')), 6000); // failsafe
  })();

  /* Menu */
  (function menu() {
    const catsEl = $('#cats'), panel = $('#panel'), search = $('#menu-search');
    const state = { diet: 'all', q: '', cat: MENU_DATA[0].id };
    const mark = t => t === 'veg' ? '<i class="vm veg" aria-label="Vegetarian"></i>' : t === 'nonveg' ? '<i class="vm nonveg" aria-label="Non-vegetarian"></i>' : '';
    const visibleCats = () => MENU_DATA.filter(c => state.diet === 'all' || c.type === state.diet || c.type === 'both');

    function renderCats() {
      const list = visibleCats();
      if (!list.some(c => c.id === state.cat)) state.cat = list[0].id;
      const searching = state.q.length >= 2;
      catsEl.innerHTML = list.map(c =>
        '<button class="cat' + (!searching && c.id === state.cat ? ' on' : '') + '" role="tab" aria-selected="' + (c.id === state.cat) + '" data-id="' + c.id + '">' +
        '<span class="l">' + esc(c.label) + '</span><span class="c">' + c.items.length + '</span></button>').join('');
    }
    function dishRow(it, type, i, src) {
      const price = typeof it.p === 'number' ? '₹' + it.p : esc(it.p);
      return '<div class="dish' + (it.img ? ' has-img' : '') + '" style="--i:' + Math.min(i, 16) + '"' + (it.img ? ' data-img="' + esc(it.img) + '"' : '') + '>' +
        mark(type) + '<span class="nm">' + esc(it.n) + '</span>' + (it.note ? '<span class="nt">' + esc(it.note) + '</span>' : '') +
        (src ? '<span class="src">' + esc(src) + '</span>' : '') + '<span class="dots"></span><span class="pr">' + price + '</span></div>';
    }
    function renderPanel() {
      if (state.q.length >= 2) {
        const q = state.q.toLowerCase(); let rows = []; let i = 0;
        visibleCats().forEach(c => c.items.forEach(it => { if (it.n.toLowerCase().includes(q)) rows.push(dishRow(it, c.type, i++, c.label)); }));
        panel.innerHTML = '<div class="panel-head"><h3>Results</h3><p>' + rows.length + ' dish' + (rows.length === 1 ? '' : 'es') + ' for “' + esc(state.q) + '”</p></div>' +
          (rows.length ? rows.join('') : '<div class="empty">Nothing found. Try “paneer” or “momos”.</div>');
        return;
      }
      const c = MENU_DATA.find(x => x.id === state.cat);
      panel.innerHTML = '<div class="panel-head"><h3>' + esc(c.label) + '</h3><p>' + esc(c.desc || '') + '</p></div>' + c.items.map((it, i) => dishRow(it, c.type, i)).join('');
    }
    const render = () => { renderCats(); renderPanel(); };

    catsEl.addEventListener('click', e => {
      const b = e.target.closest('.cat'); if (!b) return;
      state.cat = b.dataset.id; state.q = ''; search.value = ''; render();
      const on = $('.cat.on', catsEl);
      if (on && catsEl.scrollWidth > catsEl.clientWidth) catsEl.scrollTo({ left: on.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
    });
    $$('.chip').forEach(ch => ch.addEventListener('click', () => {
      $$('.chip').forEach(x => x.classList.toggle('on', x === ch));
      state.diet = ch.dataset.diet; render();
    }));
    let t; search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { state.q = search.value.trim(); render(); }, 120); });

    // Dish photo that follows the cursor
    const pv = $('#dish-preview'), pvImg = $('#dish-img');
    if (fine) {
      panel.addEventListener('mouseover', e => { const d = e.target.closest('.dish[data-img]'); if (d) { pvImg.src = d.dataset.img; pv.classList.add('on'); } });
      panel.addEventListener('mouseout', e => { if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.dish[data-img]')) pv.classList.remove('on'); });
      panel.addEventListener('mousemove', e => { pv.style.left = (e.clientX + 150) + 'px'; pv.style.top = e.clientY + 'px'; });
    }
    render();
  })();

  /* Most ordered: native scroll + arrow buttons */
  (function sigs() {
    const track = $('#sigs'), prev = $('#sig-prev'), next = $('#sig-next');
    track.innerHTML = SIGS.map(s =>
      '<article class="sig"><div class="sig-img"><img src="' + esc(s.img.replace('w=380', 'w=700')) + '" alt="' + esc(s.name) + '" loading="lazy" /></div>' +
      '<div class="sig-body"><span class="sig-cat"><i class="vm ' + (s.badge === 'veg' ? 'veg' : 'nonveg') + '"></i>' + esc(s.cat) + '</span>' +
      '<h3>' + esc(s.name) + '</h3><span class="sig-pr">' + esc(s.price) + '</span></div></article>').join('');
    const step = () => track.clientWidth * 0.7;
    const sync = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync); sync();
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { next.click(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prev.click(); e.preventDefault(); }
    });
  })();

  /* Nav: mobile sheet + hide on scroll down */
  const nav = $('#nav'), burger = $('#burger'), sheet = $('#sheet');
  function setSheet(open) {
    sheet.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    sheet.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setSheet(!sheet.classList.contains('open')));
  $$('a', sheet).forEach(a => a.addEventListener('click', () => setSheet(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setSheet(false); });

  /* Scroll: nav hide, hero image drift, floating WhatsApp */
  const heroImg = $('#hero-img'), floatWa = $('#float-wa'), footerEl = $('#footer');
  let lastY = scrollY, ticking = false;
  function onScroll() {
    const y = scrollY, dy = y - lastY; lastY = y;
    const vh = innerHeight;
    if (!sheet.classList.contains('open')) {
      if (y > 240 && dy > 4) nav.classList.add('hide');
      else if (dy < -4 || y < 240) nav.classList.remove('hide');
    }
    floatWa.classList.toggle('gone', y < vh * 0.6 || footerEl.getBoundingClientRect().top < vh - 60);
    if (!reduce && y < vh * 1.2) heroImg.style.translate = '0 ' + (y * 0.12) + 'px';
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
