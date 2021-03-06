var width = 960,
    height = 500;

var rotate = [-71.03, 42.37],
    velocity = [.018, .006];

var projection = d3.geo.orthographic()
    .scale(240)
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("#sphere").append("svg")
    .attr("width", width)
    .attr("height", height);

var gradient = svg.append("defs").append("radialGradient")
    .attr("id", "gradient")
    .attr("cx", "75%")
    .attr("cy", "25%");

gradient.append("stop")
    .attr("offset", "5%")
    .attr("stop-color", "#ff9");

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ba9");

var fill = svg.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", 240)
    .style("fill", "url(#gradient)");    

var feature = svg.append("path")
    .datum(graticule);

d3.timer(function(elapsed) {
  projection.rotate([rotate[0] + elapsed * velocity[0], rotate[1] + elapsed * velocity[1]]);
  fill.attr("transform", "rotate(" + (rotate[0] + elapsed * velocity[0]) + " " + width / 2 + "," + height / 2 + ")");
  feature.attr("d", path);
});