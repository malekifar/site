var w = 940;
    h = 425;
    
    //"subNodes": { "subNode1": { "cx": 125, "cy": 275, "size": 20 } } 
    nodes = [
      {"type": "fieldOfStudy", "size": 65, "cx": 150, "cy": 200, "content": "Community", "subNodeSize": 10, "subNode1cx": 125, "subNode1cy": 315, "subNode2cx": 250, "subNode2cy": 75 },
      {"type": "fieldOfStudy", "size": 65, "cx": 345, "cy": 300, "content": "Education", "subNodeSize": 10, "subNode1cx": 375, "subNode1cy": 385, "subNode2cx": 250, "subNode2cy": 385},
      {"type": "fieldOfStudy", "size": 65, "cx": 425, "cy": 100, "content": "Policy", "subNodeSize": 10, "subNode1cx": 575, "subNode1cy": 40, "subNode2cx": 275, "subNode2cy": 140},
      {"type": "fieldOfStudy", "size": 65, "cx": 625, "cy": 300, "content": "Program", "subNodeSize": 10, "subNode1cx": 815, "subNode1cy": 360, "subNode2cx": 550, "subNode2cy": 380},
      {"type": "fieldOfStudy", "size": 65, "cx": 775, "cy": 150, "content": "Research", "subNodeSize": 10, "subNode1cx": 800, "subNode1cy": 55, "subNode2cx": 850, "subNode2cy": 240}
    ];

    lineFunction = d3.svg.line()
                    .x(function(d) { return d.cx; })
                    .y(function(d) { return d.cy; })
                    .interpolate("linear");
/* 
   Main Canvas - vis
   ========================================================================== */
    vis = d3.select("#svg").append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("border", "1px solid lightgrey");



  /* 
     Main Line between main nodes
     ========================================================================== */
    vis.append("path")
      .attr("d", lineFunction(nodes))
      .attr("stroke", "#f8a21e")
      .attr("stroke-width", 6)
      .attr("fill", "none")
      .attr("class", "web");


/* 
   Sub Nodes and Lines
   ========================================================================== */



    // subNodeLines = vis.selectAll(".sub-connect")
    //                 .data(nodes)
    //                 .enter()
    //                 .append("g")
    //                 .attr("class", "sub-connect");

    // subNodeLines.append("line")
    //   .attr("x1", function(d){ return d.cx })
    //   .attr("y1", function(d){ return d.cy })
    //   .attr("x2", function(d){ return d.subNode1cx })
    //   .attr("y2", function(d){ return d.subNode1cy })
    //   .attr("stroke-width", 4)
    //   .attr("stroke", "#d6f5ef");


/* 
   Main Nodes
   ========================================================================== */
    node = vis.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node not-moved")
            .on("click", function(d){
              if ( d3.select(this).classed("moved") ) {

                // == Transition Back ==
                d3.select(this).classed({"not-moved": true, "moved": false});
                d3.select(this).transition().ease('quad').duration(700).attr("transform", "translate(0, " + (330 - d.cy) + ")");
                d3.select(this).transition().ease('linear').delay(700).duration(500).attr("transform", "translate(0,0)");
                $(this).siblings(".node").delay(500).fadeToggle(2000);
                $(".field-of-study-text").fadeToggle(100);
                $(".web, .sub-connect, .sub-node-green-circle").delay(1500).fadeToggle(1000);
                // d3.slect(this).classed("moved", false);
                
              } else {
              // == Initial Transition ==
              d3.select(this).transition().ease('quad').duration(700).attr("transform", "translate(0, " + (330 - d.cy) + ")");
              d3.select(this).transition().ease('linear').delay(700).duration(500).attr("transform", "translate(" + (840 - d.cx) + "," +  (200 - d.cy) + ")");
              // d3.select(this).attr("class", "node moved")
              d3.select(this).classed({"moved":true, "not-moved":false});
              
              $(".web, .sub-connect, .sub-node-green-circle").toggle(200);
              $(this).siblings(".node").fadeToggle();
              $(".field-of-study-text").delay(500).fadeToggle(2000);
              
              }
            });

  /* 
    Sub-node Lines          
    ========================================================================== */
    node.append("line")
      .attr("x1", function(d){ return d.cx })
      .attr("y1", function(d){ return d.cy })
      .attr("x2", function(d){ return d.subNode1cx })
      .attr("y2", function(d){ return d.subNode1cy })
      .attr("class", "sub-connect")
      .attr("stroke-width", 4)
      .attr("stroke", "#d6f5ef");

    node.append("line")
      .attr("x1", function(d){ return d.cx })
      .attr("y1", function(d){ return d.cy })
      .attr("x2", function(d){ return d.subNode2cx })
      .attr("y2", function(d){ return d.subNode2cy })
      .attr("class", "sub-connect")
      .attr("stroke-width", 4)
      .attr("stroke", "#C5BFDB");

  /* 
     Main Node Circles
     ========================================================================== */
    node.append("circle")
            .attr("r", function(d){
              return d.size;
            })
            .attr("cx", function(d){ return d.cx })
            .attr("cy", function(d){ return d.cy })
            .attr("fill", "white")
            .attr("stroke", "#f8a21e")
            .attr("stroke-width", 6)
            .attr("class", function(d){ return d.content.replace(" ", "-") })
            // .style("border", "10px solid black")
            .on("mouseover", function(){
              d3.select(this).attr("stroke", "#ff5237")
            })
            .on("mouseout", function(){
              d3.select(this).attr("stroke", "#f8a21e")
            });


    // Check out this fiddle for line breaks http://jsfiddle.net/2NJ25/17/ coming from http://stackoverflow.com/questions/19447321/how-to-linebreak-an-svg-text-in-javascript
    node.append("text")
            .attr("x", function(d){ return d.cx })
            .attr("y", function(d){ return d.cy })
            .each(function(d){
              var arr = d.content.split(" ");
              if(arr != undefined){
                for(i = 0; i <arr.length; i++){
                  d3.select(this).append("tspan")
                    .text(arr[i])
                    .attr("dy", i ? "1.2em" : 0)
                    .attr("dx", 0)
                    .attr("text-anchor", "middle")
                    .attr("class", "tspan" + i);
                }
              }
            });


            // .attr("text-anchor", "middle")
            // .attr("x", function(d){ return d.cx })
            // .attr("y", function(d){ return d.cy })
            // .text(function(d){ return d.content })
            // .attr("fill", "#ff5237")
            // .attr("font-size", 14);



    /* 
       Sub-Nodes
       ========================================================================== */
    node.append("circle")
      .attr("r", function(d){
        return d.subNodeSize;
      })
      .attr("cx", function(d){ return d.subNode1cx })
      .attr("cy", function(d){ return d.subNode1cy })
      .attr("class", "sub-node-green-circle")
      .attr("fill", "white")
      .attr("stroke", "#d6f5ef")
      .attr("stroke-width", 6);

    node.append("circle")
      .attr("r", function(d){
        return d.subNodeSize;
      })
      .attr("cx", function(d){ return d.subNode2cx })
      .attr("cy", function(d){ return d.subNode2cy })
      .attr("class", "sub-node-green-circle")
      .attr("fill", "white")
      .attr("stroke", "#C5BFDB")
      // .attr("opacity", 0.3)
      .attr("stroke-width", 6);

// d3.select(".field-of-study-text").style("top", "185px").style("left", "28px").style("display", "block").style("position", "absolute");
    
    // vis.append("line")
    //         // .enter()
    //         .attr("stroke", "#f8a21e")
    //         .attr("stroke-width", 6)
    //         .attr("x1", 75)
    //         .attr("y1", 200)
    //         .attr("x2", 200)
    //         .attr("y2", 300);
    

                     


/* 
   jQuery Animations
   ========================================================================== */
function isEven(x) {
  if (x % 2 == 0) {
    return true
  };
}
var counter = 2;

// $(".not-moved").click(function(){
  // if ( isEven(counter) ) {
    // $(".web, .sub-connect, .sub-node-green-circle").toggle(200);
    // $(this).siblings(".not-moved").fadeToggle();
    // $(".field-of-study-text").delay(500).fadeToggle(2000);
    // counter++
  // } else {
      // $(this).siblings(".node").delay(500).fadeToggle(2000);
      // $(".field-of-study-text").fadeToggle(100);
      // $(".web, .sub-connect, .sub-node-green-circle").delay(1500).fadeToggle(1000);
      // counter++
    // }
// })

// $('.moved').click(function(){
//   $(".not-moved").delay(500).fadeToggle(2000);
//   $(".field-of-study-text").toggle();
//   $(".web, .sub-connect, .sub-node-green-circle").delay(1500).fadeToggle(1000);


// })
//Idea is to pass paramaeters depending if odd or even'


function original(){
  $(".web").toggle(200);
  $(this).siblings(".node").fadeToggle();
  $(".field-of-study-text").delay(500).fadeToggle(2000);
  $(this).off();
}

function returnAnimation(){
    alert('test');
}