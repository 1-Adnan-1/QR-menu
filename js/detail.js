import { renderDetailPage, renderNotFoundedPage } from "./ui.js";

const params = new URLSearchParams(window.location.search);

// Yukarıdaki classdan örnek alınarak url'deki parametreye ulaşıldı.
const id = parseInt(params.get("id"));

// Ürün detayının akatarılacağı Html elemanı

const outlet = document.getElementById("outlet");
const toggleCommentsBtn = document.getElementById("toggle-comments");
const rightSection = document.getElementById("right-section");
const showCommentsBtn = document.getElementById("show-comments-btn");

toggleCommentsBtn.addEventListener("click", function () {
  rightSection.classList.toggle("hide");
  outlet.classList.toggle("outlet-full-screen");
  if (rightSection.classList.contains("hide")) {
    toggleCommentsBtn.textContent = "Yorumları Göster";
    showCommentsBtn.classList.add("show");
  } else {
    toggleCommentsBtn.textContent = "Yorumlar";
    showCommentsBtn.classList.remove("show");
  }
});

// Yorumları açmak için sağ üstteki butona tıklanabilirlik ekle
showCommentsBtn.addEventListener("click", function () {
  rightSection.classList.remove("hide");
  outlet.classList.remove("outlet-full-screen");
  toggleCommentsBtn.textContent = "Yorumlar";
  showCommentsBtn.classList.remove("show");
});

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener("DOMContentLoaded", async () => {
  // db.json dosyasına istek at
  const res = await fetch("../db.json");
  // Verileri js nesnesine çevir
  const data = await res.json();

  // id ye göre ilgili elemanı bul
  const product = data.menu.find((item) => item.id === id);
  // Eğer ürün yoksa ürün bulunamadı sayfasına git
  if (!product) {
    // Ürün bulunamadı içeriğini render et
    renderNotFoundedPage(outlet);
  } else {
    renderDetailPage(product, outlet);
  }
});
