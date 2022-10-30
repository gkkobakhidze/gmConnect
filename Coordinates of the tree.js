let k = 99;
function calcN(k) {
    let n = Math.ceil(Math.log2(k) + 1);
    return n;
}
console.log(calcN(k));
let coor = [[], []];
function getYCoors(k) {
    let yCoor = new Array(k);
    for (let i = 1; i <= k; i++) {
        if (i <= 1) {
            yCoor[i - 1] = 1;
        } else {
            let num = Math.ceil(Math.log2(i) + 1);
            let kMin = Math.pow(2, (num - 2)) + 1;
            yCoor[i - 1] = num - 1 + Math.sin((i - kMin + 1) * Math.PI / (Math.pow(2, (num - 1)) - Math.pow(2, (num - 2)) + 1));
        }

    }
    return yCoor;
}
/* let num = Math.ceil(Math.log2(k) + 1);
if (k > 1) {
    let kMin = Math.pow(2, (num - 2)) + 1;


    let yCoor = num - 1 + Math.sin((k - kMin + 1) * Math.PI / (Math.pow(2, (num - 1)) - Math.pow(2, (num - 2)) + 1));
    let xCoor = num * (1 + Math.cos(Math.PI / (Math.pow(2, (num - 1)) - Math.pow(2, (num - 2)) + 1))) - 1;
    return yCoor;



} else {
    let yCoor = 1;
    return yCoor;
} */

function getXCoors(k) {
    let xCoor = new Array(k);

    for (let i = 1; i <= k; i++) {
        if (i <= 2) {
            xCoor[i - 1] = 0;
        } else {
            let num = Math.ceil(Math.log2(i) + 1);
            let kMin = Math.pow(2, (num - 2)) + 1;
            /* xCoor[i] = i; */

            xCoor[i - 1] = xCoor[Math.ceil((i / 2) - 1)] + Math.cos((i - kMin + 1) * Math.PI / (Math.pow(2, (num - 1)) - Math.pow(2, (num - 2)) + 1));
        }
        /* xCoor[i] = num + i + kMin */
    }
    /* } */
    return xCoor;
}

