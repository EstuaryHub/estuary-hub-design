// Estuary prototype behaviour. Plain script, no dependencies.
// Every page is readable without it; this adds the interactive parts.
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var params = new URLSearchParams(window.location.search);

  // Phone navigation
  var toggle = $('.nav-toggle');
  var nav = $('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      $('.nav-toggle__label', toggle).textContent = open ? 'Close' : 'Menu';
    });
  }

  // Home gallery: stepped by the visitor, never rotates on its own
  var gallery = $('[data-gallery]');
  if (gallery) {
    var slides = JSON.parse(gallery.getAttribute('data-gallery'));
    var i = 0;
    var label = $('[data-gallery-label]', gallery);
    var caption = $('[data-gallery-caption]', gallery);
    var dots = $$('.gallery__dot', gallery);
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      label.textContent = '[' + slides[i].label + ']';
      caption.textContent = slides[i].caption;
      dots.forEach(function (d, k) { d.classList.toggle('is-current', k === i); });
    };
    $('[data-gallery-prev]', gallery).addEventListener('click', function () { show(i - 1); });
    $('[data-gallery-next]', gallery).addEventListener('click', function () { show(i + 1); });
  }

  // Single-choice button groups (topic chips, amounts, payment methods)
  $$('[data-choice]').forEach(function (group) {
    var buttons = $$('button', group);
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        var input = $('input[type="hidden"]', group);
        if (input) input.value = b.getAttribute('data-value') || b.textContent.trim();
        group.dispatchEvent(new Event('choice', { bubbles: true }));
      });
    });
  });

  // Donate: the button says exactly what happens next
  var donate = $('#donate-form');
  if (donate) {
    var cta = $('#donate-cta');
    var monthly = $('#donate-monthly');
    var describe = function () {
      var amt = donate.elements.amount.value;
      var method = donate.elements.method.value;
      var shown = amt === 'Other' ? '' : amt + ' ';
      cta.textContent = 'Continue to ' + method + ' — ' + shown + (monthly.checked ? 'monthly' : 'once');
      $('#donate-summary').textContent = shown + (monthly.checked ? 'monthly' : 'one-time');
    };
    donate.addEventListener('choice', describe);
    monthly.addEventListener('change', describe);
    describe();
  }

  // Forms that show a confirmation instead of submitting (prototype only)
  $$('form[data-confirm]').forEach(function (form) {
    var done = document.getElementById(form.getAttribute('data-confirm'));
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var topic = form.elements.topic;
      var slot = $('[data-topic-label]', done);
      if (topic && slot) slot.textContent = topic.value.toLowerCase();
      form.hidden = true;
      done.hidden = false;
      done.focus();
    });
    $('[data-reset]', done).addEventListener('click', function () {
      done.hidden = true;
      form.hidden = false;
      form.querySelector('input:not([type="hidden"]), textarea, button').focus();
    });
  });

  // Group finder: list and map select together
  var finder = $('#finder');
  if (finder) {
    var cards = $$('.group-card', finder);
    var pins = $$('.map__pin', finder);
    var selName = $('#map-selected-name');
    var selMeta = $('#map-selected-meta');
    var select = function (k) {
      cards.forEach(function (c, j) { c.setAttribute('aria-pressed', String(j === k)); });
      pins.forEach(function (p, j) { p.setAttribute('aria-pressed', String(j === k)); });
      selName.textContent = cards[k].getAttribute('data-name');
      selMeta.textContent = cards[k].getAttribute('data-meta');
    };
    cards.forEach(function (c, k) { c.addEventListener('click', function () { select(k); }); });
    pins.forEach(function (p, k) { p.addEventListener('click', function () { select(k); }); });

    var map = $('#finder-map');
    var mapToggle = $('#map-toggle');
    mapToggle.addEventListener('click', function () {
      var shown = map.classList.toggle('is-shown');
      mapToggle.setAttribute('aria-expanded', String(shown));
      mapToggle.textContent = shown ? 'Hide map' : 'Show map';
    });

    // ?results=none shows the empty state, the second most important screen
    var none = params.get('results') === 'none';
    finder.hidden = none;
    $('#finder-count').hidden = none;
    $('#finder-empty').hidden = !none;
    $$('[data-results-link]').forEach(function (a) {
      a.setAttribute('aria-current', String((a.getAttribute('data-results-link') === 'none') === none));
    });
  }

  // Account tabs
  var tablist = $('[role="tablist"]');
  if (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var activate = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { activate(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        var next = tabs[(k + d + tabs.length) % tabs.length];
        activate(next);
        next.focus();
      });
    });

    // ?role=participant shows the participant view; leader is the default
    var leader = params.get('role') !== 'participant';
    $$('[data-leader-only]').forEach(function (el) { el.hidden = !leader; });
    $$('[data-participant-only]').forEach(function (el) { el.hidden = leader; });
    $$('[data-role-link]').forEach(function (a) {
      a.setAttribute('aria-current', String((a.getAttribute('data-role-link') === 'leader') === leader));
    });

    var confirmBtn = $('#confirm-listing');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        confirmBtn.textContent = 'Confirmed today';
        confirmBtn.disabled = true;
      });
    }
  }
})();
