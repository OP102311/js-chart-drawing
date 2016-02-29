var js = document.createElement("script");

js.src = "//d3js.org/d3.v3.min.js";
js.type = "text/javascript";
js.charset = "utf-8";
document.head.insertBefore(js, document.head.children[0]);

Array.prototype.draw = function() {
    var array = this;
    setTimeout(function run() {
        if (typeof d3 !== "undefined") {
            switch(identifyChartType(array)) {
                case 'histogram1':
                    drawHistogram(array);
                    break;
                case 'histogram2':
                    drawHistogram(array);
                    break;
                case 'scatterPlot':
                    drawScatterPlot(array);
                    break;
                case 'stackedBarChart':
                    drawStackedBarChart(array);
                    break;
            }
        } else {
            setTimeout(run, 1000);
        }
    }, 1000);
};
Object.prototype.draw = function() {
    var array = this;
    setTimeout(function run() {
        if (typeof d3 !== "undefined") {
            switch(identifyChartType(array)) {
                case 'lineChart':
                    drawLineChart(array);
                    break;
            }
        } else {
            setTimeout(run, 1000);
        }
    }, 1000);
};

function identifyChartType(array) {
    if (Object.prototype.toString.call(array) == '[object Array]') {
        if (isHistogram1(array)) {
            return 'histogram1';
        }
        if (isHistogram2(array)) {
            return 'histogram2';
        }
        if (isScatterPlot(array)) {
            return 'scatterPlot';
        }
        if (isStackedBarChart(array)) {
            return 'stackedBarChart';
        }
    }
    if (Object.prototype.toString.call(array) == '[object Object]') {
        if (isLineChart(array)) {
            return 'lineChart';
        }
    }
    return 'cant resolve';
}

function drawHistogram(array) {
    var data = [];
    for (var i = 0; i < array.length; i++) {
        var isRepeat = false;
        for (var j = 0; j < data.length; j++) {
            if (data[j].letter === array[i]) {
                data[j].frequency += 1;
                isRepeat = true;
                break;
            }
        }
        if (!isRepeat) {
            data.push({
                letter: array[i],
                frequency: 1
            })
        }
    }
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    // setup fill color
    var cValue = function(d) { return d.letter;},
        color = d3.scale.category10()

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
        .style("fill", function(d) { return color(cValue(d));});
    return svg;
}

function drawScatterPlot(array) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // setup x
    var xValue = function(d) { return d.x;}, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.y;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    // setup fill color
    var cValue = function(d) { return d.r;},
        color = d3.scale.category10();

    // add the graph canvas to the body of the webpage
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // load data
    array.forEach(function(d) {
        d.x = +d.x;
        d.y = +d.y;
        d.r = +d.r;
    });

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(array, xValue)-1, d3.max(array, xValue)+1]);
    yScale.domain([d3.min(array, yValue)-1, d3.max(array, yValue)+1]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("x");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("y");

    // draw dots
    svg.selectAll(".dot")
        .data(array)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return cValue(d)/2;})
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return color(cValue(d));});

    // draw legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})
    return svg;
}

function drawLineChart(array) {
    var svg;
    return svg;
}

function drawStackedBarChart(array) {
    var svg;
    return svg;
}

function isHistogram1(array) {
    var isHistogram1 = true;
    for (var i = 0; i < array.length; i++) {
        if (!Number.isInteger(array[i])) {
            isHistogram1 = false;
            break;
        }
    }
    return isHistogram1;
}

function isHistogram2(array) {
    var isHistogram2 = true;
    for (var i = 0; i < array.length; i++) {
        if (!isLetter(array[i])) {
            isHistogram2 = false;
            break;
        }
    }
    return isHistogram2;
}

function isScatterPlot(array) {
    var isScatterPlot = true;
    for (var i = 0; i < array.length; i++) {
        if (Object.prototype.toString.call(array[i]) == '[object Object]') {
            if (!(array[i].x && array[i].y && array[i].r)) {
                isScatterPlot = false;
                break;
            }
        } else {
            isScatterPlot = false;
            break;
        }
    }
    return isScatterPlot;
}

function isLineChart(array) {
    var isLineChart = true;
    for (var key in array) {
        if (Number.isInteger(parseInt(key)) || key == 'draw') {
            for (var i = 0; i < array[key].length; i++) {
                if (!Number.isInteger(array[key][i])) {
                    isLineChart = false;
                    break;
                }
            }
        } else {
            isLineChart = false
            break;
        }
    }
    return isLineChart;
}

function isStackedBarChart(array) {
    var isStackedBarChart = true;
    for (var i = 0; i < array.length; i++) {
        if (Object.prototype.toString.call(array[i]) == '[object Array]') {
            if (typeof array[i][0] != 'string') {
                isStackedBarChart = false;
                break;
            } else {
                for (var j = 1; j < array[i].length; j++) {
                    if (!Number.isInteger(array[i][j])) {
                        isStackedBarChart = false;
                        break;
                    }
                }
            }
        } else {
            isStackedBarChart = false;
            break;
        }
    }
    return isStackedBarChart;
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

