// Script pour gérer l'affichage et la fermeture du modal
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
  
    // Affichage du modal (par exemple, si une image est cliquée)
    document.querySelector(".image-grid").addEventListener("click", () => {
      modal.style.display = "flex";
    });
  
    // Fermeture du modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Supprimer une image de la galerie
    document.querySelector(".gallery-grid").addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
      }
    });
  });
  