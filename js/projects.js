var allTags = [];
var selectedTags = [];
var selectedProjects = [];
var projects = [];
var projectIds = [];

$(document).ready(function(){
	$.ajax(
		{url: "projects.json", 
			success: function(result){
				var tags = getAllTags(result.projects);
				projects = result.projects;
				renderOptions(tags);
				setButtons(tags);
				renderProjects();
			}
	   });
	var tagsSize = allTags.length;
});

function getAllTags(projects) {
	var tagsSet = new Set([]);
	
	$.each(projects, function(i) {
		curr_tags = projects[i]["tags"];
		
		$.each(curr_tags, function(j) {
			tagsSet.add(curr_tags[j]);
		});
	});
	
	for (let tag of tagsSet)
		allTags.push(tag);
	
	return allTags;
}

function renderOptions(tags) {
	$("#projects-filter").append($('<option>', {
					value: "default",
					text: "- select filters -"
			}));
	$.each(tags, function(i) {
		$("#projects-filter").append($('<option>', {
					value: tags[i],
					text: tags[i]
			}));
		var renderListItem = "<li id=\"list-pb" + i + "\" class=\"hidden\">" + tags[i] + " <button id=\"pb" + i + "\">x</button></li>";
		$("#selected-tags").append(renderListItem);
		
	});			
}

function tagSelected(idx) {
	var currentTag = "#list-pb" + (idx-1);
	$(currentTag).removeClass("hidden");
	selectedTags.push(allTags[idx-1]);
	console.log(selectedTags);
	filterProjects();
	$("#projects-filter").val("default");
}

function setButtons(tags) {
	$.each(tags, function(i) {
		curr_button = "#pb" + i;
		curr_list = "#list" + i;
		
		$(curr_button).click(function() {
			var curr = this.getAttribute("id");
			var idx = curr.substring(2,3);
			var curr_list = "#list-" + curr;
			$(curr_list).addClass("hidden");
			removeFromList(idx);
			filterProjects();
		});
	});
}


function removeFromList(idx) {
	var item = allTags[idx];
	
	$.each(selectedTags, function(i) {
		if (selectedTags[i] == item) {
			selectedTags.splice(i,1);
		}
	});
	
	console.log(selectedTags);
}

function removeProjects() {
	$.each(projectIds, function(i) {
		$(projectIds[i]).remove();
	});
}

function renderProjects() {
	$.each(projects, function(i) {
		projectIds.push("#prj" + i);
		var projId = projects[i]["id"];
		var imageLink = "images/" + projects[i]["image_link"];
		var renderTitle = "<h3>" + projects[i]["name"] + "</h3>";
		var renderDescription = "<p>" + projects[i]["description"] + "</p>";
		var renderImage = "<div class=\"col-md-4\"><img src=\"" + imageLink + "\"></div>";
		
		var renderGithub = "";
		
		if (projects[i]["github_link"] != null) {
			renderGithub = "<a href=\"" + projects[i]["github_link"] + "\" target=\"_blank\"><img src=\"../assets/icons/github-logo.png\"></a>";
		}
		
		$("#projects-container").append("<div class=\"row\" id=\"prj" + projId + "\">" + renderImage + "<div class=\"col-md-8\">" + renderTitle + renderDescription + renderGithub + "</div>");
	});
}

function filterProjects() {
	if (selectedTags.length == 0) {
		removeProjects();
		renderProjects();
	} else {
		$.each(projects, function(i) {
			var prj_id = "#prj" + projects[i]["id"];
			var prj_tags = projects[i]["tags"];
			
			if (isInSelectedTags(prj_tags)) {
				$(prj_id).show(500);
			} else {
				$(prj_id).hide(500);
			}
		});
	}
}

function isInSelectedTags(tags) {
	var flag = false;
	$.each(tags, function(i){
		if (selectedTags.indexOf(tags[i]) >= 0) {
			flag = true;
			return true;
		}
	});
	return flag;
}