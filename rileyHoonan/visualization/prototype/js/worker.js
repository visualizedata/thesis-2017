// importScripts("https://d3js.org/d3-collection.v1.min.js");
// importScripts("https://d3js.org/d3-dispatch.v1.min.js");
// importScripts("https://d3js.org/d3-quadtree.v1.min.js");
// importScripts("https://d3js.org/d3-timer.v1.min.js");
// importScripts("https://d3js.org/d3-force.v1.min.js");
importScripts("https://d3js.org/d3.v4.min.js");

onmessage = function(event) {

    var nodes = event.data.nodes,
        links = event.data.links;

        // data is not being passed
        console.log(event);

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(links).id(function(d) { return d.id; }).distance(10))
        .force("center", d3.forceCenter(1000/2, 1000/2))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .stop();

    for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
      postMessage({type: "tick", progress: i / n});
      simulation.tick();
      // console.log(i+' '+n);
    }

    postMessage({type: "end", nodes: nodes, links: links});

};
