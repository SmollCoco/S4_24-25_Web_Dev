const min = document.getElementById("min");
const max = document.getElementById("max");

document.querySelector('input[type="submit"]').onclick = function (event) {
    event.preventDefault();

    let n = parseInt(document.getElementById("n").value);
    const minValue = parseInt(min.value);
    const maxValue = parseInt(max.value);
    const table = document.getElementById("table");
    let table_html = "";

    if (isNaN(n) || isNaN(minValue) || isNaN(maxValue)) {
        alert("Veuillez entrer des valeurs valides pour tous les champs.");
        return;
    }

    if (minValue > maxValue) {
        alert(
            "La valeur minimale ne peut pas être supérieure à la valeur maximale."
        );
        return;
    }

    for (let i = 0; n; ++i) {
        table_html += `<tr>`;
        for (let j = 0; j < 10 && n; ++j) {
            table_html += `<td>${
                Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
            }</td>`;
            --n;
        }
        table_html += `</tr>`;
    }
    table.innerHTML = table_html;
};
