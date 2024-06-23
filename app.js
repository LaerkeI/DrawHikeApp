const API_KEY = 'nt-4zpOTz80hBGZmee2Tb1tD4D8F_yJe58PbK-s3Tzg';

// Check if the API key is available
if (typeof API_KEY === 'undefined') {
    console.error('API_KEY is not defined. Please make sure config.js is set up correctly.');
}

// Initialize the map and set its view to Aalborg's coordinates
const map = L.map('map').setView([57.0488, 9.9217], 13); // Aalborg coordinates

// Define tile layers
const tileLayers = {
    'Basic': L.tileLayer(`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
        minZoom: 0,
        maxZoom: 19,
        attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
    }),
    'Outdoor': L.tileLayer(`https://api.mapy.cz/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
        minZoom: 0,
        maxZoom: 19,
        attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
    }),
    'Winter': L.tileLayer(`https://api.mapy.cz/v1/maptiles/winter/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
        minZoom: 0,
        maxZoom: 19,
        attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
    }),
    'Aerial': L.tileLayer(`https://api.mapy.cz/v1/maptiles/aerial/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
        minZoom: 0,
        maxZoom: 19,
        attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
    }),
};

// Add the default tile layer to the map
tileLayers['Outdoor'].addTo(map);

// Add layer control to the map
L.control.layers(tileLayers).addTo(map);

// Custom logo control
const LogoControl = L.Control.extend({
    options: {
        position: 'bottomleft',
    },

    onAdd: function (map) {
        const container = L.DomUtil.create('div');
        const link = L.DomUtil.create('a', '', container);

        link.setAttribute('href', 'http://mapy.cz/');
        link.setAttribute('target', '_blank');
        link.innerHTML = '<img src="https://api.mapy.cz/img/api/logo.svg" />';
        L.DomEvent.disableClickPropagation(link);

        return container;
    },
});

// Add the custom logo control to the map
new LogoControl().addTo(map);
