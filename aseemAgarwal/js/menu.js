 var Menu = (function(){
	var filters={};
	var renderBarData = function(barName,domain,filterFunction){
		var bbox = d3.select("."+barName+".bar").node().getBoundingClientRect();
		var width = bbox.width, height = bbox.height, marginLeft=80, marginRight=30, marginTop=25;
		var scale = d3.scaleLinear()
							   .domain(domain)
							   .range([0,width-marginLeft-marginRight]);

		DataOp.fetchBarData(barName,function(data){
			if(barName == "time"){
				//Sorting by key in the chronological order
				data = data.sort(function(a,b){return parseInt(a.key.split(":")[0])-parseInt(b.key.split(":")[0])})
			}else if(barName == "day"){
				//Sorting by key in the chronological order
				data = data.sort(function(a,b){return (a.key ==0 ? 10 : a.key)-(b.key ==0 ? 10 : b.key)})
			}
			if(d3.select("."+barName+".bar svg").empty()){
				var svgBar = d3.select("."+barName+".bar")
							  .append("svg")
							  .attr("height",data.length*25+marginTop)
							  .attr("width",width);

				svgBar.selectAll("g")
					.data(data)
					.enter()
					.append("g")
					.each(function(d,i){
						  d3.select(this)
						 	.attr("bar-key",d.key)
						  d3.select(this).append("rect")
									  .attr("x",marginLeft)
									  .attr("y",marginTop+i*25)
									  .attr("height",15)
									  .classed("tooptipElement",true)
									  .on("mouseover",tooltipMouseoverHandler)
									  .on("mouseout",tooltipMouseoutHandler)
									  .attr("width",0)
									  .attr("data-tooltip","Mean excess time<br>"+parseInt(d.value)+"%")
									  .transition()
									  .duration(500)
									  .attr("width", scale(d.value))
						  d3.select(this).append("text")
									  .attr("x",marginLeft-2)
									  .attr("y",marginTop+i*25 + 15/2)
									  .attr("alignment-baseline","middle")
									  .attr("text-anchor","end")
									  .text(DataOp.config["keyMap"][barName][d.key])
					})
					.on("click",function(){
						  if(!d3.select(".menu").classed("explore")){
							  if(d3.select(this).classed("barSelected")){
							  	d3.select(this).classed("barSelected",false);
							  	d3.select(this.parentNode).classed("selected",false);
							  	updateStmt2(barName,"");
							  	delete filters[barName];
							  	Menu.render();
							  }else{
								  d3.select("."+barName+".bar svg").classed("selected",true);
								  d3.selectAll("."+barName+".bar svg g").classed("barSelected",false);
								  d3.select(this).classed("barSelected",true);
								  var keyVal = d3.select(this).attr("bar-key").split("-");
							      filters[barName] = filterFunction(keyVal);
							      updateStmt2(barName,DataOp.config["keyMap"][barName][keyVal.join("-")]);
							      Menu.render();
						      }
					      }
					});
					
				svgBar.append("line")
					  .attr("x1",width-marginRight)
					  .attr("y1",marginTop/2)
					  .attr("x2",width-marginRight)
					  .attr("y2",marginTop/2+data.length*25)
					  .style("stroke-width","2px")
					  .style("stroke",DataOp.config.colors.exceptionColor)
					  .attr("stroke-dasharray","4, 4")
				if(barName =="day"){
					svgBar.append("text")
					  .attr("x",width-marginRight)
					  .attr("text-anchor","middle")
					  .attr("y",marginTop/2)
					  .classed("barCutoff",true)
					  .text(DataOp.config.codeParams.cutoffExcessTime+"%")
				}

			}else{
				svgBar = d3.select("."+barName+".bar svg");
				svgBar.selectAll("rect")
					  .data(data)
					  .each(function(d,i){
					  	if(d.value){
						  	d3.select(this)
						  	  .attr("data-tooltip","Mean excess time<br>"+parseInt(d.value)+"%")
						  	  .transition()
						  	  .duration(500)
						  	  .attr("width",scale(d.value))
					  	}
					  })
			}
		});
	}
	var updateStmt1 = function(area, time, day, dist){
		d3.select(".statement .stmt1").classed("hidden",false);
		d3.select(".statement .areaVal").html(Math.ceil(area*100)+"%");
		d3.select(".statement .timeVal").html(parseInt(time)+"% longer");
		d3.select(".statement .stmt3").classed("hidden",true);
	}
	var updateStmt2 = function(type,val){
		if(type == "time"){
			d3.select(".statement ."+type).html(val ? "between "+val : "");	
		}else if(type=="day"){
			var mapping = {
				"Mon" : "Monday",
				"Tue" : "Tuesday",
				"Wed" : "Wednesday",
				"Thu" : "Thursday",
				"Fri" : "Friday",
				"Sat" : "Saturday",
				"Sun" : "Sunday"
			}
			d3.select(".statement ."+type).html(val ? "on "+mapping[val] : "");
		}else if(type=="dist"){
			var text;
			if(!val){
				text = "less than 35kms";
			}else{
				text = "a distance of ";
				val = val.split("-");
				if(val[0] == "*"){
					text += "upto " + val[1];
				}else if(val[1] == "*kms"){
					text += "more than " + val[0]+"kms";
				}else{
					text += val[0]+" to "+val[1];
				}
			}
			d3.select(".statement ."+type).html(text);	
		}else{
			d3.select(".statement ."+type).html(val);	
		}
	}
	var updateStmt3 = function(val){
		d3.select(".statement .stmt3").classed("hidden",false);
		d3.select(".statement .stmt3 .timeVal").html(parseInt(val)+"% longer");
		d3.select(".statement .stmt1").classed("hidden",true);
		//Hiding the slider when its a route
		d3.select(".sliderCont").classed("hidden",true);
	}
	var updateInput = function(val,type){
		d3.select(".atob").classed("active",true);
		d3.select("input."+type).node().value = val;
		d3.select("input."+type).classed("active",true);
		d3.select(".closeBtn."+type).classed("active",true);
		updateStmt2("dir",type + " " + (type=="from" ? "area A" : "area B"));
	}

	var tooltipMouseoverHandler = function(){
		d3.select(".tooltipCont")
			.style("top",event.clientY+"px")
			.style("left",event.clientX+"px")
			.classed("visible",true)
			.html(d3.select(event.target).attr("data-tooltip"));
	}
	var tooltipMouseoutHandler = function(){
		d3.select(".tooltipCont")
			.classed("visible",false);
	}

	var routeRender = function(){
		d3.select(".dist.bar").classed("hidden",true);
		Menu.updateStmt2("dir","between area A and B");
		d3.select(".stmt2 .dist").classed("hidden",true)
	}
	var clearFrom = function(isToPresent){
		delete filters["tileFrom"];
		d3.select("input.from").node().value = "";
		d3.select("input.from").classed("active",false);
		updateStmt2("dir",isToPresent ? "to B": "");
		d3.select(".dist.bar").classed("hidden",false);
		d3.select(".stmt2 .dist").classed("hidden",false)
	}

	var clearTo = function(isFromPresent){
		delete filters["tileEnd"];
		d3.select("input.to").node().value = "";
		d3.select("input.to").classed("active",false);
		updateStmt2("dir",isFromPresent ? "from A" : "");
		d3.select(".dist.bar").classed("hidden",false);
		d3.select(".stmt2 .dist").classed("hidden",false)
	}

	var events = function(){
		d3.select(".atob").on("click",function(){
			d3.select(this).classed("active",true);
		});
		d3.selectAll(".closeBtn")
		.on("click",function(){
			if(d3.select(this).classed("from")){
				clearFrom(d3.select("input.to").classed("active"));
				Map.revertRoute("from");
			}else{
				clearTo(d3.select("input.from").classed("active"));
				Map.revertRoute("to");
			}
			d3.select(this).classed("active",false);
		})
		d3.selectAll(".atob input").on("keyup",function(){
			if(event.keyCode==13){
				var ele;
				if(d3.select(this).classed("from")){
					ele = d3.select(".results.from");
				}else{
					ele = d3.select(".results.to")
				}
				ele.html("");
				d3.json(DataOp.config.localUrl+":8383/places/"+d3.select(this).node().value,function(resp){
					var results = resp.results;
					var atleastOneValid = false;
					if(results.length){
						var ctShown=0;
						results.forEach(function(v,i){
							var validResult=false;
							v.address_components.forEach(function(comp,i){
								if(comp.short_name=="DL"){
									atleastOneValid = true;
									validResult = true;
								}
							});
							if(validResult && (ctShown+1)<4){
								ctShown++;
								ele.append("div")
								   .attr("class","result valid")
								   .attr("coord",v.geometry.location.lng+","+v.geometry.location.lat)
								   .html(v.formatted_address.substring(0,35)+"..");
							}
						});
					}
					if(!atleastOneValid){
						ele.html("<div class='result'>No results found..</div>");
						setTimeout(function(){
							//Removing the results box after some time
							ele.classed("active",false);
						},5000);
					}
					ele.classed("active",true);
					d3.selectAll(".result.valid",ele).on("click",function(){
						updateInput(d3.select(this).html(),ele.classed("from") ? "from" : "to")
						ele.classed("active",false);
						var coord = d3.select(this).attr("coord").split(",");
						var feature = DataOp.findTileHavingCoordinate(coord);
						if(ele.classed("from")){
							Map.renderFrom(feature.properties.tile_id,feature.properties.centroid);	
						}else{
							Map.renderTo(feature.properties.tile_id,feature.properties.centroid);	
						}
					})
				})
			}
		})

		d3.selectAll(".lens").on("click",function(){
			if(d3.select(this).classed("active")){
				d3.select(this).classed("active",false);
				Map.clipLayer();
			}else{
				d3.selectAll(".lens").classed("active",false);
				var layer = d3.select(this).attr("data-layer");
				d3.select(this).classed("active",true);
				Map.clipLayer(layer);	
			}
		})
		.on("mouseover",tooltipMouseoverHandler)
		.on("mouseout",tooltipMouseoutHandler)

	}

	return {
		events : events,
		updateInput : updateInput,
		getFilters : function(){
			return filters;
		},
		updateFilters : function(key,filter){
			filters[key] = filter;
		},	
		resetFilters : function(){
			filters = {};
		},
		clearFrom : clearFrom,
		clearTo : clearTo,
		updateStmt1 : updateStmt1,
		updateStmt2 : updateStmt2,
		updateStmt3 : updateStmt3,
		routeRender : routeRender,
		init : function(){
			this.render(function(){
				this.events();	
			}.bind(this));
		},
		render : function(callback){
			Map.renderTileLayer(callback);
			renderBarData("day",[100,(100+DataOp.config.codeParams.cutoffExcessTime)],function(keyVal){
				var filter = {
				  "term": {
				    "day": {
				    	"value" : parseInt(keyVal[0])
				    }
				  }
				};
				return filter;
			})
			renderBarData("time",[100,(100+DataOp.config.codeParams.cutoffExcessTime)],function(keyVal){
				var filter = {
				  "term": {
				    "time": {
				    	"value" : keyVal[0]
				    }
				  }
				};
				return filter;
			})
			renderBarData("dist",[100,(100+DataOp.config.codeParams.cutoffExcessTime)],function(keyVal){
				var filter = {
				  "range": {
				    "dist": {
				    }
				  }
				};
				if(keyVal[0] != "*"){
					filter["range"]["dist"]["gt"]=parseFloat(keyVal[0]);
				}
				if(keyVal[1] != "*"){
					filter["range"]["dist"]["lte"]=parseFloat(keyVal[1]);
				}
				return filter;
			})
		}
	}
})();