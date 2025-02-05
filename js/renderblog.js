$(document).ready(function(){
	var url = $("#url").html();
	console.log(url);
	$.ajax(
		{url: "../blog-generator/blogs.json", 
			success: function(result){
				blogs = result.blogs;
				
				$.each(blogs, function(i) {
					if(blogs[i]["url"] == url) {
						var created = "created on: " + blogs[i]["created_at"];
						var contents = blogs[i]["body"];
						var tags = blogs[i]["tags"];
						var blogImage = "<img src=\"images/" + blogs[i]["blog_image"] + "\">";
						$("#blog-title").html(blogs[i]["title"]);
						$("#blog-date").html(created);
						$("#blog-image").html(blogImage);
						
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
							var prev = "<a href=\"" + blogs[i-1]["url"] + ".html\">" + blogs[i-1]["title"] + "</a>";
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
