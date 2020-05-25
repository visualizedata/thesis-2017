var w = 1000, h = 800;
      var t0 = Date.now();

      var planets = [
        { R: 3.87, r:  5, speed: 113.6764087, phi0: 20, name: "Mercury", hex: "#999999"},
        { R: 7.23, r: 5, speed: 44.50358476, phi0: 20, name: "Venus", hex: "#f781bf" },
        { R: 10.00, r: 5, speed: 27.37805813, phi0: 20, name: "Earth", hex: "#377eb8"},
        { R: 15.24, r: 5, speed: 14.55646453, phi0: 20, name: "Mars", hex: "#e41a1c"},
        { R: 52.03, r: 5, speed: 2.308047389, phi0: 20, name: "Jupiter", hex: "#ff7f00"},
        { R: 95.37, r: 5, speed: 0.9294245215, phi0: 20, name: "Saturn", hex: "#a65628"},
        { R: 191.91, r: 5, speed: 0.3258865878, phi0: 20, name: "Uranus", hex: "#4daf4a"},
        { R: 300.69, r: 5, speed: 0.1661390748, phi0: 20, name: "Neptune", hex: "#984ea3"}
      ];

      var zoom = d3.behavior.zoom()
        .scaleExtent([1, 100])
        .on("zoom", zoomed);

      var drag = d3.behavior.drag()
          .origin(function(d) { return d; })
          .on("dragstart", dragstarted)
          .on("drag", dragged)
          .on("dragend", dragended);

      var slider = d3.select("body").append("p").append("input")
        .datum({})
        .attr("type", "range")
        .attr("value", zoom.scaleExtent()[0])
        .attr("min", zoom.scaleExtent()[0])
        .attr("max", zoom.scaleExtent()[1])
        .attr("step", (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
        .on("input", slided);


      var svg = d3.select("#planetarium").insert("svg")
        .attr("width", "100%").attr("height", h);

      svg.append("circle").attr("r", 2.5).attr("cx", w/2)
        .attr("cy", h/2).attr("class", "sun")

      var container = svg.append("g")
        .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

      container.selectAll("g.planet").data(planets).enter().append("g")
        .attr("class", "planet").each(function(d, i) {
          d3.select(this).append("circle").attr("class", "orbit")
            .attr("r", d.R * 1.25);
          d3.select(this).append("circle").attr("r", d.r).attr("cx",d.R * 1.25)
            .attr("cy", 0).attr("class", "planet")
            .style("fill", d.hex);
          d3.select(this).append("text")
            // .attr("r", d.r)
            // .attr("cx",d.R * 1.5)
            // .attr("cy", d.R * 1.5)
            .attr("class","p_name")
            .attr("dy", d.R * 1.25)
            // .style("text-anchor", "middle")
            .style("alignment-baseline","hanging")
            .text(function(d) { return d.name; })
            // .style("stroke", "white");
            .style("font-size", "24px")
            .style('fill', 'white')
            .style('stroke', 'white')
            // .style('font-weight', 'bold')  
        });

      d3.timer(function() {
        var delta = (Date.now() - t0);
        svg.selectAll(".planet").attr("transform", function(d) {
          return "rotate(" + d.phi0 + delta * d.speed/2000 + ")";
        });
        svg.selectAll(".p_name").attr("transform", function(d) {
          return "rotate(" + (d.phi0-8) + delta * d.speed/2000 + ")";
        });


      });
    

      function zoomed() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        slider.property("value",  d3.event.scale);
      }

      function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
      }

      function dragged(d) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
      }

      function dragended(d) {
        d3.select(this).classed("dragging", false);
      }

      function slided(d){
        zoom.scale(d3.select(this).property("value"))
          .event(svg);
      }


