$(document).ready(function(){
	var url = $("#url").html();
	console.log(url);
	$.ajax(
		{url: "../blogs/blogs.json", 
			success: function(result){
				blogs = result.blogs;
				
				$.each(blogs, function(i) {
					if(blogs[i]["url"] == url) {
						var created = "created on: " + blogs[i]["created_at"];
						var contents = blogs[i]["html_content"];
						var tags = blogs[i]["tags"];
						$("#blog-title").html(blogs[i]["title"]);
						$("#blog-date").html(created);
						
						$.each(contents, function(j) {
							var curr_content = "<p>" + contents[j] + "</p>";
							$("#blog-contents").append(curr_content);
						})
						
						if (tags != null) {
							$.each(tags, function(j) {
								var curr_tag = tags[j];
								$("#blog-tags").append("<a>" + curr_tag + "</a>");
							});
						} else {
							$("#blog-tags").addClass("hidden");
						}
						
						if ((i-1) >= 0) {
							var prev = "<a href=\"" + blogs[i-1]["url"] + "\">" + blogs[i-1]["title"] + "</a>";
							console.log(prev);
							$("#previous-blog").append(prev);
						} else {
							$("#previous-blog").addClass("hidden");
						}
					}
				});
			}
	   });
});
