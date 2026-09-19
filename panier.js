// ===== GESTION DU PANIER (localStorage) =====

function obtenirPanier() {
  return JSON.parse(localStorage.getItem('panier') || '[]');
}

function sauvegarderPanier(panier) {
  localStorage.setItem('panier', JSON.stringify(panier));
  mettreAJourBadge();
}

function ajouterAuPanier(id, image) {
  const panier = obtenirPanier();
  if (!panier.find(p => p.id === id)) {
    panier.push({ id, image });
    sauvegarderPanier(panier);
    alert("Article ajouté au panier ✓");
  } else {
    alert("Cet article est déjà dans votre panier");
  }
  rafraichirBoutons();
}

function retirerDuPanier(id) {
  let panier = obtenirPanier();
  panier = panier.filter(p => p.id !== id);
  sauvegarderPanier(panier);
  rafraichirBoutons();
  afficherPanier(); // refresh modale
}

function mettreAJourBadge() {
  const badge = document.getElementById('badge-panier');
  if (badge) badge.textContent = obtenirPanier().length;
}

function rafraichirBoutons() {
  const panier = obtenirPanier();
  document.querySelectorAll('.carte-produit').forEach(carte => {
    const id = parseInt(carte.dataset.id);
    const dansPanier = panier.some(p => p.id === id);
    const btn = carte.querySelector('button');
    if (dansPanier) {
      btn.textContent = "Retirer du panier";
      btn.className = "btn-retirer";
      btn.onclick = () => retirerDuPanier(id);
    } else {
      btn.textContent = "Ajouter au panier";
      btn.className = "btn-ajouter";
      btn.onclick = () => ajouterAuPanier(id, carte.dataset.image);
    }
  });
}

// ===== AFFICHAGE DE LA MODALE PANIER =====
function afficherPanier() {
  const zone = document.getElementById('liste-panier');
  if (!zone) return;
  const panier = obtenirPanier();
  zone.innerHTML = '';

  if (panier.length === 0) {
    zone.innerHTML = '<p style="text-align:center;color:#999;">Votre panier est vide</p>';
    return;
  }

  panier.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-panier';
    div.innerHTML = `
      <img src="${item.image}" alt="Article">
      <button onclick="retirerDuPanier(${item.id})">✕</button>
    `;
    zone.appendChild(div);
  });
}

function togglePanier() {
  const modale = document.getElementById('modale-panier');
  modale.classList.toggle('ouvert');
  if (modale.classList.contains('ouvert')) afficherPanier();
}

// Init au chargement
document.addEventListener('DOMContentLoaded', () => {
  mettreAJourBadge();
  rafraichirBoutons();
});