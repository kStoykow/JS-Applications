const url = 'http://localhost:3030/jsonstore/collections/books';
const endpoints = {
    update: (id) => `${url}/${id}`,
    delete: (id) => `${url}/${id}`,
}

const tbody = document.getElementById('tbody');
const titleElem = document.getElementById('title');
const authorElem = document.getElementById('author');
const loadBtn = document.getElementById('loadBooks');
const submitBtn = document.getElementById('submit');
const formHeader = document.querySelector('form h3');
const saveBtn = document.createElement('button');
saveBtn.textContent = 'Save';

function getIdByTitle(title) {
    return fetch(url)
        .then(res => res.json())
        .then(res => Object.entries(res).find(e => e[1].title == title));
}

function onEdit(id, e) {
    e.preventDefault();

    const data = { author: authorElem.value, title: titleElem.value };

    fetch(endpoints.update(id), {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        document.querySelector('form').replaceChild(submitBtn, document.querySelector('form button'));
        titleElem.value = '';
        authorElem.value = '';
    }).then(() => getBooks())

}

const getBooks = () => fetch(url)
    .then(res => res.json())
    .then(res => Object.values(res))
    .then(updateList);

const addBook = (e) => {
    e.preventDefault();
    const data = { author: authorElem.value, title: titleElem.value };
    if (authorElem.value != '' && titleElem.value != '') {
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(getBooks)
            .then(() => {
                titleElem.value = '';
                authorElem.value = '';
            });
    }
}

const editBook = (e) => {
    const tr = e.target.parentElement.parentElement;
    const [title, author] = Array.from(tr.children);
    formHeader.textContent = 'Edit FORM';

    titleElem.value = title.textContent;
    authorElem.value = author.textContent;

    getIdByTitle(title.textContent)
        .then(([id]) => {
            saveBtn.addEventListener('click', onEdit.bind(null, id));

            document.querySelector('form').replaceChild(saveBtn, submitBtn);
        });


}

const deleteBook = (e) => {
    const tr = e.target.parentElement.parentElement;
    const title = Array.from(tr.children)[0];
    getIdByTitle(title.textContent)
        .then(([id]) => fetch(endpoints.delete(id), {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        }))
        .then(getBooks);
}

const updateList = (books) => {
    tbody.innerHTML = '';
    books.map(e => {
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click', editBook);
        deleteBtn.addEventListener('click', deleteBook);

        const tr = document.createElement('tr');
        const titleTd = document.createElement('td');
        const authorTd = document.createElement('td');
        const actionTd = document.createElement('td');

        titleTd.textContent = e.title;
        authorTd.textContent = e.author;
        actionTd.appendChild(editBtn);
        actionTd.appendChild(deleteBtn);

        tr.appendChild(titleTd);
        tr.appendChild(authorTd);
        tr.appendChild(actionTd);
        tbody.appendChild(tr);
    })
}

loadBtn.addEventListener('click', getBooks);
submitBtn.addEventListener('click', addBook);