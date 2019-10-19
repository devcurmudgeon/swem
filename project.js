function Issue(){
	this.hours = dice($('#scope'));
	this.state = dice(1, 0, 2);
	this.importance = dice(3, 1, 5);
	this.engineer = -1;
	console.log("Issue:", this.hours, this.state, this.importance);
}

function Kanban(){
	this.states = ["wishlist", "todo", "doing", "review", "blocked", "done", "abandoned"];		

	this.issues = [];
	for (i = 0; i < $('#scope').val(); i++) {
		this.issues[i] = new Issue();
		state = this.states[this.issues[i].state];
		console.log("state: ", this.state);
		var count = parseInt(document.getElementById(state).innerHTML);
		count += 1;
		document.getElementById(state).innerHTML = count.toString();
	}
}

function Team(){
	this.engineers = [];
	for (i = 0; i < $('#teamsize').val(); i++) {
		this.engineers[i] = new Engineer();
	}
}

function Project(p){
	this.kanban = new Kanban();
	this.uncertainty = $('#uncertainty').val();
	this.lag = $('#lag').val();

	this.team = new Team();
	this.total_days = $('#sprintsize').val() * $('#iterations').val();
	console.log("total days", this.total_days, $('#sprintsize').val(), $('#iterations').val())
	this.day = 0;

	this.workaday = function(){
		for (hour = 0; hour < 1; hour ++) {
			for (e = 0; e < $('#teamsize').val(); e++) {
				this.team.engineers[e].work();
			}
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
}
