const baseUrl = 'http://localhost:3030/jsonstore/collections/myboard';
const endpoints = {
    getAllPosts: `${baseUrl}/posts`,
    createPost: `${baseUrl}/posts`,
    getPost: (id) => `${baseUrl}/posts/${id}`,
    getComments: `${baseUrl}/comments`,
    createComment: `${baseUrl}/comments`,
}

export const createPost = (data) => fetch(endpoints.createPost, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
})
    .then(res => res.json());

export const getPosts = () => fetch(endpoints.getAllPosts)
    .then(res => res.json())
    .then(res => Object.values(res));

export const getPost = (id) => fetch(endpoints.getPost(id))
    .then(res => res.json())

export const comment = (data) => fetch(endpoints.createComment, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
})
    .then(res => res.json());

export const getComments = () => fetch(endpoints.getComments)
    .then(res => res.json())
    .then(res => Object.values(res))