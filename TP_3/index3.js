let db = [];

document.querySelector('button[type="submit"]').onclick = function (event) {
    event.preventDefault();

    const student_code = document.getElementById("student_code");
    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const semester = document.getElementById("semester");
    const mod_1 = document.getElementById("mod_1");
    const mod_2 = document.getElementById("mod_2");
    const mod_3 = document.getElementById("mod_3");
    const mod_4 = document.getElementById("mod_4");
    const mod_5 = document.getElementById("mod_5");
    const mod_6 = document.getElementById("mod_6");

    if (
        !student_code.value ||
        !name.value ||
        !surname.value ||
        !semester.value ||
        !mod_1.value ||
        !mod_2.value ||
        !mod_3.value ||
        !mod_4.value ||
        !mod_5.value ||
        !mod_6.value
    ) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const duplicate = db.find(
        (student) => student.student_code === student_code.value
    );
    if (duplicate) {
        alert("Un étudiant avec ce code existe déjà.");
        return;
    }

    const average = (
        (parseFloat(mod_1.value) +
            parseFloat(mod_2.value) +
            parseFloat(mod_3.value) +
            parseFloat(mod_4.value) +
            parseFloat(mod_5.value) +
            parseFloat(mod_6.value)) /
        6
    ).toFixed(2);

    const decision = average >= 10 ? "Admis" : "Ajourné";

    const student = {
        student_code: student_code.value,
        name: name.value,
        surname: surname.value,
        semester: semester.value,
        mod_1: mod_1.value,
        mod_2: mod_2.value,
        mod_3: mod_3.value,
        mod_4: mod_4.value,
        mod_5: mod_5.value,
        mod_6: mod_6.value,
        average: average,
        decision: decision,
    };

    db.push(student);

    const table = document.getElementById("table");
    const row = table.insertRow();
    row.insertCell(0).innerText = student.student_code;
    row.insertCell(1).innerText = student.name;
    row.insertCell(2).innerText = student.surname;
    row.insertCell(3).innerText = student.semester;
    row.insertCell(4).innerText = student.mod_1;
    row.insertCell(5).innerText = student.mod_2;
    row.insertCell(6).innerText = student.mod_3;
    row.insertCell(7).innerText = student.mod_4;
    row.insertCell(8).innerText = student.mod_5;
    row.insertCell(9).innerText = student.mod_6;
    row.insertCell(10).innerText = student.average;
    row.insertCell(11).innerText = student.decision;

    alert("Informations sur l'étudiant ajoutées avec succès.");
};
