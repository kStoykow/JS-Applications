function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const messagesElem = document.getElementById('messages');
    const authorElem = document.querySelector('input[name=author]');
    const contentElem = document.querySelector('input[name=content]');
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', function sendMsgHandler(e) {
        const newMsg = {
            author: authorElem.value,
            content: contentElem.value,
        }
        if (authorElem.value != '' && contentElem.value != '') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newMsg)
            })
                .then(() => {
                    authorElem.value = '';
                    contentElem.value = '';
                });
        }
    });

    refreshBtn.addEventListener('click', function refreshHandler(e) {
        messagesElem.value = '';
        fetch(url)
            .then(res => res.json())
            .then(res => Object.values(res))
            .then(messages => messages.map(msg => messagesElem.value += `${msg.author}: ${msg.content}\n`));
    });
}

attachEvents();