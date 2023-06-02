let origin_x = 200, origin_y = 300;
let circle_data = [{ id: 0, x: 100, y: 100 }, { id: 1, x: 250, y: 70 }];
let vector_data = [{ id: 0, x1: origin_x, y1: origin_y, x2: circle_data[0]["x"], y2: circle_data[0]["y"], stroke: "blue", marker: "url(#arrowhead_blue)" },
                    { id: 1, x1: origin_x, y1: origin_y, x2: circle_data[1]["x"], y2: circle_data[1]["y"], stroke: "black", marker: "url(#arrowhead)" },
                    {
                        id: 2,
                        x1: origin_x,
                        y1: origin_y,
                        x2: origin_x + ((circle_data[1]["x"] - origin_x) * ((circle_data[0]["x"] - origin_x) * (circle_data[1]["x"] - origin_x) + (origin_y - circle_data[0]["y"]) * (origin_y - circle_data[1]["y"])) / ((circle_data[1]["x"] - origin_x) ** 2 + (origin_y - circle_data[1]["y"]) ** 2)),
                        y2: origin_y - ((- circle_data[1]["y"] + origin_y) * ((circle_data[0]["x"] - origin_x) * (circle_data[1]["x"] - origin_x) + (origin_y - circle_data[0]["y"]) * (origin_y - circle_data[1]["y"])) / ((circle_data[1]["x"] - origin_x) ** 2 + (origin_y - circle_data[1]["y"]) ** 2)),
                        stroke: "red",
                        marker: "url(#arrowhead_red)"
    }];
let vector_labels = [{ id: 0, x: 420, y: 30, fill: "black", text: "a = ".concat("(", ((circle_data[1]["x"] - origin_x) * (1 / 20)).toString(), ", )"},
{ id: 1, x: 420, y: 30, fill: "black", text: "a = ".concat("(", ((circle_data[1]["x"] - origin_x) * (1 / 20)).toString(), ", )"},
{ id: 2, x: 420, y: 30, fill: "black", text: "a = ".concat("(", ((circle_data[1]["x"] - origin_x) * (1 / 20)).toString(), ", )"}
];

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

    vector_data = [{ id: 0, x1: origin_x, y1: origin_y, x2: circle_data[0]["x"], y2: circle_data[0]["y"], stroke: "blue", marker: "url(#arrowhead_blue)" },
                    { id: 1, x1: origin_x, y1: origin_y, x2: circle_data[1]["x"], y2: circle_data[1]["y"], stroke: "black", marker: "url(#arrowhead)" },
                    {
                        id: 2,
                        x1: origin_x,
                        y1: origin_y,
                        x2: origin_x + ((circle_data[1]["x"] - origin_x) * ((circle_data[0]["x"] - origin_x) * (circle_data[1]["x"] - origin_x) + (origin_y - circle_data[0]["y"]) * (origin_y - circle_data[1]["y"])) / ((circle_data[1]["x"] - origin_x) ** 2 + (origin_y - circle_data[1]["y"]) ** 2)),
                        y2: origin_y - ((- circle_data[1]["y"] + origin_y) * ((circle_data[0]["x"] - origin_x) * (circle_data[1]["x"] - origin_x) + (origin_y - circle_data[0]["y"]) * (origin_y - circle_data[1]["y"])) / ((circle_data[1]["x"] - origin_x) ** 2 + (origin_y - circle_data[1]["y"]) ** 2)),
                        stroke: "red",
                        marker: "url(#arrowhead_red)"
        }];
    vector_labels = [{ id: 0, x: 420, y: 30, fill: "black", text: "a = ".concat("(", ((circle_data[1]["x"] - origin_x) * (1 / 20)).toString(), ", )"},
    { id: 1, x: 420, y: 30, fill: "black", text: "a = ".concat("(", ((circle_data[1]["x"] - origin_x) * (1 / 20)).toString(), ", )"},
    { id: 2, x: 420, y: 30, fill: "black", text: "a = ".concat("(", ((circle_data[1]["x"] - origin_x) * (1 / 20)).toString(), ", )"}
    ];

    d3.select('svg')
        .selectAll('line')
        .data(vector_data)
        .join('line')
        .attr('x1', function (d) { return d.x1; })
        .attr('y1', function (d) { return d.y1; })
        .attr('x2', function (d) { return d.x2; })
        .attr('y2', function (d) { return d.y2; })
        .attr('stroke-width', 4)
        .attr('stroke', function (d) { return d.stroke; })
        .attr('marker-end', function (d) { return d.marker; });

    d3.select('svg')
        .selectAll('text')
        .data(vector_labels)
        .join('text')
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; })
        .attr('fill', function (d) { return d.fill; })
        .text(function (d) { return d.text; });
}

update();
initDrag();