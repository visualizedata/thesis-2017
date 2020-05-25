mapboxgl.accessToken = 'pk.eyJ1IjoiamFza2lyYXRyIiwiYSI6ImNpd2JmZWlkODA1YXcyb21ocXFiMmZtYWwifQ.x9y8_Vny6lJn3htQYogjlw'
var simple = {
	'version': 8,
	'sources': {
		'osm': {
			'type': 'vector',
			'tiles': ['http://localhost:7777/v2/tiles/{z}/{x}/{y}.pbf'],
			'minzoom' : 9,
			'maxzoom' : 14
		}
	},
	'layers': [
		{
			'id': "newdelhi_india_landusagesgeojson"+parseInt(Math.random()*100000),
			'type': 'fill',
			'source': 'osm',
			'source-layer': 'newdelhi_india_landusagesgeojson',
			'paint':{
				'fill-color': '#000',
				'fill-opacity': 0
			}
		},
		{
			'id': "newdelhi_india_roadsgeojson"+parseInt(Math.random()*100000),
			'type': 'line',
			'source': 'osm',
			'source-layer': 'newdelhi_india_roadsgeojson',
			'paint':{
				'line-color': '#ccc',
				'line-opacity' : 1
			}
		},
		{
			'id': "hexgridexcesstimegeojson"+parseInt(Math.random()*100000),
			'type': 'fill',
			'source': 'osm',
			'source-layer': 'hexgridexcesstimegeojson',
			'paint':{
				'fill-color': {
					"property" : "excessTime_1",
					"type": "interval",
					"stops" : [
						[100,"#80DEEA"],
						[110,"#26C6DA"],
						[120,"#00ACC1"],
						[130,"#0097A7"],
						[150,"#006064"]
					]
				},
				'fill-opacity': 0.65
			}
		}
	]
}

var map = new mapboxgl.Map({
	container: 'map',
	style: simple,
	hash : true
})

 map.addControl(new mapboxgl.Navigation());


