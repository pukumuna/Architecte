// Script pour contrôler les données du formulaire
async function initAdmin() {
    let user = "";
    let emel = "";
    let passwd = ""; 
    let userAdmin = "";
    let userLogin = "";

    //Récupération du Token de l'Administrateur eventuellement du localStorage
    userAdmin = window.localStorage.getItem('user');

    if (userAdmin === null) { // Persister User Administrateur dans localStorage
        // Récupération du token de l'Adminitrateur depuis l'API
        // body: '{"email": "sophie.bluel@test.tld" , "password": "S0phie"}    
        user = await fetch("http://localhost:5678/api/users/login", { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: '{"email": "sophie.bluel@test.tld" , "password" : "S0phie"}`}'
        });
                                 
        userAdmin = JSON.stringify(user); // Transformation des user en JSON
        // Stockage des informations dans le localStorage (sorte de sauvegarde light)
        window.localStorage.setItem("user", userAdmin);
    }  
    console.log("Valeurs de Token Admin"); 
    console.log(userAdmin); 
} 

// Verifier que Email/Password saisi correspond credential/Adminstrateur
const formulaire = document.getElementById("formule");
formulaire.addEventListener("submit", async function(event) {

    initAdmin();
    
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    // Récupération des valeurs des champs et Recherhe user/Token
    emel = document.getElementById("email").value.trim();
    passwd = document.getElementById("passwd").value.trim();
        
    user = await fetch("http://localhost:5678/api/users/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"email": emel , "password": passwd}`}'
    }); 

    userLogin = JSON.stringify(user); // Transformation des user en JSON


    console.log("Valeurs de Token Login"); 
    console.log(userLogin);

    if (userLogin.token === userAdmin.token) { // Verfication credential Token
        // Si les informations sont valides, redirige vers la page index.html
        //window.location.href = "index.html";
        console.log("Valeurs de Token Admin"); 
        console.log(userAdmin);
        console.log("Valeurs de Token Login"); 
        console.log(userLogin);
        let message = "Email ou mot de passe OK ???????? .";
        let errorLogin = document.getElementById("errorMessage");
        errorLogin.textContent = message; // Définit le texte du message d'erreur
    } else {
        // Sinon, affiche un message d'erreur
        let message = "Email ou mot de passe invalide. Veuillez réessayer.";
        // Définit le texte du message d'erreur
        document.getElementById("errorMessage").textContent = message; 
    }
});
