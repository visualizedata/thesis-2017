$(document).ready(function(){
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFpbnNhbWJoYXYiLCJhIjoiY2l1aW5uOTZ5MDAwOTJvcGxrMWg4OHUxciJ9.X8mAbHJEKa78PHXfVRK5-Q';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/jainsambhav/cj1pghgd300122sp73j3cxiej', //hosted style id
    center: [-87.630000, 41.801832], // starting position
    zoom: 11, // starting zoom
    pitch: 30, // pitch in degrees
    bearing: 60
});

map.scrollZoom.disable();
// map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {

    map.addLayer({
        'id': 'chicago',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': chicagoBaseMap
        },
        'layout': {},
        'paint': {
            'fill-color': 'gray',
            'fill-opacity': 0.2,
            'fill-outline-color': 'black'
        }
    });
    
    map.addLayer({
        "id": "neighborhood-fills-hover",
        "type": "line",
        'source': {
            'type': 'geojson',
            'data': chicagoBaseMap
        },
        "layout": {},
        "paint": {
            "line-color": "#e82c51",
            "line-width": 1
        }
    });
    
    map.addLayer({
        'id': 'parks_mobility',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': parks_display
        },
        'layout': {},
        'paint': {
            'fill-color': 'gray',
            'fill-opacity': 0.6
        }
    });
    
// add schools to map2
    map.addLayer({
        'id': 'schools_mobility',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': schools_display
        },
        'layout': {},
        'paint': {
            'fill-color': 'gray',
            'fill-opacity': 0.6
        }
    });
    
    
    // map.addLayer({
    //     "id": "neighborhood-fills-hover",
    //     "type": "fill",
    //     'source': {
    //         'type': 'geojson',
    //         'data': chicagoBaseMap
    //     },
    //     "layout": {},
    //     "paint": {
    //         "fill-color": "gray",
    //         "fill-opacity": 0.6,
    //         'fill-outline-color': 'black'
    //     },
    //     "filter": ["==", "PRI_NEIGH", ""]
    // });
    
    // map.on("click", "chicago", function(e) {
    //     map.setFilter("neighborhood-fills-hover", ["==", "PRI_NEIGH", e.features[0].properties.PRI_NEIGH]);
    // });
    
    //  map.on("mouseleave", "chicago", function() {
    //     map.setFilter("neighborhood-fills-hover", ["==", "PRI_NEIGH", ""]);
    // });
});

});