SMAJLI STORE — UPUTSTVO ZA BESPLATNO OBJAVLJIVANJE

SADRŽAJ
- index.html: stranice i struktura
- style.css: izgled sajta
- script.js: proizvodi, filteri, porudžbine i kontakt podešavanja

VAŽNO PRE OBJAVLJIVANJA
Ovo je funkcionalan statički sajt. Katalog, filteri, detalji proizvoda i obrazac rade u pregledaču.
Obrazac priprema porudžbinu u korisnikovoj mejl aplikaciji (mailto). Ne skladišti porudžbine na serveru i ne šalje ih automatski ako kupac nema podešen mejl klijent.
Za automatsko slanje bez mejl aplikacije poveži form servis (npr. FormSubmit/Formspree) i pročitaj njegove uslove, ograničenja i privatnost.

1. PODESI MEJL I WHATSAPP
Otvori script.js u tekst editoru.
- Promeni STORE_EMAIL u svoju mejl adresu.
- Promeni WHATSAPP_NUMBER u broj sa pozivnim brojem države, samo cifre. Primer formata: 381601234567.
Sačuvaj fajl.

2. PROMENI PROIZVODE
U script.js pronađi niz PRODUCTS. Za svaki proizvod promeni:
- name: naziv
- category: Elektronika, Dodaci ili Lifestyle (ili promeni filtere i kategorije)
- price: cena u dinarima kao broj, bez tačke i valute
- description: tačan opis
- tag: oznaka, npr. NOVO; ostavi "" ako ne želiš oznaku
- emoji: rezervni simbol ako nema slike
- image: putanja slike, npr. "assets/slusalice.jpg"
Kopiraj fotografije u folder assets. Koristi samo slike za koje imaš pravo da ih koristiš i prikaži stvarni proizvod koji prodaješ.
Sve prikazane cene i opisi u početnom katalogu su primeri — ažuriraj ih pre nego što sajt pokažeš kupcima.

3. BESPLATNO OBJAVLJIVANJE NA GITHUB PAGES
- Napravi ili se prijavi na nalog na https://github.com/
- Napravi novi javни repository (repo), npr. smajli-store.
- Upload-uj index.html, style.css, script.js i folder assets (ako ima slika) u glavni folder repozitorijuma.
- Uđi u Settings → Pages.
- Pod Build and deployment izaberi Deploy from a branch.
- Izaberi branch main i folder /(root), pa klikni Save.
- Sačekaj da GitHub Pages objavi sajt. URL će biti oblika https://TVOJ-NALOG.github.io/smajli-store/
- Ako promeniš fajlove, ponovo ih uploaduj/commituj; sajt će se ažurirati nakon objave.

Alternativa: Netlify Drop (proveri aktuelne uslove besplatног плана)
https://app.netlify.com/drop
Možeš превући folder са фајловима у Netlify Drop ако је доступно у твом налогу.

4. PRE PRVE PORUDŽBINE
- Testiraj na telefonu i računaru.
- Proveri sve cene, dostupnost, kontakt i WhatsApp.
- Navedi stvarne troškove dostave, rokove, način plaćanja, pravila reklamacije i povraćaja i podatke o prodavcu kako zakon zahteva.
- Za redovnu prodaju u Srbiji proveri poreske, registracione i potrošačke obaveze. Nemoj oglašavati regulisane proizvode bez provere važećih pravila.
- Ne prikupljaj više ličnih podataka nego što je neophodno. Za narudžbine i adrese pročitaj obaveze u vezi sa zaštitom podataka o ličnosti.
- Nemoj navoditi da je roba originalna, sertifikovana ili pod garancijom ako to ne možeš da dokažeš.

BESPLATNA VERZIJA
GitHub Pages omogućava besplatan hosting statičkog sajta na GitHub Pages adresi. Sopstveni .rs domen, profesionalni email i neki servisi mogu se dodatno plaćati.
