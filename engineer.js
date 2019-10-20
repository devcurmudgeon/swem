function Engineer(){
	multitask_limit = 3;
	this.name = Math.random().toString(36).substring(7);
	this.relevance =  gauss($('#relevance'));
	this.aptitude = gauss($('#aptitude'));
	this.motivation = 10 * gauss(50);
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
					difference = Math.abs(this.aptitude - kanban.issues[i].difficulty)
					if (difference < 30) {
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
				task.hours -= 1;
				// making progress motivates the engineer
				this.motivate(+1);
				this.tasks.push(id);
			}

			if (gauss() > 80) {
				task.state = _blocked;
				task.day = day;
				// being blocked frustrates the engineer a lot
				this.motivate(-10);
//				console.log("block issue", id, kanban.day);
			}

			if (task.hours <= 0) {
				task.state = _review;
				task.day = day;
				this.motivate(5);
			}

			kanban.issues[id] = task;

		} else {
			this.get_work(kanban);
		}
	}

	this.motivate = function(change){
		this.colour = "grey";
		this.motivation += change;

		if (this.motivation > 60) {
			this.colour = "green";
		}

		if (this.motivation < 20) {
			this.colour = "red";
		}
		if (this.motivation < 5) {
			this.colour = "black";
		}
	}

	this.draw = function(timesheet, id, day){
		if (this.motivation >= 0) {
			timesheet.fillStyle = this.colour;
			timesheet.beginPath();
			timesheet.arc(day*5, id*5, 2, 0 , Math.PI*2);
			timesheet.fill();
			timesheet.closePath();
		}
	}
}

