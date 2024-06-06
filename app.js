document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const mapDiv = document.getElementById('map');
    let map, userLat, userLng;

    // Set the canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Variables to store the current and previous positions
    let drawing = false;
    let prevX = 0;
    let prevY = 0;
    let points = [];

    // Set up touch events
    canvas.addEventListener('touchstart', (e) => {
        drawing = true;
        const touch = e.touches[0];
        prevX = touch.clientX;
        prevY = touch.clientY;
        points.push({ x: prevX, y: prevY });
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!drawing) return;
        e.preventDefault(); // Prevent scrolling while drawing
        const touch = e.touches[0];
        drawLine(prevX, prevY, touch.clientX, touch.clientY);
        prevX = touch.clientX;
        prevY = touch.clientY;
        points.push({ x: prevX, y: prevY });
    });

    canvas.addEventListener('touchend', (e) => {
        drawing = false;
        console.log(points); // Log points for debugging
        plotRouteOnMap(points);
    });

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    }

    function initializeMap(lat, lng) {
        map = L.map('map').setView([lat, lng], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    function plotRouteOnMap(points) {
        // Hide canvas and show map
        canvas.style.display = 'none';
        mapDiv.style.display = 'block';

        // Initialize map if not already initialized
        if (!map) {
            initializeMap(userLat, userLng);
        }

        // Convert canvas coordinates to geographic coordinates
        const bounds = map.getBounds();
        const mapWidth = canvas.width;
        const mapHeight = canvas.height;
        const centerLatLng = map.getCenter();

        const latLngPoints = points.map(point => {
            const lat = centerLatLng.lat + (point.y - mapHeight / 2) * (bounds.getNorth() - bounds.getSouth()) / mapHeight;
            const lng = centerLatLng.lng + (point.x - mapWidth / 2) * (bounds.getEast() - bounds.getWest()) / mapWidth;
            return [lat, lng];
        });

        // Draw route on map
        L.polyline(latLngPoints, { color: 'red' }).addTo(map);
    }

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            initializeMap(userLat, userLng);
        }, error => {
            console.error("Error getting location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
