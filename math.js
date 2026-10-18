function calcMax(data) {
    let max = 0;
    for (const i of data) {
        max = Math.max(i, max);
    }
    return max;
}

function calcScale(data, height) {
    const max = calcMax(data);
    return max / (0.9 * height);
}

function calcSum(data) {
    let sum = 0;
    for (const i of data) {
        sum += i;
    }
    return sum;
}

function calcAvg(data, height, noOfBars, scaleFactor) {
    const sum = calcSum(data, height, scaleFactor);
    const avg = sum / noOfBars;
    return height - avg / scaleFactor;
}

module.exports = {
    calcScale,
    calcAvg,
};
