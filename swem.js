function updateRangeInput(elem) {$(elem).next().val($(elem).val());}

function Engineer(){
	this.name = Math.random().toString(36).substring(7);
	this.experience = [Math.random(), Math.random(), Math.random(), Math.random()];
	this.aptitude =  Math.random();
	this.motivation =  Math.random();
	this.colour = "yellow";
	this.issues = [];

	this.work = function(issue){

		if (this.issues.length != 0) {
			// already have something to do
			console.log(this.name, " busy");
			this.colour = "darkgreen";
			// adjust issue
		} else {
			console.log(this.name, " blocked");
			this.colour = "red";
		}
		if (Math.random() > 0.5){
			this.colour = "blue";
		}
	}

	this.draw = function(ctx, id, day){
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.arc(day*5, id*5, 2, 0 , Math.PI*2);ctx.fill();
		ctx.closePath();		
	}
}

function Team(){
	this.engineers = [];
	for (i = 0; i < $('#teamsize').val(); i++) {
		this.engineers[i] = new Engineer();
	}
}

function Scope(){
	this.issues = [];
	for (i = 0; i < $('#issues').val(); i++) {
		this.issues[i] = new Issue();
	}
}

function Issue(){
	this.kind = [Math.random(), Math.random(), Math.random(), Math.random()];
	this.size = Math.random() * project.size;
	this.complete = Math.random();
}

function Project(p){
	this.uncertainty = $('#uncertainty').val();
	this.lag = $('#lag').val();

	this.team = new Team();
	this.scope = new Scope(); // array of severity, size
	this.total_days = $('#sprintsize').val() * $('#iterations').val();
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
	}
};

function simulate(project, ctx){
	console.log("simulate project", project);
	console.log("simulate team", project.team);
	project.workaday();
	project.draw(ctx);
}

function go(){
	ctx = document.getElementById("myCanvas").getContext("2d");
	ctx.clearRect(0,0,1000,500);

	project = new Project();
	var timer = setInterval(function(){simulate(project, ctx)}, 50);
	setTimeout(function(){clearInterval(timer)}, 50 * project.total_days);
}
