function solution() {
    function getArticles() {
        return fetch('http://localhost:3030/jsonstore/advanced/articles/list')
            .then(res => res.json())
            .then(res => Object.values(res))
            .catch(e => console.log(e));
    }

    function getArticleDetails(id) {
        return fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
            .then(res => res.json())
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
    const createSpan = factory.bind(null, 'span');
    const createBtn = factory.bind(null, 'button');
    const createP = factory.bind(null, 'p');

    function toggleInfo(e) {
        const hiddenInfo = e.target.parentElement.parentElement.querySelector('.extra');
        const btn = e.target;
        hiddenInfo.style.display === 'block' ? hiddenInfo.style.display = 'none' : hiddenInfo.style.display = 'block';
        btn.textContent == 'More' ? btn.textContent = 'Less' : btn.textContent = 'More';
    }

    function createHeadElem(article) {
        const btn = createBtn('More', [['className', 'button'], ['id', `${article._id}`]]);
        btn.addEventListener('click', toggleInfo);
        return createDiv([
            createSpan(`${article.title}`),
            btn,
        ], [['className', 'head']])
    }

    function createContainer(article) {
        return createDiv([
            createHeadElem(article),
            createDiv([createP(`${article.content}`)], [['className', 'extra']]),
        ], [['className', 'accordion']])
    }

    function createArticle(article) {
        const elem = createContainer(article);
        document.querySelector('#main').appendChild(elem);
    }

    function renderArticles(data) {
        data.map(e => {
            getArticleDetails(e._id)
                .then(createArticle)
                .catch(e => console.log(e));
        })
    }

    getArticles()
        .then(renderArticles)
        .catch(e => console.log(e));
}

document.addEventListener('DOMContentLoaded', solution);