# EarlGrey – strona www

Statyczna strona earlgreyfilm.com (HTML + CSS + JS, bez WordPressa i bez kroku budowania).

| Plik | Strona |
|---|---|
| `index.html` | O nas – film z produkcjami |
| `zgloszenia.html` | Zgłoszenia do „Ślub od Pierwszego Wejrzenia” |
| `praca.html` | Praca |
| `wspolpraca.html` | Współpraca |

## Formularze

Formularze są własnym HTML-em, ale wysyłają dane do oryginalnych formularzy Google
(`main.js` → `docs.google.com/forms/d/e/<ID>/formResponse`), więc odpowiedzi trafiają do tych samych arkuszy.

- ID formularza jest w atrybucie `data-google-form` w każdym pliku.
- Nazwy pól (`entry.XXXX`) odpowiadają pytaniom w formularzu Google. Wartości checkboxów zgód muszą być identyczne z treścią opcji w Google.
- **Po zmianie pytań w formularzu Google trzeba zaktualizować pola na stronie.**
- Strona nie dostaje od Google potwierdzenia zapisu – po wdrożeniu wyślij jedno testowe zgłoszenie i sprawdź arkusz.

## Podgląd lokalnie

```bash
python3 -m http.server 8000
```
