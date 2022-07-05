function lockedProfile() {
    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(res => res.json())
        .then(res => Object.values(res))
        .then(createCards)
        .catch(e => console.log(e));
}

function factory(type, content, attribute) {
    const elem = document.createElement(type);

    if (typeof content == 'string') {
        if (type == 'img') {
            elem.src = content;
        } else {
            elem.textContent = content;
        }
    } else {
        if (Array.isArray(content)) {
            content.forEach(e => elem.appendChild(e));
        } else {
            elem.appendChild(content);
        }
    }
    if (attribute !== undefined) {
        attribute.forEach(([k, v]) => elem[k] = v);
    }

    return elem;
}

const createDiv = factory.bind(null, 'div');
const createImg = factory.bind(null, 'img');
const createInput = factory.bind(null, 'input');
const createButton = factory.bind(null, 'button');
const createLabel = factory.bind(null, 'label');
const createHr = factory.bind(null, 'hr');
const createBr = factory.bind(null, 'br');

function createPublicProfileInfo(person, i) {
    return [createImg('./iconProfile2.png', [['className', 'userIcon']]),
    createLabel('Lock'),
    createInput('', [['type', 'radio'], ['name', `user${i + 1}Locked`], ['value', 'lock'], ['checked', 'true']]),
    createLabel('Unlock'),
    createInput('', [['type', 'radio'], ['name', `user${i + 1}Locked`], ['value', 'unlock']]),
    createBr(''),
    createHr(''),
    createLabel('Username'),
    createInput('', [['type', 'text'], ['name', `user${i + 1}Username`], ['value', `${person.username}`], ['disabled', 'true'], ['readonly', 'true']]),
    ];
}

function createHiddenProfileInfo(person, i) {
    return createDiv([
        createHr(''),
        createLabel('Email:'),
        createInput('', [['type', 'email'], ['name', `user${i + 1}Email`], ['value', `${person.email}`], ['disabled', 'true'], ['readonly', 'true']]),
        createLabel('Age:'),
        createInput('', [['type', 'email'], ['name', `user${i + 1}Age`], ['value', `${person.age}`], ['disabled', 'true'], ['readonly', 'true']]),
    ], [['id', `user${i + 1}HiddenFields`], ['className', 'hiddenInfo']]);
}

function createContainerElem(person, i, btn) {
    return [...createPublicProfileInfo(person, i),
    createHiddenProfileInfo(person, i),
        btn];
}

function toggleInfo(e) {
    const allProfiles = Array.from(document.querySelectorAll('.profile'));
    const currProfileIndex = allProfiles.indexOf(e.target.parentElement);
    const hiddenElem = e.target.parentElement.querySelector(`#user${currProfileIndex + 1}HiddenFields`);
    const radios = e.target.parentElement.querySelectorAll('input[type="radio"]');

    if ([...radios].filter(e => e.checked)[0].value == 'unlock') {
        hiddenElem.classList.toggle('hiddenInfo');
        e.target.textContent == 'Show More' ? e.target.textContent = 'Hide it' : e.target.textContent = 'Show More';
    }
}

function createCards(data) {
    document.querySelector('main').removeChild(document.querySelector('main').firstElementChild);
    data.map((person, i) => {
        const btn = createButton('Show More');
        btn.addEventListener('click', toggleInfo);

        const container = createDiv(createContainerElem(person, i, btn), [['className', 'profile']]);
        document.querySelector('main').appendChild(container);
    });
}