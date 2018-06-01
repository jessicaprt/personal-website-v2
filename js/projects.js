var allTags = [];
var selectedTags = [];

$(document).ready(function(){
	$.ajax(
		{url: "projects.json", 
			success: function(result){
				var tags = getAllTags(result.projects);
				renderOptions(tags);
				setButtons(tags);
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
					text: "all"
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