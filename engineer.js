function Engineer(){
	multitask_limit = 1;
	this.name = Math.random().toString(36).substring(7);
	this.relevance =  dice($('#relevance'));
	this.aptitude = dice($('#aptitude'));
	this.motivation = dice($('#motivation'));
	this.colour = "grey";
	this.issues = [];

	this.get_work = function(kanban){
		// check issues, find something relevant, add it to list
		for (i = 0; i < kanban.issues.length; i++) {
			if (this.issues.length < multitask_limit) {
				if (kanban.issues[i].state == _todo) {
					kanban.issues[i].engineer = this.name;
					kanban.issues[i].state = _doing;
					this.issues.push(i);
				}
			}
		}
	}

	this.work = function(kanban){
		if (this.issues.length != 0) {
			// already have something to do
			this.colour = "darkgreen";
			id = this.issues.pop();
			task = kanban.issues[id];

			if (task.state == _doing) {
				task.hours -= 1;
				this.issues.push(id);
			}
			if (task.hours <= 0) {
				task.state = _done;
			}
			kanban.issues[id] = task;

		} else {
			this.get_work(kanban);
		}

		if (this.motivation < 50) {
			this.colour = "red";
		}

		if (this.motivation < 5) {
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

