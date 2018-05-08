$(document).ready(function(){
	$.ajax(
		{url: "../blogs/blogs.json", 
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
		if (i <= blog_size-i) {
			var renderTitle = "<h4><strong><a href=\"blogs/" + blogs[i]["url"] + "\">"+ blogs[i]["title"] + "</a></strong></h4>";
			var renderDate = "<p>Created at: " + blogs[i]["created_at"] + "</p>";
			var content = blogs[i]["html_content"].join(" ");
			var renderContent = "<p>" + content.substring(0,240)+ "<a href=\"blogs/" + blogs[i]["url"] + "\">...Read More</a></p>";
			
			$(blog_ids[i]).html(
				renderTitle + 
				renderDate + 
				renderContent);
		} else {
			$(blog_ids[i]).addClass("hidden");
		}
	})
}

