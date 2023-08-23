

const drawingPad = d3.select('#drawingpad');
var startCoord;
var endCoord;
var shape = 'circle';
var drawing = false;

function changeShape() {
    shape = d3.select('#shape-select').property('value');
}

drawingPad.on('mousedown', function (event) {
    startCoord = d3.pointer(event);
    drawing = true;
});

drawingPad.on('mousemove', function (event) {
    endCoord = d3.pointer(event);

    if (drawing) {
        if (shape == 'rect') {
            drawingPad.select('rect#notfinished').remove();
            drawingPad.append('rect')
                .attr('x', startCoord[0])
                .attr('y', startCoord[1])
                .attr('width', endCoord[0] - startCoord[0])
                .attr('height', endCoord[1] - startCoord[1])
                .style('fill', 'blanchedalmond')
                .style('stroke', 'black')
                .attr('id', 'notfinished');
        }
        else if (shape == 'circle') {
            drawingPad.select('circle#notfinished').remove();
            const r1 = Math.abs(endCoord[0]-startCoord[0])/2;
            const r2 = Math.abs(endCoord[1]-startCoord[1])/2;
            drawingPad.append('circle')
                .attr('cx', Math.abs(endCoord[0]-r1))
                .attr('cy', Math.abs(endCoord[1]-r2))
                .attr('r', r1)
                .style('fill', 'blanchedalmond')
                .style('stroke', 'black')
                .attr('id', 'notfinished');
        }
        else if (shape == 'line') {
            drawingPad.select('line#notfinished').remove();
            const line = drawingPad.append('line')
                .attr('x1', startCoord[0])
                .attr('y1', startCoord[1])
                .attr('x2', endCoord[0])
                .attr('y2', endCoord[1])
                .attr('stroke-width', '10')
                .style('stroke', 'black')
                .attr('id', 'notfinished');
        }
    }
});

drawingPad.on('mouseup', function () {
    drawing = false;
    drawingPad.selectAll('rect').attr('id', null);
    drawingPad.selectAll('circle').attr('id', null);
    drawingPad.selectAll('line').attr('id', null);

});
