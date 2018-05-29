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
			console.log(i);
			var idx = blog_size-i - 1;
			console.log(idx)
			var renderTitle = "<h4><strong><a href=\"blogs/" + blogs[idx]["url"] + ".html\">"+ blogs[idx]["title"] + "</a></strong></h4>";
			var renderDate = "<p>Created at: " + blogs[idx]["created_at"] + "</p>";
			var content = blogs[idx]["html_content"].join(" ");
			var renderContent = "<p>" + content.substring(0,240)+ "<a href=\"blogs/" + blogs[idx]["url"] + ".html\">...Read More</a></p>";
			
			$(blog_ids[i]).html(
				renderTitle + 
				renderDate + 
				renderContent);
		} else {
			console.log("hiding")
		$(blog_ids[i]).addClass("hidden-content");
		}
	})
}

