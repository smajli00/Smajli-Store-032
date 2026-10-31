const STORE_EMAIL = "aleksa.ismail032@gmail.com";
const WHATSAPP_NUMBER = "381640384603";

function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initContact() {
  const email = document.getElementById("emailLink");
  if (email) email.href = `mailto:${STORE_EMAIL}`;
  const whatsapp = document.getElementById("whatsappLink");
  if (whatsapp) whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Zdravo! Interesuje me Smajli Store.")}`;
}

function initDetailPage() {
  const category = document.body.dataset.categoryPage;
  if (!category) return;
  const variants = {
    parfemi: [["Svež i citrusni", "Svež, lagan mirisni profil"], ["Cvetni", "Nežan cvetni mirisni profil"], ["Drvenasti", "Topao, drvenasti mirisni profil"], ["Orijentalni", "Intenzivniji, začinski mirisni profil"]],
    airpods: [["AirPods 2. generacija", "Upit za ovaj model"], ["AirPods 3. generacija", "Upit za ovaj model"], ["AirPods Pro", "Upit za ovaj model"], ["Nisam siguran — treba mi savet", "Pomoć pri izboru modela"]],
    pafovi: [["Opšte informacije", "Informativni upit"], ["Dostupnost informacija", "Pitanje o kategoriji"], ["Drugo pitanje", "Dodatne informacije"]]
  };
  const grid = document.getElementById("variantGrid");
  const select = document.getElementById("variantSelect");
  const form = document.getElementById("detailForm");
  const status = document.getElementById("formStatus");
  const options = variants[category] || [];

  if (grid) {
    grid.innerHTML = options.map(([name, desc]) => `<button type="button" class="variant-card" data-variant="${name.replace(/"/g, "&quot;")}"><strong>${name}</strong><small>${desc}</small></button>`).join("");
    grid.addEventListener("click", event => {
      const card = event.target.closest("[data-variant]");
      if (!card) return;
      select.value = card.dataset.variant;
      grid.querySelectorAll(".variant-card").forEach(item => item.classList.toggle("selected", item === card));
      form.scrollIntoView({behavior:"smooth", block:"center"});
    });
  }
  if (select) select.innerHTML = `<option value="">Izaberi opciju</option>` + options.map(([name]) => `<option>${name}</option>`).join("");

  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Smajli Store — upit: ${category}`;
    const body = [
      "Novi upit — Smajli Store", "",
      `Kategorija: ${category}`,
      `Ime i prezime: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `Izabrana opcija: ${data.get("variant")}`,
      `Poruka: ${data.get("message") || "—"}`, "",
      "Molimo odgovorite korisniku i potvrdite detalje."
    ].join("\n");
    status.textContent = "Otvaramo tvoju mejl aplikaciju. Proveri da li je poruka spremna za slanje.";
    window.location.href = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  initMenu();
  initContact();
  initDetailPage();
});
