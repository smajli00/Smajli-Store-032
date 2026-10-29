/*
 * SMAJLI STORE — PODEŠAVANJA
 * 1) Unesi svoju poslovnu mejl adresu u STORE_EMAIL.
 * 2) Unesi WhatsApp broj u WHATSAPP_NUMBER, samo cifre sa pozivnim brojem države
 *    (primer Srbije: 3816XXXXXXXX, bez +, razmaka i početne nule).
 * 3) Zameni primer proizvode, cene i fotografije u PRODUCTS.
 * Važno: obrazac otvara mejl aplikaciju korisnika. Za slanje bez otvaranja mejla
 * potreban je formularni servis ili sopstveni backend.
 */
const STORE_EMAIL = "prokobra.car@gmail.com";
const WHATSAPP_NUMBER = "+381640384603"; // Primer formata: 381601234567

const PRODUCTS = [
  {
    id: "slusalice",
    name: "Bežične slušalice",
    category: "Elektronika",
    price: 2490,
    oldPrice: null,
    tag: "POPULARNO",
    emoji: "🎧",
    image: "",
    description: "Praktične bežične slušalice za muziku, pozive i svakodnevnu upotrebu. Proveri dostupnost pre porudžbine."
  },
  {
    id: "zvucnik",
    name: "Bluetooth zvučnik",
    category: "Elektronika",
    price: 1990,
    oldPrice: null,
    tag: "IZDVAJAMO",
    emoji: "🔊",
    image: "",
    description: "Kompaktan zvučnik za slušanje muzike kod kuće ili u pokretu. Specifikacije potvrditi pre objavljivanja."
  },
  {
    id: "sat",
    name: "Digitalni sat",
    category: "Dodaci",
    price: 2890,
    oldPrice: null,
    tag: "NOVO",
    emoji: "⌚",
    image: "",
    description: "Jednostavan dodatak za svakodnevni stil. Unesi tačne karakteristike i garanciju za konkretan model."
  },
  {
    id: "ranac",
    name: "Gradski ranac",
    category: "Lifestyle",
    price: 2290,
    oldPrice: null,
    tag: "",
    emoji: "🎒",
    image: "",
    description: "Praktičan ranac za svakodnevne obaveze. Dodaj dimenzije, materijal i boje koje su stvarno dostupne."
  },
  {
    id: "punjac",
    name: "USB-C punjač",
    category: "Elektronika",
    price: 1490,
    oldPrice: null,
    tag: "",
    emoji: "🔌",
    image: "",
    description: "Punjač za kompatibilne uređaje. Navedi izlaznu snagu, standarde i kompatibilnost prema stvarnom proizvodu."
  },
  {
    id: "futrola",
    name: "Zaštitna futrola",
    category: "Dodaci",
    price: 790,
    oldPrice: null,
    tag: "",
    emoji: "📱",
    image: "",
    description: "Zaštitna futrola za određene modele telefona. Obavezno navedi kompatibilne modele i dostupne boje."
  },
  {
    id: "lampica",
    name: "LED ambijentalna lampa",
    category: "Lifestyle",
    price: 1690,
    oldPrice: null,
    tag: "",
    emoji: "💡",
    image: "",
    description: "Dekorativno osvetljenje za radni sto ili sobu. Dodaj tačan način napajanja i specifikacije."
  },
  {
    id: "powerbank",
    name: "Prenosna baterija",
    category: "Elektronika",
    price: 2190,
    oldPrice: null,
    tag: "",
    emoji: "🔋",
    image: "",
    description: "Prenosna baterija za kompatibilne uređaje. Unesi stvarni kapacitet, priključke i bezbednosne oznake."
  }
];

const money = amount => new Intl.NumberFormat("sr-RS", {
  style: "currency", currency: "RSD", maximumFractionDigits: 0
}).format(amount);

const grid = document.getElementById("productGrid");
const select = document.getElementById("orderProduct");
const dialog = document.getElementById("productDialog");
const dialogContent = document.getElementById("dialogContent");

function safeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function art(product, extraClass = "") {
  if (product.image && product.image.trim()) {
    return `<img src="${safeText(product.image)}" alt="${safeText(product.name)}" loading="lazy">`;
  }
  return `<span class="art-fallback ${extraClass}" role="img" aria-label="${safeText(product.name)}">${product.emoji || "✦"}</span>`;
}

function renderProducts(category = "Sve") {
  const shown = PRODUCTS.filter(p => category === "Sve" || p.category === category);
  grid.innerHTML = shown.map(p => `
    <article class="product-card">
      <button class="product-art" data-view="${safeText(p.id)}" aria-label="Detalji: ${safeText(p.name)}">
        ${p.tag ? `<span class="product-tag">${safeText(p.tag)}</span>` : ""}
        ${art(p)}
      </button>
      <div class="product-info">
        <div class="product-category">${safeText(p.category)}</div>
        <h3>${safeText(p.name)}</h3>
        <p>${safeText(p.description)}</p>
        <div class="product-bottom">
          <div class="product-price">${money(p.price)}${p.oldPrice ? `<small><s>${money(p.oldPrice)}</s></small>` : ""}</div>
          <button class="mini-button" data-order="${safeText(p.id)}">Poruči ↗</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderSelect() {
  select.innerHTML = `<option value="">Izaberi proizvod</option>` + PRODUCTS.map(p =>
    `<option value="${safeText(p.id)}">${safeText(p.name)} — ${money(p.price)}</option>`
  ).join("");
}

function openProduct(id) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;
  dialogContent.innerHTML = `
    <div class="dialog-product-art">${art(p)}</div>
    <div class="product-category">${safeText(p.category)}</div>
    <h2>${safeText(p.name)}</h2>
    <p>${safeText(p.description)}</p>
    <div class="dialog-price">${money(p.price)}</div>
    <div class="dialog-actions">
      <button class="button button-primary" data-order="${safeText(p.id)}">Poruči ovaj proizvod ↗</button>
      <button class="button button-outline" data-close-dialog>Zatvori</button>
    </div>`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function chooseProduct(id) {
  select.value = id;
  document.getElementById("porudzbina").scrollIntoView({ behavior: "smooth" });
  if (dialog.open) dialog.close();
  const nameInput = document.querySelector('[name="name"]');
  setTimeout(() => nameInput.focus({ preventScroll: true }), 350);
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(el => el.classList.toggle("active", el === button));
  renderProducts(button.dataset.category);
});

document.addEventListener("click", event => {
  const view = event.target.closest("[data-view]");
  const order = event.target.closest("[data-order]");
  const close = event.target.closest("[data-close-dialog]");
  if (view) openProduct(view.dataset.view);
  if (order) chooseProduct(order.dataset.order);
  if (close) dialog.close();
});

document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const product = PRODUCTS.find(p => p.id === data.get("product"));
  const subject = `Upit / porudžbina — ${product ? product.name : "Smajli Store"}`;
  const body = [
    "Nova porudžbina / upit — Smajli Store",
    "",
    `Ime i prezime: ${data.get("name")}`,
    `Telefon: ${data.get("phone")}`,
    `Proizvod: ${product ? product.name : data.get("product")}`,
    `Cena prikazana na sajtu: ${product ? money(product.price) : "proveriti"}`,
    `Adresa za dostavu: ${data.get("address") || "Nije uneta"}`,
    `Poruka: ${data.get("message") || "—"}`,
    "",
    "Molimo proverite dostupnost i dogovorite troškove dostave i plaćanje pre potvrde."
  ].join("\n");
  const status = document.getElementById("formStatus");
  if (!STORE_EMAIL || STORE_EMAIL.includes("unesi-svoju-email-adresu") || STORE_EMAIL.includes("example.com")) {
    status.textContent = "Pre slanja, vlasnik sajta treba da unese svoju mejl adresu u STORE_EMAIL u fajlu script.js.";
    return;
  }
  status.textContent = "Otvaramo tvoju mejl aplikaciju. Ako se ne otvori, proveri podešeni mejl klijent.";
  window.location.href = `mailto:${encodeURIComponent(STORE_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("emailLink").addEventListener("click", event => {
  if (STORE_EMAIL.includes("unesi-svoju-email-adresu") || STORE_EMAIL.includes("example.com")) {
    event.preventDefault();
    alert("Vlasnik sajta treba da unese svoju mejl adresu u promenljivu STORE_EMAIL u fajlu script.js.");
  } else {
    event.currentTarget.href = `mailto:${STORE_EMAIL}`;
  }
});

const whatsappLink = document.getElementById("whatsappLink");
if (/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Zdravo! Interesuje me ponuda Smajli Store.")}`;
} else {
  whatsappLink.href = "#kontakt";
  whatsappLink.addEventListener("click", event => {
    event.preventDefault();
    alert("Vlasnik sajta treba da unese WhatsApp broj u promenljivu WHATSAPP_NUMBER u fajlu script.js.");
  });
}

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderSelect();
