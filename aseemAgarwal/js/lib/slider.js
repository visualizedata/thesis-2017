var Slider =(function(){
  var svg, margin = {right: 10, left: 10}, slider, handle, width, x, callback, barChart, bucketScale;  
  var timer,colorSc;

  function changePosition(h) {
    if(timer){
      clearTimeout(timer);
    }
    h = parseInt(h/5)*5;
    timer = setTimeout(function(){
      callback(h);
    },500)
    handle.attr("cx", x(h)-5);
    updateChart(h);
  }

  function updateChart(val){
    barchart.selectAll("rect")
       .each(function(d,i){
            if(parseInt(d.bucket) < (100+val)){
              d3.select(this)
                .transition()
                .duration(500)
                .style("fill","#f9f9f9") 
                .style("stroke","#ccc")  
              }else{
                d3.select(this)
                .transition()
                .duration(500)
                .style("fill",colorSc(bucketScale(parseInt(d.bucket))).hex())  
              }
       })
    // barChart.select(".lineBottom")
    //         .attr()
  }

  var createBarChart = function(sliderData,widthBar,h){
    var sliderDataArray = [];
    for(var bucket in sliderData){
      sliderDataArray.push({
        "bucket" : bucket,
        "val" : sliderData[bucket]
      })
    }
    bucketScale = d3.scaleLinear().domain([100+DataOp.config.codeParams.minExcessTime,100+DataOp.config.codeParams.cutoffExcessTime]).range([0,1]);

    var max = d3.max(sliderDataArray,function(d){return d.val});
    var scaleY = d3.scaleLinear().domain([0,max]).range([0,h-20]);

    barchart = svg.append("g", "barChart");
    barchart.selectAll("rect")
       .data(sliderDataArray)
       .enter()
       .append("rect")
       .attr("value",function(d){
          return parseInt(d.bucket)
       })
       .attr("x",function(d){
          return x(parseInt(d.bucket)-100)
       })
       .attr("y",function(d){
          return (h-20-scaleY(d.val))
       })
       .attr("width",widthBar)
       .attr("height",function(d){
          return scaleY(d.val)+1
       })
       .style("fill",function(d){
          return parseInt(d.bucket) < 175 ? colorSc(bucketScale(parseInt(d.bucket))).hex() : DataOp.config.colors.exceptionColor;
       })
       .style("stroke",function(d){
          return "#ddd";
       })
       .style("stroke-width",function(d){
          return "1px";
       })
    barchart.append("line")
            .attr("class","lineBottom")
            .attr("x1",0)
            .attr("y1",h-18)
            .attr("x2",x(parseInt(sliderDataArray[sliderDataArray.length-1].bucket)-100)+widthBar)
            .attr("y2",h-18)
            .style("stroke",function(d){
                return "#607D8B";
             })
             .style("stroke-width",function(d){
                return "1px";
             })
  }

  var init = function(min,max,sliderData,sliderCallback){
    colorSc = chroma.scale(DataOp.config.colors.scale);
    d3.select(".sliderCont").classed("hidden",false);
    d3.select(".slider svg").remove();
    callback = sliderCallback;
    var bbox = d3.select(".slider").node().getBoundingClientRect();
    svg = d3.select(".slider")
        .append("svg")
        .attr("height",150)
        .attr("width",bbox.width);
    var width = +svg.attr("width") - margin.left - margin.right, height = +svg.attr("height");   

    //scale
    x = d3.scaleLinear()
      .domain([min, max])
      .range([0, width])
      .clamp(true);

    createBarChart(sliderData,x(min+5)-x(min),height);
    //Group
    slider = svg.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + margin.left + "," + (height-20) + ")"); 

    var gradient = slider.append("defs")
      .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#FFFFF6")
        .attr("stop-opacity", 1);
    gradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#00ACC1")
        .attr("stop-opacity", 1);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#37474F")
        .attr("stop-opacity", 1);

    
    // slider.append("rect")
    //       .attr("x",x.range()[0])
    //       .attr("y",-5)
    //       .attr("width",x.range()[1]-x.range()[0])
    //       .attr("height",10)
    //       .style("fill","url(#gradient)")

    //Track
    slider.append("line")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
          .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function() { changePosition(x.invert(d3.event.x)); }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter().append("text")
          .attr("x", x)
          .attr("text-anchor", "end")
          .text(function(d) { return d; });
    

    handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);
  }

  // slider.transition() // Gratuitous intro!
  //     .duration(750)
  //     .tween("changePosition", function() {
  //       var i = d3.interpolate(0, 70);
  //       return function(t) { changePosition(i(t)); };
  //     });

  return {
    init : init,
    changePosition : changePosition
  }
  
})();

