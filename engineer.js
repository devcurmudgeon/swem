function Engineer(){
	multitask_limit = 3;
	this.name = Math.random().toString(36).substring(7);
	this.relevance =  gauss($('#relevance'));
	this.aptitude = gauss($('#aptitude'));
	this.motivation = gauss(50);
	this.colour = "grey";
	this.tasks = [];

	this.get_work = function(kanban){
		// check issues, find something relevant, add it to list
		if (this.tasks.length < multitask_limit) {
			this.motivate(-1);
			for (i = 0; i < kanban.issues.length; i++) {
				if (kanban.issues[i].state == _todo) {
					kanban.issues[i].engineer = this.name;
					kanban.issues[i].state = _doing;
					// exponential effect of ability on time required
					console.log(this.name, this.aptitude, "gets job", i, kanban.issues[i].hours)
					kanban.issues[i].hours *= (101 - this.aptitude)/50;
					this.tasks.push(i);
					console.log(this.name, this.aptitude, "will do job", i, kanban.issues[i].hours)
					// capable engineer is motivated by hard tasks
					// less capable engeer is demotivated by hard tasks
					// aptitude difficulty
					// high     high        +ve
					// low      high        -ve
					// high     low         -ve
					// low      low         +ve
					difference = Math.abs(this.aptitude - kanban.issues[i].difficulty);
					if (difference < 45) {
						console.log("happy engineer", this.name, this.aptitude, kanban.issues[i].difficulty)
						this.motivate(difference);
					} else {
						console.log("unhappy engineer", this.name, this.aptitude, kanban.issues[i].difficulty)
						this.motivate(difference * -1);
					}
					break;
				}
			}
		}
	}

	this.do_work = function(kanban, day){
		if (this.motivation < 0) {
			return;
		}

		kanban.cost += 1 * kanban.hourly_rate;

		if (this.tasks.length != 0) {
			id = this.tasks.pop();
			task = kanban.issues[id];

			if (task.state == _doing) {
				var waste = $('#developer_cycle').val() * gauss() / 50;
				waste = (waste % 60 )/ 60;
				task.hours -= 1;
				task.hours += waste;
				// making progress pleases the engineer
				this.motivate(+1);
				this.tasks.push(id);
			}

			if (gauss() > 80) {
				task.state = _blocked;
				task.day = day + $('#lag').val() * gauss()/100;
				// being blocked frustrates the engineer a lot
				this.motivate(-10);
//				console.log("block issue", id, kanban.day);
			}

			if (task.hours <= 0) {
				task.state = _review;
				task.day = day + $('#lag').val() * gauss()/100;
				this.motivate(5);
			}

			kanban.issues[id] = task;

		} else {
			this.get_work(kanban);
			if (this.tasks.length == 0) {
				this.motivation -= 1; // no work to do
			}
		}
	}

	this.motivate = function(change){
		this.motivation += change;

		this.colour = "grey";

		if (this.motivation > 150) {
			this.colour = "green";
		}

		if (this.motivation < 50) {
			this.colour = "red";
		}
		if (this.motivation < 20) {
			this.colour = "black";
		}
	}

	this.draw = function(timesheet, id, day){
		if (this.motivation >= 0) {
			timesheet.fillStyle = this.colour;
			timesheet.beginPath();
			timesheet.arc(day * $('#scale').val(), id * $('#scale').val() + 2, $('#scale').val() * .4, 0 , Math.PI*2);
			timesheet.fill();
			timesheet.closePath();
		}
	}
}

