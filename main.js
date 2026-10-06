// Menu na telefonie
document.querySelectorAll('.menu-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const side = btn.closest('.side');
    const open = side.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

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
