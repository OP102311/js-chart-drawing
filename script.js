Array.prototype.draw = function() {
    switch(identifyChartType(this)) {
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
    switch(identifyChartType(this)) {
        case 'lineChart':
            drawLineChart(this);
            break;
    }
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

