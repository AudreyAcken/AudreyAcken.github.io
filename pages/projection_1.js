let circle_data = [{ id: 0, x: 200, y: 200 }, { id: 1, x: 100, y: 100 }, { id: 2, x: 250, y: 70 }];
let vector_data = [{ id: 0, x1: circle_data[0]["x"], y1: circle_data[0]["y"], x2: circle_data[1]["x"], x2: circle_data[1]["y"] }, { id: 1, x1: circle_data[0]["x"], y1: circle_data[0]["y"], x2: circle_data[2]["x"], y2: circle_data[2]["y"]}]

let drag = d3.drag()
    .on('drag', handleDrag);

function handleDrag(e) {
    e.subject.x = e.x;
    e.subject.y = e.y;
    update();
}

function initDrag() {
    d3.select('svg')
        .selectAll('circle')
        .call(drag);
}

function update() {

    d3.select('svg')
        .selectAll('circle')
        .data(circle_data)
        .join('circle')
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('opacity', 0.3)
        .attr('r', 20);
    d3.select('svg')
        .selectAll('line')
        .data(vector_data)
        .join('line')
        .attr('x1', function (d) { return d.x1; })
        .attr('y1', function (d) { return d.y1; })
        .attr('x2', function (d) { return d.x2; })
        .attr('y2', function (d) { return d.y2; })
        .attr('stroke-width', 4)
        .attr('marker-end', "url(#arrowhead)")
}

update();
initDrag();