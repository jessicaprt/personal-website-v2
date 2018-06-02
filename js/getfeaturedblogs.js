$(document).ready(function(){
	$.ajax(
		{url: "../blog-generator/blogs.json", 
			success: function(result){
				renderFeaturedBlogs(result.blogs);
			}
	   });
});

function renderFeaturedBlogs(blogs) {
	var blog_size = Object.keys(blogs).length;
	
	var blog_ids = ["#featuredblog1",
				   "#featuredblog2",
				   "#featuredblog3"];
	
	$.each(blog_ids, function(i) {
		if (i < blog_size) {
			var idx = blog_size-i - 1;
			var renderTitle = "<h4><strong><a href=\"blogs/" + blogs[idx]["url"] + ".html\">"+ blogs[idx]["title"] + "</a></strong></h4>";
			var renderDate = "<p>Created at: " + blogs[idx]["created_at"] + "</p>";
			var content = blogs[idx]["body"].join(" ");
			var renderContent = "<p>" + content.substring(0,240)+ "<a href=\"blogs/" + blogs[idx]["url"] + ".html\">...Read More</a></p>";
			
			var renderDescription = ("<div class=\"col-md-8\">" + renderTitle + 
				renderDate + 
				renderContent + "</div>");
			
			var renderImage = ("<div class=\"col-md-4\"><img src=\"blogs/images/" + blogs[idx]["blog_image"] + "\"></div>");
			
			$(blog_ids[i]).html(renderDescription + renderImage);
		} else {
			$(blog_ids[i]).addClass("hidden-content");
		}
	})
}

