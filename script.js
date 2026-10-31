const STORE_EMAIL = "aleksa.ismail032@gmail.com";
const WHATSAPP_NUMBER = "381640384603";

function setupMenu(){
  const button=document.getElementById("menuToggle");
  const nav=document.getElementById("mainNav");
  if(!button||!nav)return;
  button.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    button.setAttribute("aria-expanded",String(open));
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open");button.setAttribute("aria-expanded","false");
  }));
}
function setupDetail(){
  const category=document.body.dataset.categoryPage;
  if(!category)return;
  const data={
    parfemi:[["Svež i citrusni","Svež, lagan mirisni profil"],["Cvetni","Nežan cvetni mirisni profil"],["Drvenasti","Topao, drvenasti mirisni profil"],["Orijentalni","Intenzivniji, začinski mirisni profil"]],
    airpods:[["AirPods 2. generacija","Upit za ovaj model"],["AirPods 3. generacija","Upit za ovaj model"],["AirPods Pro","Upit za ovaj model"],["Nisam siguran — treba mi savet","Pomoć pri izboru modela"]],
    pafovi:[["Opšte informacije","Informativni upit"],["Pitanje o kategoriji","Dodatna pojašnjenja"],["Drugo pitanje","Ostavi nam poruku"]]
  };
  const options=data[category]||[],grid=document.getElementById("variantGrid"),select=document.getElementById("variantSelect"),form=document.getElementById("detailForm"),status=document.getElementById("formStatus");
  if(grid){
    grid.innerHTML=options.map(([name,desc])=>`<button type="button" class="variant-card" data-variant="${name.replace(/"/g,"&quot;")}"><strong>${name}</strong><small>${desc}</small></button>`).join("");
    grid.addEventListener("click",e=>{
      const card=e.target.closest("[data-variant]");if(!card)return;
      select.value=card.dataset.variant;grid.querySelectorAll(".variant-card").forEach(x=>x.classList.toggle("selected",x===card));
      form.scrollIntoView({behavior:"smooth",block:"center"});
    });
  }
  if(select)select.innerHTML='<option value="">Izaberi opciju</option>'+options.map(([name])=>`<option value="${name}">${name}</option>`).join("");
  if(form)form.addEventListener("submit",e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const d=new FormData(form),subject=`Smajli Store — upit: ${category}`;
    const body=["Novi upit — Smajli Store","",`Kategorija: ${category}`,`Ime i prezime: ${d.get("name")}`,`Telefon: ${d.get("phone")}`,`Izabrana opcija: ${d.get("variant")}`,`Poruka: ${d.get("message")||"—"}`].join("\n");
    status.textContent="Otvaramo tvoju mejl aplikaciju. Proveri poruku i potvrdi slanje.";
    location.href=`mailto:${STORE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
  setupMenu();setupDetail();
});
