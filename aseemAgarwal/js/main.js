var App = (function(){
	var stmt, selectedBtn, timer, pos;
	var storyline = [
		["Nearly three-fourth areas of Delhi are taking atleast 20% longer to commute on any given time or day"],
		["More than one-third are taking atleast 50% longer","This means, for every 1 hour of commute people will spend 30 mins extra"],
		["4 to 7pm sees the most of traffic. Half of Delhi takes 50% or longer"],
		["Some areas take as much as 75% longer or spend 45 minutes extra for every 1 hour"],
		["Morning commute between 8 to 11am is better than evening"],
		["The areas which take most of the time also differ"],
		["For distances less than 5kms only 10% of areas take 50% longer"],
		["It gets worse as the distance to commute increases"],
		["To reach Airport it takes 60% longer from these areas"],
		["From central Delhi it would take on average 75% longer"],
		["The objective is to spread awareness about the criticality of the situation.<br><br> Help Delhi by sharing your own insights <span class='under'>@slowingdelhi</span>"]
	]

	var stmtUpdate = function(val,show,append){
		if(!append){
			stmt.transition()
				.duration(500)
				.style("opacity",0);
		}
		setTimeout(function(){
			if(append){
				stmt.append("div")
					.html(val)
					.transition()
					.duration(500)
					.style("opacity",1);
			}else{
				stmt.html(val);
				stmt.transition()
					.duration(500)
					.style("opacity",1);
			}
			
		},700)
	}

	var handleBtnClick = function(ct,dontRender){
		if(!selectedBtn || selectedBtn!=ct){
			clearTimeout(timer);
			selectedBtn=ct;
			var nodes = d3.selectAll(".storyline .btn").nodes();
			if(ct==0){
				reset();
				if(!dontRender){
					Menu.render(function(){
						stmtUpdate(storyline[ct][0],true);		
					});
				}else{
					stmtUpdate(storyline[ct][0],true);
				}
				btnHighlight(nodes[ct]);
				pos=ct;
			}else if(ct==1){
				reset();
				Menu.render(function(){
					Slider.changePosition(50);
					stmtUpdate(storyline[ct][0],true);	
					timer = setTimeout(function(){
						stmtUpdate(storyline[ct][1],true,true);	
					},3000)
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==2){
				reset();
				var filter = {
				  "term": {
				    "time": {
				    	"value" : "17:30"
				    }
				  }
				};
				d3.selectAll(".bar g").classed('barSelected',false);
				d3.select(".bar.time g:nth-child(3)").classed('barSelected',true);
				Menu.updateFilters("time",filter);
				Menu.render(function(){
					stmtUpdate(storyline[ct][0],true);	
					timer = setTimeout(function(){
						stmtUpdate(storyline[ct][1],true,true);	
					},3000)
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==3 && pos==2){
				Slider.changePosition(75);
				stmtUpdate(storyline[ct][0],true,true);	
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==4){
				reset();
				var filter = {
				  "term": {
				    "time": {
				    	"value" : "9:30"
				    }
				  }
				};
				d3.selectAll(".bar g").classed('barSelected',false);
				d3.select(".bar.time g:nth-child(1)").classed('barSelected',true);
				Menu.updateFilters("time",filter);
				Menu.render(function(){
					stmtUpdate(storyline[ct][0],true);	
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==5 && pos==4){
				Slider.changePosition(50);
				stmtUpdate(storyline[ct][0],true,true);	
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==6){
				reset();
				var filter = {
				  "range": {
				    "dist": {
				    	"lte" : 5000
				    }
				  }
				};
				d3.select(".bar.dist g:nth-child(1)").classed('barSelected',true);
				Menu.updateFilters("dist",filter);
				Menu.render(function(){
					Slider.changePosition(50);
					stmtUpdate(storyline[ct][0],true);	
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==7 && pos==6){
				reset();
				var filter = {
				  "range": {
				    "dist": {
				    	"gt" : 20000,
				    	"lte": 30000
				    }
				  }
				};
				d3.selectAll(".bar g").classed('barSelected',false);
				d3.select(".bar.dist g:nth-child(5)").classed('barSelected',true);
				Menu.updateFilters("dist",filter);
				Menu.render(function(){
					Slider.changePosition(50);
					stmtUpdate(storyline[ct][0],true,true);	
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}else if(ct==8){
				reset();
				var feature = DataOp.findTileHavingCoordinate(["77.120283", "28.5641431"]);
				Map.renderTo(feature.properties.tile_id,feature.properties.centroid,function(){
					stmtUpdate(storyline[ct][0],true);	
					Slider.changePosition(60);
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}
			else if(ct==9 && pos==8){
				var feature = DataOp.findTileHavingCoordinate(["77.2195421", "28.632862"]);
				Map.renderFrom(feature.properties.tile_id,feature.properties.centroid,function(){
					stmtUpdate(storyline[ct][0],true,true);	
				});
				btnHighlight(nodes[ct]);
				pos=ct;
			}else if(ct == 10){
				stmtUpdate(storyline[ct][0],true);
				setTimeout(function(){
					d3.select(".interact").classed("hidden",false).classed("showForce",true).on("click",showInteractive);	
				},1000);	
				
			}
		}
	}


	var reset = function(){
		d3.select(".interact").classed("hidden",true).classed("showForce",false);	
		Menu.resetFilters();
		Map.revertRoute("from");
		Map.revertRoute("to");
		d3.selectAll(".bar g").classed('barSelected',false);
	}

	var btnHighlight = function(node){
		d3.selectAll(".storyline .btn").classed("active",false);
		d3.select(node).classed("active",true);
	}

	var showExplore = function(){
		d3.select(".menu").classed("inactive",false).classed("explore",true);
		d3.select(".bars").classed("inactive",false).classed("explore",true);
		d3.select(".lenses").classed("inactive",false).classed("explore",true);
		Menu.init();
		stmt = d3.select(".stmt4");
		stmtUpdate("",false);
		handleBtnClick(0,true);
		d3.selectAll(".storyline .btn").on("click",function(){
				handleBtnClick(parseInt(d3.select(this).html())-1);	
		})
		d3.select("body").on("keydown",function(e) {
			if(event.keyCode == 37) { // left
				handleBtnClick(pos-1);	
			}
			else if(event.keyCode == 39) { // right
				handleBtnClick(pos+1);	
			}
		});
	}

	var showInteractive = function(){
		Menu.resetFilters();
		d3.selectAll(".bar svg").remove();
		d3.select(".menu").classed("inactive",false).classed("explore",false);
		d3.select(".bars").classed("inactive",false).classed("explore",false);
		d3.select(".lenses").classed("inactive",false).classed("explore",false);
		Menu.init();
	}

	return {
		init : function(){
			DataOp.setup(function(){
				Map.init();
				var params = window.location.search.substring(1);
				if(params.indexOf("explore")>-1){
					showExplore();
					setTimeout(function(){
						d3.select(".stmt4").classed("hidden",false);	
					},1000);
				}else if(params.indexOf("interact")>-1){
					showInteractive();
				}else{
					d3.select(".stmt4").classed("hidden",false);	
					d3.select(".explore").classed("hidden",false).on("click",showExplore);
					d3.select(".interact").classed("hidden",false).on("click",showInteractive);
				}
			})
		}
	}
})()

App.init();


// 1. Nearly three-fourth of Delhi are taking atleast 20% longer to commute on average. 
// 2. More than one-third is taking atleast 50% longer. 
// 3. This means, a person travelling from these areas will take 30 mins extra for every 1 hour of travel on any given day. 