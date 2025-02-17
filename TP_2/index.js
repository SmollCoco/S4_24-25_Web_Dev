// Exo 1
document.getElementById("calculer").onclick = function () {
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    const c = document.getElementById("c");
    c.innerHTML = `${a + b}`;
};

// Exo 2
document.getElementById("permuter").onclick = function () {
    let d = parseFloat(document.getElementById("d").value);
    let e = parseFloat(document.getElementById("e").value);
    document.getElementById("d").value = e;
    document.getElementById("e").value = d;
};

// Exo 3
document.getElementById("calculer_op").onclick = function () {
    let f = parseFloat(document.getElementById("f").value);
    let g = parseFloat(document.getElementById("g").value);
    let h = document.getElementById("h").value;
    console.log("f:", f, "g:", g, "h:", h);
    const i = document.getElementById("i");
    if (h) {
        if (h === "+") i.innerHTML = `${f + g}`;
        if (h === "-") i.innerHTML = `${f - g}`;
        if (h === "*") i.innerHTML = `${f * g}`;
        if (h === "/" && g !== 0) i.innerHTML = `${f / g}`;
    }
};

// Exo 4
document.getElementById("saisir_variables").onclick = function () {
    let x = prompt("Saisir la première variable numérique:");
    while (isNaN(x) || x === null || x.trim() === "") {
        x = prompt(
            "Veuillez saisir une valeur numérique pour la première variable:"
        );
    }
    x = parseFloat(x);

    let y = prompt("Saisir la deuxième variable numérique:");
    while (isNaN(y) || y === null || y.trim() === "") {
        y = prompt(
            "Veuillez saisir une valeur numérique pour la deuxième variable:"
        );
    }
    y = parseFloat(y);

    let z = prompt("Saisir la troisième variable numérique:");
    while (isNaN(z) || z === null || z.trim() === "") {
        z = prompt(
            "Veuillez saisir une valeur numérique pour la troisième variable:"
        );
    }
    z = parseFloat(z);

    const resultat = document.getElementById("resultat");
    if (x === y && y === z) {
        resultat.innerHTML = "Les trois variables sont identiques.";
    } else if (x === y || y === z || x === z) {
        resultat.innerHTML = "Deux des variables sont de valeurs égales.";
    } else {
        resultat.innerHTML = "Les trois variables sont différentes.";
    }
};

// Exo 5
document.getElementById("calculer_tva").onclick = function () {
    let ht = prompt("Entrez un prix HT:");
    while (isNaN(ht) || ht === null || ht.trim() === "" || parseFloat(ht) < 0) {
        ht = prompt("Veuillez entrer un prix HT valide (un nombre positif):");
    }
    ht = parseFloat(ht);

    let tva = prompt("Entrez un taux de TVA (en pourcentage):");
    while (isNaN(tva) || tva === null || tva.trim() === "" || parseFloat(tva) < 0) {
        tva = prompt("Veuillez entrer un taux de TVA valide (un nombre positif):");
    }
    tva = parseFloat(tva);

    document.body.innerText = `Prix TTC: ${ht * (1.0 + tva / 100.0)}`;
};
