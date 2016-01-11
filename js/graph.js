"use strict";

(function(d,w,u){
    var avgLimit = 6,
        width = window.innerWidth - 200,
        margin = Math.round(width / (avgLimit - 1));

    d3.json("test/data.json", function(jsonData){
    // d3.json("http://trends.superfeedr.com:8080/trending", function(jsonData){
        // console.log(jsonData);

        var trends = d3.select("#graph>svg")
            .selectAll("g")
            .data(jsonData)
            .enter()
            .append("g");

        trends.append("path")
            //style
            .attr("fill", "transparent")
            .attr("stroke-width", 20)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            // .attr("stroke-miterlimit", 100)
            .attr("filter", "url(#shadow)")
            .attr("stroke", function(d){
                return "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ",1)"; 
            })

            //computation
            .attr("d", function(d){
                var path = "";
                var index = 0;
                for(var avg in d.recursive){
                    if(index < avgLimit){
                        var x = (avgLimit - 1 - index) * margin,
                            y = Math.round(parseFloat(d.recursive[avg]) / 5);

                        switch(index){
                            case 0:
                                path += "M " + x + " " + y + " C" + (x - 10) + " " + y;
                                break;
                            case 1:
                                path += ", " + (x + 10) + " " + y + ", " + x + " " + y;
                                break;
                            default:
                                path += "S " + (x + 10) + " " + y + ", " + x + " " + y;
                        }

                        index ++;
                    }
                }
                return path;
            });

        // captions
        trends.append("text")
            .attr("x", (avgLimit - 1) * margin + 20)
            .attr("y", function(d){ return Math.round(parseFloat(d.recursive.avg1) / 5); })
            .attr("dy", ".35em")
            .text(function(d) { return d.keyword; });
    });
})(document, window, undefined);
