/* Horizon Villas — GA4 with Google Consent Mode v2 + consent banner.
   Advanced consent mode: gtag loads with consent denied by default and sends
   cookieless pings only; real analytics cookies are set after "Accept". */
(function () {
  var GA_ID = 'G-XXXXXXXXXX'; /* TODO: replace with the real GA4 Measurement ID */
  var KEY = 'hv-consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  gtag('js', new Date());
  gtag('config', GA_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  function readChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function grant() { gtag('consent', 'update', { analytics_storage: 'granted' }); }

  /* CTA events (fire regardless of consent; without it they ride the cookieless pings) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a || !a.href) return;
    if (a.href.indexOf('wa.me') > -1) gtag('event', 'whatsapp_click', { link_url: a.href });
    else if (a.href.indexOf('maps.app.goo.gl') > -1) gtag('event', 'map_click');
    else if (a.href.indexOf('horizonvillastinosguide.com') > -1) gtag('event', 'guide_click');
  });

  /* Banner */
  function showBanner() {
    var css = document.createElement('style');
    css.textContent =
      '.hv-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:200;margin:0 auto;max-width:560px;' +
      'background:#FFFDF9;color:#4A3F30;border:0.5px solid rgba(74,63,48,.18);border-radius:14px;' +
      'box-shadow:0 8px 40px rgba(58,48,34,.22);padding:20px 22px;font-size:14px;line-height:1.6;}' +
      '.hv-consent p{margin:0 0 14px;}' +
      '.hv-consent a{color:#AE6A28;text-decoration:underline;}' +
      '.hv-consent .row{display:flex;gap:10px;flex-wrap:wrap;}' +
      '.hv-consent button{cursor:pointer;font:600 12px/1 inherit;letter-spacing:1.2px;text-transform:uppercase;' +
      'padding:12px 20px;border-radius:999px;transition:background .2s,color .2s;}' +
      '.hv-consent .accept{background:#C8843C;border:1px solid #C8843C;color:#FFFDF9;}' +
      '.hv-consent .accept:hover{background:#AE6A28;border-color:#AE6A28;}' +
      '.hv-consent .decline{background:transparent;border:1px solid rgba(74,63,48,.35);color:#4A3F30;}' +
      '.hv-consent .decline:hover{background:rgba(74,63,48,.06);}';
    document.head.appendChild(css);

    var el = document.createElement('div');
    el.className = 'hv-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML =
      '<p>We use Google Analytics to see which pages help our guests — anonymous statistics, ' +
      'no ads, never sold. Details in our <a href="privacy.html">privacy &amp; cookies page</a>.</p>' +
      '<div class="row">' +
      '<button type="button" class="accept">Accept</button>' +
      '<button type="button" class="decline">Decline</button>' +
      '</div>';
    el.querySelector('.accept').addEventListener('click', function () {
      saveChoice('granted'); grant(); el.remove();
    });
    el.querySelector('.decline').addEventListener('click', function () {
      saveChoice('denied'); el.remove();
    });
    document.body.appendChild(el);
  }

  /* Let the privacy page offer a "change your choice" link */
  window.hvConsentReset = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    document.querySelectorAll('.hv-consent').forEach(function (n) { n.remove(); });
    showBanner();
  };

  var choice = readChoice();
  if (choice === 'granted') { grant(); }
  else if (choice !== 'denied') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else { showBanner(); }
  }
})();
