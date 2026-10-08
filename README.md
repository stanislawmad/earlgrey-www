# EarlGrey – strona www

Statyczna strona earlgreyfilm.com (HTML + CSS + JS, bez WordPressa i bez kroku budowania).

| Plik | Strona |
|---|---|
| `index.html` | O nas – pokaz slajdów (film bez dźwięku, w pętli) |
| `zgloszenia.html` | Zgłoszenia do „Ślub od Pierwszego Wejrzenia” |
| `praca.html` | Praca |
| `wspolpraca.html` | Współpraca |
| `404.html` | Strona „nie ma takiej strony” |
| `.htaccess` | Konfiguracja serwera: https, przekierowania ze starych adresów WordPressa, pamięć przeglądarki |

## Hosting: home.pl

Domena, DNS i **poczta** (rekord MX) są w home.pl. Strona jest wgrywana na ten sam serwer –
**nie zmieniamy DNS**, więc poczta działa bez zmian.

### Wgranie (pierwszy raz, zamiast WordPressa)

1. **Kopia WordPressa.** W panelu home.pl zrób kopię zapasową strony i bazy danych
   (albo pobierz cały katalog strony przez FTP). Eksport treści jest też w `WordPress.2026-10-06.xml`.
2. **Nowy katalog.** Przez FTP / menedżer plików home.pl utwórz katalog, np. `earlgrey-www`,
   i wgraj do niego **zawartość** paczki `earlgreyfilm-do-wgrania.zip`
   (pliki `index.html`, `.htaccess` itd. mają leżeć bezpośrednio w `earlgrey-www/`, nie w podkatalogu).
   Plik `.htaccess` jest ukryty (zaczyna się od kropki) – upewnij się, że też się wgrał.
3. **Przepięcie domeny.** W panelu home.pl → *Strony WWW* / *Domeny* → earlgreyfilm.com →
   zmień katalog strony na `earlgrey-www`.
   Powrót do WordPressa w razie problemów = przestawienie katalogu z powrotem.
4. **Sprawdzenie** (najlepiej w oknie prywatnym):
   - https://earlgreyfilm.com – pokaz slajdów rusza sam,
   - http://earlgreyfilm.com i https://www.earlgreyfilm.com → przekierowują na https://earlgreyfilm.com,
   - https://earlgreyfilm.com/index.php/praca/ → przekierowuje na `/praca.html`,
   - **jedno testowe zgłoszenie** w każdym formularzu → pojawia się w arkuszu Google.
5. Jeśli strona „kręci się” w nieskończonym przekierowaniu: w `.htaccess` zakomentuj (`#`)
   4 linie z sekcji „1. Zawsze https” i włącz *Wymuś SSL / przekierowanie na HTTPS* w panelu home.pl.

### Późniejsze zmiany

- Wystarczy podmienić zmienione pliki przez FTP.
- Pliki CSS/JS/obrazki/film są zapamiętywane w przeglądarkach na długo. Po podmianie pliku
  zmień jego znacznik `?v=…` w HTML (np. `showreel.mp4?v=20261008` → `?v=20261120`) –
  inaczej część osób zobaczy starą wersję.
- Nowy film: zrób wersję www (bez dźwięku, ok. 1600 px szerokości, H.264), np.:

  ```bash
  ffmpeg -i NOWY.mp4 -an -vf scale=1600:-2 -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart assets/showreel.mp4
  ```

## Formularze

Formularze są własnym HTML-em, ale wysyłają dane do oryginalnych formularzy Google
(`main.js` → `docs.google.com/forms/d/e/<ID>/formResponse`), więc odpowiedzi trafiają do tych samych arkuszy.

- ID formularza jest w atrybucie `data-google-form` w każdym pliku.
- Nazwy pól (`entry.XXXX`) odpowiadają pytaniom w formularzu Google. Wartości checkboxów zgód muszą być identyczne z treścią opcji w Google.
- **Po zmianie pytań w formularzu Google trzeba zaktualizować pola na stronie.**
- Strona nie dostaje od Google potwierdzenia zapisu – po każdej zmianie w formularzu Google wyślij jedno testowe zgłoszenie i sprawdź arkusz.

## Podgląd lokalnie

```bash
python3 -m http.server 8000
```
