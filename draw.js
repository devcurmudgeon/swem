function draw(project) {
	ctx.linewidth = 0.1;
	
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(project.day*5, project.spec, 2, 0 , Math.PI*2);ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "darkgreen";
	ctx.arc(project.day*5, project.work, 2, 0 , Math.PI*2);ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "grey";
	ctx.arc(project.day*5, project.spare, 2, 0 , Math.PI*2);ctx.fill();
	ctx.closePath();

	for (e = 0; e < project.team.size; e++) {
		ctx.strokeText(project.team[e].name, 10, 10 + 10*e);
		project.team[e].work();
	}
}


