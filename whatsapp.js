// ===== ENVOI DE LA COMMANDE VERS WHATSAPP =====

// ⚠️ Numéro WhatsApp (format international, sans +)
const NUMERO_WHATSAPP = "22668968303";

function commanderSurWhatsApp() {
  const panier = obtenirPanier();

  if (panier.length === 0) {
    alert("Votre panier est vide. Ajoutez au moins un pagne.");
    return;
  }

  // Message texte
  const message = `Bonjour, je souhaite commander ${panier.length} article(s) de votre collection. Voici les pagnes sélectionnés :`;

  // URL des images (chemins absolus pour qu'ils soient accessibles)
  const liensImages = panier.map((item, i) =>
    `Article ${i + 1} : ${window.location.origin}/${item.image}`
  ).join('\n');

  const texteComplet = `${message}\n\n${liensImages}`;
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texteComplet)}`;

  window.open(url, '_blank');
}

// ===== FORMULAIRE CONTACT → WHATSAPP =====
function envoyerFormulaireWhatsApp(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const messageClient = document.getElementById('message').value.trim();

  if (!nom || !messageClient) {
    alert("Merci de remplir tous les champs.");
    return;
  }

  const texte = `Bonjour, je m'appelle ${nom}.\n\n${messageClient}`;
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texte)}`;
  window.open(url, '_blank');

  e.target.reset();
}