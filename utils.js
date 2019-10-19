function updateRangeInput(elem) {$(elem).next().val($(elem).val());}

function curve(peak, min, max) {
	count = new Array(max).fill(0);
	for (i = 0; i < 5000; i++) {
		count[dice(peak, min, max)] += 1;
	}
	console.log("min-max", count[min + 2], count[max - 2])

	for (i = min; i < max; i++) {
//		console.log("graph", i, count[i]);
		ctx.fillStyle = "green";
		ctx.moveTo(500 + i*1,400);
		ctx.lineTo(500 + i*1,400 - count[i]);
		ctx.arc(500 + i*1,400 - count[i], 1, 0 , Math.PI*2);ctx.fill();
		ctx.closePath();
	}
}

function dice(peak, min=1, max=100) {
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
	console.log("result", peak, min, max, Math.floor(r) + min);
	return Math.floor(r);
}
