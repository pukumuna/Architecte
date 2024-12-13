import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis } from "./avis.js";
//Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');

if (pieces === null) {
    // Récupération des pièces depuis l'API
    const pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json()); // Fusionner
    //const reponse = await fetch('http://localhost:8081/pieces/');
    //pieces = await reponse.json();
    
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);
    // Stockage des informations dans le localStorage (sorte de sauvegarde light)
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}

ajoutListenerEnvoyerAvis()

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise(article) dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        pieceElement.dataset.id = article.id
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
         
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);

    }
    ajoutListenersAvis();
}

genererPieces(pieces);
/*
for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis)
    }
} */   //A remettre + tard !!!!!

//gestion des bouttons 
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesTriees = Array.from(pieces);
    piecesTriees.sort(function (a, b) {
        if (a.prix < b.prix)
            return -1;
        else 
            if (a.prix > b.prix)
                return +1;
            else return 0;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesTriees);
});

const boutonDecroi = document.querySelector(".btn-decroi");
boutonDecroi.addEventListener("click", function () {
    const piecesDecroi = Array.from(pieces);
    piecesDecroi.sort(function (a, b) {
        if (a.prix < b.prix)
            return +1;
        else 
            if (a.prix > b.prix)
                return -1;
            else return 0;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesDecroi);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1);
    }
}
console.log(noms)
//Création de l'en-tête

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElements);

const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)

for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

const disponiblesElement = document.createElement('ul');

for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElement.appendChild(nomElement);
}

const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement)

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
    window.localStorage.removeItem("pieces");
});

//await afficherGraphiqueAvis();