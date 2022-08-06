window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationTime = document.querySelector('.location-time');
    let weatherIcon = document.querySelector('.weatherIcon')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.weatherapi.com/v1/current.json?key=68275ea893cb48e3a63194959221607&q=${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp_c, condition} = data.current;
                const {tz_id, localtime} = data.location;
                const {icon} = data.current.condition;
                // Set DOM Elements
                temperatureDegree.textContent = temp_c;
                temperatureDescription.textContent = condition.text;
                locationTimezone.textContent = tz_id;
                locationTime.textContent = localtime;
                weatherIcon.src = icon;
            })
        }); 
    }
})