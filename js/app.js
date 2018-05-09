$(document).ready(function(){
//    $("#header-image").mouseover(function(){
//		$(this).css(
//		'background-image', 
//		'url(\"../assets/header_style.jpg\")');
//	});
	
	$("a").on('click', function(event) {
		var valid_hashes = ["#about-me", "#projects", "#daily"];
		if (jQuery.inArray(this.hash, valid_hashes) != -1) {
			console.log(this.hash);
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
			scrollTop: $(hash).offset().top
			}, 800, function(){
				window.location.hash = hash;
			});
		}
	});

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
	
	$(window).scroll( function(){
    
        $('.hide-element').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({
					'opacity':'1'			
				}, 500);
				
				$(this).removeClass("hide-element");
            }
        }); 
    
    });
});

$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});