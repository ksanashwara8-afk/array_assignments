const r = require("raylib");
const m = require("./math");

function isPeak(n, data) {
    return data[n + 1] > data[n] && data[n + 1] > data[n + 2];
}

function findPeakPoints(data, gap, height, scaleFactor) {
    const peakPoints = [];
    for (let n = 0; n < data.length - 1; n++) {
        if (isPeak(n, data)) {
            const x = gap * (n + 1);
            const y = height - data[n + 1] / scaleFactor;
            peakPoints.push([x, y]);
        }
    }
    return peakPoints;
}

function setup() {
    const WIDTH = 450;
    const HEIGHT = 400;
    const FPS = 50;

    const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
    const noOfPoints = data.length;
    const gap = 45;

    const scaleFactor = m.calcScale(data, HEIGHT);
    const peakPoints = findPeakPoints(data, gap, HEIGHT, scaleFactor);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Peaks");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        data,
        noOfPoints,
        gap,
        scaleFactor,
        peakPoints,
    };
}

function createPoint(n, gap, height, data, scaleFactor) {
    const x1 = gap * n;
    const y1 = height - data[n] / scaleFactor;
    const x2 = gap * (n + 1);
    const y2 = height - data[n + 1] / scaleFactor;
    return { x1, y1, x2, y2 };
}

function drawLine(p, color) {
    r.DrawLine(p.x1, p.y1, p.x2, p.y2, color);
}

function drawPoints(n, w) {
    const p = createPoint(n, w.gap, w.HEIGHT, w.data, w.scaleFactor);
    drawLine(p, r.BLACK);
}

function drawPeak(peak, n, color) {
    r.DrawCircle(peak[n][0], peak[n][1], 5, color);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    for (let n = 0; n < world.noOfPoints - 1; n++) {
        drawPoints(n, world);
    }
    for (let n = 0; n < world.peakPoints.length; n++) {
        drawPeak(world.peakPoints, n, r.RED);
    }
    r.EndDrawing();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
    }
}

function teardown() {
    r.CloseWindow();
}

function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();
