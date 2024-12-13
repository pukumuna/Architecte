//Variable Gallerie et icone
let garbage = "";
let valGalerie = '.gallery';
//Récupération des works eventuellement stockées dans le localStorage
let works = window.localStorage.getItem('works');

if (works === null) {
    // Récupération des works depuis l'API
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json()); // Fusionner
    //const reponse = await fetch('works-data.json');
    //works   = await reponse.json();
    
    // Transformation des works en JSON (sérialiser)
    const valeurWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage (sorte de sauvegarde light)
    window.localStorage.setItem("works", valeurWorks);
} else {
    works = JSON.parse(works);
}

console.log("works : ");  console.log(works);
afficherTravaux(works, valGalerie, garbage);

//Affichage dynamique de la liste deroulante de catégorie
const listeCat = document.querySelector(".catFiltre");
const labelCat = document.createElement("label");
const sautLigne = document.createElement("br");
labelCat.for = "Catégorie";
labelCat.innerText = "Catégorie";
const selectCat = document.createElement("select");
selectCat.id = "Catégorie";
selectCat.name = "Catégorie";
const optionCat = document.createElement("option");
optionCat.value = "All";
optionCat.selected = "selected";
optionCat.innerText = "Toutes catégories";
selectCat.appendChild(optionCat);
listeCat.appendChild(labelCat);
listeCat.appendChild(selectCat); // Ajout autres options !!!

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
for (let i=0; i < categories.length; i++) {
    const categorie = categories[i];
    
    const optionCat = document.createElement("option");
    optionCat.value = categorie.name;
    //optionCat.selected = "selected";
    optionCat.innerText = categorie.name;
    selectCat.appendChild(optionCat);
    listeCat.appendChild(selectCat);
}

//Affichage dynamique de la liste des Travaux de Architecte
function afficherTravaux(projets, galerie, garbage) {
    //const galery = document.querySelector(".gallery");
    const galery = document.querySelector(`${galerie}`);
    galery.innerHTML = ``;
    if (!garbage) {
        //ajout icone poubelle sur image
    }
    for (let i=0; i < projets.length; i++) {
        const projet = projets[i];
        const figure = document.createElement("figure");
        const image  = document.createElement("img");
        const caption = document.createElement("figcaption");
        image.src=projet.imageUrl;
        image.alt=projet.title; 
        caption.innerText=projet.title;
        figure.appendChild(image);
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-trash-can');
        icon.addEventListener('click', () => {
            alert('Image supprimée !');
            figure.remove(); // Suppression du conteneur
        });
        figure.appendChild(icon);
        if (!garbage) {
            //ajout icone sur image
        }
        figure.appendChild(caption);

        galery.appendChild(figure);
    }
}
// Event listener sur categorie clicquee
listeCat.addEventListener("change", (e) => {
    filtreObjects(e.target.value);
    console.log(e.target.value);
    console.log(e.target.parentElement);
  });

// Filtre objets sur la categorie selectionnee
function filtreObjects(name) { // name de la categorie
    if (name === "All") {
        afficherTravaux(works, valGalerie, garbage);
    } else {
      const objetsFiltres =  works.filter(obj => obj.category.name === name);
      afficherTravaux(objetsFiltres, valGalerie, garbage);
    }
  }
/*     ************************************************************** --- */
/*     **************************** Modal *************************** --- */
/*     ************************************************************** --- */

console.log("execution de la fonction modale:1");
const modal = document.getElementById("boiteModal"); 
modal.addEventListener("click", (event) =>{

    console.log("execution de la fonction modale:2");
     
    let garbage = "modal"
    let valGalerie = ".galerie"
    let portfolio  = document.getElementById("portfolio");
    portfolio.style.background = "rgba(0, 0, 0, 0.6)"; 
    //portfolio.setAttribute("class", "portfolioRgba");
    let boitemodal = document.getElementById("portfolio");
    boitemodal.style.visibility = "visible"; 
    
    //afficherTravaux(works, valGalerie, garbage); 
    
    
});
