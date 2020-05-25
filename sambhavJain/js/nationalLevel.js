$(document).ready(function()	{
// new Tippy('.tippy')	

var totalSum = [551987, 541242, 614424, 602157, 636940, 690073, 745367, 772785, 722358, 796598, 808676];

d3.select("#timelineBar").selectAll("rect")
    .data(totalSum)
    .enter().append("rect")
    	  .attr("id", function(d,i){return "bar"+i;})
    	  .attr("class", "timelineBarRects")
          .attr("height", function(d, i) {return (d/15000)})
          .attr("width","20")
          .attr("fill", "#2c2c2c")
          .attr("fill-opacity", "0.5")
          .attr("x", function(d, i) {return (i * 47) + 50 - 10})
          .attr("y", function(d, i) {return 60 - d/15000;});
       
       d3.select('#timelineBar')
    	.append('rect')
    	.attr("height", 1)
    	.attr("width", 600)
    	.attr("fill", "#2c2c2c")
        .attr("fill-opacity", "0.5")
        .attr("x", 0)
		.attr("y", 65)
          
          for(var i=2005; i<2016; i++){
          	d3.select("#timelineBar")
          	.append("text")
          	.text(i)
          	.attr("id", 'year'+i)
          	.attr("class", "timelineText")
          	// .attr("font-family", "'Libre Baskerville', serif")
			.attr("x", ((i-2005)* 47) + 50)
			.attr("y", 80)
			.attr("text-anchor", "middle")
			.attr("fill", "#2c2c2c")
			.attr("fill-opacity", "0.5")
			.attr("font-size", "10px");
          }

	// d3.select("timelineBar")

	
	var width = window.innerWidth*8/12;
    var height = window.innerHeight*4/6;


		
		
	// D3 Projection
var projection = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([width*1.1]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		
// // Define linear scale for output
// var color = d3.scale.linear()
// 			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

// var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

var dateFormat = d3.time.format("%Y");	
		

	var svg = d3.select("#mapCheck")
		.append("svg")
		    .attr("width", width)
			.attr("height", height);

    // Append Div for tooltip to SVG
        var div = d3.select("#leftBar")
        		    // .append("div")   
            		// .attr("class", "tooltip")               
            		.style("opacity", 0);

d3.csv("js/perCapitaRegistrationsFinal2.csv", function(data) {
// color.domain([0,1,2,3]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("js/us-states.json", function(json) {

// Loop through each state data value in the .csv file
// for (var i = 0; i < data.length; i++) {

// 	// Grab State Name
// 	var dataState = data[i].stateName;
// }
		

createTimeline();

function createTimeline(){
d3.selectAll(".pathResRestrictions").remove();
d3.selectAll(".pathMinDuration").remove();
$("#play").show();
$("#slider").show();
$("#range").show();

d3.select("#label").text("Registered offenders per capita");

// color every state region with gray color		
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.attr("class", "grayPath")
	.style("stroke", "#e5e5e5")
	.style("stroke-width", "1")
	.style("fill", "#f9f9f9");

svg.selectAll(".dotFixed")
	.data(data)
	.enter()
	.append("circle")
	.attr("class", "dotFixed")
	.attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
	.attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
	.attr("r", function(d) {return Math.sqrt(d.y2005) * 4;})
	.style("stroke", "black")	
	.style("fill", "none")

	
// show per capita sex offenders for year 2005 on page load 
svg.selectAll(".dot")
	.data(data)
	.enter()
	.append("circle")
	.attr("class", "dot")
	.attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
	.attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
	.attr("r", function(d) {return Math.sqrt(d.y2005) * 4;})
	.style("fill", "#e82c51")	
	.style("opacity", 0.8)	
	.on("mouseover", function(d) {   
		
		// d3.select("#tooltipCheck").text(d.StateName);
		// new Tippy('#tooltipCheck');	
			div	
           .transition()        
      	  .duration(200)      
          .style("opacity", 1) ;
          //.style("left", projection([d.lon, d.lat])[0] + "px")     
          //.style("top", (projection([d.lon, d.lat])[1] - 50) + "px");  
       var stateData;   
       if( $("#slider").val() == "2005"){stateData = d.y2005; }
       else if( $("#slider").val() == "2006"){stateData = d.y2006; }
       else if( $("#slider").val() == "2007"){stateData = d.y2007; }
       else if( $("#slider").val() == "2008"){stateData = d.y2008; }
       else if( $("#slider").val() == "2009"){stateData = d.y2009; }
       else if( $("#slider").val() == "2010"){stateData = d.y2010; }
       else if( $("#slider").val() == "2011"){stateData = d.y2011; }
       else if( $("#slider").val() == "2012"){stateData = d.y2012; }
       else if( $("#slider").val() == "2013"){stateData = d.y2013; }
       else if( $("#slider").val() == "2014"){stateData = d.y2014; }
       else if( $("#slider").val() == "2015"){stateData = d.y2015; }
    
    div.html("<p class='row' id='timelineSideText'>" + d.StateName + ", " + $("#slider").val() + "<hr id='timelineSideTextHR'> <span id='span1'>"+ stateData +"</span> in every <span id='span1'>20K</span> people were registered sex offenders."  + "</p>"); 
    
    
    
    
    //  div.attr("title", d.StateName )
    // 	.style("left", projection([d.lon, d.lat])[0] + "px")
    // 	.style("top", (projection([d.lon, d.lat])[1] - 50) + "px")
    // 	.attr("data-toggle", "tooltip");
    	
    // $('[data-toggle="tooltip"]').tooltip();	
    	
    	// new Tippy(".tooltip");
     
	})   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.transition()        
          .duration(10)      
          .style("opacity", 0);   
        
       
    });
    
    
        var running = false;
		var timer;
		
		$("#play").on("click", function() {
		
			var duration = 600,
				maxstep = 2015,
				minstep = 2005;
			
			if (running == true) {
			
				$("#play").html("pause_circle_filled");
				running = false;
				clearInterval(timer);
				
			} 
			/*
else if (running == true && $("#slider").val() == maxstep) {
				 running = true;
				 $("button").html("Play1");
				 
			
			} 
*/
			else if (running == false) {
			
				$("#play").html("pause_circle_filled");
				
				sliderValue = $("#slider").val();
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue++;
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue);
							// if($('#range').html(sliderValue) == "2015"){
							// $("#play").html("play_circle_filled");
							// running = false;	
							// }
						}
						$("#slider").val(sliderValue);
						update();
					
				}, duration);
				running = true;
				
				
			}

		});
	
		$("#slider").on("change", function(){
			update();
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("#play").html("play_circle_filled");
		});
	
		update = function() {
		
			d3.selectAll(".dot")
				.transition()
				.duration(600)
				.attr("r", function(d) {
			
					switch ($("#slider").val()) {
						case "2005":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2005").attr("fill-opacity", "1");
							d3.selectAll("#year2005").attr("font-weight", "bold");
							d3.selectAll("#bar0").attr("fill-opacity", "1");
							
							return Math.sqrt(d.y2005) * 4.5;
							break;
						case "2006":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2006").attr("fill-opacity", "1");
							d3.selectAll("#year2006").attr("font-weight", "bold");
							d3.selectAll("#bar1").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2006) * 4.5;
							break;
						case "2007":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2007").attr("fill-opacity", "1");
							d3.selectAll("#year2007").attr("font-weight", "bold");
							d3.selectAll("#bar2").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2007) * 4.5;
							break;
						case "2008":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2008").attr("fill-opacity", "1");
							d3.selectAll("#year2008").attr("font-weight", "bold");
							d3.selectAll("#bar3").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2008) * 4.5;
							break;
						case "2009":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2009").attr("fill-opacity", "1");
							d3.selectAll("#year2009").attr("font-weight", "bold");
							d3.selectAll("#bar4").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2009) * 4.5;
							break;
						case "2010":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2010").attr("fill-opacity", "1");
							d3.selectAll("#year2010").attr("font-weight", "bold");
							d3.selectAll("#bar5").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2010) * 4.5;
							break;
						case "2011":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2011").attr("fill-opacity", "1");
							d3.selectAll("#year2011").attr("font-weight", "bold");
							d3.selectAll("#bar6").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2011) * 4.5;
							break;
						case "2012":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2012").attr("fill-opacity", "1");
							d3.selectAll("#year2012").attr("font-weight", "bold");
							d3.selectAll("#bar7").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2012) * 4.5;
							break;
						case "2013":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2013").attr("fill-opacity", "1");
							d3.selectAll("#year2013").attr("font-weight", "bold");
							d3.selectAll("#bar8").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2013) * 4.5;
							break;
						case "2014":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2014").attr("fill-opacity", "1");
							d3.selectAll("#year2014").attr("font-weight", "bold");
							d3.selectAll("#bar9").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2014) * 4.5;
							break;
						case "2015":
							d3.selectAll(".timelineBarRects").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("fill-opacity", 0.5);
							d3.selectAll(".timelineText").attr("font-weight", "normal");
							d3.selectAll("#year2015").attr("fill-opacity", "1");
							d3.selectAll("#year2015").attr("font-weight", "bold");
							d3.selectAll("#bar10").attr("fill-opacity", "1");
							// d3.selectAll(".dot").style("fill", "#e82c51")
							return Math.sqrt(d.y2015) * 4.5;
							break;
					}
				});
				
		};
    
};

$("#timeline").on("click", function(){createTimeline(); } );    

$("#minDuration").on("click", function() { 

d3.selectAll(".pathResRestrictions").remove();
d3.selectAll(".grayPath").remove();
d3.selectAll(".dot").remove();
$("#play").hide();
$("#slider").hide();
$("#range").hide();

// $("p").html("Hello <b>world!</b>");

d3.select("#label").text("Minimun duration of registration requirement");

// d3.select("#nlBottomBar").remove();

for (var i = 0; i < data.length; i++) {

	// Grab State Name
	var dataState = data[i].StateName;

	// Grab data value 
	var dataValue = data[i].minDuration;
	// console.log(dataValue);
	
	var durDet = data[i].durationDetails;
	// console.log(statutePre);
	
	var link = data[i].statutes;

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.features.length; j++)  {
		var jsonState = json.features[j].properties.name;

		if (dataState == jsonState) {
		// console.log(dataState);
		// Copy the data value into the JSON
		json.features[j].properties.minDuration = dataValue; 
		json.features[j].properties.durDet = durDet;
		json.features[j].properties.link = link;
		// console.log(json.features[j].properties.statute);

		// Stop looking through the JSON
		break;
		}
	}
}
		
// Bind the data to the SVG and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.attr("class", "pathMinDuration")
	.style("stroke", "#ECEFF1")
	.style("stroke-width", "0.5")
	.style("fill", function(d) {
			var value = d.properties.minDuration;
			// var statute = d.properties.statutes;
			
			console.log(value);
		
			if (value <= 5) { console.log("yes"); return "#CFD8DC"; } 
			else if (value == 10){ console.log("yes"); return "#90A4AE";}
			else if (value == 15){ console.log("yes"); return "#607D8B";}
			else if (value == 20){ console.log("yes"); return "#455A64";}
			else{ console.log("yes"); return "#263238";} })
	.on("mouseover", function(d) {
			var minDur;
			if(d.properties.minDuration == 100){ minDur = "Lifetime";}
			else {minDur = d.properties.minDuration + " yrs";}
			
			// console.log(d.properties.statutes)
			
			div	
           .transition()        
      	  .duration(200)      
          .style("opacity", 1) ;
		div.html("<p class='row' id='timelineSideText'>" + d.properties.name + "<hr id='timelineSideTextHR'>  Min. duration of Registration: <span id='span1'>" + minDur  + "</span> <hr> <span id='span4'>STATUTE: </span> <br> <span id='span3'>"+ d.properties.durDet +"</span> <br><br> <a id='statuteLink' href='"+ d.properties.link + "'>statute link</a></p>"); 
		// console.log(d.properties.name);
		// console.log(d.properties.minDuration);
    	// div.transition()        
     // 	   .duration(500)      
     //      .style("opacity", .9);      
     //   div.text(d.StateName)
     //     .style("left", projection([d.lon, d.lat])[0] + "px")     
     //     .style("top", projection([d.lon, d.lat])[1] + "px");    
	})
	// .on("mouseout", function(d) {       
 //       div.transition()        
 //         .duration(10)      
 //         .style("opacity", 0);   
        
       
 //   });
})
  
$("#resRestrictions").on("click", function() { 


d3.selectAll(".grayPath").remove();
d3.selectAll(".dot").remove();
d3.selectAll(".pathMinDuration").remove();
$("#play").hide();
$("#slider").hide();
$("#range").hide();

// $("p").html("Hello <b>world!</b>");

d3.select("#label").text("Residence restrictions in feet");

// d3.select("#nlBottomBar").remove();

for (var i = 0; i < data.length; i++) {

	// Grab State Name
	var dataState = data[i].StateName;

	// Grab data value 
	var dataValue = data[i].bufferZone;
	// console.log(dataValue);
	
	var link = data[i].statutes;
	
	var bufDet = data[i].details;
	

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.features.length; j++)  {
		var jsonState = json.features[j].properties.name;

		if (dataState == jsonState) {
		// console.log(dataState);
		// Copy the data value into the JSON
		json.features[j].properties.bufferZone = dataValue;
		json.features[j].properties.link = link;
		json.features[j].properties.bufDet = bufDet;
		// console.log(json.features[j].properties.minDuration);

		// Stop looking through the JSON
		break;
		}
	}
}
		
// Bind the data to the SVG and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.attr("class", "pathResRestrictions")
	.style("stroke", "#ECEFF1")
	.style("stroke-width", "0.5")
	.style("fill", function(d) {
			var value = d.properties.bufferZone;
			console.log(value);
		
			if (value == 500) { console.log("yes"); return "#FFE082"; } 
			else if (value == 880){ console.log("yes"); return "#FFCA28";}
			else if (value == 1000){ console.log("yes"); return "#FFB300";}
			else if (value == 1500){ console.log("yes"); return "#FFA000";}
			else if (value == 2000){ console.log("yes"); return "#FF6F00";}
			else {return "#E0E0E0"; }})
	.on("mouseover", function(d) {
		
		div	
           .transition()        
      	  .duration(200)      
          .style("opacity", 1) ;
		div.html("<p class='row' id='timelineSideText'>" + d.properties.name + "<hr id='timelineSideTextHR'>  Residence restriction: <span id='span1'>" + d.properties.bufferZone  + " ft.</span> <hr> <span id='span4'>STATUTE: </span> <br> <span id='span3'>"+ d.properties.bufDet +"</span> <br><br> <a id='statuteLink' href='"+ d.properties.link + "'>statute link</a></p>"); 
		// console.log(d.properties.name);
		// console.log(d.properties.name);
		// console.log(d.properties.bufferZone);
    	// div.transition()        
     // 	   .duration(500)      
     //      .style("opacity", .9);      
     //   div.text(d.StateName)
     //     .style("left", projection([d.lon, d.lat])[0] + "px")     
     //     .style("top", projection([d.lon, d.lat])[1] + "px");    
	})
})        
        
// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
// var legend = d3.select("body").append("svg")
//       			.attr("class", "legend")
//      			.attr("width", 140)
//     			.attr("height", 200)
//   				.selectAll("g")
//   				.data(color.domain().slice().reverse())
//   				.enter()
//   				.append("g")
//      			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//   	legend.append("rect")
//   		  .attr("width", 18)
//   		  .attr("height", 18)
//   		  .style("fill", color);

//   	legend.append("text")
//   		  .data(legendText)
//       	  .attr("x", 24)
//       	  .attr("y", 9)
//       	  .attr("dy", ".35em")
//       	  .text(function(d) { return d; });
      	  
	});

});

});