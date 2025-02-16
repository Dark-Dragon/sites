let totalitems = 20;

function gamba(items, rolls, part) {
    let have = {};
	
	for (let i = items; i < totalitems; i++) {
		have[i+1] = true;
	}
	
	let i = 0;
    while (i < rolls) {
        let rng = Math.floor(Math.random() * totalitems) + 1;
		if (have[rng] == true) {
			part++;
			if (part >= 4) {
				rolls++;
				part = 0;
			}
		}
        have[rng] = true;
		i++;
    }

    let missing = 0;
    for (let i = 1; i <= totalitems; i++) {
        if (!have[i]) {
            missing += 1;
        }
    }

    return missing;
}

function gambasim(items, rolls, parts, testAmount) {
    items = parseInt(items) || 20;
    rolls = parseInt(rolls) || 40;
	parts = parseInt(parts) || 0;
    let total = parseInt(testAmount) || 10000;
    
    let score = Array(items + 1).fill(0); // Ensure score array has enough slots for all possible missing items
    let resultOutput = '';

    for (let i = 0; i < total; i++) {
        let missing = gamba(items, rolls, parts);
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
	let parts = document.getElementById("parts").value;
    let total = document.getElementById("total").value;

    gambasim(items, rolls, parts, total);
}
