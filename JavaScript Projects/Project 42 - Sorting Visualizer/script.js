
const n = 9;
const array = [];
init();

// generate random numbers
function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.floor(Math.random() * (11 - 1) + 1);
    }
    showBars();
}

function play() {
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

// function for animating the bars
function animate(moves) {
    if (moves.length == 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type == 'swap') {
        [array[i], array[j]] = [array[j], array[i]];
    }
    showBars(move);
    setTimeout(function () {
        animate(moves);
    }, 200);
}

// implement the bubble sort function
function bubbleSort(array) {
    const moves = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                moves.push({
                    indices: [i, i + 1],
                    type: 'swap'
                });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            } else {
                moves.push({
                    indices: [i, i + 1],
                    type: 'comp'
                });
            }
        }
    } while (swapped);
    return moves;
}


// render the bars dynamically in the index html file
function showBars(move) {
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = array[i] * 10 + '%';
        bar.classList.add('bar');
        bar.innerHTML = Math.floor(array[i] * 10);
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type == 'swap' ? 'red' : 'green'; // red if swapping green if comparing
        }
        container.appendChild(bar);
    }
}
