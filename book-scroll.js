// Booking links (nav "Book now", "Check availability", the mobile bar) point at #book / #book2.
// Instead of the browser's default jump — which parks the target at the top edge, often under the
// sticky header or half off-screen — centre the booking widget in the viewport. Also handles arriving
// from another page with #book in the URL (the Lodgify widget renders after load, so re-centre once).
(function () {
  var centre = function (id, smooth) {
    var el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
    return true;
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var m = (a.getAttribute('href') || '').match(/#(book2?)$/);
    if (!m) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname.replace(/\/index\.html$/, '/') !== location.pathname.replace(/\/index\.html$/, '/')) return;   // other page: let it navigate
    if (centre(m[1], true)) {
      e.preventDefault();
      if (history.replaceState) history.replaceState(null, '', '#' + m[1]);
    }
  });

  if (/^#book2?$/.test(location.hash)) {
    var id = location.hash.slice(1);
    var again = function () { centre(id, false); setTimeout(function () { centre(id, true); }, 700); };
    if (document.readyState === 'complete') again(); else window.addEventListener('load', again);
  }
})();
