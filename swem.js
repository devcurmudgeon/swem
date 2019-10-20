function simulate(project){
	project.workaday();
	released_per_day = parseInt($('#released').text()) / project.day;
	project.plot(released_per_day * 10);
}

function slow() {
	graphs = document.getElementById("graphs").getContext("2d");
	graphs.clearRect(0,0,1600,500);
	go(1000);
}

function go(wait_ms=5){
	timesheet = document.getElementById("timesheet").getContext("2d");
	graphs = document.getElementById("graphs").getContext("2d");

	project = new Project();
	var timer = setInterval(function(){simulate(project)}, wait_ms);
	setTimeout(function(){clearInterval(timer)}, wait_ms * project.total_days);
}
