document.querySelector('button[type="submit"]').onclick = function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
        .getElementById("confirm_password")
        .value.trim();
    const phone = document.getElementById("phone").value.trim();
    const language = document.getElementById("language").value;
    const comment = document.getElementById("comment").value.trim();

    if (
        !name ||
        !surname ||
        !email ||
        !password ||
        !confirmPassword ||
        !phone ||
        !language ||
        !comment
    ) {
        alert("Tous les champs sont obligatoires.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    alert("Formulaire soumis avec succès !");
    const recap_div = document.getElementById("recap");
    let recap_div_html = "";
    recap_div_html += `<ul>`;
    recap_div_html += `<li>Nom: ${name}</li>`;
    recap_div_html += `<li>Prénom: ${surname}</li>`;
    recap_div_html += `<li>E-mail: ${email}</li>`;
    recap_div_html += `<li>Mot de passe: ${password}</li>`;
    recap_div_html += `<li>Téléphone: ${phone}</li>`;
    recap_div_html += `<li>Langue: ${language}</li>`;
    recap_div_html += `<li>Commentaire: ${comment}</li>`;
    recap_div_html += `</ul>`;
    recap_div.innerHTML = recap_div_html;
};

document.querySelector('button[type="reset"]').onclick = function () {
    document.querySelector("form").reset();
    alert("Le formulaire a été réinitialisé.");
};
