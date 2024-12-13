// Script pour contrôler les données du formulaire
document.getElementById("#loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    // Récupération des valeurs des champs
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Validation des champs (exemple basique)
    if (validateCredentials(email, password)) {
      // Si les informations sont valides, redirige vers la page index.html
      window.location.href = "index.html";
    } else {
      // Sinon, affiche un message d'erreur
      displayErrorMessage("Email ou mot de passe invalide. Veuillez réessayer.");
    }
});
  
// Fonction pour valider les informations (simule un contrôle)
function validateCredentials(email, password) {
    // Exemple de validation basique
    const validEmail = "user@example.com";
    const validPassword = "password123";
  
    return email === validEmail && password === validPassword;
}
  
// Fonction pour afficher un message d'erreur
function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = message; // Définit le texte du message d'erreur
}
  