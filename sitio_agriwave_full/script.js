
(function(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const root = document.documentElement;
  const setMode = (mode) => {
    if(mode === 'dark'){ root.classList.add('dark'); } else { root.classList.remove('dark'); }
    localStorage.setItem('theme', mode);
    const btn = document.querySelector('[onclick*="toggleTheme"]');
    if(btn){ btn.textContent = root.classList.contains('dark') ? '☀️ Claro' : '🌙 Oscuro'; }
  };
  // Initial mode
  if(saved){ setMode(saved); } else { setMode(prefersDark ? 'dark' : 'light'); }

  window.toggleTheme = () => setMode(root.classList.contains('dark') ? 'light' : 'dark');

  // Active nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => { if(a.getAttribute('href') === path){ a.classList.add('active'); } });

  // Back to top
  const back = document.getElementById('backToTop');
  const onScroll = () => { if(back) back.style.display = window.scrollY > 400 ? 'inline-flex' : 'none'; };
  if(back){ back.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'})); window.addEventListener('scroll', onScroll, {passive:true}); onScroll(); }

  // Intersection fade-in
  const io = new IntersectionObserver(entries => { entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')); }, {threshold: .1});
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // Form hint
  const form = document.querySelector('form');
  if(form){ form.addEventListener('submit', (e)=>{ const invalid = form.querySelector(':invalid'); if(invalid){ invalid.focus(); } }); }
})();
