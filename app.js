document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const mapDiv = document.getElementById('map');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const reloadButton = document.getElementById('reloadButton');
    let map, userLat, userLng;

    // Hide canvas and map initially
    canvas.style.display = 'none';
    mapDiv.style.display = 'none';

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            initializeMap(userLat, userLng);
            preloadMapTiles(userLat, userLng);
        }, error => {
            console.error("Error getting location: " + error.message);
            showError("Error getting your location. Please try again or reload the page.");
        });
    } else {
        showError("Geolocation is not supported by this browser.");
    }

    function initializeMap(lat, lng) {
        map = L.map('map').setView([lat, lng], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('load', () => {
            loadingSpinner.style.display = 'none';
            mapDiv.style.display = 'block';
            canvas.style.display = 'block';
        });

        map.whenReady(() => {
            if (!map.hasLayer(L.tileLayer)) {
                showError("Failed to load the map. Please try reloading the page.");
            }
        });
    }

    function preloadMapTiles(lat, lng) {
        // Example of preloading tiles (optional)
        const zoomLevels = [12, 13, 14]; // Adjust as needed
        zoomLevels.forEach(zoom => {
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            const bounds = map.getBounds();
            for (let lat = bounds.getSouth(); lat <= bounds.getNorth(); lat += 0.1) {
                for (let lng = bounds.getWest(); lng <= bounds.getEast(); lng += 0.1) {
                    tileLayer.getTileUrl(L.point(lat, lng, zoom));
                }
            }
        });
    }

    function showError(message) {
        loadingSpinner.style.display = 'none';
        reloadButton.style.display = 'block';
        alert(message); // Optionally, you can replace alert with a more user-friendly error display
    }

    reloadButton.addEventListener('click', () => {
        location.reload();
    });

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
