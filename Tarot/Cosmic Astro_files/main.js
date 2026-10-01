jQuery(document).ready(function($) {
	"use strict";

	$('.flip,.guideButton').click(function(){
			$(this).find('.tarot').addClass('flipped');
			$('.guideButton').hide();
			$(".infobox").fadeIn(3000);
	});

	$('#full-screen-button').click(function(){
		$('#talking-head').toggleClass('on-top-of');
	});
});
