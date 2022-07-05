function solve() {
    const infoElem = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let id = 'depot';

    function departHandler(res) {
        infoElem.textContent = `Next stop ${res.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }
    function arriveHandler(res) {
        infoElem.textContent = `Arriving at ${res.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        id = res.next;
    }

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return 'Error';
            })
            .then(departHandler)
            .catch(e => {
                infoElem.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return 'Error';
            })
            .then(arriveHandler)
            .catch(e => {
                infoElem.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();