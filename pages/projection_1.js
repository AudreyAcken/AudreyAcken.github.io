let data = [], width = 400, height = 400, numPoints = 3;

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

function updateData() {
    data = [];
    for (let i = 0; i < numPoints; i++) {
        data.push({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height
        });
    }
}

function update() {
    d3.select('svg')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('opacity', 0.3)
        .attr('r', 20);
}

updateData();
update();
initDrag();