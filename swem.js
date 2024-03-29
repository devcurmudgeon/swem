function simulate(project){
	if (!project.stop) {
		project.workaday();
		project.plot(parseInt($('#released').text()));
	}
}

function slow() {
	graphs = document.getElementById("graphs").getContext("2d");
	graphs.clearRect(0,0,1600,500);
	go(1000);
}

function go(wait_ms=30){
	timesheet = document.getElementById("timesheet").getContext("2d");
	graphs = document.getElementById("graphs").getContext("2d");

	var project = new Project();
	var timer = setInterval(function(){simulate(project)}, wait_ms);
	setTimeout(function(){clearInterval(timer)}, wait_ms * project.total_days);
}
