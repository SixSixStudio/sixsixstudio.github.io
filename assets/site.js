/* sixsix studio — 2026 build. No dependencies. */
(function () {
  var nav = document.getElementById('nav');
  var last = window.scrollY;

  // nav hides going down, returns going up
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 120 && y > last + 6) nav.classList.add('hide');
    else if (y < last - 6 || y < 120) nav.classList.remove('hide');
    last = y;
  }, { passive: true });

  // services dropdown: hover on desktop, tap everywhere
  var dd = document.getElementById('dd');
  if (dd) {
    var btn = dd.querySelector('.ddbtn');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dd.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // mobile menu
  var burger = document.getElementById('mburger');
  var sheet = document.getElementById('mmobile');
  if (burger && sheet) {
    burger.addEventListener('click', function () {
      var on = sheet.classList.toggle('on');
      burger.classList.toggle('on', on);
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
      document.body.style.overflow = on ? 'hidden' : '';
    });
    sheet.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        sheet.classList.remove('on');
        burger.classList.remove('on');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // reveal on scroll
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  // showreel: pause/play control + progress hairline
  var v = document.getElementById('reel');
  var btnP = document.getElementById('playbtn');
  var prog = document.getElementById('prog');
  if (v && btnP) {
    var label = btnP.querySelector('span');
    var sync = function () {
      var paused = v.paused;
      btnP.classList.toggle('paused', paused);
      label.textContent = paused ? 'Play' : 'Pause';
      btnP.setAttribute('aria-label', paused ? 'Play showreel' : 'Pause showreel');
    };
    btnP.addEventListener('click', function () {
      if (v.paused) { v.play(); } else { v.pause(); }
      sync();
    });
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    sync();
    if (prog) {
      v.addEventListener('timeupdate', function () {
        if (!v.duration) return;
        prog.style.width = (v.currentTime / v.duration * 100).toFixed(2) + '%';
      });
    }
  }

  // year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
