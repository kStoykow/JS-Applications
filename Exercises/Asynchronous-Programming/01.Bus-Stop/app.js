function getInfo() {
    const inputElem = document.getElementById('stopId');
    const nameElem = document.getElementById('stopName');
    const ulElem = document.getElementById('buses');

    ulElem.innerHTML = '';

    function renderBuses(buses) {
        nameElem.textContent = buses.name;
        Object.entries(buses.buses).map(e => {
            let li = document.createElement('li');
            li.textContent = `Bus ${e[0]} arrives in ${e[1]} minutes`;
            ulElem.appendChild(li);
        });
    }

    if (inputElem.value != '') {
        fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputElem.value}`)
            .then(res => {
                if (res.ok == true) {
                    return res.json();
                }
                return new Error('Error');
            })
            .then(res => renderBuses(res))
            .catch(err => { nameElem.textContent = 'Error' });
    }
}