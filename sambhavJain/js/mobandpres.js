$(document).ready(function(){
    


mapboxgl.accessToken = 'pk.eyJ1IjoiamFpbnNhbWJoYXYiLCJhIjoiY2l1aW5uOTZ5MDAwOTJvcGxrMWg4OHUxciJ9.X8mAbHJEKa78PHXfVRK5-Q';


var map2 = new mapboxgl.Map({
    container: 'map2', // container id
    style: 'mapbox://styles/jainsambhav/cj1pghgd300122sp73j3cxiej', //hosted style id
    center: [-87.6, 41.750], // starting position
    zoom: 10, // starting zoom
    pitch: 85, // pitch in degrees
    bearing: 20
});

map2.scrollZoom.disable();
map2.addControl(new mapboxgl.NavigationControl());


// source location geocoder
var geocoder1 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    flyTo: false
});

var source = 0;
map2.addControl(geocoder1);


// destination location geocoder
var geocoder2 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    flyTo: false
});

var destination = 0;
map2.addControl(geocoder2);

var idCounter = 0;
var idCounter2 = 0;
var idCounter3 = 0;

// add parks to map2
map2.on('load', function() {
    
    map2.addLayer({
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
    map2.addLayer({
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

map2.setPaintProperty('chicago-employment-epsg', 'fill-opacity', 0)
map2.setPaintProperty('residential-raw', 'fill-opacity', 0)

// After the map style has loaded on the page, add a source layer and default
// styling for a single point.
    
    
    map2.addSource('single-point1', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });
    
    map2.addSource('single-point2', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });
    

    map2.addLayer({
        "id": "point1",
        "source": "single-point1",
        "type": "circle",
        "paint": {
            "circle-radius": 7,
            "circle-color": "#ff4f72"
        }
    });
    
    map2.addLayer({
        "id": "point2",
        "source": "single-point2",
        "type": "circle",
        "paint": {
            "circle-radius": 7,
            "circle-color": "#ff4f72"
        }
    });
   

    // Listen for the `geocoder.input` event that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder1.on('result', function(ev) {
        map2.getSource('single-point1').setData(ev.result.geometry);
            source = ev.result.geometry;
            if(destination == 0){
                map2.setCenter([source.coordinates[0], source.coordinates[1]]);
            }
            if(destination != 0){
            idCounter++;    
            drawLine();
            }
        
        // console.log(ev.result.geometry );
    });
    
    geocoder2.on('result', function(ev) {
        map2.getSource('single-point2').setData(ev.result.geometry);
            destination = ev.result.geometry;
            if(source != 0){
            idCounter++;    
            drawLine();
            }
        // console.log(ev.result.geometry );
    });
    
});

// Event listeners
var empShown = false;

$('#empLayerIcon').click(function() { 
    if(map2.getZoom() < 13){ empShown = false; }
    
    if(empShown == false){
    map2.setPaintProperty('chicago-employment-epsg', 'fill-opacity', 0.4)
    if(map2.getZoom() < 13){map2.setZoom(13);}
    empShown = !empShown;
    }
    else{
    map2.setPaintProperty('chicago-employment-epsg', 'fill-opacity', 0)
    if(map2.getZoom() < 13){map2.setZoom(13);}
    empShown = !empShown;
    }
});

var resShown = false;

$('#resLayerIcon').click(function() { 
    if(map2.getZoom() < 13){ resShown = false; }
    
    if(resShown == false){
    map2.setPaintProperty('residential-raw', 'fill-opacity', 1)
    if(map2.getZoom() < 13){map2.setZoom(13);}
    resShown = !resShown;
    }
    else{
    map2.setPaintProperty('residential-raw', 'fill-opacity', 0)
    if(map2.getZoom() < 13){map2.setZoom(13);}
    resShown = !resShown;
    }
});



$( "input" ).first().attr("placeholder", "Search Origin");
// $( "input" ).first().attr("color", "#2c2c2c");
$("input:eq( 1 )").attr("placeholder", "Search Destination");

$(".mapboxgl-ctrl-geocoder.mapboxgl-ctrl").first().attr('id',   "firstGeoCoder")
$(".mapboxgl-ctrl-geocoder.mapboxgl-ctrl:eq(1)").attr('id',   "secondGeoCoder")
$(".mapboxgl-ctrl-group ").attr('id', "zoomButtons")

function drawLine(){
    
    var lineData = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [source.coordinates[0], source.coordinates[1]],
                        [destination.coordinates[0], destination.coordinates[1]],
                        
                    ]
                }
            }
    
    if(idCounter != 0){
    map2.removeLayer("route" + (idCounter-1));
    }
    
    map2.addLayer({
        "id": "route" + idCounter,
        "type": "line",
        "source": {
            "type": "geojson",
            "data": lineData
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff4f72",
            "line-width": 3
        }
    });
    
    var coordinates = lineData.geometry.coordinates;
    var bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map2.fitBounds(bounds, {
            padding: 100
        });
        
        
    var linesBuffer = turf.buffer(lineData, 10, 'feet');     
    // console.log(linesBuffer);
    
// count polygons intersecting the line
var f2 = parks_calculate.features;
var schoolFeatures = schools_calculate.features;
// console.log("schoolFeatures" );
console.log(schools_calculate);

var lineAreaConflictParks = [];
var lineAreaConflictSchools = [];
var conflictingParks = [];
var conflictingSchools = [];

    for (var i = 0; i < f2.length; i++) {
            var parcel2 = f2[i];

                    var conflict2 = turf.intersect(parcel2.geometry, linesBuffer.geometry);
                    if (conflict2 != null) {
                        lineAreaConflictParks.push(conflict2);
                        conflictingParks.push(f2[i]);
                        
                    }
        }
    
    for (var i=0; i<schoolFeatures.length; i++){
        var parcel3 = schoolFeatures[i];
        
        var conflict3  = turf.intersect(parcel3.geometry, linesBuffer.geometry);
        if (conflict3 != null) {
                        lineAreaConflictSchools.push(conflict3);
                        conflictingSchools.push(schoolFeatures[i]);
                        // console.log(conflict3);
                    }
    }    
    
    console.log(conflictingParks);
    console.log(conflictingSchools);
    
    var intersectingSchools = turf.featureCollection(lineAreaConflictSchools); 
    var intersectingParks = turf.featureCollection(lineAreaConflictParks);
    // console.log(intersectingRegions);  
    
    // var intersectingRegionsBuffer = turf.buffer(intersectingRegions, 1000, 'feet');
    var f3 = intersectingSchools.features;
    var f4 = intersectingParks.features;
    
    var centroidPt = [];
    var centroidPt2 = [];
    
    for(var i=0; i<f4.length; i++){
        centroidPt2.push(turf.centroid(turf.polygon(f4[i].geometry.coordinates)).geometry.coordinates)
        // centroidPt.push(turf.centroid(turf.polygon(f3[0].geometry.coordinates[i])));
        // centroidPt.push(turf.centroid(f3[0].geometry.coordinates[i]));
    }
    
    for(var i=0; i<f3.length; i++){
        centroidPt.push(turf.centroid(turf.polygon(f3[i].geometry.coordinates)).geometry.coordinates)
        // centroidPt.push(turf.centroid(turf.polygon(f3[0].geometry.coordinates[i])));
        // centroidPt.push(turf.centroid(f3[0].geometry.coordinates[i]));
    }
    // centroidPt = turf.centroid(intersectingRegions.features)
    
    var centroidPtFinal = turf.multiPoint(centroidPt);
    var centroidPt2Final = turf.multiPoint(centroidPt2);
    
    map2.removeLayer("points" + (idCounter2-1));
    idCounter2++;

        
        map2.addLayer({
            'id': 'points' + idCounter2,
            'type': 'circle',
            'source': {
                'type': 'geojson',
                'data': centroidPtFinal
            },
            'layout': {},
            'paint': {
                "circle-radius": 4,
                "circle-color": "#f13a5f"
            }
        });

        map2.removeLayer("points3" + (idCounter3-1));
        idCounter3++;
        
        map2.addLayer({
            'id': 'points3' + idCounter3,
            'type': 'circle',
            'source': {
                'type': 'geojson',
                'data': centroidPt2Final
            },
            'layout': {},
            'paint': {
                "circle-radius": 4,
                "circle-color": "#f13a5f"
            }
        });
        
    var possibleViolations = lineAreaConflictParks.length + lineAreaConflictSchools.length;
    var possibleViolationsNew = conflictingParks.length + conflictingSchools.length;
    
    var pv = document.getElementById('violationsPlaceholder');
    pv.innerHTML = '<p><strong>' + possibleViolations + '</strong></p><p> possible violations </p> <br>  ' + possibleViolationsNew;
     
    var yCoords = [];
    
    for(var i = 0; i<conflictingSchools.length; i++){
        
    // var point = new mapboxgl.LngLat(-87.62509094503946, 41.800682041690266);
    
    var point = new mapboxgl.LngLat(conflictingSchools[i].geometry.coordinates[0][0][0], conflictingSchools[i].geometry.coordinates[0][0][1]);
    
    var pixelPoint = map2.project(point);
    yCoords.push(pixelPoint.y);
    // console.log(pixelPoint);
        
    }    
    
    console.log(yCoords);    
        
    // console.log(centroidPt.length);
    // console.log(centroidPt2.length);
    // console.log(possibleViolations);
    
}

});