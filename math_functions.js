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

function calcSum(data, height, scale) {
    let sum = 0;
    for (const i of data) {
        const y = height - i / scale;
        sum += y;
    }
    return sum;
}

function calcAvg(data, height, noOfBars, scale) {
    const sum = calcSum(data, height, scale);
    return sum / noOfBars;
}

module.exports = {
    calcScale,
    calcAvg,
};
