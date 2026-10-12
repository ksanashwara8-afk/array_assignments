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

    const scale = m.calcScale(data, HEIGHT);
    const avg = m.calcAvg(data, HEIGHT, noOfBars, scale);

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
        scale,
        avg,
    };
}

function createBar(n, width, height, gap, data, scale) {
    const x = (width + gap) * n;
    const y = height - data[n] / scale;
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
        world.scale,
    );
    drawRect(barTODraw, r.DARKBLUE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    for (let n = 0; n <= world.noOfBars; n++) {
        drawBar(n, world);
    }

    r.DrawLine(0, world.avg, world.WIDTH, world.avg, r.RED);

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
