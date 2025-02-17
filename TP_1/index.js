// Exo 1
const text = document.getElementById("filler");
let input = prompt();
text.textContent = input;

// Exo 2
let a = 7;
let b = 9;
let result = a + b;
alert(result);

// Exo 3
let budget = 69;
let achats = 420;
if (budget >= achats) {
    alert("Vous pouvez affectuer vos achats");
} else {
    alert("Vous ne pouvez pas affectuer vos achats");
}

// Exo 4
let ht = prompt("Entrez un prix HT");
// document.body.innerText = `Prix TTC: ${ht * 1.2}`;

// Exo 5
ht = prompt("Entrez un prix HT");
let tva = prompt("Entrer un taux de la TVA (en pourcentage)");
if (tva < 0) {
    // alert("Taux de TVA entrée invalide");
} else {
    // document.body.innerText = `Prix TTC: ${ht * (1.0 + tva / 100.0)}`;
}

// Exo 6
ht = prompt("Entrez un prix HT");
tva = prompt("Entrer un taux de la TVA (en pourcentage)");
if (tva < 0) {
    // alert("Taux de TVA entrée invalide");
} else if (tva > 100) {
    // document.body.innerHTML = `<p style="color: red;">Prix TTC: ${
    //     ht * (1.0 + tva / 100.0)
    // }</p>`;
} else {
    // document.body.innerHTML = `<p style="color: green;">Prix TTC: ${
    //     ht * (1.0 + tva / 100.0)
    // }</p>`;
}

// Exo 7
const cocktailElement = document.getElementById("cocktail");
cocktailElement.innerHTML = `Long Island Iced Tea`;

// Exos 8 et 9
let rows, cols;
rows = prompt("Enter the number of rows");
columns = prompt("Enter the number of columns");
const newTable = document.getElementById("table");
let tableHTML = "";
for (let i = 0; i < rows; ++i) {
    tableHTML += "<tr>";
    for (let j = 0; j < columns; ++j) {
        tableHTML += `<td>Row ${i + 1} Col ${j + 1}</td>`;
    }
    tableHTML += "</tr>";
}
newTable.innerHTML = tableHTML;

// Exo 10
const list = document.getElementById("ul");
let listHTML = ``;
let t = 10;
while (t--) {
    listHTML += `<li>${Math.floor(Math.random() * 100)}</li>`;
}
list.innerHTML = listHTML;

// Exo 11
const button = document.getElementById("button");
button.onclick = function () {
    document.body.style.backgroundColor = `rgb(${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )})`;
};

// Exo 12
const images = document.getElementById("images");
let imagesHTML = ``;
t = 12;
while (t--) {
    imagesHTML += `<img src="https://picsum.photos/200?random=${Math.random()}">`;
}
images.innerHTML = imagesHTML;
