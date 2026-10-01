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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 100; // e.g., height of fixed header
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});
