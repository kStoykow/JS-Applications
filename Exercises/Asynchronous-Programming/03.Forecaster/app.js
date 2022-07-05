function attachEvents() {
    const cityNameElem = document.getElementById('location');
    const getBtn = document.getElementById('submit');
    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    const currentDivFirstChild = `<div class="label">Current conditions</div>`;
    const weatherMap = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;',
    }

    function factory(type, content, attribute) {
        const elem = document.createElement(type);
        if (typeof content == 'string') {
            elem.innerHTML = content;
        } else {
            elem.appendChild(content);
        }
        if (attribute !== undefined) {
            elem[attribute[0]] = attribute[1];
        }
        return elem;
    }

    const div = factory.bind(null, 'div');
    const span = factory.bind(null, 'span');

    function loadWeather() {
        return fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(res => res.json())
            .then(res => Object.values(res))
            .catch(e => console.log('Error'));
    }

    function currentWeatherRender(data) {
        const currCity = data.find(e => e.name == cityNameElem.value);
        return fetch(`http://localhost:3030/jsonstore/forecaster/today/${currCity.code}`)
            .then(res => res.json())
            .then(createCurrentWeather)
            .catch(e => { console.log('Error') });
    }

    function upcomingWeatherRender(data) {
        const currCity = data.find(e => e.name == cityNameElem.value);

        return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${currCity.code}`)
            .then(res => res.json())
            .then(createUpcomingWeather)
            .catch(e => { console.log('Error') });
    }

    function createCurrentWeather(city) {
        const parentElem = div('', ['className', 'forecasts']);
        const spanSymbol = span(`${weatherMap[city.forecast.condition]} `, ['className', 'condition symbol']);
        const spanParent = span('', ['className', 'condition']);
        const spanName = span(`${city.name}`, ['className', 'forecast-data']);
        const spanTemperature = span(`${city.forecast.low}${weatherMap.Degrees}/${city.forecast.high}${weatherMap.Degrees}`, ['className', 'forecast-data']);
        const spanCondition = span(`${city.forecast.condition}`, ['className', 'forecast-data']);
        spanParent.appendChild(spanName);
        spanParent.appendChild(spanTemperature);
        spanParent.appendChild(spanCondition);

        parentElem.appendChild(spanSymbol);
        parentElem.appendChild(spanParent);
        currentDiv.appendChild(parentElem);
    }

    function createUpcomingWeather(city) {
        const parentElem = createUpcomingDailyData(city);
        upcomingDiv.appendChild(parentElem);
    }

    function createUpcomingDailyData(city) {
        const divElem = div('', ['className', 'forecast-info']);

        for (let i = 0; i < city.forecast.length; i++) {
            const spanParent = span('', ['className', 'upcoming']);
            const spanSymbol = span(`${weatherMap[city.forecast[i].condition]} `, ['className', 'symbol']);
            const spanTemperature = span(`${city.forecast[i].low}${weatherMap.Degrees}/${city.forecast[i].high}${weatherMap.Degrees}`, ['className', 'forecast-data']);
            const spanCondition = span(`${city.forecast[i].condition}`, ['className', 'forecast-data']);

            spanParent.appendChild(spanSymbol);
            spanParent.appendChild(spanTemperature);
            spanParent.appendChild(spanCondition);

            divElem.appendChild(spanParent);
        }

        return divElem;
    }
    function renderWeather(city) {
        currentDiv.innerHTML = currentDivFirstChild;
        forecastDiv.style.display = 'block';
        currentWeatherRender(city);
        upcomingWeatherRender(city);
    }
    function currentTimeError() {
        const parentElem = div('', ['className', 'forecasts']);
        const errorDiv = div('Error');
        console.log(errorDiv);
        parentElem.appendChild(errorDiv);
        currentDiv.appendChild(parentElem);
    }

    getBtn.addEventListener('click', async () => {
        forecastDiv.style.display = 'block';
        loadWeather()
            .then(renderWeather)
            .catch(currentTimeError);
    });
}

attachEvents();