/*
 * SMAJLI STORE — PODEŠAVANJA
 * Email za upite: aleksa.ismail032@gmail.com
 * WhatsApp broj je zadržan iz starog fajla; formatiran da bi link radio.
 */
const STORE_EMAIL = "aleksa.ismail032@gmail.com";
const WHATSAPP_NUMBER = "381640384603";

const CATEGORY_OPTIONS = {
  parfemi: [
    ["Svež i citrusni", "Svež, lagan mirisni profil"],
    ["Cvetni", "Nežan cvetni mirisni profil"],
    ["Drvenasti", "Topao, drvenasti mirisni profil"],
    ["Orijentalni", "Intenzivniji, začinski mirisni profil"]
  ],
  airpods: [
    ["AirPods 2. generacija", "Upit za ovaj model"],
    ["AirPods 3. generacija", "Upit za ovaj model"],
    ["AirPods Pro", "Upit za ovaj model"],
    ["Nisam siguran — treba mi savet", "Pomoć pri izboru modela"]
  ],
  pafovi: [
    ["Voćni", "Informativni upit o kategoriji"],
    ["Mentol", "Informativni upit o kategoriji"],
    ["Slatki", "Informativni upit o kategoriji"],
    ["Drugi / nisam siguran", "Informativni upit o kategoriji"]
  ]
};

function initMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!menuToggle || !nav) return;
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

function initContact() {
  const emailLink = document.getElementById("emailLink");
  if (emailLink) emailLink.href = `mailto:${STORE_EMAIL}`;
  const whatsappLink = document.getElementById("whatsappLink");
  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Zdravo! Interesuje me ponuda Smajli Store.")}`;
  }
}

function initDetailPage() {
  const page = document.body.dataset.categoryPage;
  if (!page) return;
  const options = CATEGORY_OPTIONS[page] || [];
  const grid = document.getElementById("variantGrid");
  const select = document.getElementById("variantSelect");
  const form = document.getElementById("detailForm");
  const status = document.getElementById("formStatus");

  if (page === "pafovi") {
    grid.innerHTML = `<div class="detail-note" style="grid-column:1/-1"><strong>Važno:</strong> Ova kategorija je namenjena isključivo punoletnim osobama. Informacije na stranici su opšte; proveri lokalne propise, starosna ograničenja i deklaraciju proizvoda.</div>`;
  } else {
    grid.innerHTML = options.map(([name, description], index) => `
      <button type="button" class="variant-card" data-variant="${name.replace(/"/g, "&quot;")}">
        <strong>${name}</strong><small>${description}</small>
      </button>
    `).join("");
  }

  select.innerHTML = `<option value="">Izaberi varijantu</option>` + options.map(([name]) =>
    `<option value="${name}">${name}</option>`
  ).join("");

  grid.addEventListener("click", event => {
    const card = event.target.closest("[data-variant]");
    if (!card) return;
    select.value = card.dataset.variant;
    grid.querySelectorAll(".variant-card").forEach(item => item.classList.toggle("selected", item === card));
    if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Smajli Store — upit: ${page}`;
    const body = [
      "Novi upit — Smajli Store", "",
      `Kategorija: ${page}`,
      `Ime i prezime: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `Izabrana varijanta: ${data.get("variant")}`,
      `Poruka: ${data.get("message") || "—"}`, "",
      "Molimo odgovorite korisniku i potvrdite dostupnost i detalje."
    ].join("\n");
    status.textContent = "Otvaramo tvoju mejl aplikaciju...";
    window.location.href = `mailto:${encodeURIComponent(STORE_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  initMenu();
  initContact();
  initDetailPage();
});
