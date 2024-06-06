document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const mapDiv = document.getElementById('map');

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

    function plotRouteOnMap(points) {
        // Hide canvas and show map
        canvas.style.display = 'none';
        mapDiv.style.display = 'block';

        // Initialize map
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Placeholder for conversion logic: Convert canvas points to LatLng
        const mapBounds = map.getBounds();
        const mapWidth = mapDiv.offsetWidth;
        const mapHeight = mapDiv.offsetHeight;

        const mapPoints = points.map(point => {
            const lat = mapBounds.getSouth() + (point.y / mapHeight) * (mapBounds.getNorth() - mapBounds.getSouth());
            const lng = mapBounds.getWest() + (point.x / mapWidth) * (mapBounds.getEast() - mapBounds.getWest());
            return [lat, lng];
        });

        // Draw route on map
        L.polyline(mapPoints, { color: 'red' }).addTo(map);
    }
});
