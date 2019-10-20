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
					this.tasks.push(i);
					this.motivate(10);
					break;
				}
			}
		}
	}

	this.do_work = function(kanban){
		if (this.tasks.length != 0) {
			// already have something to do
			id = this.tasks.pop();
			task = kanban.issues[id];

			if (gauss() > 80) {
				task.state = _blocked;
				task.day = kanban.day;
				this.motivate(-10);
				console.log("block issue", id, kanban.day);
			}

			if (task.state == _doing) {
				task.hours -= 1;
				this.motivate(5);
				this.tasks.push(id);
			}

			if (task.hours <= 0) {
				task.state = _review;
				this.motivate(5);
				this.tasks.push(id);
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
		if (this.motivation < 10) {
			this.colour = "black";
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

