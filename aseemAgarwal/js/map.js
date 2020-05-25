var Map = (function(){
	
	var map, clipLayer, tileData, isFeatureSelected, route=[[],[]],vectorSource, fromFeature, toFeature, routeFeature;
	var roadStyleCache = {};
	var roadColor = {
	  'major_road': 'rgba(119, 119, 102, 1)',
	  'minor_road': 'rgba(204, 204, 187, 1)',
	  'highway': 'rgba(255, 51, 153, 1)',
	  'railway': 'rgba(119, 221, 238, 1)'
	};
	var colorSc;
	var stroke = new ol.style.Stroke({color: 'black', width: 2});
    var fill = new ol.style.Fill({color: 'red'});

	var roadStyleFunction = function(feature) {
		var kind = feature.get('kind');
		var railway = feature.get('railway');
		var sort_key = feature.get('sort_key');
		var styleKey = kind + '/' + railway + '/' + sort_key;
		var style = roadStyleCache[styleKey];
		if (!style) {
		  var color, width;
		  var confObj = DataOp.config.layers.roads[kind] || {};
		  color = confObj.color || "rgba(0,0,0,0)";
		  width = confObj.width || 0;
		  style = new ol.style.Style({
		    stroke: new ol.style.Stroke({
		      color: color,
		      width: width
		    }),
		    zIndex: sort_key
		  });
		  roadStyleCache[styleKey] = style;
		}
		return style;
	};
	var styles = {
	  'Polygon': new ol.style.Style({
	    stroke: new ol.style.Stroke({
	      color: '#CCC',
	      lineDash: [1],
	      width: 1
	    }),
	    fill: new ol.style.Fill({
	      color: "#FFF"
	    })
	  }),
	  'LineString': new ol.style.Style({
         stroke: new ol.style.Stroke({
           color: '#4CA1AF',
           width: 1
         })
       }),
	};
	var BoundaryLayer = (function(){
	    var styleFunction = function(feature) {
	      var st = new ol.style.Style({
				    stroke: new ol.style.Stroke({
				      color: '#757575',
				      width: 2
				    }),
				    fill: new ol.style.Fill({
				      color: "transparent"
				    })
				  });
	      return st;
	    };
	    var vectorSource = new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url : "data/delhi_boundary.geojson"
        });  
        var vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: styleFunction
        });
        
        return vectorLayer;
	})();
	var BaseHexGridLayer = (function(){
	    var styleFunction = function(feature) {
	      var st = new ol.style.Style({
				    stroke: new ol.style.Stroke({
				      color: '#DDDDDD',
				      width: 1
				    }),
				    fill: new ol.style.Fill({
				      color: "transparent"
				    })
				  });
	      return st;
	    };
	    var vectorSource = new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url : "data/hex-grid.geojson"
        });  
        var vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: styleFunction
        });
        
        return vectorLayer;
	})();
	var ClipLayer = (function(){
		var landuseFunction = function(feature) {
	     	var kind = feature.get('kind');
	     	if(kind=="residential"){
	     		var style = new ol.style.Style({
				    fill: new ol.style.Fill({
				      color: 'rgba(255, 183, 77,0.8)'
				    }),
				});	
	     	}else if(kind=="commercial"){
	     		var style = new ol.style.Style({
				    fill: new ol.style.Fill({
				      color: 'rgba(179, 136, 255,0.8)'
				    }),
				});	
	     	}else{
	     		var style = new ol.style.Style({
				    fill: new ol.style.Fill({
				      color: 'rgba(178, 235, 242,0.8)'
				    }),
				});
	     	}
	      	
			return style
	    };
		
	   
		/**Creates the layer to the see the underlying map
		**/
    	var createClipLayer = function(layer){
    		if(clipLayer){
    			map.removeLayer(clipLayer);
    			if(!layer){
    				//If layer type is not passed; just return
    				return;
    			}
    		}
    		if(layer=="roads" || layer == "landuse"){
    			clipLayer = new ol.layer.VectorTile({
				    source: new ol.source.VectorTile({
				      format: new ol.format.TopoJSON(),
				      tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
				      url: 'https://tile.mapzen.com/mapzen/vector/v1/'+layer+'/{z}/{x}/{y}.topojson?api_key=odes-9thVtDE'
				    }),
				    style: layer=="roads" ? roadStyleFunction : landuseFunction,
				    opacity : layer == "roads" ? 1 : 0.7
				});
    		}else if(layer == "gen"){
    			clipLayer = new ol.layer.Tile({
		            source: new ol.source.OSM(),
		            opacity : 0.7
		        });
    		}else{
    			console.log("clip layer not valid please check:"+layer);
    			return;
    		}
	    	var mousePosition = null;
	        d3.select(map.getViewport()).on('mousemove', function() {
	            mousePosition = [event.x,event.y];
	            map.render();
	        }).on('mouseout', function() {
	            mousePosition = null;
	            map.render();
	        });
	        clipLayer.on('precompose', function(event) {
	           var ctx = event.context;
	           var pixelRatio = event.frameState.pixelRatio;
	           ctx.save();
	           ctx.beginPath();
	           if (mousePosition) {
	               // only show a circle around the mouse
	               ctx.arc(mousePosition[0] * pixelRatio, mousePosition[1] * pixelRatio,
	                   125 * pixelRatio, 0, 2 * Math.PI);
	               ctx.lineWidth = 2 * pixelRatio;
	               ctx.strokeStyle = 'rgba(255,255,255,1)';
	               ctx.stroke();
	           }
	           ctx.clip();
	        });
	        // after rendering the layer, restore the canvas context
	        clipLayer.on('postcompose', function(event) {
	            var ctx = event.context;
	            ctx.restore();
	        });
	        map.addLayer(clipLayer);
	    }

	    return {
	    	createClipLayer : createClipLayer
	    }
	})();

	var TileLayer = (function(){
		var tileLayer, max=0, areas=0, excessTime = 20, totalTiles=523, tilesToShow, newExcessTime;

		var setupLayer = function(){
			vectorSource = new ol.source.Vector({
		    }); 
		    tileLayer = new ol.layer.Vector({
		      source: vectorSource,
		      opacity: 0.8,
		      style: function(feature){
		      	 var st = styles[feature.getGeometry().getType()];
		      	 var excessTime = feature.getProperties().excessTime;
				 st.setFill(new ol.style.Fill({
				    color: parseInt(feature.getProperties().excessTime) < (DataOp.config.codeParams.cutoffExcessTime-DataOp.config.codeParams.minExcessTime) ? colorSc(feature.getProperties().excessTime/(DataOp.config.codeParams.cutoffExcessTime-DataOp.config.codeParams.minExcessTime)).hex() : DataOp.config.colors.exceptionColor 
				 }));
			     return st;
		      }
		    });
		    tileLayer.on("singleclick",function(ev){
		    })
		    map.addLayer(tileLayer);
		}

		var removeAllFeatures = function(){
			var total = vectorSource.getFeatures().length;
			if(total){
				vectorSource.getFeatures().forEach(function(v,i){
					if(v.values_.tile_id){
						setTimeout(function(){
							try{
								vectorSource.removeFeature(v);	
							}catch(err){
								//The open layer lib is throwing error here for some reason.
								//Could be a race condition
							}
							
						},parseInt((Math.random()*total)))
					}
				});
			}
		}
		var addTiles = function(callback){
			if(!tileLayer){
				//remove and add again
				setupLayer();
			}else{
				removeAllFeatures();
			}
			areas=0;
			excessTime=20;
			max=0;
			DataOp.fetchTilesAvg(function(data){
				tilesToShow = data;	
				totalTiles = Object.keys(tilesToShow).length;
				var sliderData={};
				for(var key in tilesToShow){
					if(tilesToShow[key]>max){
						max=tilesToShow[key];
					}
					if(tilesToShow[key] >= (100+excessTime)){
						areas++;
					}
					var bucket = parseInt(tilesToShow[key]/5)*5;
					if((bucket-100)>=excessTime){
						if(!sliderData[bucket]){
							sliderData[bucket] = 1;
						}else{
							sliderData[bucket] += 1;
						}
					}
				}
				if(areas){
			        if(route[0].length & route[1].length){
			        	var eT;
			        	//When there is a route, there is only one record
			        	for(var key in tilesToShow){
			        		eT = tilesToShow[key];
			        	}
			        	Menu.updateStmt3(eT-100);
			        }else{
			        	Menu.updateStmt1(areas/totalTiles,excessTime);	
			        	//We only need the slider when its not a route
			        	Slider.init(excessTime,(max-100),sliderData,function(n){
				        	updateTiles(n+100);
				        });
			        }
			        if(!route[0].length || !route[1].length){
				        DataOp.tileData.forEach(function(v,i){
							var eT = tilesToShow[v.properties.tile_id];
							if(eT>=(100+excessTime)){
								var feature = new ol.Feature({
								  geometry: new ol.geom.Polygon(v.geometry.coordinates).transform( 'EPSG:4326', 'EPSG:3857'),
								  tile_id: v.properties.tile_id,
								  centroid: v.properties.centroid,
								  excessTime : eT-(120)
								});
								setTimeout(function(){
									vectorSource.addFeature(feature);
								},parseInt(Math.random()*areas)/3)
							}
						});
			    	}
				}
				if(callback){
					callback();	
				}
	        })
		}

		/**
		* Updating the tile to some new value
		**/
		var updateTiles = function(num){
			areas =0;
			for(var key in tilesToShow){
				if(tilesToShow[key] >= num){
					areas++;
				}
			}
			if(num > excessTime){
				excessTime = num;
				vectorSource.getFeatures().forEach(function(v,i){
					if(v.values_.excessTime<(excessTime-120)){
						setTimeout(function(){
							vectorSource.removeFeature(v);
						},i)
					}
				});
			}else{
				DataOp.tileData.forEach(function(v,i){
					var eT = tilesToShow[v.properties.tile_id];
					if(eT>=num && eT <excessTime){
						var feature = new ol.Feature({
						  geometry: new ol.geom.Polygon(v.geometry.coordinates).transform( 'EPSG:4326', 'EPSG:3857'),
						  tile_id: v.properties.tile_id,
						  centroid: v.properties.centroid,
						  excessTime : eT-120
						});
						// vectorSource.addFeature(feature);
						setTimeout(function(){
							vectorSource.addFeature(feature);
						},parseInt(Math.random()*areas)/2)
					}
				});
				excessTime = num;
			}
			Menu.updateStmt1(areas/totalTiles,(excessTime-100));

		}
		return {
			addTiles : addTiles,
			updateTiles : updateTiles
		}
	})();

	/** Variation of commute time to one area from other areas **/
	var renderTo = function(id, centroid,callback){
		if(route[1].length){
			revertRoute("to");
		}
		var f = {
		  "term": {
		    "tEn": {
		      "value": id
		    }
		  }
		};
		Menu.updateFilters("tileEnd",f);
		isFeatureSelected = true;
		route[1] = centroid;

		toFeature = new ol.Feature({
	      geometry: new ol.geom.Point(centroid).transform( 'EPSG:4326', 'EPSG:3857'),
	      name: 'Destination'
	    });

	    toFeature.setStyle(new ol.style.Style({
	      image: new ol.style.Icon(({
	        src: '../images/B.png'
	      }))
	    }));

		vectorSource.addFeature(toFeature);
		Menu.render(callback);
		if(route[0].length){
			renderRoute();
		}
	}
	var renderRoute = function(){
		d3.json(DataOp.config.localUrl+":8383/dir/"+route[0][1]+","+route[0][0]+"/"+route[1][1]+","+route[1][0],function(resp){
			debugger;
			var coords = [];
			resp.routes[0].legs[0].steps.forEach(function(d,i){
				coords.push([d.start_location.lng,d.start_location.lat]);
				coords.push([d.end_location.lng,d.end_location.lat]);
			});
			routeFeature = new ol.Feature(new ol.geom.LineString(coords).transform( 'EPSG:4326', 'EPSG:3857'));
		    routeFeature.setStyle(new ol.style.Style({
		      stroke: new ol.style.Stroke({
		        color: '#00BCD4',
		        width: 3
		      })
		    }));
			vectorSource.addFeature(routeFeature);
			Menu.routeRender();
		});
	}

	var revertRoute = function(type){
		try{
			if(type=="from"){
				if(fromFeature){
					vectorSource.removeFeature(fromFeature);
					route[0] = [];
				}else{
					return;
				}
			}else if(type=="to"){
				if(toFeature){
					vectorSource.removeFeature(toFeature);
					route[1] = [];	
				}else{
					return;
				}
			}
			vectorSource.removeFeature(routeFeature);	
		}
		catch(err){
			//Doing it redundantly
		}
		Menu.render();
		if(!route[0].length && !route[1].length){
			d3.select(".atob").classed("active",false);
		}
	}

	/** Variation of commute time from one area to other areas **/	
	var renderFrom = function(id, centroid,callback){
		if(route[0].length){
			revertRoute("from");
		}
		var f = {
		  "term": {
		    "tFr": {
		      "value": id
		    }
		  }
		};
		Menu.updateFilters("tileFrom",f);
		isFeatureSelected = true;
		route[0] = centroid;
		fromFeature = new ol.Feature({
	      geometry: new ol.geom.Point(centroid).transform( 'EPSG:4326', 'EPSG:3857'),
	      name: 'Origin'
	    });

	    fromFeature.setStyle(new ol.style.Style({
	      image: new ol.style.Icon(({
	        src: '../images/A.png'
	      }))
	    }));

		vectorSource.addFeature(fromFeature);
		Menu.render(callback);
		if(route[1].length){
			renderRoute();
		}
	}

	var init = function(){
		colorSc = chroma.scale(DataOp.config.colors.scale);
		map = new ol.Map({
	      layers: [
	      	new ol.layer.VectorTile({
		        source: new ol.source.VectorTile({
	              format: new ol.format.TopoJSON(),
	              tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
	              url: 'https://tile.mapzen.com/mapzen/vector/v1/roads/{z}/{x}/{y}.topojson?api_key=odes-9thVtDE'
	            }),
	            style: roadStyleFunction,
	            opacity: 0.2
        	})
	      ],
	      target: 'map',
	      controls: ol.control.defaults({
	        attributionOptions: ({
	          collapsible: false
	        })
	      }),
	      view: new ol.View({
	        center: ol.proj.fromLonLat([77.120619,28.623776]),
	        zoom: 11.3,
	        minZoom : 11,
	        maxZoom : 14
	      })
	    });
	    map.on('singleclick', function(evt) {   
		    if(!d3.select(".menu").classed("explore")){
		       var ids = [];
			   var feature = map.forEachFeatureAtPixel(evt.pixel,
			     function(feature, layer) {
			     if(feature.values_.tile_id && ids.indexOf(feature.values_.tile_id)==-1 && feature.values_.excessTime){
			     	ids.push(feature.values_.tile_id);
			     	var cent = feature.values_.centroid;
			     	//Order of priority
			     	//If matches tile A
			     	//If matches tile B
			     	//If tile A is not selected
			     	//If tile B is not selected
			     	if(cent.toString() == route[0].toString()){
			     		Menu.clearFrom(route[1].length>0);
			     		Map.revertRoute("from");
			     	}
			     	else if(cent.toString() == route[1].toString()){
			     		Menu.clearTo(route[0].length>0);
			     		Map.revertRoute("to");
			     	}else if(!route[0].length){
			     		renderFrom(feature.values_.tile_id,cent);	
			     		Menu.updateInput(cent,"from");
			     	}else if(!route[1].length){
			     		renderTo(feature.values_.tile_id,cent);	
			     		Menu.updateInput(cent,"to");
			     	}
			     }
			   });  
			}                                                       
		});   
        map.addLayer(BoundaryLayer);
        map.addLayer(BaseHexGridLayer);
	}
	return {
		init : init,
		revertRoute : revertRoute,
		renderTileLayer : function(callback){
			TileLayer.addTiles(callback)
		},
		renderFrom : renderFrom,
		renderTo : renderTo,
		clipLayer : function(layer){
			ClipLayer.createClipLayer(layer);
		}
	}
})();