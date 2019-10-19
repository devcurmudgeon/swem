function Engineer(){
	this.name = Math.random().toString(36).substring(7);
	this.relevance =  dice($('#relevance'));
	this.aptitude = dice($('#aptitude'));
	this.motivation = dice($('#motivation'));
	this.colour = "grey";
	this.issues = [];

	this.get_work = function(){
		// check issues, find something relevant, add it to list
		console.log(this.name, "get_work")		
	}

	this.work = function(issue){
		if (this.issues.length != 0) {
			// already have something to do
			console.log(this.name, " busy");
			this.colour = "darkgreen";
			// adjust issue
		} else {
			this.get_work();
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

