/* Rose Friendly, v3.1: menu logic + scroll motion (vanilla JS, no dependencies) */
(function () {
  'use strict';
  window.__rf = true;

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let vw = innerWidth, vh = innerHeight;

  /* ------------------------------------------------------------
     Split text into masked words / letters
  ------------------------------------------------------------ */
  function splitText() {
    $$('[data-split]').forEach(el => {
      const mode = el.dataset.split, text = el.textContent.trim().replace(/\s+/g, ' ');
      el.setAttribute('aria-label', text);
      el.textContent = '';
      let n = 0;
      const mk = t => {
        const w = document.createElement('span'); w.className = 'sw'; w.setAttribute('aria-hidden', 'true');
        const i = document.createElement('span'); i.className = 'si'; i.style.setProperty('--i', n++); i.textContent = t;
        w.appendChild(i); return w;
      };
      text.split(' ').forEach((word, wi, arr) => {
        if (mode === 'chars') {
          const holder = document.createElement('span');
          holder.style.cssText = 'display:inline-block;white-space:nowrap';
          holder.setAttribute('aria-hidden', 'true');
          Array.from(word).forEach(c => holder.appendChild(mk(c)));
          el.appendChild(holder);
        } else { el.appendChild(mk(word)); }
        if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });
  }
  splitText();

  /* ------------------------------------------------------------
     Intro curtain, then hero
  ------------------------------------------------------------ */
  (function intro() {
    const t0 = performance.now();
    const heroImg = $('.slide.on');
    const title = $('.hero-title');
    const go = () => {
      root.classList.add('ready');
      setTimeout(() => title && title.classList.add('in'), reduce ? 0 : 500);
    };
    if (reduce) { go(); return; }
    const imgReady = new Promise(res => {
      if (heroImg.complete) return res();
      heroImg.addEventListener('load', res, { once: true });
      heroImg.addEventListener('error', res, { once: true });
    });
    Promise.race([imgReady, new Promise(r => setTimeout(r, 2500))]).then(() => {
      setTimeout(go, Math.max(0, 1300 - (performance.now() - t0)));
    });
  })();

  /* Split headings reveal on scroll */
  (function splitReveal() {
    const els = $$('[data-split]:not(.hero-title)');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.35 });
    els.forEach(e => io.observe(e));
  })();

  /* ------------------------------------------------------------
     Live open / closed status (India time)
  ------------------------------------------------------------ */
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

  /* Hero slideshow */
  (function slides() {
    const list = $$('.slide'); if (list.length < 2 || reduce) return;
    let i = 0;
    setInterval(() => {
      list[i].classList.remove('on'); i = (i + 1) % list.length; list[i].classList.add('on');
    }, 6500);
  })();

  /* ------------------------------------------------------------
     Marquee (reacts to scroll velocity)
  ------------------------------------------------------------ */
  const mq = { track: $('#mq'), pos: 0, w: 0 };
  (function marquee() {
    const items = [['Tandoor', 'tandoor-inside'], ['Chaap', 'skewers'], ['Dal Makhani', 'dal'], ['Momos', 'momos-fried'], ['Butter Chicken', 'butter-chicken'], ['Paneer', 'paneer-tikka'], ['Indo-Chinese', 'noodles'], ['Thali', 'thali-veg']];
    const group = '<span class="mq-group">' + items.map(([w, f]) => '<span class="mq-item">' + esc(w) + '<img src="img/food/' + f + '.jpg" alt="" loading="lazy" /></span>').join('') + '</span>';
    mq.track.innerHTML = group + group + group;
    const measure = () => { mq.w = mq.track.firstElementChild.offsetWidth; };
    measure(); addEventListener('resize', measure); addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  })();

  /* ------------------------------------------------------------
     Counters + scrubbed paragraph
  ------------------------------------------------------------ */
  (function counters() {
    const els = $$('[data-count]');
    if (reduce || !('IntersectionObserver' in window)) return; // keep static final numbers
    els.forEach(e => { e.textContent = '0'; });
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target, target = parseFloat(el.dataset.count), t0 = performance.now(), dur = 1800;
      (function step(now) {
        const p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * e);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }), { threshold: 0.6 });
    els.forEach(e => io.observe(e));
  })();

  const scrub = $('#scrub'), scrubWords = [];
  (function () {
    const text = scrub.textContent.trim().split(/\s+/);
    scrub.textContent = '';
    text.forEach((w, i) => {
      const s = document.createElement('span'); s.className = 'w'; s.textContent = w;
      scrub.appendChild(s); scrubWords.push(s);
      if (i < text.length - 1) scrub.appendChild(document.createTextNode(' '));
    });
    if (reduce) scrubWords.forEach(w => w.classList.add('lit'));
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
  })();

  /* Sticky card stack */
  const cards = $$('.card');
  cards.forEach((c, i) => c.style.setProperty('--i', i));

  /* ------------------------------------------------------------
     Menu
  ------------------------------------------------------------ */
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

    const pv = $('#dish-preview'), pvImg = $('#dish-img');
    if (fine) {
      panel.addEventListener('mouseover', e => { const d = e.target.closest('.dish[data-img]'); if (d) { pvImg.src = d.dataset.img; pv.classList.add('on'); } });
      panel.addEventListener('mouseout', e => { if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.dish[data-img]')) pv.classList.remove('on'); });
      panel.addEventListener('mousemove', e => { pv.style.left = (e.clientX + 150) + 'px'; pv.style.top = e.clientY + 'px'; });
    }
    render();
  })();

  /* ------------------------------------------------------------
     Most ordered: pinned horizontal scroll (desktop), swipe rail (touch)
  ------------------------------------------------------------ */
  const hs = { pin: $('#hs'), sticky: $('#hs .hs-sticky'), track: $('#sigs'), bar: $('#hs-bar'), cur: 0, travel: 0, on: false };
  (function sigs() {
    hs.track.innerHTML = SIGS.map(s =>
      '<article class="sig"><div class="sig-img"><img src="' + esc(s.img) + '" alt="' + esc(s.name) + '" loading="lazy" /></div>' +
      '<div class="sig-body"><span class="sig-cat"><i class="vm ' + (s.badge === 'veg' ? 'veg' : 'nonveg') + '"></i>' + esc(s.cat) + '</span>' +
      '<h3>' + esc(s.name) + '</h3><span class="sig-pr">' + esc(s.price) + '</span></div></article>').join('');
    const prev = $('#sig-prev'), next = $('#sig-next');
    const layout = () => {
      hs.on = innerWidth >= 900 && !reduce;
      hs.pin.classList.toggle('native', !hs.on);
      if (hs.on) {
        hs.track.style.transform = '';
        hs.travel = Math.max(0, hs.track.scrollWidth - hs.sticky.clientWidth);
        hs.pin.style.height = (hs.travel + innerHeight) + 'px';
      } else { hs.pin.style.height = ''; hs.track.style.transform = ''; }
    };
    layout(); addEventListener('resize', layout); addEventListener('load', layout);
    $$('img', hs.track).forEach(i => i.addEventListener('load', layout));
    const step = () => hs.track.clientWidth * 0.7;
    const sync = () => {
      prev.disabled = hs.track.scrollLeft < 4;
      next.disabled = hs.track.scrollLeft > hs.track.scrollWidth - hs.track.clientWidth - 4;
    };
    prev.addEventListener('click', () => hs.track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => hs.track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    hs.track.addEventListener('scroll', sync, { passive: true }); sync();
  })();

  /* Nav: sheet + hide on scroll down + active section */
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
  const navLinks = $$('.nav-links a').map(a => ({ a, sec: $(a.getAttribute('href')) })).filter(x => x.sec);

  /* Magnetic buttons */
  if (fine && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.translate = ((e.clientX - r.left - r.width / 2) * 0.18) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.28) + 'px';
      });
      el.addEventListener('pointerleave', () => { el.style.translate = ''; });
    });
  }

  /* ------------------------------------------------------------
     One animation loop
  ------------------------------------------------------------ */
  const heroEl = $('#hero'), heroMedia = $('.hero-media'), heroBody = $('.hero-body');
  const progress = $('#progress'), floatWa = $('#float-wa'), footerEl = $('#footer'), footWord = $('#foot-word');
  const parImgs = $$('.reveal.par').map(f => ({ f, img: $('img', f) }));
  let lastY = scrollY, vel = 0, navHidden = false;
  addEventListener('resize', () => { vw = innerWidth; vh = innerHeight; });

  function frame() {
    const y = scrollY, dy = y - lastY; lastY = y;
    vel = lerp(vel, dy, 0.12);

    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

    if (!sheet.classList.contains('open')) {
      if (y > 240 && dy > 4 && !navHidden) { nav.classList.add('hide'); navHidden = true; }
      else if ((dy < -4 || y < 240) && navHidden) { nav.classList.remove('hide'); navHidden = false; }
    }
    navLinks.forEach(({ a, sec }) => {
      const r = sec.getBoundingClientRect();
      a.classList.toggle('on', r.top <= vh * 0.4 && r.bottom > vh * 0.4);
    });
    floatWa.classList.toggle('gone', y < vh * 0.6 || footerEl.getBoundingClientRect().top < vh - 60);

    if (!reduce) {
      // hero parallax
      if (y < vh * 1.2) {
        heroMedia.style.transform = 'translate3d(0,' + (y * 0.22) + 'px,0)';
        heroBody.style.transform = 'translate3d(0,' + (y * -0.1) + 'px,0)';
        heroBody.style.opacity = clamp(1 - y / (vh * 0.75), 0, 1);
      }
      // marquee
      if (mq.w) {
        mq.pos -= 0.8 + Math.abs(vel) * 0.45;
        if (mq.pos <= -mq.w) mq.pos += mq.w;
        mq.track.style.transform = 'translate3d(' + mq.pos + 'px,0,0)';
      }
      // image parallax inside frames
      parImgs.forEach(({ f, img }) => {
        const r = f.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
        img.style.transform = 'translate3d(0,' + (-p * 0.085 * r.height) + 'px,0)';
      });
      // sticky stack: scale + dim cards as the next one covers them
      cards.forEach((c, i) => {
        const nx = cards[i + 1]; if (!nx) return;
        const top = parseFloat(getComputedStyle(c).top) || 0, h = c.offsetHeight;
        const t = clamp((top + h - nx.getBoundingClientRect().top) / h, 0, 1);
        c.style.transform = 'scale(' + (1 - t * 0.06) + ')';
        c.style.filter = 'brightness(' + (1 - t * 0.38) + ')';
      });
      // pinned horizontal rail
      if (hs.on) {
        const r = hs.pin.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(1, hs.pin.offsetHeight - vh), 0, 1);
        hs.cur = lerp(hs.cur, -p * hs.travel, 0.12);
        hs.track.style.transform = 'translate3d(' + hs.cur + 'px,0,0)';
        hs.bar.style.transform = 'scaleX(' + Math.max(0.08, p) + ')';
      }
      // scrubbed paragraph
      const sr = scrub.getBoundingClientRect();
      const sp = clamp((vh * 0.85 - sr.top) / (sr.height + vh * 0.3), 0, 1);
      const n = Math.round(sp * scrubWords.length);
      scrubWords.forEach((w, i) => w.classList.toggle('lit', i < n));
      // footer wordmark fill
      const fr = footerEl.getBoundingClientRect();
      footWord.style.setProperty('--p', (clamp((vh - fr.top) / (fr.height * 0.9), 0, 1) * 100).toFixed(1) + '%');
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
