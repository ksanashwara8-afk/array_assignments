const r = require("raylib");
const m = require("./math_functions");

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const FPS = 50;

    const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
    const noOfBars = data.length;
    const barWidth = 35;
    const gap = 4;

    const scaleFactor = m.calcScale(data, HEIGHT);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Averages");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        data,
        noOfBars,
        barWidth,
        gap,
        scaleFactor,
    };
}

function createBar(n, width, height, gap, data, scaleFactor) {
    const x = (width + gap) * n;
    const y = height - data[n] / scaleFactor;
    return { x, y, width, height };
}

function drawRect(bar, color) {
    r.DrawRectangleRec(bar, color);
}

function drawBar(n, world) {
    const barTODraw = createBar(
        n,
        world.barWidth,
        world.HEIGHT,
        world.gap,
        world.data,
        world.scaleFactor,
    );
    drawRect(barTODraw, r.DARKBLUE);
}

function drawAvgLine(w, color) {
    const scaledAvg = m.calcAvg(w.data, w.HEIGHT, w.noOfBars, w.scaleFactor);
    r.DrawLine(0, scaledAvg, w.WIDTH, scaledAvg, color);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    for (let n = 0; n <= world.noOfBars; n++) {
        drawBar(n, world);
    }
    drawAvgLine(world, r.RED);

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
