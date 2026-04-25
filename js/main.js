const body = document.body;
const toggleBtn = document.getElementById("themeToggle");
                             //Dark et light
        // charger le theme sauvegardé (localStorage)
let savedTheme = localStorage.getItem("theme") || "light";
        // si le theme sauvegardé(choisit):affichage selon le theme 
if(savedTheme){
    body.className = savedTheme;
    if (savedTheme === "dark"){
        toggleBtn.textContent = "⭐";
    }else{
        toggleBtn.textContent = "🌙";
    }
}
        //changer le theme
toggleBtn.addEventListener("click", () =>{
    if(body.classList.contains("dark")){
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙"
    }else{
         body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("theme", "dak");
        toggleBtn.textContent = "⭐"
    }
});
                             //navbar au scroll
const navbar = document.querySelector(".navbar");
 window.addEventListener("scroll", () =>{
    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
 });
                            //bouton retour en haut (apparition du bouton)
const  btn = document.getElementById("btnTop");
window.addEventListener("scroll", () =>{
if(window.scrollY > 50){
    btn.style.display = "block";
}else{
    btn.style.display = "none";
}
});
                                //Retour en haut
btn.addEventListener("click", () =>{
    window.scrollTo({top: 0, behavior:'smooth'});
});