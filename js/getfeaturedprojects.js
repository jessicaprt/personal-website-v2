$(document).ready(function(){
	drawStrings();
	$.ajax(
		{url: "../projects/projects.json", 
			success: function(result){
				renderFeaturedProjects(result.projects);
			}
	   });
});

function renderFeaturedProjects(projects) {
	var proj_ids = ["#project1", "#project2", "#project3"];
	var modal_ids = ["#modal0", "#modal1", "#modal2"];
	var title_ids = ["#prjTitle0", "#prjTitle1", "#prjTitle2"];
	var content_ids = ["#prjContent0", "#prjContent1", "#prjContent2"];
	
	var featured = [];
	
	$.each(projects, function(i) {
		if (projects[i]["featured_status"] == "featured")
			featured.push(projects[i]);	
	});
	
	$.each(proj_ids, function(i) {
		if (i < featured.length) {
			var current_proj = featured[i];
			
			var image_link = "../projects/images/" + featured[i]["image_link"];
			var renderImage = "<img src=\"" + image_link + "\" class=\"prj-image\">";
			var renderTitle = "<p class=\"prj-desc\"><button type=\"button\" class=\"btn btn-info btn-lg btn-prj\" data-toggle=\"modal\" data-target=\"#modal" + i + "\">" + featured[i]["name"] + "</button></p>";
				
			console.log(title_ids[i]);
			$(title_ids[i]).html(featured[i]["name"]);
			$(content_ids[i]).html(featured[i]["description"]);
			$(proj_ids[i]).html(renderImage + renderTitle);
		}
	});
}

function drawStrings() {
	var frames = ["prj-1-can", "prj-2-can", "prj-3-can"];
	frames.forEach(renderStrings);
}

function renderStrings(element, index) {
	console.log(element);
	var prjCanvas1 = document.getElementById(element);
	var ctx = prjCanvas1.getContext("2d");
	ctx.moveTo(0,80);
	ctx.lineTo(75,10);
	ctx.lineTo(150,80);
	ctx.shadowOffsetY = 3;
	ctx.shadowBlur    = 3;
	ctx.shadowColor   = "rgba(0,0,0,0.2)";
	ctx.strokeStyle="#333";
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(75, 10, 5, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fillStyle = "#555";
	ctx.fill();
}
