function attachEvents() {
    function DOMElementFactory(type, content, attribute) {
        const elem = document.createElement(type);
        if (typeof content == 'string') {
            if (type == 'img') {
                elem.src = content;
            } else {
                elem.textContent = content;
            }
        } else {
            if (Array.isArray(content)) {
                content.forEach(e => {
                    if (typeof e == 'string') {
                        elem.textContent = e;
                    } else {
                        elem.appendChild(e)
                    }
                });
            } else {
                elem.appendChild(content);
            }
        }
        if (attribute !== undefined) {
            attribute.forEach(([k, v]) => {
                if (k.includes('on')) {
                    const event = k.split('on')[1].toLocaleLowerCase();
                    elem.addEventListener(event, v);
                } else {
                    elem[k] = v
                }
            });
        }

        return elem;
    }

    const createLi = DOMElementFactory.bind(null, 'li');
    const createBtn = DOMElementFactory.bind(null, 'button');

    const phonebookUlElem = document.getElementById('phonebook');
    const personElem = document.getElementById('person');
    const phoneElem = document.getElementById('phone');
    const loadBtn = document.getElementById('btnLoad');
    const createContactBtn = document.getElementById('btnCreate');

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const endPoints = {
        delete: (key) => `${baseUrl}/${key}`,
    }
    function onDelete(key, e) {
        fetch(endPoints.delete(key), {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        });
    }

    loadBtn.addEventListener('click', function loadContactsHandler(e) {
        const parsedContact = (e) => createLi([`${e.person}: ${e.phone}`, createBtn('Delete', [['onClick', onDelete.bind(undefined, e._id)]])]);
        const appendContact = (e) => phonebookUlElem.appendChild(parsedContact(e))
        const createContacts = (contacts) => contacts.map(appendContact);


        fetch(baseUrl)
            .then(res => res.json())
            .then(res => Object.values(res))
            .then(contacts => {
                phonebookUlElem.innerHTML = '';
                createContacts(contacts);
            });
    });

    createContactBtn.addEventListener('click', function onCreate(e) {
        const data = {
            person: personElem.value,
            phone: phoneElem.value
        }

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    });
}

attachEvents();