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
            preloadMapTiles(userLat, userLng);
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

    function preloadMapTiles(lat, lng) {
        const zoomLevels = [10, 11, 12]; // Adjust as needed
        const tileSize = 256; // Standard tile size
        const mapBounds = map.getBounds();
        
        zoomLevels.forEach(zoom => {
            const tileBounds = mapBounds.pad(0.1 * zoom); // Expand bounds by 10% of zoom level
            const nw = tileBounds.getNorthWest();
            const se = tileBounds.getSouthEast();
            
            for (let x = Math.floor(nw.lng / tileSize); x <= Math.floor(se.lng / tileSize); x++) {
                for (let y = Math.floor(nw.lat / tileSize); y <= Math.floor(se.lat / tileSize); y++) {
                    const tileUrl = `https://{s}.tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
                    const img = new Image();
                    img.src = tileUrl;
                }
            }
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
