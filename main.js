// Menu na telefonie
const side = document.querySelector('.side');
const toggle = document.querySelector('.menu-toggle');
const setMenu = open => {
  side.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
};
toggle.addEventListener('click', () => setMenu(!side.classList.contains('open')));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Formularze: wysyłka prosto do Google Forms (odpowiedzi lądują w tym samym arkuszu co dotąd).
// Nazwy pól w HTML to identyfikatory "entry.XXXX" z oryginalnych formularzy Google.
document.querySelectorAll('form[data-google-form]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const err = form.querySelector('.form-error');
    err.hidden = true;
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Wysyłanie…';

    const url = `https://docs.google.com/forms/d/e/${form.dataset.googleForm}/formResponse`;
    try {
      // Google nie zwraca nagłówków CORS, więc odpowiedź jest "nieprzezroczysta" —
      // brak wyjątku sieciowego traktujemy jako sukces.
      await fetch(url, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
      form.hidden = true;
      form.parentElement.querySelector('.thanks').hidden = false;
      form.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      err.hidden = false;
      btn.disabled = false;
      btn.textContent = label;
    }
  });
});

// Pokaz slajdów: gdy telefon zablokuje autoodtwarzanie (np. tryb oszczędzania energii),
// ruszamy przy pierwszym dotknięciu/przewinięciu strony.
const reel = document.querySelector('.reel');
if (reel) {
  const start = () => reel.play().catch(() => {});
  start();
  ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(ev =>
    addEventListener(ev, () => { if (reel.paused) start(); }, { once: true, passive: true }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden && reel.paused) start(); });
}
