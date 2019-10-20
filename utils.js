function updateRangeInput(elem) {$(elem).next().val($(elem).val());}

function curve(peak, min, max) {
	count = new Array(max).fill(0);
	for (i = 0; i < 5000; i++) {
		count[gauss(peak, min, max)] += 1;
	}
	console.log("min-max", count[min + 2], count[max - 2])

	for (i = min; i < max; i++) {
//		console.log("graph", i, count[i]);
		timesheet.fillStyle = "green";
		timesheet.moveTo(500 + i*1,400);
		timesheet.lineTo(500 + i*1,400 - count[i]);
		timesheet.arc(500 + i*1,400 - count[i], 1, 0 , Math.PI*2);timesheet.fill();
		timesheet.closePath();
	}
}

function gauss(peak=50, min=1, max=100) {
	// generates a random integer in approximate bell curve around value
	if (typeof peak != 'number') {
		peak = parseInt(peak.val());
	}

	mid = max / 2;
	r = 0;
	v = 4;
	for (d = 0; d < v; d++) {
		r += Math.random();
	}

	r = (max - min) * r / v;

	if (r < mid ) {
		r = min + r * (peak - min)/(mid - min)
	} else {
		r = peak + (r - mid) * (max - peak)/(max - mid);
	}
//	console.log("result", peak, min, max, Math.floor(r) + min);
	return Math.floor(r);
}
