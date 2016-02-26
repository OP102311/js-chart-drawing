Array.prototype.draw = function() {
    switch(identifyArrayType(this)) {
        case 'histogram1':
            drawHistogram1(this);
            break;
        case 'histogram2':
            drawHistogram2(this);
            break;
        case 'scatterPlot':
            drawScatterPlot(this);
            break;
        case 'stackedBarChart':
            drawStackedBarChart(this);
            break;
    }
};
Object.prototype.draw = function() {
    switch(identifyArrayType(this)) {
        case 'lineChart':
            drawLineChart(this);
            break;
    }
};

function identifyArrayType(array) {
    var arrayType;
    if (array instanceof Array) {
        arrayType = 'arrayType';
    }
    if (array instanceof Object) {
        arrayType = 'arrayType';
    }
    return arrayType;
}

function drawHistogram1(array) {
    var svg;
    return svg;
}

function drawHistogram2(array) {
    var svg;
    return svg;
}

function drawScatterPlot(array) {
    var svg;
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