let origin_x = 200, origin_y = 300;
let circle_data = [{ id: 0, x: origin_x, y: origin_y }, { id: 1, x: 100, y: 100 }, { id: 2, x: 250, y: 70 }];
let vector_data = [{ id: 0, x1: origin_x, y1: origin_y, x2: circle_data[1]["x"], y2: circle_data[1]["y"] },
                    { id: 1, x1: origin_x, y1: origin_y, x2: circle_data[2]["x"], y2: circle_data[2]["y"] },
                    {
                        id: 2,
                        x1: origin_x,
                        y1: origin_y,
                        x2: origin_x + ((circle_data[2]["x"] - origin_x) * ((circle_data[1]["x"] - origin_x) * (circle_data[2]["x"] - origin_x) + (circle_data[1]["y"] - origin_y) * (circle_data[2]["y"] - origin_y)) / ((circle_data[2]["x"] - origin_x) ^ 2 + (circle_data[2]["y"] - origin_y) ^ 2)),
                        y2: origin_y - ((circle_data[2]["y"] - origin_y) * ((circle_data[1]["x"] - origin_x) * (circle_data[2]["x"] - origin_x) + (circle_data[1]["y"] - origin_y) * (circle_data[2]["y"] - origin_y)) / ((circle_data[2]["x"] - origin_x) ^ 2 + (circle_data[2]["y"] - origin_y) ^ 2))
                    }];

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

    vector_data = [{ id: 0, x1: origin_x, y1: origin_y, x2: circle_data[1]["x"], y2: circle_data[1]["y"] },
        { id: 1, x1: origin_x, y1: origin_y, x2: circle_data[2]["x"], y2: circle_data[2]["y"] },
        {
            id: 2,
            x1: origin_x,
            y1: origin_y,
            x2: origin_x+((circle_data[2]["x"]-origin_x) * ((circle_data[1]["x"] - origin_x) * (circle_data[2]["x"] - origin_x) + (circle_data[1]["y"] - origin_y) * (circle_data[2]["y"] - origin_y)) / ((circle_data[2]["x"] - origin_x) ^ 2 + (circle_data[2]["y"] - origin_y) ^ 2)),
            y2: origin_y-((circle_data[2]["y"]-origin_y) * ((circle_data[1]["x"] - origin_x) * (circle_data[2]["x"] - origin_x) + (circle_data[1]["y"] - origin_y) * (circle_data[2]["y"] - origin_y)) / ((circle_data[2]["x"] - origin_x) ^ 2 + (circle_data[2]["y"] - origin_y) ^ 2))
        }];

    d3.select('svg')
        .selectAll('line')
        .data(vector_data)
        .join('line')
        .attr('x1', function (d) { return d.x1; })
        .attr('y1', function (d) { return d.y1; })
        .attr('x2', function (d) { return d.x2; })
        .attr('y2', function (d) { return d.y2; })
        .attr('stroke-width', 4)
        .attr('marker-end', "url(#arrowhead)");
}

update();
initDrag();