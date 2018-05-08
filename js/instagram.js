var posts = [];

function loadImages() {
    d3.text("https://api.instagram.com/v1/users/self/media/recent/?access_token=20336872.d894268.21278a03c1bc4483a5a4a8f98675ec6e").then(function(text) {
        var instagram = JSON.parse(text);
        insta = instagram;
        for (var i=0; i<6; i++) {
            var id = "#insta-image" + (i+1);
            var insta_id = "insta" + (i+1);
            
            var image_url = instagram["data"][i]["images"]["standard_resolution"]["url"];
            var post_link = instagram["data"][i]["link"];
            
            var href="<a href=\"" +
                post_link +
                "\" target=\"__blank\"><img id=\"" + insta_id + "\" class=\"hidden\" src=\"assets/icons/instagram.png\"></a>";
            
            console.log(href);
            
            posts.push({
                key: image_url,
                value: post_link
            });
            
            
            var url = "url(" + image_url + ")";
            var svg = d3.select(id)
                .style("height","23vw")
                .style("width", "23vw")
                .style("background-image", url)
                .style("background-size", "cover")
                .style("background-position", "center")
                .html(href);
            
        }
    });
}

loadImages();

console.log(posts);

window.addEventListener