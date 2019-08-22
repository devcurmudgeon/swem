function updateRangeInput(elem) {$(elem).next().val($(elem).val());}

function Engineer(){
	this.name = Math.random().toString(36).substring(7);
	this.relevance =  dice($('#relevance'));
	this.aptitude = dice($('#aptitude'));
	this.motivation = dice($('#motivation'));
	this.colour = "grey";
	this.issues = [];

	this.work = function(issue){

		if (this.issues.length != 0) {
			// already have something to do
			console.log(this.name, " busy");
			this.colour = "darkgreen";
			// adjust issue
		} else {
			console.log(this.name, " blocked");
			this.motivation -= 5;
		}

		if (this.motivation < 50) {
			this.colour = "red";
		}
	}

	this.draw = function(ctx, id, day){
		if (this.motivation > 0) {
			ctx.fillStyle = this.colour;
			ctx.beginPath();
			ctx.arc(day*5, id*5, 2, 0 , Math.PI*2);ctx.fill();
			ctx.closePath();
		}
	}
}

function Team(){
	this.engineers = [];
	for (i = 0; i < $('#teamsize').val(); i++) {
		this.engineers[i] = new Engineer();
	}
}

function Kanban(){
	this.states = ["wishlist", "todo", "doing", "review", "blocked", "done", "abandoned"];
}

function Scope(kanban){
	this.issues = [];
	for (i = 0; i < $('#scope').val(); i++) {
		this.issues[i] = new Issue();
		state = kanban.states[this.issues[i].state];
		console.log("state: ", this.state);
		var count = parseInt(document.getElementById(state).innerHTML);
		count += 1;
		document.getElementById(state).innerHTML = count.toString();
	}
}

function Issue(){
	this.size = dice($('#scope'));
	this.state = dice(1, 0, 1);
	this.importance = dice(3, 1, 5);
	this.engineer = -1;
	console.log("Issue:", this.size, this.state, this.importance);
}

function Project(p){
	this.kanban = new Kanban();
	this.scope = new Scope(this.kanban); // array of severity, size
	this.uncertainty = $('#uncertainty').val();
	this.lag = $('#lag').val();

	this.team = new Team();
	this.total_days = $('#sprintsize').val() * $('#iterations').val();
	console.log("total days", this.total_days, $('#sprintsize').val(), $('#iterations').val())
	this.day = 0;

	this.workaday = function(){
		for (e = 0; e < $('#teamsize').val(); e++) {
			this.team.engineers[e].work();
		}
		this.day++;
	}

	this.draw = function(ctx){
		for (e = 0; e < $('#teamsize').val(); e++) {
			this.team.engineers[e].draw(ctx, e, this.day);
		}
		engineer = this.team.engineers[$('#engineer').val()];
		document.getElementById("name").innerHTML = engineer.name;
		document.getElementById("emotivation").innerHTML = engineer.motivation.toString();
		document.getElementById("eaptitude").innerHTML = engineer.aptitude.toString();
		document.getElementById("erelevance").innerHTML = engineer.relevance.toString();
		document.getElementById("issues").innerHTML = engineer.issues.length.toString();
	}
};

function simulate(project, ctx){
	console.log("simulate project", project);
	console.log("simulate team", project.team);
	project.workaday();
	project.draw(ctx);
}

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

function go(){
	ctx = document.getElementById("myCanvas").getContext("2d");
	ctx.clearRect(0,0,1000,500);
//	curve (200, 1, 400);

	project = new Project();
	wait_ms = 500
	var timer = setInterval(function(){simulate(project, ctx)}, wait_ms);
	setTimeout(function(){clearInterval(timer)}, wait_ms * project.total_days);
}
