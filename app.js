document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');

    // Set the canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Variables to store the current and previous positions
    let drawing = false;
    let prevX = 0;
    let prevY = 0;

    // Set up touch events
    canvas.addEventListener('touchstart', (e) => {
        drawing = true;
        const touch = e.touches[0];
        prevX = touch.clientX;
        prevY = touch.clientY;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!drawing) return;
        e.preventDefault(); // Prevent scrolling while drawing
        const touch = e.touches[0];
        drawLine(prevX, prevY, touch.clientX, touch.clientY);
        prevX = touch.clientX;
        prevY = touch.clientY;
    });

    canvas.addEventListener('touchend', (e) => {
        drawing = false;
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
});
