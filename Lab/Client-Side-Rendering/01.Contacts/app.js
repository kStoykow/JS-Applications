import { contacts } from "./contacts.js";

const contactTemplate = (contact) => {
    const elem = document.createElement('div');
    elem.className = 'contact card';
    elem.innerHTML = `<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${contact.name}</h2>
    <button class="detailsBtn">Details</button>
    <div class="details" id="${contact.id}">
        <p>Phone number: ${contact.phoneNumber}</p>
        <p>Email: ${contact.email}</p>
    </div>
</div>`;

    return elem;
}

const renderContacts = (root, template) => {
    root.appendChild(template);
}

function onClick(e) {
    if (e.target.className == 'detailsBtn') {
        const info = e.target.parentElement.querySelector('.details');
        info.style.display == 'block' ? info.style.display = 'none' : info.style.display = 'block';
    }
}

const root = document.getElementById('contacts');
const elements = contacts.map(contactTemplate);

root.addEventListener('click', onClick);

elements.forEach(e => renderContacts(root, e));