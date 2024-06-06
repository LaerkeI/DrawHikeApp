document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const mapDiv = document.getElementById('map');
    let map, userLat, userLng;

    // Hide canvas initially
    canvas.style.display = 'none';

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            initializeMap(userLat, userLng);
        }, error => {
            console.error("Error getting location: " + error.message);
            alert("Error getting your location. Please allow location access to use this app.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function initializeMap(lat, lng) {
        map = L.map('map').setView([lat, lng], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Show canvas and hide map after map is fully loaded
        map.on('load', () => {
            mapDiv.style.display = 'none';
            canvas.style.display = 'block';
        });
    }

    // Set up touch events
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const latlng = map.containerPointToLatLng(L.point(touch.clientX, touch.clientY));
        const lat = latlng.lat;
        const lng = latlng.lng;
        console.log("Latitude:", lat, "Longitude:", lng);
        // Here you can do whatever you want with the coordinates
    });
});
