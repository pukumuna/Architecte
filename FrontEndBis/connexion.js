// Script pour contrôler les données du formulaire
async function initAdmin() {
    let user = "";
    let userData = "";
    let userAdmin = "";

    //Récupération du Token de l'Administrateur eventuellement du localStorage
    userAdmin = window.localStorage.getItem('user');

    if (!JSON.parse(userAdmin).token) { // Persister User Administrateur dans localStorage  
        // Récupération du token de l'Adminitrateur depuis l'API
        // body: '{"email": "sophie.bluel@test.tld" , "password": "S0phie"}    
        user = await fetch("http://localhost:5678/api/users/login", { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email: "sophie.bluel@test.tld", password: "S0phie" })
        });
        const userData = await user.json(); // Parse JSON
        console.log("userData : "); console.log(userData); console.log(userData.token); 

        userAdmin = JSON.stringify(userData); // Transformation de user en JSON
        // Stockage des informations dans le localStorage (sorte de sauvegarde light)
        window.localStorage.setItem("user", userAdmin);
    }
    console.log("Valeurs de Token Admin"); 
    console.log(JSON.parse(userAdmin).token);
 
} 

// Verifier que Email/Password saisis correspond credential/Adminstrateur
const formulaire = document.getElementById("formule");
formulaire.addEventListener("submit", async function(event) {
     
    initAdmin();
     
    let user = "";
    let emel = "";
    let passwd = "";
    let userData = ""; 
    let userAdmin = "";
    let userLogin = "";

    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    // Récupération des valeurs des champs et Recherhe user/Token
    emel = document.getElementById("email").value.trim();
    passwd = document.getElementById("passwd").value.trim();

    user = await fetch("http://localhost:5678/api/users/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: emel, password: passwd })
    }); 
    userLogin = await user.json(); // Parse JSON

    //userLogin = JSON.stringify(userData); // Transformation des user en JSON
    userAdmin = JSON.parse(window.localStorage.getItem("user"));

    console.log("Valeurs de Token Admin/Login"); 
    console.log(userAdmin.token); console.log(userLogin.token); 
    
    //Teste de token sur les 130 premiirs caracteres
    const tokenAdmin = userAdmin.token.substring(0, 30);
    const tokenLogin = userLogin.token.substring(0, 30);

    if (tokenAdmin === tokenLogin) { // Verif Tokens
        // Si les informations sont valides, redirige vers la page index.html
        window.location.href = "index.html";
        } else {
        // Sinon, affiche un message d'erreur
        let message = "Email ou mot de passe invalide. Veuillez réessayer.";
        // Définit le texte du message d'erreur
        document.getElementById("errorMessage").textContent = message; 
    }
});
