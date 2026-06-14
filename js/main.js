document.addEventListener('DOMContentLoaded', function () { // fonction qui attend le rechargement de la page
    // ===== THEME =====
    //la selection de la page (genre le body, contenu de la page)
    const body = document.body;
    // la selection du bouton dark-light
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) { //verifie le bouton 
        let savedTheme = localStorage.getItem("theme") || "light";//on recupère le theme sauvegardé
        body.className = savedTheme;
        toggleBtn.textContent = savedTheme === "dark" ? "⭐" : "🌙";
        toggleBtn.addEventListener("click", () => { // quand on clique sur le bouton
            if (body.classList.contains("dark")) {
                body.classList.replace("dark", "light");
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌙";
            } else {
                body.classList.replace("light", "dark");
                localStorage.setItem("theme", "dark"); 
                toggleBtn.textContent = "⭐";
            }
        });
    }
    // ===== NAVBAR SCROLL =====
    const navbar = document.querySelector(".navbar");
    if (navbar) { //dectecte la position du navbar
        window.addEventListener("scroll", () => {  //quand on commence à scroller la page
            navbar.classList.toggle("scrolled", window.scrollY > 40);//gere le style au moment du scroll et dans le cas contraire(quand on scroll de 40px)
        });
    }

    // ===== BOUTON RETOUR EN HAUT =====
    const btn = document.getElementById("btnTop");
    if (btn) { // detecte le bouton (sa position)
        window.addEventListener("scroll", () => { // quand on scroll la page
            btn.style.display = window.scrollY > 50 ? "block" : "none";
        });
        btn.addEventListener("click", () => { // quand on clique sur le bouton
            window.scrollTo({ top: 0, behavior: 'smooth' }); // ca ramene en haut avec animation
        });
    }

    // ===== COUNTER =====
    //la selection des elements(chiffres à compter)
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) { //verifie s'il ya au moins un compteur(carte)
        const observer = new IntersectionObserver((entries) => { // création d'un observateur qui surveille les éléments
            entries.forEach(entry => { // on parcourt les éléments à observer
                if (entry.isIntersecting) {
                    const el = entry.target; // l'élément html à observer
                    const target = +el.dataset.target; //it la valeur de l'attribut data-target
                    let count = 0;
                    const update = () => { //une fonction qui met à jour le nombre affiché 
                        count += target / 200;// la vitesse du compteur
                        if (count < target) {
                            el.textContent = Math.floor(count);
                            requestAnimationFrame(update);//Demande au navigateur d'exécuter update() à la prochaine image (environ 60 fois par seconde)AF
                        } else {
                            el.textContent = target; 
                        }
                    };
                    update(); //Lance l'animation du compteur.
                    observer.unobserve(el); //on arrete d'observer les éléments pour que le compteur ne recommence op
                }
            });
        }, { threshold: 1 }); //quand tout l'élément visible à l'écran(100%)
        counters.forEach(c => observer.observe(c)); //On demande à l'observateur de surveiller chaque élément .counter.
    }

    // ===== FADE IN =====
    const sections = document.querySelectorAll(".fade");
    if (sections.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("show");
            });
        }, { threshold: 0.2 }); //quand 20% de l'element apparait à l'écran
        sections.forEach(s => fadeObserver.observe(s)); 
    }

     // ===== FILTRE FREELANCES ===== //
     //selection des elements (categories et cartes)
    const filtreButtons = document.querySelectorAll(".filtre");
    const cards = document.querySelectorAll(".freelancer-card");
    if (filtreButtons.length > 0) { //verifie s'il y'a au moins un bouton de filtrage
        filtreButtons.forEach(button => { //on parcout les boutons de filtrage one by one 
            button.addEventListener('click', function () { //quand on clique sur un bouton
                const filtre = button.dataset.category; // on recupre la valeur de ce bouton(genre la categorie attrubuer data-target)
                cards.forEach(card => { // on parcourt alors les cartes one by one
                    const col = card.closest(".col-md-4"); //on remonte alors jusqu'au parent col-md-4 en cherchant la colonne qui a la categorie selectionné
                    if (filtre === 'tous') {
                        col.classList.remove("hidden"); // on affiche toutes les cartes
                    } else {
                        col.classList.toggle("hidden", card.dataset.category !== filtre);// on affiche les cartes ayant la categorie selectionné
                    }
                });
            });
        });
    }
});
    // ===== FORMULAIRE =====
    const Form = document.getElementById("contactForm");
    if (Form) {
        const nom = document.getElementById("name");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        const telephone = document.getElementById("telephone");
        // les messages d'erreurs
        const errorNom = document.getElementById("nameError");
        const errorPrenom = document.getElementById("prenomError");
        const errorEmail = document.getElementById("emailError");
        const errorTelephone = document.getElementById("telephoneError");
        const errorMessage = document.getElementById("messageError");
        const succes = document.getElementById("succes");
        const input = document.querySelector('input');
        //fonction e qui controle 
        Form.addEventListener("submit", function (e){
            e.preventDefault(); //empeche l'envoie
            errorNom.textContent = "";
            errorEmail.textContent = "";
            errorMessage.textContent = "";
            errorPrenom.textContent = "";
            errorTelephone.textContent = ""; 
            succes.textContent = "";

            let isValide = true;
            if (nom.value.trim() == "") { //recupère la valeur saisie sans espace entre eux
                errorNom.textContent = "Le nom est obligatoire"; 
                isValide = false; 
                errorNom.style.color = 'red'; 
            }
             if (prenom.value.trim() == "") { 
                errorPrenom.textContent = "Le prenom est obligatoire"; 
                isValide = false; 
                errorPrenom.style.color = 'red'; 
            }
            if (email.value.trim() == "") { 
                errorEmail.textContent = "L'email est obligatoire"; 
                isValide = false; 
                errorEmail.style.color = 'red';
                errorEmail.style.borderColor = 'red';
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                 errorEmail.textContent = "Email invalide";
                  isValide = false;
                  errorEmail.style.color = 'red';
                }
            if (message.value.trim().length < 20) { 
                errorMessage.textContent = " le message doit contenir au minimum 20 caractères";
                 isValide = false;
                 errorMessage.style.color = 'red';
                 }
            if (telephone.value.trim() == "") { 
                errorTelephone.textContent = "Le champ est obligatoire"; 
                isValide = false;
            errorTelephone.style.color = 'red';
         }
            if (isValide) { 
                succes.textContent = "Envoyé avec succès !";
                succes.style.color = 'green'; 
                 Form.reset(); // permet de recharger la page genre vider le formulaire
                }
        });
    }
    