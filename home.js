let speed = document.getElementById('setspeed');
//console.log(speed.value);
let barsCount = 200;
let heights = [];
let sorted = false;
let sortbtn = document.getElementById('init');
let resetbtn = document.getElementById('shuffle');
resetbtn.disabled = true;
resetbtn.style.cursor = "not-allowed";
function makeBars() {
    for (let i = 1; i <= barsCount / 2; i++) {
        $("#sort-container").append("<div class='bar' id='brcolor'></div>");
    }
}
let time = 1;
makeBars();
let bars = $(".bar");

setRandomBars();

function setRandomBars() {
    heights = [];
    for (let i = 1; i <= barsCount / 2; i++) {
        heights.push(i * 3);
    }

    //Shuffle the bars
    async function shuffle(heights) {
        let currentIndex = heights.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = heights[currentIndex];
            heights[currentIndex] = heights[randomIndex];
            heights[randomIndex] = temporaryValue;
            $(bars[currentIndex]).height(heights[currentIndex]);
            $(bars[randomIndex]).height(heights[randomIndex]);
            await timer(timer);
        }

        for (let i = 0; i < bars.length; i++) {
            $(bars[i]).height(heights[i]);
        }
        return heights;
    }

    shuffle(heights);
}


function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

function swap(heights, first_Index, second_Index) {
    let temp = heights[first_Index];
    heights[first_Index] = heights[second_Index];
    heights[second_Index] = temp;
}

// BUBBLE SORT
async function bubbleSort(heights) {
    let len = heights.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (ahead == false)
                return;
            if (heights[j - 1] > heights[j]) {
                let temp = heights[j - 1];
                heights[j - 1] = heights[j];
                heights[j] = temp;
                $(bars[j]).height(heights[j]);
                $(bars[j - 1]).height(heights[j - 1]);
                await timer(time);
            }
        }
    }
    return heights;
}

// QUICKSORT
async function quickSort(heights, left, right) {
    let index;
    if (heights.length > 1) {
        let pivot = heights[Math.floor((right + left) / 2)], //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            if (ahead == false)
                return;
            while (heights[i] < pivot) {
                if (ahead == false)
                    return;
                i++;
            }
            while (heights[j] > pivot) {
                if (ahead == false)
                    return;
                j--;
            }
            if (i <= j) {
                swap(heights, i, j); //sawpping two elements
                $(bars[i]).height(heights[i]);
                $(bars[j]).height(heights[j]);
                await timer(time);
                i++;
                j--;
            }
        }

        index = i;

        if (left < index - 1) {
            //more elements on the left side of the pivot
            quickSort(heights, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            quickSort(heights, index, right);
        }
    }
    return heights;
}

// SELECTION SORT
async function selectionSort(heights) {
    let minIdx, temp,
        len = heights.length;
    for (let i = 0; i < len; i++) {
        minIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (ahead == false)
                return;
            if (heights[j] < heights[minIdx]) {
                minIdx = j;
            }
        }
        temp = heights[i];
        heights[i] = heights[minIdx];
        heights[minIdx] = temp;
        $(bars[i]).height(heights[i]);
        $(bars[minIdx]).height(heights[minIdx]);
        await timer(time);
    }
    return heights;
}

// INSERTION SORT
async function insertionSort(heights) {
    let i, len = heights.length, el, j;

    for (i = 1; i < len; i++) {
        el = heights[i];
        j = i;

        while (j > 0 && heights[j - 1] > el) {
            if (ahead == false)
                return;
            heights[j] = heights[j - 1];
            $(bars[j]).height(heights[j]);
            await timer(time);
            j--;
        }

        heights[j] = el;
        $(bars[j]).height(heights[j]);
        await timer(time);
    }

    return heights;
}

// COUNTING SORT
async function countingSort(heights, min, max) {
    let i, z = 0, count = [];

    for (i = min; i <= max; i++) {
        count[i] = 0;
    }

    for (i = 0; i < heights.length; i++) {
        count[heights[i]]++;
    }

    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            if (ahead == false)
                return;
            heights[z++] = i;
            $(bars[z - 1]).height(heights[z - 1]);
            await timer(time);
        }
    }
    return heights;
}


// MERGE SORT
async function mergeSort(heights) {
    let n = heights.length;
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
        // Pick starting point of different subarrays of current size 
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // Find ending point of left subarray. mid+1 is starting  
            // point of right 
            let a = left_start + curr_size - 1;
            let b = n - 1;
            let mid = a < b ? a : b;
            //let mid = min(left_start + curr_size - 1, n-1); 
            a = left_start + 2 * curr_size - 1;
            b = n - 1;
            let right_end = a < b ? a : b;
            //let right_end = min(left_start + 2*curr_size - 1, n-1); 

            let l = left_start;
            let m = mid;
            let r = right_end;
            let i, j, k;
            let n1 = m - l + 1;
            let n2 = r - m;

            /* create temp arrays */
            let L = new Array(n1);
            let R = new Array(n2);

            /* Copy data to temp arrays L[] and R[] */
            for (i = 0; i < n1; i++)
                L[i] = heights[l + i];
            for (j = 0; j < n2; j++)
                R[j] = heights[m + 1 + j];

            /* Merge the temp arrays back into heights[l..r]*/
            i = 0;
            j = 0;
            k = l;
            while (i < n1 && j < n2) {
                if (ahead == false)
                    return;
                if (L[i] <= R[j]) {
                    heights[k] = L[i];
                    $(bars[k]).height(heights[k]);
                    await timer(1);
                    i++;
                }
                else {
                    heights[k] = R[j];
                    $(bars[k]).height(heights[k]);
                    await timer(1);
                    j++;
                }
                k++;
            }

            /* Copy the remaining elements of L[], if there are any */
            while (i < n1) {
                if (ahead == false)
                    return;
                heights[k] = L[i];
                $(bars[k]).height(heights[k]);
                await timer(1);
                i++;
                k++;
            }

            /* Copy the remaining elements of R[], if there are any */
            while (j < n2) {
                if (ahead == false)
                    return;
                heights[k] = R[j];
                $(bars[k]).height(heights[k]);
                await timer(time);
                j++;
                k++;
            }
        }
    }
}

//mergesort(heights);
//console.log(heights);
speed.addEventListener("input", function () {
    document.getElementById('ishowspeed').innerHTML = `${speed.value}`
})

let ahead = false;
function helper() {
    let speed = document.getElementById('setspeed');
    console.log(speed.value);
    time = 50 - speed.value * 5;
    sortbtn.disabled = true;
    sortbtn.style.cursor = "not-allowed";
    resetbtn.disabled = false;
    resetbtn.style.cursor = "default";
}
$("#init").click(function (e) {
    e.preventDefault();
    helper();
    if (sorted)
        return;
    sorted = true;
    ahead = true;
    let option = $("#list").val();
    if (option == "bubble") {
        document.getElementById('tct').innerHTML = "Time Complexity:";
        document.getElementById('tc').innerHTML = "O(N²)";
        document.getElementById('sct').innerHTML = "Space Complexity:"
        document.getElementById('sc').innerHTML = "O(1)";
        bubbleSort(heights);
    } else if (option == "insertion") {
        document.getElementById('tct').innerHTML = "Time Complexity:";
        document.getElementById('tc').innerHTML = "O(N²)";
        document.getElementById('sct').innerHTML = "Space Complexity:"
        document.getElementById('sc').innerHTML = "O(1)";
        insertionSort(heights);
    } else if (option == "selection") {
        document.getElementById('tct').innerHTML = "Time Complexity:";
        document.getElementById('tc').innerHTML = "O(N²)";
        document.getElementById('sct').innerHTML = "Space Complexity:"
        document.getElementById('sc').innerHTML = "O(1)";
        selectionSort(heights, 0, heights.length - 1);
    } else if (option == "quick") {
        document.getElementById('tct').innerHTML = "Average Time Complexity:"
        document.getElementById('tc').innerHTML = "O(NlogN)";
        document.getElementById('sct').innerHTML = "Space Complexity:"
        document.getElementById('sc').innerHTML = "O(1)";
        quickSort(heights, 0, heights.length - 1);
    } else if (option == "count") {
        document.getElementById('tct').innerHTML = "Time Complexity:";
        document.getElementById('tc').innerHTML = "O(N+K)";
        document.getElementById('sct').innerHTML = "Space Complexity:"
        document.getElementById('sc').innerHTML = "O(K)";
        countingSort(heights, 0, 400);
    } else if (option == "merge") {
        document.getElementById('tct').innerHTML = "Time Complexity:";
        document.getElementById('tc').innerHTML = "O(NlogN)";
        document.getElementById('sct').innerHTML = "Space Complexity:"
        document.getElementById('sc').innerHTML = "O(N)";
        mergeSort(heights);
    }

    //console.log(heights);
});

function reset() {
    document.getElementById('tct').innerHTML = "";
    document.getElementById('tc').innerHTML = "";
    document.getElementById('sct').innerHTML = ""
    document.getElementById('sc').innerHTML = "";
    sortbtn.disabled = false;
    sortbtn.style.cursor = "default";
    resetbtn.disabled = true;
    resetbtn.style.cursor = "not-allowed";
}

$("#shuffle").click(function (e) {
    e.preventDefault();
    reset();
    ahead = false;
    setRandomBars();
    sorted = false;
});