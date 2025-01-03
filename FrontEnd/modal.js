//Variable Gallerie et icone
let valGalerie = ".gallery";
//Récupération des works eventuellement stockées dans le localStorage
let works = window.localStorage.getItem('works'); //works = "";

if (works === "") {
    console.log("toto");
    // Récupération des works depuis l'API
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json()); // Fusionner
    //const reponse = await fetch('works-data.json');
    //works   = await reponse.json();
    
    // Transformation des works en JSON (sérialiser)
    const valeurWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage (sorte de sauvegarde light)
    window.localStorage.setItem("works", valeurWorks);

} else { console.log("yoyo");
    works = JSON.parse(works);
}
 
let categories = window.localStorage.getItem('categories');
if (categories === null) {
    const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());
    
    // Transformation des categories en JSON (sérialiser)
    const valeurCategories = JSON.stringify(categories);
    // Stockage des informations dans le localStorage (sorte de sauvegarde light)
    window.localStorage.setItem("categories", valeurCategories);
} else {
    categories = JSON.parse(categories);
}
 
console.log("works : ");  console.log(works);
afficherTravaux(works, valGalerie);


//Affichage dynamique de la liste des Travaux de Architecte
function afficherTravaux(projets, galerie) {
    //const galery = document.querySelector(".gallery");
    const galery = document.querySelector(`${galerie}`);
    galery.innerHTML = ``;
    /*if (!garbage) {
        //ajout icone poubelle sur image
    } */
    for (let i=0; i < projets.length; i++) {
        const projet = projets[i];
        const figure = document.createElement("figure");
        const image  = document.createElement("img");
        const caption = document.createElement("figcaption");
        image.src=projet.imageUrl;
        image.alt=projet.title; 
        caption.innerText=projet.title;
        figure.appendChild(image); 
        figure.appendChild(caption);

        galery.appendChild(figure);
    }
}

/*     ************************************************************** --- */
/*     **************************** Modal *************************** --- */
/*     ************************************************************** --- */


    let edition = document.getElementById("fenetre"); 
    edition.addEventListener("click", (event) =>{
    console.log("execution de la fonction modale:1"); 
    
    const galery = document.querySelector(".popup-grid1"); 
    galery.setAttribute("display","flex");
    let modale = document.getElementById("boiteModal");
    modale.style.visibility = "visible"; 
    document.querySelector(".optSelect").setAttribute("id","");
    document.querySelector(".popup-gallery").classList.remove("hidden");
    document.querySelector("body").setAttribute("background","rgba(7, 92, 92, 0.8)");
    document.querySelector(valGalerie).setAttribute("background","rgba(255, 255, 255, 0.9)");                                        

    for (let i=0; i < works.length; i++) {
        const projet = works[i];
        const figure = document.createElement("div");
        figure.classList.add("divrelate");
        const image = document.createElement("img");
        image.setAttribute("object-fit","cover");
        image.src=projet.imageUrl;
        
        const icone = document.createElement("i");
        icone.setAttribute("workid",`${projet.id}`);
        icone.classList.add("fas", "fa-trash-can", "trash-icon");
        const icodiv = document.createElement("div");
        icodiv.classList.add("divicone");
        icodiv.appendChild(icone);
        figure.appendChild(image);
        figure.appendChild(icodiv);
        galery.appendChild(figure);
        icone.addEventListener("mouseover", (event) => {
             // highlight the mouseenter target
            event.target.style.color = "purple";
            // reset the color after a short delay
            setTimeout(() => {
                event.target.style.color = "";
                }, 300); 
        });   

        icone.addEventListener("click", () => {
            alert('Image supprimée !');
            figure.remove(); // Suppression du conteneur
             
            const id = icone.getAttribute("workid");
            console.log("workid :" +id);
            
            try {
                const response = fetch("http://localhost:5678/api/works/{id}", 
                {method: "DELETE"});

                if (response.ok) {
                    statous.textContent = "Fichier enregistré avec succès !";
                    statous.style.color = "green";
                } else {
                    statous.textContent = "Erreur lors de l'enregistrement.";
                    statous.style.color = "red";
                }
                } catch (error) {
                statous.textContent = "Erreur : " + error.message;
                statous.style.color = "red";
            } 
        });               
        
    }

    console.log("execution de la fonction modale:2 /Chargement categories"); 
    const chargList = document.querySelector("#lstcateg");

    for (let i=0; i < categories.length; i++) {
        const categorie = categories[i];
        const optionCat = document.createElement("option");
        optionCat.value = categorie.name;
        optionCat.innerText = categorie.name;
        chargList.appendChild(optionCat);
    } 
  
});

// Fermeture de la Modale
let close = document.querySelector(".close-popup"); 
close.addEventListener("click", (event) =>{

    console.log("execution de la page indexModal.html"); 
    // redirige vers la page indexModal.html
    window.location.href = "indexModal.html";
});

// Traitement de la saisie Ajout Photo des Projets 
const fileInput = document.getElementById("file");
const titleInput = document.getElementById("title");
const chargList = document.querySelector("#lstcateg");
const submitBtn = document.getElementById("submitBtn");
const filename = document.getElementById("filename");
const errorMessage = document.getElementById("errorMessage");
const status = document.getElementById("status");
const optSelect = document.querySelector(".optSelect");

const validateForm = () => {
    controleData();
}


function controleData() {
    const categorie = [];
    const file  = fileInput.files[0];
    const title = titleInput.value.trim();

    if (optSelect.getAttribute("id")) {       
        categorie.id = optSelect.getAttribute("id")
        categorie.name = optSelect.getAttribute("name")
        console.log("categ-ctl:" +categorie.id +" "+categorie.name);
    }
    
    let isValid = true;
    let errorMessages = [];
    
    if (file) {
        filename.innerHTML = file.name;
        filename.classList.remove("hidden");
    } 
    
    // Vérification du fichier
    if (!file) {
        isValid = false;
        //filename.classList.add("hidden");
        filename.innerHTML = "";
        console.log("filename-innerHTML??");
        errorMessages.push('Veuillez sélectionner un fichier.');
    } else if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
        isValid = false;
        errorMessages.push('Le fichier doit être au format PNG ou JPG.');
    } else if (file.size > 4 * 1024 * 1024) {
        isValid = false;
        errorMessages.push('Le fichier ne doit pas dépasser 4 Mo.');
    }

    // Vérification du titre
    if (!title) {
        isValid = false;
        errorMessages.push('Le titre ne peut pas être vide.');
    }

    // Vérification de categorie
    console.log("categorie toto-id: " + categorie.id);
    if (!optSelect.getAttribute("id")) {
    //if (!categorie) {
        console.log("titi");
        isValid = false;
        errorMessages.push('La categorie ne peut pas être vide.');
    } 
    console.log("tata");
    // Mise à jour du message d'erreur
    if (!isValid) {
        errorMessage.textContent = errorMessages.join();
        submitBtn.classList.remove('enabled');
    } else {
        errorMessage.textContent = '';
        submitBtn.classList.add('enabled');
    }   
};

// Remplissage champs du formulaire
fileInput.addEventListener('change', validateForm);
titleInput.addEventListener('input', validateForm);

chargList.addEventListener("change", (e) => {
    
    console.log("Event-categorie : " + e.target.value );
    const categorie = [];
    const chargCat = document.querySelector("#lstcateg");
    const optSelect = document.querySelector(".optSelect");
    
    for (let i=0; i < categories.length; i++) {
        if (chargCat.value === categories[i].name) {
            categorie.id = categories[i].id;
            categorie.name = categories[i].name;
            optSelect.setAttribute("id", `${categories[i].id}`)
            optSelect.setAttribute("name", `${categories[i].name}`)
            console.log("categ-def:" +categorie.id +" "+categorie.name);
        }
    } 
    controleData();
 }); 

let formulaire = document.getElementById("uploadForm");
// Soumission champs du formulaire et Record Projet
formulaire.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!submitBtn.classList.contains("enabled")) {
      errorMessage.textContent = "Corrigez les erreurs avant de soumettre.";
      return;
    }
    
    console.log("categorie-id mama:" + optSelect.getAttribute("id"));
     
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value.trim());
    formData.append("category", optSelect.getAttribute("id"));
    try {
      const response = await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formData
      });

      if (response.ok) {
        statous.textContent = "Fichier enregistré avec succès !";
        statous.style.color = "green";
      } else {
        statous.textContent = "Erreur lors de l'enregistrement.";
        statous.style.color = "red";
      }
    } catch (error) {
      statous.textContent = "Erreur : " + error.message;
      statous.style.color = "red";
    }
    
});

// Affichage Message Erreur sur saisie de la Modale
function erreur(message) {
    document.getElementById("errorMessage").textContent = message; 
}

