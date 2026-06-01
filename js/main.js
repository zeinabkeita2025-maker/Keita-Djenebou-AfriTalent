document.addEventListener('DOMContentLoaded', function () {

    // ===== THEME =====
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
        let savedTheme = localStorage.getItem("theme") || "light";
        body.className = savedTheme;
        toggleBtn.textContent = savedTheme === "dark" ? "⭐" : "🌙";

        toggleBtn.addEventListener("click", () => {
            if (body.classList.contains("dark")) {
                body.classList.replace("dark", "light");
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌙";
            } else {
                body.classList.replace("light", "dark");
                localStorage.setItem("theme", "dark"); // ✅ tu avais "dak" avant
                toggleBtn.textContent = "⭐";
            }
        });
    }
    // ===== NAVBAR SCROLL =====
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // ===== BOUTON RETOUR EN HAUT =====
    const btn = document.getElementById("btnTop");
    if (btn) {
        window.addEventListener("scroll", () => {
            btn.style.display = window.scrollY > 50 ? "block" : "none";
        });
        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== COUNTER =====
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.dataset.target;
                    let count = 0;
                    const update = () => {
                        count += target / 200;
                        if (count < target) {
                            el.textContent = Math.floor(count);
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = target;
                        }
                    };
                    update();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 1 });
        counters.forEach(c => observer.observe(c));
    }

    // ===== FADE IN =====
    const sections = document.querySelectorAll(".fade");
    if (sections.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("show");
            });
        }, { threshold: 0.2 });
        sections.forEach(s => fadeObserver.observe(s));
    }
     // ===== FILTRE FREELANCES =====
    const filtreButtons = document.querySelectorAll(".filtre");
    const cards = document.querySelectorAll(".freelancer-card");
    if (filtreButtons.length > 0) {
        filtreButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filtre = button.dataset.category;
                cards.forEach(card => {
                    const col = card.closest(".col-md-4");
                    if (filtre === 'tous') {
                        col.classList.remove("hidden");
                    } else {
                        col.classList.toggle("hidden", card.dataset.category !== filtre);
                    }
                });
            });
        });
    }

});
    // ===== FORMULAIRE =====
    const Form = document.getElementById("contactForm");
    if (Form) {
        const email = document.getElementById("email");
        const nom = document.getElementById("name");
        const message = document.getElementById("message");
        const telephone = document.getElementById("telephone");
        const errorNom = document.getElementById("nameError");
        const errorPrenom = document.getElementById("prenomError");
        const errorEmail = document.getElementById("emailError");
        const errorTelephone = document.getElementById("telephoneError");
        const errorMessage = document.getElementById("messageError");
        const succes = document.getElementById("succes");

        Form.addEventListener("submit", function (e) {
            e.preventDefault();
            errorNom.textContent = errorEmail.textContent = errorMessage.textContent = "";
            errorPrenom.textContent = errorTelephone.textContent = succes.textContent = "";

            let isValide = true;
            if (nom.value.trim() === "") { errorNom.textContent = "Le champ est obligatoire"; isValide = false; }
            if (email.value.trim() === "") { errorEmail.textContent = "Le champ est obligatoire"; isValide = false; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { errorEmail.textContent = "Email invalide"; isValide = false; }
            if (message.value.trim().length < 20) { errorMessage.textContent = "Minimum 20 caractères"; isValide = false; }
            if (telephone.value.trim() === "") { errorTelephone.textContent = "Le champ est obligatoire"; isValide = false; }
            if (isValide) { succes.textContent = "Envoyé avec succès !"; Form.reset(); }
        });
    }

    // ===== BACKGROUND SLIDE =====
    const hero = document.getElementById("heros");
    if (hero) {
        const images = ["images/images70.jpg", "images/images80.jpg", "images/images100.jpg"];
        let index = 0;
        const changeBackground = () => {
            hero.style.backgroundImage = `url(${images[index]})`;
            index = (index + 1) % images.length;
        };
        changeBackground();
        setInterval(changeBackground, 3000);
    }

   