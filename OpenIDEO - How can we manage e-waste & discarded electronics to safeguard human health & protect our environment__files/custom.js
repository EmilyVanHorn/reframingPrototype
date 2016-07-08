// CHANGING LINK ON MAIN LOGO
$(function() {
    $('.logo-container > a').attr('href', 'https://openideo.com');
});
// EOF CHANGING LINK ON MAIN LOGO


// CAUSELABS
$(function() {
    if (window.location.pathname === '/content/about-amplify') {
    	
    	// Append new font to HEAD
        $('head').append('<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7841474/650468/css/fonts.css" />');

    	
        // Append a class to the body
        $('body').addClass('amplify-page');

        // Hide the guest banner
        $('.guest-banner').hide();
        $('.headline-text').hide();

        // Add a new div banner
        var div = '<img src="https://s3-us-west-2.amazonaws.com/openideo-fonts/371461/amplify-banner-lockup.jpg" style="width: 100%;"></div><div class="amplify-banner-content"><img class="amplify-logo" alt="Image title" src="https://s3-us-west-2.amazonaws.com/openideo-fonts/371461/amplify-logo.png"><br><h2 class="sentinel-med amplify-banner-title">Amplify is a global network of problem solvers tackling some of international development\'s biggest challenges. Our current challenge focuses on resilience in urban slums.</h2><br><a class="btn amplify-banner-btn" style="background: #ef5c2f;" href="https://challenges.openideo.com/challenge/urban-resilience/brief">Contribute</a></div></div>';

        $('div.grid.gap').before(div);
    }
});



$(function() {
    if (window.location.pathname === '/content/how-openideo-works-test') {
    	
    	// Append new font to HEAD
        $('head').append('<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7841474/650468/css/fonts.css" />');

    	
        // Append a class to the body
        $('body').addClass('how-openideo-works-page');

        // Hide the guest banner
        $('.guest-banner').hide();

        // Add a new div banner
        var div = '<div style="width: 100%; height: 200px; background: #e65a6b;"></div>';

        $('div.grid.gap').before(div);
    }
});




$(function() {
    if (window.location.pathname === '/content/chapters' || window.location.pathname === '/content/chapters/') {
    	
    	$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
    	
    	// Append new font to HEAD
        $('head').append('<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7841474/650468/css/fonts.css" />');
        
        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />');

        
  	
        // Append a class to the body
        $('body').addClass('meetup-page');
        $('footer').removeClass('page-row');

                // Append a class to the body
        $('div.col-8.col-offset-2').addClass('col-md-12').removeClass('col-8 col-offset-2');

        // Hide the guest banner
        $('.guest-banner').hide();
        $('.headline-text').hide();

        // Add a new div banner
        var div = '<div class="hero"><div class="hero-content"><div class="col-md-8 col-md-offset-2"><h2>OpenIDEO Chapters is a network of local communities using design thinking to drive social impact around the world. We are a people-powered movement of action.</h2><div class="button-frame"><a class="btn" href="#join">Join a Chapter</a><a class="btn" href="#start">Start a Chapter</a></div></div><div class="img-frame"><img src="https://s3-us-west-2.amazonaws.com/openideo/Meetup+Page/Images/Hero/hero.jpg" style="width: 100%;"></div></div></div>';

                $('div.grid.gap').before(div);

    }
});

// EOF CAUSELABS

// BACKGROUND IMAGE ON CONTRIBUTION

$(function() {
	$(".item-summary").css("background","url(https://challenges.openideo.com/attachments/fe8dcce0-b431-4ff7-8230-d26b422a0396.png?id=2820) center no-repeat");
	$(".item-summary").css("background-size","contain");
	$(".item-summary > span").hide();
});

// EOF BACKGROUND IMAGE

// UTM TAGGING ON OI ENGINE LINK

$(function() {
	$(".engine-logo > a").attr("href","http://oiengine.com/?utm_source=openideo.com&utm_medium=footer-logo&utm_campaign=Clients");
});

// EOF UTM TAGGING ON OI ENGINE LINK

// SPONSOR LOGO & GALLERY REMOVAL

$(function() {

	$("#agricultural-innovation.challenge-header > .grid > .row > .col-12").prepend("<a href='http://www.openideo.com/amplify' target='_blank'><img src='https://challenges.openideo.com/attachments/8cfb221d-362e-499b-ad3c-8cbd83216c8b.png?id=2716' class='challenge-header-sponsor-logo' /></a>");

	$("#agricultural-innovation.challenge-header.brief > .grid > .row > .challenge-header-placeholder").prepend("<a href='http://www.openideo.com/amplify' target='_blank'><img src='https://challenges.openideo.com/attachments/8cfb221d-362e-499b-ad3c-8cbd83216c8b.png?id=2716' class='brief-header-sponsor-logo' /></a>");

	$("#agricultural-innovation.challenge-header.brief").parent().find(".gallery").hide();

});

// EOF SPONSOR LOGO & GALLERY REMOVAL

// FEEDBACK CORRECTION

$(function() {

$('.timeline-container > div > .primary-text:contains("feedbacks")').text('We follow a process with phases. Currently we are in the Evaluation phase. You can participate by giving feedback and suggestions to the selected ideas.');

if(window.location.href.indexOf("challenge/agricultural-innovation") > -1) {
    $('.rich-text.user-text').remove();
}

});

// EOF FEEDBACK CORRECTION

// CONTRIBUTION SUCCESS NOTIFICATION EXPERIMENT

$(function() {
	var expkey = dataLayer[0]['uid'];
	expkey = expkey.substr(expkey.length - 1);
		if($('.facebook-share').length && expkey != 8 && expkey != 9) {
			$(".message:contains('You have published')").append(' Well done!<h3 style="margin-top: 10px;">What to do next?</h3><p style="clear: both;">________________________________________</p><h4>1. Ask other users what they think about</h4><p>Mention any OpenIDEO user in the comment section below. Just start with @ and type their name. You can ask for their opinion or help!</p><p><a href="#!comments-section" class="secondary-sm-button"><span>COMMENT</span></a></p><p style="clear: both;">________________________________________</p><h4>2. Involve your friends</h4><p>Share your contribution on social media to get feedback and support from friends.</p><div><a href="#!" class="secondary-sm-button share-on-facebook" style="float: left; margin-right: 15px; margin-bottom: 15px;"><span>SHARE ON FACEBOOK</span></a><a href="#!" class="secondary-sm-button share-on-twitter" style="float: left; margin-right: 15px; margin-bottom: 15px;"><span>SHARE ON TWITTER</span></a><a href="#!" class="secondary-sm-button share-via-email"><span>SHARE VIA EMAIL</span></a></div><p style="clear: both;">________________________________________</p>');
			var ocfb = $('.facebook-share').attr('onclick');
			$('.share-on-facebook').attr('onclick',ocfb);
			var octw = $('.twitter-share').attr('onclick');
			$('.share-on-twitter').attr('onclick',octw);
			var ocem = $('.email-share').attr('href');
			$('.share-via-email').attr('href',ocem);
			if ( $('a:contains("Create team")').length ) {
				$(".message:contains('You have published')").append('<h4>3. Add team members</h4><p>You know someone who’d like to work with you? Add them on your team to keep them updated about changes about your idea.<p><a href="#!" class="secondary-sm-button add-a-teammember"><span>ADD A TEAM MEMBER</span></a></p><p style="clear: both;">________________________________________</p>');
				var occt = $('a:contains("Create team")').attr('href');
				$('.add-a-teammember').attr('href',occt);
			}
		}
});

// EOF SUCCESS NOTIFICATION EXPERIMENT