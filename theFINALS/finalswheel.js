function gamba(items, rolls) {
    let have = {};

    for (let i = 0; i < rolls; i++) {
        let rng = Math.floor(Math.random() * 20) + 1;
        have[rng] = true;
    }

    let missing = 0;
    for (let i = 1; i <= items; i++) {
        if (!have[i]) {
            missing += 1;
        }
    }

    return missing;
}

function gambasim(items, rolls, testAmount) {
    items = parseInt(items) || 13;
    rolls = parseInt(rolls) || 42;
    let total = parseInt(testAmount) || 1000;
    
    let score = Array(items + 1).fill(0); // Ensure score array has enough slots for all possible missing items
    let resultOutput = '';

    for (let i = 0; i < total; i++) {
        let missing = gamba(items, rolls);
        score[missing] = (score[missing] || 0) + 1; // Increment the count for each missing outcome
    }

    for (let i = 0; i <= items; i++) {
        let count = score[i] || 0;
        let percentage = (count / total * 100).toFixed(2);
        resultOutput += `${i} items missing ${count}/${total} times = ${percentage}%<br>`;
    }

    document.getElementById("results").innerHTML = resultOutput;
}

function runSimulation() {
    let items = document.getElementById("items").value;
    let rolls = document.getElementById("rolls").value;
    let total = document.getElementById("total").value;

    gambasim(items, rolls, total);
}
