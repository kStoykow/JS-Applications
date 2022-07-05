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
    const createOption = DOMElementFactory.bind(null, 'option');
    const createLi = DOMElementFactory.bind(null, 'li');

    const select = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postInfoElem = document.getElementById('post-body');
    const postCommentsElem = document.getElementById('post-comments');


    function getPosts() {
        return fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .then(res => Object.values(res))
            .catch(e => console.log(e));
    }

    function getComments() {
        return fetch(`http://localhost:3030/jsonstore/blog/comments`)
            .then(res => res.json())
            .then(res => Object.values(res))
            .catch(e => console.log(e));
    }

    function renderPosts() {
        getPosts()
            .then(createOptions)
            .catch(e => console.log(e));
    }

    function createOptions(data) {
        document.getElementById('posts').innerHTML = '';
        data.forEach((post) => {
            select.appendChild(createOption(`${post.title}`, [['value', `${post.id}`]]));
        });
    }

    async function renderCommnets() {
        const { body, id, title } = await getPosts()
            .then(res => res.filter(e => e.id == select.value)[0])

        getComments()
            .then(res => res.filter(e => e.postId == select.value))
            .then(comments => {
                postCommentsElem.innerHTML = '';
                postTitle.textContent = title;
                postInfoElem.textContent = body;
                comments.forEach(comment => postCommentsElem.appendChild(createLi(`${comment.text}`, [['id', `${comment.id}`]])))
            })
            .catch(e => console.log(e));
    }

    const getPostsBtn = document.getElementById('btnLoadPosts');
    const viewCommentsBtn = document.getElementById('btnViewPost');

    getPostsBtn.addEventListener('click', renderPosts);
    viewCommentsBtn.addEventListener('click', renderCommnets);
}

attachEvents();