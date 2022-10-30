/* Hi GEORGE =) */
/* function calcN(k) {
    let n = new Array(k);
    for (let i = 1; i <= k; i++) {
        n[i - 1] = Math.ceil(Math.log2(i) + 1);

    }
    return n;
} */
/* Determine tree level */
function levels(k) {
    let lvl;
    if (k < 2) {
        lvl = 1
    } else if (k < 3) {
        lvl = 2
    } else if (k < 5) {
        lvl = 3
    } else if (k < 9) {
        lvl = 4
    } else if (k < 17) {
        lvl = 5
    } else if (k < 33) {
        lvl = 6
    } else if (k < 65) {
        lvl = 7
    } else if (k < 129) {
        lvl = 8
    } else if (k < 257) {
        lvl = 9
    } return lvl;
}
/* Calculate all y Coors */
function getYCoors(k) {
    let yCoor = new Array(k);
    for (let i = 1; i <= k; i++) {
        if (i <= 1) {
            yCoor[i - 1] = 1;
        } else {
/*             let num = Math.ceil(Math.log2(i) + 1);
 */            let num = levels(i);

            let kMin = Math.pow(2, (num - 2)) + 1;
            yCoor[i - 1] = num - 1 + Math.sin((i - kMin + 1) * Math.PI / (Math.pow(2, (num - 1)) - Math.pow(2, (num - 2)) + 1));
        }

    }
    return yCoor;
}

/* Calculate all x Coors */
function getXCoors(k) {
    let xCoor = new Array(k);

    for (let i = 1; i <= k; i++) {
        if (i <= 2) {
            xCoor[i - 1] = 0;
        } else {
            /* let num = Math.ceil(Math.log2(i) + 1); */
            let num = levels(i);
            let kMin = Math.pow(2, (num - 2)) + 1;
            /* xCoor[i] = i; */

            xCoor[i - 1] = xCoor[Math.ceil((i / 2) - 1)] + Math.cos((i - kMin + 1) * Math.PI / (Math.pow(2, (num - 1)) - Math.pow(2, (num - 2)) + 1));
        }
        /* xCoor[i] = num + i + kMin */
    }
    /* } */
    return xCoor;
}

