var Map = (function(){
	var map, clipLayer, tileData;
	var roadStyleCache = {};
	var roadColor = {
	  'major_road': 'rgba(119, 119, 102, 1)',
	  'minor_road': 'rgba(204, 204, 187, 1)',
	  'highway': 'rgba(255, 51, 153, 1)',
	  'railway': 'rgba(119, 221, 238, 1)'
	};
	var colorSc = chroma.scale(['#FFFFF6',"#33DFF4" ,'#37474F']);

	var roadStyleFunction = function(feature) {
		var kind = feature.get('kind');
		var railway = feature.get('railway');
		var sort_key = feature.get('sort_key');
		var styleKey = kind + '/' + railway + '/' + sort_key;
		var style = roadStyleCache[styleKey];
		if (!style) {
		  var color, width;
		  color = roadColor[kind] || "rgba(0,0,0,1)";
		  width = kind == 'highway' ? 2 : 1;
		  style = new ol.style.Style({
		    stroke: new ol.style.Stroke({
		      color: color,
		      width: width,
		      opacity: 1
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
				      color: '#37474F',
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
    	var createClipLayer = function(layer,opacity){
    		if(clipLayer){
    			map.removeLayer(clipLayer);
    		}
    		if(layer=="roads"){
    			styleF = roadStyleFunction
    		}else{
    			styleF = landuseFunction
    		}
	    	// clipLayer = new ol.layer.VectorTile({
					 //        source: new ol.source.VectorTile({
				  //             format: new ol.format.TopoJSON(),
				  //             tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
				  //             url: 'https://tile.mapzen.com/mapzen/vector/v1/'+layer+'/{z}/{x}/{y}.topojson?api_key=odes-9thVtDE'
				  //           }),
				  //           style: styleF,
				  //           opacity : 1
			   //      	});
			clipLayer = new ol.layer.Tile({
	            source: new ol.source.OSM(),
	            opacity : 0.6
	        });
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
	                   200 * pixelRatio, 0, 2 * Math.PI);
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
		var tileLayer, max=0, areas=0, excessTime = 20, totalTiles=523, tilesToShow, vectorSource;

		var addTiles2 = function(callback){
			if(tileLayer){
				//remove and add again
				map.removeLayer(tileLayer);
				areas=0;
				excessTime=20;
			}
			DataOp.fetchTilesAvg(function(data){
				tilesToShow = data;	
				for(var key in tilesToShow){
					if(tilesToShow[key]>max){
						max=tilesToShow[key];
					}
					if(tilesToShow[key] >= (100+excessTime)){
						areas++;
					}
				}
				vectorSource = new ol.source.Vector({
		        }); 
		        tileLayer = new ol.layer.Vector({
		          source: vectorSource,
		          opacity: 0.6,
		          style: function(feature){
		          	 var st = styles[feature.getGeometry().getType()];
					 st.setFill(new ol.style.Fill({
					    color: colorSc(feature.getProperties().excessTime/(max-100)).hex()
					 }));
				     return st;
		          }
		        });
		   
		        Slider.init(excessTime,(max-100),function(n){
		        	updateTiles(n+100);
		        });
		        Menu.updateStmt1(areas/totalTiles,excessTime);
		        map.addLayer(tileLayer);
		        DataOp.tileData.forEach(function(v,i){
					var excessTime = tilesToShow[v.properties.tile_id];
					if(excessTime>=120){
						var feature = new ol.Feature({
						  geometry: new ol.geom.Polygon(v.geometry.coordinates).transform( 'EPSG:4326', 'EPSG:3857'),
						  name: v.properties.tile_id,
						  excessTime : excessTime-100
						});
						// vectorSource.addFeature(feature);
						setTimeout(function(){
							vectorSource.addFeature(feature);
						},parseInt(Math.random()*areas)*5)
					}
				});
		        callback();
	        })
		}

		var updateTiles2 = function(){
			vectorSource.getFeatures().forEach(function(v,i){
				if(v.values_.excessTime<50){
					setTimeout(function(){
						vectorSource.removeFeature(v);
					},i*2)
				}
			});
		}

		var flash = function(feature){
			var duration=100;
			var start = new Date().getTime();
			var listenerKey;
			var animate = function(event) {
			    var vectorContext = event.vectorContext;
			    var frameState = event.frameState;
			    var flashGeom = feature.getGeometry().clone();
			    var elapsed = frameState.time - start;
			    var elapsedRatio = elapsed / duration;
			    var opacity = ol.easing.linear(elapsedRatio)-.4;

			    var st = styles["Polygon"];
			    var col = colorSc(feature.getProperties().excessTime/(max-100)).rgba();
			    col[3] = opacity;
				st.setFill(new ol.style.Fill({
				  color: col,
				  snapToPixel: true
				}));
			    vectorContext.setStyle(st);
			    vectorContext.drawGeometry(flashGeom);
			    if (elapsed >= duration) {
			      // ol.Observable.unByKey(listenerKey);
			      return;
			    }
			    // tell OpenLayers to continue postcompose animation
			    map.render();
		    }
		    listenerKey = map.on('postcompose', animate);
		}

		/**
		* Create the tile layer which will show the slider value
		**/
		var addTiles = function(callback){
			if(tileLayer){
				//remove and add again
				map.removeLayer(tileLayer);
				areas=0;
				excessTime=20;
			}
			DataOp.fetchTilesAvg(function(data){
				tileData = data;
				for(var key in tileData){
					if(tileData[key]>max){
						max=tileData[key];
					}
					if(tileData[key] >= (100+excessTime)){
						areas++;
					}
				}
				var vectorSource = new ol.source.Vector({
		          format: new ol.format.GeoJSON(),
		          url : "data/hex-grid.geojson"
		        }); 
		        tileLayer = new ol.layer.Vector({
		          source: vectorSource,
		          opacity: 0.9,
		          style: function(feature){
		          	 var st = styles[feature.getGeometry().getType()];
		          	 var tile_id = feature.getProperties().tile_id;
		          	 var val = tileData[tile_id] > (100+excessTime) ? tileData[tile_id]-(100+excessTime) : 0;
		          	 if(!val){
		          	 	st.setFill(new ol.style.Fill({
					       color: "rgba(255,255,255,1)"
					    }));
		          	 }else{
						st.setFill(new ol.style.Fill({
					       color: colorSc(val/(max-100)).hex()
					    }));
		          	 }
				     return st;
		          }
		        });
		        Slider.init(excessTime,(max-100),function(n){
		        	updateTiles(n+100);
		        });
		        Menu.updateStmt1(areas/totalTiles,excessTime);
		        map.addLayer(tileLayer);
		        callback();
	        })
		}

		var addRoutes = function(routesGeoJson){
			// // map.removeLayer(tileLayer);
			// var vectorSource = new ol.source.Vector({
		 //       features: (new ol.format.GeoJSON()).readFeatures(routesGeoJson)
		    var vectorSource = new ol.source.Vector({
		      format: new ol.format.GeoJSON(),
		      url : "http://localhost:8383/routes/4/9"
		    }); 
		    var routeLayer = new ol.layer.Vector({
			  source: vectorSource,
		      style: function(feature){
		      	 var st = styles[feature.getGeometry().getType()];
		      	 var r = (feature.getProperties().ratio-100)/125;
			     st.setStroke(new ol.style.Stroke({
		           color: colorSc(r).hex(),
		           width: 2*r
		         }));
		         return st;
		      }
		    });
		    map.addLayer(routeLayer);
		    // map.render();
		}

		/**
		* Updating the tile to some new value
		**/
		var updateTiles = function(num){
			excessTime = num;
			areas =0;
			for(var key in tileData){
				if(tileData[key] >= (excessTime)){
					areas++;
				}
			}
			Menu.updateStmt1(areas/totalTiles,(excessTime-100));
			tileLayer.setStyle(function(feature){
		        var st = styles[feature.getGeometry().getType()];
		        var tile_id = feature.getProperties().tile_id;
		        var val = tileData[tile_id] > excessTime ? tileData[tile_id]-excessTime : 0;
		        if(!val){
		        	st.setFill(new ol.style.Fill({
				      color: "rgba(255,255,255,1)"
				   }));	
		        }else{
					st.setFill(new ol.style.Fill({
				      color: colorSc(val/(max-100)).hex()
				   }));
		        }
				return st;
			});
		}
		return {
			addTiles : addTiles,
			addTiles2 : addTiles2,
			updateTiles : updateTiles,
			addRoutes : addRoutes,
			updateTiles2 : updateTiles2
		}
	})();

	var init = function(){
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
	        center: ol.proj.fromLonLat([77.027045,28.640524]),
	        zoom: 11
	      })
	    });
	    map.on('singleclick', function(evt) {   
		   var feature = map.forEachFeatureAtPixel(evt.pixel,
		     function(feature, layer) {
		     // return [feature, layer];  
		     if(feature.values_.tile_id){
		     	var f = {
			       "term": {
			         "tEn": {
			           "value": feature.values_.tile_id
			         }
			       }
			     };
		     }
		     Menu.updateFilters("tileEnd",f);
		     Menu.render();
		   });                                                         
		});   
        map.addLayer(BoundaryLayer);
        
	}
	return {
		init : init,
		renderTileLayer : function(){
			TileLayer.addTiles2(function(){
			 	ClipLayer.createClipLayer("landuse");
			})
		},

		rem : function(){
			TileLayer.updateTiles2();
		},

		renderRouteLayer : function(dat){
			DataOp.fetchRoutes(function(routes,geojson){
				TileLayer.addRoutes(geojson);
				ClipLayer.createClipLayer("roads");
			})
		}
	}
})();