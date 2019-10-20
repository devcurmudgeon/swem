_wishlist = 0;
_todo = 1;
_blocked = 2;
_doing = 3;
_review = 4;
_done = 5;
_released = 6;

function Issue(hours){
	this.hours = hours;
	this.importance = gauss(3, 1, 5);
	this.engineer = '';
	this.difficulty = gauss();
	this.day = 0;

	if (hours > 8 * $('#task_size').val()) {
		this.state = _wishlist;
	}		
	else {
		this.state = _todo;
	}
}

function Kanban(){
	this.states = ["wishlist", "todo", "blocked", "doing", "review", "done", "released"];		
	this.issues = [];

	for (i = 0; i < $('#scope').val(); i++) {
		this.issues[i] = new Issue(8);
	}

	this.end_of_day = function (day, lag){
		document.getElementById("day").innerHTML = day.toString();
		for (i = 0; i < this.states.length - 1; i++) {
			state = this.states[i];
			document.getElementById(state).innerHTML = "0";
		}

		var totals = [0,0,0,0,0,0,0];

		for (i = 0; i < this.issues.length; i++) {
//			console.log("kanban day issue", this.issues[i]);
			if ((this.issues[i].state == _blocked) && (this.issues[i].day + lag < day)) {
				this.issues[i].state = _todo;
				this.issues[i].day = day;
				this.issues[i].engineer = '';
				console.log("unblock issue", i, this.day);
			}

			if ((this.issues[i].state == _review) && (this.issues[i].day + lag < day)) {
				this.issues[i].state = _done;
				this.issues[i].day = day;
			}

			totals[this.issues[i].state] += 1;
		}

		if (day % $('#release_cadence').val() == 0) {
			console.log("RELEASE DAY", day)
			for (i = 0; i < this.issues.length; i++) {
				if (this.issues[i].state == _done) {
					this.issues[i].state = _released;
					this.issues[i].day = day;
					console.log("    release issue", i)
				}
			}
		}

		for (i = 0; i < totals.length; i++) {
			document.getElementById(this.states[i]).innerHTML = totals[i].toString();			
		}
	}
}
