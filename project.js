function Project(p){
	this.day = -1;
	this.kanban = new Kanban();
	this.uncertainty = $('#uncertainty').val();
	this.lag = $('#lag').val();

	this.team = new Team();
	this.total_days = $('#release_cadence').val() * $('#releases').val();

	this.workaday = function(){
		this.day += 1;
		if (this.day % 7 == 5 || this.day % 7 == 6) {
			return;
		}

		this.team.motivate(this.day);

		for (hour = 0; hour < 8; hour ++) {
			for (e = 0; e < $('#teamsize').val(); e++) {
				engineer = this.team.engineers[e];
				if (engineer.motivation > 0) {
					engineer.do_work(this.kanban);
				}
			}
		}

		this.kanban.end_of_day(this.day, $('#lag').val());
		this.team.draw(ctx, this.day);
	}
}

function Team(){
	this.motivation = $('#motivation').val();
	this.engineers = [];
	for (i = 0; i < 100; i++) {
		this.engineers[i] = new Engineer();
	}

	this.motivate = function(day){
		change = $('#motivation').val() - this.motivation;
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

	this.draw = function(ctx, day){
		for (e = 0; e < $('#teamsize').val(); e++) {
			this.engineers[e].draw(ctx, e, day);
		}

		engineer = this.engineers[$('#engineer').val()];
		document.getElementById("name").innerHTML = engineer.name;
		document.getElementById("emotivation").innerHTML = engineer.motivation.toString();
		document.getElementById("tasks").innerHTML = engineer.tasks.toString();
	}
}
