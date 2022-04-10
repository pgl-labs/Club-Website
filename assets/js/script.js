/* COI	:	ICO */
(function($){
	'use strict';
	var $win = $(window), $body_m = $('body'), $navbar = $('.navbar');

	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body_m.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () {
		wwCurrent = winwidth();
	});

	// Sticky
	var $is_sticky = $('.is-sticky');
	if ($is_sticky.length > 0 ) {
		var $navm = $('#mainnav').offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop();
			if ($win.width() > 991 || $is_sticky.hasClass('mobile-sticky')) {
				if($scroll > $navm.top ){
					if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
				} else {
					if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
				}
			} else {
				if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
			}
		});
	}

	// OnePage Scrolling
	$('a.menu-link[href*="#"]:not([href="#"])').on("click", function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var toHash = $(this.hash), toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false, nbar = (wwCurrent >= 992) ? $navbar.height() - 1 : 0;

			toHash = toHash.length ? toHash : toHashN;
			if (toHash.length) {
				$('html, body').animate({
					scrollTop: (toHash.offset().top - nbar)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $(".nav li a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}

	// Bootstrap Dropdown
	var $dropdown_menu = $('.dropdown'), $dropdown_toggle = $('.dropdown-toggle');
	if ($dropdown_menu.length > 0 ) {
		$dropdown_menu.on("mouseover",function(){
			if ($win.width() > 991) {
				$(this).children('.dropdown-menu').stop().fadeIn(400);
				$(this).addClass('open');
			}
		});
		$dropdown_menu.on("mouseleave",function(){
			if ($win.width() > 991) {
				$(this).children('.dropdown-menu').stop().fadeOut(400);
				$(this).removeClass('open');
			}
		});
		$dropdown_toggle.on("click",function(){
			if ($win.width() < 991) {
				$(this).parent().children('.dropdown-menu').fadeToggle(400);
				$(this).parent().toggleClass('open');
				return false;
			}
		});
	}

	$win.on('resize', function() {
		$('.navbar-collapse').removeClass('in');
		$dropdown_menu.parent().children('.dropdown-menu').fadeOut("400");
	});

	// remove ani
	var $navtoggler = $('.navbar-toggler'), $trannav =$('.is-transparent');
	if ($navtoggler.length > 0) {
		$navtoggler.on("click",function(){
			$('.remove-animation').removeClass('animated');
			if (!$trannav.hasClass('active')) {
				$trannav.addClass('active');
			}else{
				$trannav.removeClass('active');
			}
		});
	}

	// Select
	var $selectbox = $('select');
	if ($selectbox.length > 0) {
		$selectbox.select2();
	}

	// Nav collapse
	$('.menu-link').on("click",function() {
		$('.navbar-collapse').collapse('hide');
		$trannav.removeClass('active');
	});
	$(document).on('mouseup', function(e){
		if (!$trannav.is(e.target) && $trannav.has(e.target).length===0) {
			$('.navbar-collapse').collapse('hide');
			$trannav.removeClass('active');
		}
	});

	//Carousel Time Line
	var $timeline_carousel = $('.timeline-carousel');
	if ($timeline_carousel.length > 0 ) {
		var c_rtl = ($body_m.hasClass('is-rtl')) ? true : false;
		$timeline_carousel.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:6,
			nav:true,
			margin:30,
			rtl: c_rtl,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:5,
				},
				1170 : {
					items:6,
				}
			}
		});
	}

	//Carousel Roadmap
	var $roadmap_carousel = $('.roadmap-carousel');
	if ($roadmap_carousel.length > 0 ) {
		var c_rtl_r = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel.addClass('owl-carousel').owlCarousel({
			items:6,
			nav:false,
			dost:true,
			margin:30,
			rtl: c_rtl_r,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}

	//Carousel Roadmap
	var $roadmap_carousel_withnav = $('.roadmap-carousel-withnav');
	if ($roadmap_carousel_withnav.length > 0 ) {
		var c_rtl_rn = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel_withnav.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:5,
			nav:true,
			dost:false,
			margin:30,
			rtl: c_rtl_rn,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}

	//Carousel Prblm Sltn
	var $prblmsltn_list = $('.prblmsltn-list');
	if ($prblmsltn_list.length > 0 ) {
		var c_rtl_pl = ($body_m.hasClass('is-rtl')) ? true : false;
		$prblmsltn_list.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"],
			items:1,
            margin:30,
			nav:true,
			dost:false,
            autoplay:true,
            loop:true,
            animateOut: 'fadeOut',
            autoHeight: true,
			rtl: c_rtl_pl
		});
	}

	//Carousel
	var $has_carousel = $('.has-carousel');
	if ($has_carousel.length > 0 ) {
		var c_rtl_c = ($body_m.hasClass('is-rtl')) ? true : false;
		$has_carousel.each(function(){
			var $self = $(this);
			var c_item = ($self.data('items')) ? $self.data('items') : 4;
			var c_item_t = (c_item >= 3) ? 2 : c_item;
			var c_item_m = (c_item_t >= 2) ? 1 : c_item_t;
			var c_delay =($self.data('delay')) ? $self.data('delay') : 6000;
			var c_auto =($self.data('auto')) ? true : false;
			var c_loop =($self.data('loop')) ? true : false;
			var c_dots = ($self.data('dots')) ? true : false;
			var c_navs = ($self.data('navs')) ? true : false;
			var c_ctr = ($self.data('center')) ? true : false;
			var c_mgn = ($self.data('margin')) ? $self.data('margin') : 30;
			$self.addClass('owl-carousel').owlCarousel({
				navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: c_mgn, center: c_ctr,
				autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 300, rtl: c_rtl_c,
				responsive:{ 0:{ items:1 }, 480:{ items: c_item_m }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
			});
		});
	}

	// Count Down
	var $count_token = $('.token-countdown');
	if ($count_token.length > 0 ) {
		$count_token.each(function() {
			var $self = $(this), datetime = $self.attr("data-date");
			$self.countdown(datetime).on('update.countdown', function(event) {
				$(this).html(event.strftime('' + '<div class="col"><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">D<span>ays</span></span></div>' + '<div class="col"><span class="countdown-time">%H</span><span class="countdown-text">H<span>ours</span></span></div>' + '<div class="col"><span class="countdown-time">%M</span><span class="countdown-text">M<span>inutes<span></span></div>' + '<div class="col"><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">S<span>econds</span></span></div>'));
			});
		});
	}

	var $count_s2 = $('.countdown-s2');
	if ($count_s2.length > 0 ) {
		$count_s2.each(function() {
			var $self = $(this), datetime = $self.attr("data-date");
			$self.countdown(datetime).on('update.countdown', function(event) {
				$(this).html(event.strftime('' + '<div class="countdown-s2-item"><span class="countdown-s2-time countdown-time-first">%D</span><span class="countdown-s2-text">Days</span></div>' + '<div class="countdown-s2-item"><span class="countdown-s2-time">%H</span><span class="countdown-s2-text">Hours</span></div>' + '<div class="countdown-s2-item"><span class="countdown-s2-time">%M</span><span class="countdown-s2-text">Min</span></div>' + '<div class="countdown-s2-item"><span class="countdown-s2-time countdown-time-last">%S</span><span class="countdown-s2-text">Sec</span></div>'));
			});
		});
	}

	//POPUP - Content
	var $content_popup = $('.content-popup');
	if ($content_popup.length > 0 ) {
		$content_popup.magnificPopup({
			type: 'inline',
			preloader: true,
			removalDelay: 400,
			mainClass: 'mfp-fade bg-team-exp'
		});
	}

	//POPUP - Video
	var $video_play = $('.video-play');
	if ($video_play.length > 0 ) {
		$video_play.magnificPopup({
			type: 'iframe',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false,
			callbacks: {
			beforeOpen: function() {
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
		});
	}

	//ImageBG
	var $imageBG = $('.imagebg');
	if ($imageBG.length > 0) {
		$imageBG.each(function(){
			var $this = $(this),
				$that = $this.parent(),
				overlay = $this.data('overlay'),
				image = $this.children('img').attr('src');
			var olaytyp = (typeof overlay!=='undefined' && overlay!=='') ? overlay.split('-') : false;

			// If image found
			if (typeof image!=='undefined' && image !==''){
				if (!$that.hasClass('has-bg-image')) {
					$that.addClass('has-bg-image');
				}
				if ( olaytyp!=='' && (olaytyp[0]==='dark') ) {
					if (!$that.hasClass('light')) {
						$that.addClass('light');
					}
				}
				$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
			}
		});
	}
	// Mask Class add
	var $maskOV = $('[class*="mask-ov"]');
	if ($maskOV.length > 0) {
		$maskOV.each(function(){
			var $this = $(this), $that = $this.parent();
			if (!$that.hasClass('has-maskbg')) {
				$that.addClass('has-maskbg');
			}
		});
	}
	// Ajax Form Submission
	var contactForm = $('#contact-form'), subscribeForm = $('#subscribe-form');
	if (contactForm.length > 0 || subscribeForm.length > 0) {
		if( !$().validate || !$().ajaxSubmit ) {
			console.log('contactForm: jQuery Form or Form Validate not Defined.');
			return true;
		}
		// ContactForm
		if (contactForm.length > 0) {
			var selectRec = contactForm.find('select.required'),
			qf_results = contactForm.find('.form-results');
			contactForm.validate({
			invalidHandler: function () { qf_results.slideUp(400); },
			submitHandler: function(form) {
				qf_results.slideUp(400);
				$(form).ajaxSubmit({
					target: qf_results, dataType: 'json',
					success: function(data) {
						var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
						qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
						if (data.result !== 'error') { $(form).clearForm().find('.input-field').removeClass('input-focused'); }
					}
				});
				}
			});
			selectRec.on('change', function() { $(this).valid(); });
		}
		// SubscribeForm
		if (subscribeForm.length > 0) {
			var sf_results = subscribeForm.find('.subscribe-results');
			subscribeForm.validate({
			invalidHandler: function () { sf_results.slideUp(400); },
			submitHandler: function(form) {
				sf_results.slideUp(400);
				$(form).ajaxSubmit({
					target: sf_results, dataType: 'json',
					success: function(data) {
						var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
						sf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
						if (data.result !== 'error') { $(form).clearForm(); }
					}
				});
				}
			});
		}
	}

	// Input Animation
	var $inputline = $('.input-line');
	if ($inputline.length > 0) {
		$inputline.each(function(){
			var $this = $(this);
			var $thisval = $(this).val();
			if($thisval.length > 0) {
				$this.parent().addClass('input-focused');
			}
			$this.on('focus', function(){
				$this.parent().addClass('input-focused');
			});
			$this.on('blur', function(){
				$this.parent().removeClass('input-focused');
				var $afterblur = $(this).val();
					if($afterblur.length > 0) {
					$this.parent().addClass('input-focused');
				}
			});

		});
	}

	// On Scroll Animation
	var $aniKey = $('.animated');
	if($().waypoint && $aniKey.length > 0){
		$win.on('load', function() {
			$aniKey.each(function(){
			var aniWay = $(this), typ = aniWay.data("animate"), dur = aniWay.data("duration"), dly = aniWay.data("delay");
			aniWay.waypoint(function(){
				aniWay.addClass("animated "+typ).css("visibility", "visible");
				if(dur){
					aniWay.css('animation-duration', dur+'s');
				}
				if(dly){
					aniWay.css('animation-delay', dly+'s');
				}
				}, { offset: '93%' });
			});
		});
	}

	// Preloader
	var $preload = $('#preloader'), $loader = $('#loader');
	if ($preload.length > 0) {
		$win.on('load', function() {
			$loader.fadeOut(300);
			$body_m.addClass("loaded");
			$preload.delay(700).fadeOut(300);
		});
	}

	/* @v1.2.0 */
	//Process Slider
	var slider_p = '.slider-pane', slider_n = '.slider-nav,.slider-dot';
	if ($(slider_p).length > 0 ) {
		var c_rtl_s = ($body_m.hasClass('is-rtl')) ? true : false;
		$(slider_p).addClass('owl-carousel').owlCarousel({
		 	items:1,
			nav:false,
			dotsContainer:slider_n,
			margin:30,
			loop:true,
			autoplayTimeout:3000,
			rtl: c_rtl_s,
			autoplay:true,
			animateOut:'fadeOut',
			autoplayHoverPause:true
		});
	}

    // accordian
	var $card = $('.card');
	if ($card.length > 0) {
		$card.each(function(){
			var $cha = $('.card-header a') ;
			$cha.on('click', function(){
                var $this = $(this);
                $this.parent().parent().parent().parent().find($card).removeClass('active');
				$this.parent().parent().parent().addClass('active');
			});
		});
	}

	// svg lego blockchain animation
	window.launchApp = function() {

    /// ---------------------------
    //  INIT
    /// ---------------------------
    this.blocksContainer = document.getElementById('blocks-container');
    this.illustrationsContainer = document.getElementById('illustrations-container');
    this.blockTime = 5000;
    this.transactionsPerSecond = 2000;
    this.blockHeight = 7.81;
    this.blockNumber = 0;
    this.maxBlocks = 6;
    this.blocks = [];
    this.currentBlockValidation = true;
    this.colors = ['blue', 'green', 'yellow', 'orange', 'red'];
    this.wrongBlocks = ['big-1', 'big-2', 'small-1', 'small-2'];
    this.wheel = document.getElementById('wheel');
    this.wheelShadow = document.getElementById('wheel-shadow');
    this.bulb = document.getElementById('bulb');
    this.bulbLight = document.getElementById('bulb-light');
    this.bulb1 = document.getElementById('bulb-1');
    this.bulb2 = document.getElementById('bulb-2');
    this.bulb3 = document.getElementById('bulb-3');
    this.bar = document.getElementById('bar');
    this.satelliteArm1 = document.getElementById('satellite-arm-1');
    this.satelliteArm2 = document.getElementById('satellite-arm-2');
    this.satelliteHead = document.getElementById('satellite-head');
    this.wave1 = document.getElementById('wave-1');
    this.wave2 = document.getElementById('wave-2');
    this.wave3 = document.getElementById('wave-3');

    this.initApp = function() {
      this.createBlock();
      this.launchParticles();
    }

    /// ---------------------------
    //  BLOCK UTILS
    /// ---------------------------
    this.createBlock = function() {
      var color = this.colors[Math.floor(Math.random()*this.colors.length)];
      var randomValidation = Math.floor(Math.random() * Math.floor(5));
      this.currentBlockValidation = (randomValidation === 1 ? false : true);


      var block = document.createElement("div");
      if (!this.currentBlockValidation) {
        var form = this.wrongBlocks[Math.floor(Math.random()*this.wrongBlocks.length)];
        block.className = 'block is-' + color + ' is-' + form;
      } else {
        block.className = 'block is-' + color;
      }

      var blockPlane = document.createElement("div");
      blockPlane.className = 'block-plane';

      var blockCircles1 = document.createElement("div");
      blockCircles1.className = 'circles circles-1';
      var blockCircles2 = document.createElement("div");
      blockCircles2.className = 'circles circles-2';

      var blockFaceLeft = document.createElement("div");
      blockFaceLeft.className = 'block-face face-left';
      var blockFaceRight = document.createElement("div");
      blockFaceRight.className = 'block-face face-right';

      var blockData = document.createElement("div");
      blockData.className = 'block-data';
      var blockDataBlock = document.createElement("p");
      var blockNumber = document.createTextNode('Block: ' + (this.blockNumber + 1).toString());
      var blockDataTransactions = document.createElement("p");
      var transactionsNumber = Math.floor(Math.random() * ((this.blockTime / 1000) * this.transactionsPerSecond) + 0).toString();
      var blockTransactions = document.createTextNode('Transactions: ' + transactionsNumber);

      blockPlane.appendChild(blockCircles1);
      blockPlane.appendChild(blockCircles2);
      blockDataBlock.appendChild(blockNumber);
      blockDataTransactions.appendChild(blockTransactions);
      blockData.appendChild(blockDataBlock);
      blockData.appendChild(blockDataTransactions);
      block.appendChild(blockPlane);
      block.appendChild(blockFaceLeft);
      block.appendChild(blockFaceRight);
      block.appendChild(blockData);

      this.blocks.push(block);
      this.blocksContainer.appendChild(block, blockData)

      this.showBlock(block, blockData);
      this.validateBlock();

      var self = this;
      setTimeout(function() {
        if (self.currentBlockValidation) {
          self.blockNumber++;
        }
        self.createBlock();
      }, self.blockTime);

      if (this.blockNumber >= this.maxBlocks && self.currentBlockValidation) {
        this.deleteLastBlock();
      }
    }

    this.deleteLastBlock = function() {
      this.blocksContainer.removeChild(this.blocks[0]);
      this.blocks.splice(0, 1);
    }
    this.deleteCreatedBlock = function() {
      var lastBlockPosition = this.blocks.length;
      this.blocksContainer.removeChild(this.blocks[this.blockNumber]);
      this.blocks.splice(this.blockNumber, 1);
    }

    this.validateBlock = function() {
      this.validationAnimation();
    }

    /// ---------------------------
    //  SOUND UTILS
    /// ---------------------------

    /// ---------------------------
    //  UTILS
    /// ---------------------------
    this.launchParticles = function() {
      var particlesOptions = {
        "particles": {
          "number": {
            "value": 25,
            "density": {
              "enable": false,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "attract": {
              "enable": false
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false
            },
            "onclick": {
              "enable": false
            },
            "resize": true
          }
        },
        "retina_detect": true
      };

      particlesJS('item-particles', particlesOptions);
    }

    /// ---------------------------
    //  ANIMATIONS
    /// ---------------------------
    this.showBlock = function(block, blockData) {
      var self = this;
      var baseTimeline = new TimelineMax({
        onComplete: function() {
          if (self.currentBlockValidation) {
            self.addBlockToPile();
          } else {
            self.throwBlock(block);
          }
        }
      });
      baseTimeline.clear();

      baseTimeline
        .to(block, 0.5, {css: {top: "0%"}, ease: Power2.easeOut})
        .to(blockData, 0.5, {css: {opacity: "1", left: "100%"}, ease: Power2.easeOut}, 0.4)
        .to(blockData, 0.5, {css: {opacity: "0", left: "90%"}, ease: Power2.easeOut}, 3);
    }

    this.addBlockToPile = function() {
      var blockLength = this.blocks.length;
      for (i = 0; i < blockLength; i++) {
        new TimelineMax().to(this.blocks[i], 0.5, {css: {top: "40%", marginTop: (blockLength - i) * (this.blockHeight / 2) + "vw"}, ease: Power2.easeOut});
      }
    }

    this.throwBlock = function(block) {
      var self = this;

      new TimelineMax({
        onComplete: function() {
          self.deleteCreatedBlock();
          self.resetAnimationValues();
        }
      }).to(block, 0.5, {left: "-35vw", ease: Power2.easeOut});
    }

    this.validationAnimation = function() {
      var self = this;
      var bulbColor = (this.currentBlockValidation ? "#9ed027" : "#eb413b")

      var baseTimeline = new TimelineMax({
        onComplete: function() {
          self.resetAnimationValues();
        }
      });
      baseTimeline.clear();

      baseTimeline
        .to(this.wheel, 2, {rotation: "360deg", ease: Power2.easeOut}, 0.9)
        .to(this.wheelShadow, 2, {rotation: "360deg", ease: Power2.easeOut}, 0.9)
        .to(this.bar, 2, {width: "100%", ease: Power2.easeOut}, 0.9)
        .to(this.bulb1, 0.1, {fill: "#eb413b", ease: Power2.easeOut}, 0.9)
        .to(this.bulb2, 0.1, {fill: "#f9eb2f", ease: Power2.easeOut}, 1.16)
        .to(this.bulb3, 0.1, {fill: "#9ed027", ease: Power2.easeOut}, 1.72)
        .to(this.bulb, 0.1, {fill: bulbColor, ease: Power2.easeOut}, 2.38)
        .to(this.bulbLight, 0.1, {css: {boxShadow: "0px -10px 30px " + bulbColor}, ease: Power2.easeOut}, 2.38)
        .to(this.satelliteArm1, 0.5, {rotation: "90deg", ease: Power2.easeOut}, 0.4)
        .to(this.satelliteArm2, 0.5, {rotation: "-130deg", ease: Power2.easeOut}, 0.4)
        .to(this.satelliteHead, 0.5, {rotation: "20deg", ease: Power2.easeOut}, 0.4)
        .to(this.wave1, 0.8, {left: "-6vw", opacity: "0.4", scale: "2.3", ease: "linear"}, 0.9)
        .to(this.wave2, 0.8, {left: "-6vw", opacity: "0.4", scale: "2.3", ease: "linear"}, 1.1)
        .to(this.wave3, 0.8, {left: "-6vw", opacity: "0.4", scale: "2.3", ease: "linear"}, 1.3)
        .to(this.bar, 0.5, {width: "0%", ease: Power2.easeOut}, 3)
        .to(this.bulb1, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulb2, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulb3, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulb, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulbLight, 0.1, {css: {boxShadow: "0px 0px 0px transparent"}, ease: Power2.easeOut}, 3)
        .to(this.satelliteArm1, 0.5, {rotation: "0deg", ease: Power2.easeOut}, 3)
        .to(this.satelliteArm2, 0.5, {rotation: "0deg", ease: Power2.easeOut}, 3)
        .to(this.satelliteHead, 0.5, {rotation: "0deg", ease: Power2.easeOut}, 3)
        .to(this.wave1, 0.2, {left: "-6.5vw", opacity: "0", scale: "2.8", ease: "linear"}, 1.7)
        .to(this.wave2, 0.2, {left: "-6.5vw", opacity: "0", scale: "2.8", ease: "linear"}, 1.9)
        .to(this.wave3, 0.2, {left: "-6.5vw", opacity: "0", scale: "2.8", ease: "linear"}, 2.1)

      setTimeout(function() {
        self.illustrationsContainer.classList.add('is-animated');

        setTimeout(function() {
          self.illustrationsContainer.classList.remove('is-animated');
        }, 2100);
      }, 900);
    }
    this.resetAnimationValues = function() {
      TweenLite.set(this.wheel, {clearProps: "rotation"});
      TweenLite.set(this.wheelShadow, {clearProps: "rotation"});
      TweenLite.set(this.wave1, {left: "-3.5vw", opacity: "0", scale: "1"});
      TweenLite.set(this.wave2, {left: "-3.5vw", opacity: "0", scale: "1"});
      TweenLite.set(this.wave3, {left: "-3.5vw", opacity: "0", scale: "1"});
    }


    /// ---------------------------
    //  START
    /// ---------------------------
    this.initApp();
  };

  document.addEventListener("DOMContentLoaded", function() {
    this.app = new launchApp();
  });

	// particlesJS
	var $particles_js = $('#particles-js'), $particles_color = "#2b56f5", $particles_color_alt = "#00c0fa" ;
    if ($body_m.hasClass('io-zinnia')) { $particles_color = "#fff", $particles_color_alt = "#fff"; }
	if ($particles_js.length > 0 ) {
		particlesJS('particles-js',
		// Update your personal code.
        {
		"particles": {
			"number": {
				"value": 30,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": $particles_color_alt,
			},
			"shape": {
				"type": "circle",
				"opacity": 0.20,
				"stroke": {
					"width": 0,
					"color": $particles_color,
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.30,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.12,
					"sync": false
				}
			},
			"size": {
				"value": 6,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.08,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": $particles_color,
				"opacity": 0.50,
				"width": 1.3
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "repulse"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
				"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
			"retina_detect": true
		}
		// Stop here.
      );
	}


})(jQuery);
