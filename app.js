document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'nt-4zpOTz80hBGZmee2Tb1tD4D8F_yJe58PbK-s3Tzg';
    const url = `https://api.mapy.cz/v1/maptiles/basic/256/10/10/10?apikey=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Connected successfully to Mapy API :)');
        })
        .catch(error => {
            console.error('Error connecting to Mapy API:', error);
        });
});

/*
We create the map and set its initial coordinates and zoom.
See https://leafletjs.com/reference.html#map
*/
const map = L.map('map').setView([57.0000000, 9.8981184], 16);

/*
We store all our tile layers in an object, because we will
need to pass that to the layers switching map control.
*/
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

/*
Then we add the first raster tile layer to the map.
See https://leafletjs.com/reference.html#tilelayer
*/
tileLayers['Outdoor'].addTo(map);

// Leaflet has a built-in map control for switching layers.
L.control.layers(tileLayers).addTo(map);

/*
We also require you to include our logo somewhere over the map.
We create our own map control implementing a documented interface,
that shows a clickable logo.
See https://leafletjs.com/reference.html#control
*/
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

// finally we add our LogoControl to the map
new LogoControl().addTo(map);
