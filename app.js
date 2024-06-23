document.addEventListener("DOMContentLoaded", function() {
    var center = SMap.Coords.fromWGS84(9.9217, 57.0488); // Aalborg coordinates
    var map = new SMap(JAK.gel("map"), center, 13); // Zoom level 13
    map.addDefaultLayer(SMap.DEF_BASE).enable(); // Add the default base layer

    // Add controls
    map.addDefaultControls();

    // Optionally, you can add markers or other features to the map
    var layer = new SMap.Layer.Marker();
    map.addLayer(layer);
    layer.enable();

    var marker = new SMap.Marker(center, "marker");
    layer.addMarker(marker);
});
