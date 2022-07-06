const baseUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';

export const createPost = (data) => fetch(baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
})
    .then(res => res.json());

export const getPosts = () => fetch(baseUrl)
    .then(res => res.json())
    .then(res => Object.values(res));