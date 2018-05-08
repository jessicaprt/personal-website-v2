$(document).ready(function(){
    $("#header-image").fadeIn("5000");
    
    var insta_images = [
       "#insta-image1",
       "#insta-image2",
       "#insta-image3",
       "#insta-image4",
       "#insta-image5",
       "#insta-image6"];
    
    var insta_links = [
        "#insta1",
        "#insta2",
        "#insta3",
        "#insta4",
        "#insta5",
        "#insta6"];
    
    $.each(insta_images, function(im){
        $(insta_images[im]).hover(
        function() {
            $(this).css("opacity", 0.5);
            $(insta_links[im]).removeClass("hidden");
        },
        function() {
            $(this).css("opacity", 1);
            $(insta_links[im]).addClass("hidden");
        });
    });
});