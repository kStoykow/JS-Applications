const url = 'http://localhost:3030/jsonstore/collections/students';

const inputs = document.querySelectorAll('.inputs input');
const resultsElem = document.querySelector('#results tbody');
const submitBtn = document.getElementById('submit');

const getStudents = () =>
    fetch(url)
        .then(res => res.json())
        .then(res => Object.values(res));

const addStudents = (data) =>
    fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => Object.values(res));

const appendStudents = (students) => {
    resultsElem.innerHTML = '';

    students.map(e => {
        const tr = document.createElement('tr');
        const fnameTd = document.createElement('td');
        const lnameTd = document.createElement('td');
        const numberTd = document.createElement('td');
        const gradeTd = document.createElement('td');

        fnameTd.textContent = e.firstName;
        lnameTd.textContent = e.lastName;
        numberTd.textContent = e.facultyNumber;
        gradeTd.textContent = e.grade;

        tr.appendChild(fnameTd);
        tr.appendChild(lnameTd);
        tr.appendChild(numberTd);
        tr.appendChild(gradeTd);

        resultsElem.appendChild(tr);
    });
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValues = Array.from(inputs).map(e => e.value);
    const [fname, lname, facultyNumber, grade] = inputValues;
    if (inputValues.every(e => e != '')) {
        addStudents({ firstName: fname, lastName: lname, facultyNumber, grade: Number(grade) })
            .then(() => Array.from(inputs).map(e => e.value = ''));
    }
    getStudents()
        .then(appendStudents);
})