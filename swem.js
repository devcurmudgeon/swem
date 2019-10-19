function simulate(project, ctx){
	console.log("simulate project", project);
	console.log("simulate team", project.team);
	project.workaday();
	project.draw(ctx);
}

function go(){
	ctx = document.getElementById("myCanvas").getContext("2d");
	ctx.clearRect(0,0,1000,500);
//	curve (200, 1, 400);

	project = new Project();
	wait_ms = 500
	var timer = setInterval(function(){simulate(project, ctx)}, wait_ms);
	setTimeout(function(){clearInterval(timer)}, wait_ms * project.total_days);
}
