function Project(p){
	this.day = -1;
	this.colour = "#"+((1<<24)*Math.random()|0).toString(16);
	this.kanban = new Kanban();
	this.uncertainty = $('#uncertainty').val();
	this.lag = $('#lag').val();
	this.stop = false;

	this.team = new Team();
	this.total_days = $('#release_cadence').val() * $('#releases').val();
	console.log("total days", this.total_days);

	this.workaday = function(){

		if (this.day % 320 == 0) {
			timesheet.clearRect(0,0,1600,500);
		}

		this.day += 1;
		if (this.day % 7 == 5 || this.day % 7 == 6) {
			return;
		}

		this.team.motivate(this.day);

		this.stop = true;
		for (hour = 0; hour < 8; hour ++) {
			for (e = 0; e < $('#teamsize').val(); e++) {
				this.team.engineers[e].do_work(this.kanban, this.day);
				if (this.team.engineers[e].motivation > 0) {
					this.stop = false;
				}
			}
		}
		if (this.stop) {
			return;
		}

		this.kanban.end_of_day(this.day, $('#lag').val());

		this.team.draw(timesheet, this.day % 320);
	}

	this.plot = function (value) {
		graphs.fillStyle = this.colour;
		graphs.beginPath();
		graphs.arc(this.day * $('#scale').val() % 1600, 495 - (value * 2), 4, 0 , Math.PI*2);
		graphs.fill();
		graphs.closePath();
	}
}
function Team(){
	this.motivation = $('#motivation').val();
	this.engineers = [];

	for (i = 0; i < 100; i++) {
		this.engineers[i] = new Engineer();
	}

	this.motivate = function(day){
		var change = $('#motivation').val() - this.motivation;
		console.log("the beatings will continue...");
		if (change != 0 && day % $('#release_cadence').val() == $('#lag').val()) {
			console.log("until morale improves!!");
			for (i = 0; i < $('#teamsize').val(); i++) {
				if (this.engineers[i].motivation > 0) {
					this.engineers[i].motivation += change;
					console.log(change, this.engineers[i].name, this.engineers[i].motivation);
				}
			}
			this.motivation = $('#motivation').val();
		}
	}

	this.draw = function(timesheet, day){
		var engineer = new Engineer();
		for (e = 0; e < $('#teamsize').val(); e++) {
			this.engineers[e].draw(timesheet, e, day);
			if (engineer.motivation < this.engineers[e].motivation) {
				engineer = this.engineers[e];
			}
		}

		document.getElementById("name").innerHTML = engineer.name;
		document.getElementById("emotivation").innerHTML = engineer.motivation.toString();
		document.getElementById("tasks").innerHTML = engineer.tasks.toString();
	}
}
