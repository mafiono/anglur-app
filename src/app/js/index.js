jQuery(document).ready(function($){

	iframeModalsInit();

	// COMMON
	animationInit();
	anchorSmoothScroll($);
	siteMenus($);
	headerSeachForm();
	siteDropdowns();
	customVideoPlayer($);
	postSlider();
	// siteSecurity();

	// MOBILE
	hamburger();
	mobileMenu($);

	// HOME PAGE
	categorieCards();
	customSelect();
	reviewsSlider();
	accordionHandler($);
	popupModals($);

	// EXPERT
	profileTabs();
	profileReviewSlider();
	reviewStarRaiting();

	// Post Page
	stickySidebar();

	// Close Outside
	document.addEventListener("click", function(event) {
		if (event.target.closest(".header-search")) return;
		if (event.target.closest(".dropdown-block")) return;

		document.querySelectorAll('.header-search').forEach(item => item.classList.remove('is-active'));
		document.querySelectorAll('.dropdown-block').forEach(item => item.classList.remove('is-active'));
	});

});

const iframeModalsInit = () => {

	$('.js-modal').magnificPopup({
  		type: 'iframe',
	});
}

const fakeSuccess = () => {

	if(!document.querySelector('.promo-singup__success')) return;

	document.querySelector('.promo-singup__success').style.visibility = 'visible';

	setTimeout(() => {

		document.querySelector('.promo-singup__success').style.visibility = 'hidden';

		if(!document.querySelectorAll('.form input')) return;
		document.querySelectorAll('.form input').forEach(input => {

			input.value = '';
		});

		if(!document.querySelectorAll('.form textarea')) return;
		document.querySelectorAll('.form textarea').forEach(textarea => {

			textarea.value = '';
		});

	}, 4000);
}

const headerSeachForm = () => {

	let searchButtons = document.querySelectorAll('.header-search__button');

	if(!searchButtons) return;

	searchButtons.forEach(button => {

			button.addEventListener('click', function(){

				this.parentElement.classList.add('is-active');
			});
	});

};

const siteDropdowns = () => {

	let blocks = document.querySelectorAll('.dropdown-block');
	if(!blocks) return;

	blocks.forEach( item => dropdownInit(item) );

	function dropdownInit(block){

		block.addEventListener('click', function(){

			this.classList.toggle('is-active');
		});

	}
}

const customVideoPlayer = ($) => {

	let player = $('.video-player');
	let button = player.find('.button-play');

	if(!player.length) return;

	let video = $('.video-player__html-player').get(0);

	$('.video-player__thumb').on('click', function(){

		player.addClass('is-active');
		video.play();
		button.hide();

	});

	if(window.innerWidth >= 768) {

		video.onpause = function() {
			button.show();
		};
	}

	video.onplay = function() {
		button.hide();
	};

	button.on('click', function(){

		video.play();
		player.addClass('is-active');
	});

}

const postSlider = () => {

	let slider;

	slider = new Swiper('.post-slider .swiper-container', {

		spaceBetween: 60,
		speed : 1600,

		navigation : {

			prevEl: '.post-slider .button-nav--prev',
			nextEl: '.post-slider .button-nav--next',
			disabledClass: 'is-disabled'
		},

		pagination: {

			el: '.slider-control__counter',
			type: 'custom',
			renderCustom: function (swiper, current, total) {

				(current <= 9) ? current = '0' + current : current;
				(total <= 9) ? total = '0' + total : total;

				return '<span class="_current">' + current + '</span><span class="_total">/ ' + total + '</span>';
			}


		},
	});
}

const siteSecurity = () => {

	window.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	}, false);
}

const categorieCards = () => {

	document.querySelectorAll('.categorie-cards__item').forEach( tab => {

		tab.addEventListener('click', tabsToggle)
	});

	function tabsToggle() {

		this.classList.toggle('is-selected');
	}
}

const customSelect = () => {

	if(!document.querySelector('.js-choice')) return;

	const choices = new Choices('.js-choice', {

		searchEnabled: false,
		itemSelectText: ''
	});
}

const reviewsSlider = () => {

	let slider;

	slider = new Swiper('.reviews-slider .swiper-container', {

		spaceBetween: 60,
		effect: 'fade',
		speed : 1600,
		autoHeight: true,

		navigation : {

			prevEl: '.reviews-slider .button-nav--prev',
			nextEl: '.reviews-slider .button-nav--next',
			disabledClass: 'is-disabled'
		},

		pagination: {

			el: '.reviews-slider__counter',
			type: 'custom',
			renderCustom: function (swiper, current, total) {

				(current <= 9) ? current = '0' + current : current;
				(total <= 9) ? total = '0' + total : total;

				return '<span class="_current">' + current + '</span><span class="_total">/ ' + total + '</span>';
			}


		},
	})
}

const accordionHandler = ($) => {

	$('.accordion-item').on('click', function(){

		$(this).find('.accordion-item__body').slideToggle(400);
		$(this).toggleClass('is-active');
	});
}

const popupModals = ($) => {

	$('.js-video-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		// focus: '#username',
		// modal: true,
		showCloseBtn: false,
		closeOnBgClick: true,
		callbacks: {
			close : function() {

				videoResset();
			}
		}

	});

	$('.js-modal-alert').magnificPopup({

		type: 'inline',
		preloader: false,
		// focus: '#username',
		// modal: true,
		showCloseBtn: false,
		closeOnBgClick: true,
		mainClass: 'mfp-modal-alert',

		callbacks: {

			open: function() {

				$('.site').addClass('glass-overflow-in');
			},

			close: function(){
				$('.site').addClass('glass-overflow-out');

				setTimeout(() => {
					$('.site').removeClass('glass-overflow-in glass-overflow-out');
				}, 800);
			}
		}
	});

	$(document).on('click', '.js-close-modal', function (e) {
		e.preventDefault();
		$.magnificPopup.close();

		videoResset();
	});

	function videoResset(){

		if(!$('.video-player__html-player').length) return;

		$('.video-player').removeClass('is-active');
		$('.video-player__html-player').get(0).pause();
		$('.video-player__html-player').get(0).currentTime = 0;
	}

}

const animationInit = () => {

	AOS.init({

		disable: 'mobile',
		once: true,
	});

	let rellax = new Rellax('.rellax', {

		center: true
	});

  	SmoothScroll({ stepSize: 60 });

}

const mobileMenu = ($) => {

	// $('.menu-item-has-children > a').on('click', function(e){
	// 	e.preventDefault();
	// 	$(this).parent().toggleClass('is-collapsed');
	// 	$(this).parent().find('.sub-menu').slideToggle(400);
	// })

	if(window.innerWidth <= 1024) {

		$('.menu-item-has-children > a').append('<span class="sub-menu-toggle"></span>')
	}

	$('.sub-menu-toggle').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();

		$(this).parents('.menu-item-has-children').toggleClass('is-collapsed');
		$(this).parents('.menu-item-has-children').find('.sub-menu').slideToggle(400);
	});
}

const hamburger = () => {

	if(!document.querySelector('.hamburger')) return;

	document.querySelector('.hamburger').addEventListener('click', function(e) {
		this.classList.toggle('is-active');

		document.querySelector('.mobile-aside').classList.toggle('active');
		document.body.classList.toggle('overflow');
	});
}

const anchorSmoothScroll = ($) => {
$('a[href*="#"]').not('a[href^="#modal"]').click(function (event) {
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
		location.hostname == this.hostname
	) {
		var target = $(this.hash);

		if (target.length) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top - 140
			}, 1000, function () {

				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")) {
					return false;
				} else {
					$target.attr('tabindex', '-1');
					$target.focus();
				}
			});
		}
	}
});
}

const profileTabs = () => {

	let tabButtons = document.querySelectorAll('.profile-tabs__tab-button');
	let tabsContent = document.querySelectorAll('.profile-tabs__content-tab');

	if(!tabButtons) return;

	tabButtons.forEach((tab, index) => {

		tab.addEventListener('click', function(){
			let element = this;
			tabHandler(element, index);
		});
	});

	function tabHandler(element, index) {

		tabButtons.forEach(tab => tab.classList.remove('is-active'));
		element.classList.add('is-active');

		tabsContent.forEach((el, index) => {
			el.classList.remove('is-active');
		})

		tabsContent[index].classList.add('is-active');
	}
}

const profileReviewSlider = () => {

	let slider;

	slider = new Swiper('.review-slider', {

		slidesPerView: 2,
		spaceBetween: 30,
		speed: 1400,

		navigation : {

			prevEl: '.review-slider__control .button-nav--prev',
			nextEl: '.review-slider__control .button-nav--next',
			disabledClass: 'is-disabled'
		},

		pagination: {

			el: '.review-slider__control .slider-control__counter',
			type: 'custom',
			renderCustom: function (swiper, current, total) {

				(current <= 9) ? current = '0' + current : current;
				(total <= 9) ? total = '0' + total : total;

				return '<span class="_current">' + current + '</span><span class="_total">/ ' + total + '</span>';
			}


		},

		breakpoints: {

			320 : {
				spaceBetween: 30,
				slidesPerView: 1,
			},

			1024 : {

				slidesPerView: 2,
			},

			1200 : {

				spaceBetween: 60,
			}
		}
	});
}

const reviewStarRaiting = () => {

	let stars = document.querySelectorAll('.rating__star');

	if(!stars) return;

	stars.forEach(star => {

		star.addEventListener('click', function(){

			stars.forEach(item => item.classList.remove('is-active'));
			this.classList.add('is-active');
		})
	});
}

const stickySidebar = () => {
	if(!document.querySelector('.js-sticky-widget')) return;
	var stickyEl = new Sticksy('.js-sticky-widget', {topSpacing: 32})
}

const siteMenus = ($) => {

	$('.footer-menu').on('click', '.current-menu-item', function(){

		$(this).toggleClass('is-active');
		$(this).find('> .sub-menu').slideToggle(400);
	});
}
window.addEventListener('DOMContentLoaded', function(){

	// categoryToggle();
	// testimonialSlider();
	// videoPlayer();

});

const categoryToggle = () => {



	document.querySelector('.hero-control__categories').addEventListener('click', function(){

		document.querySelector('.hero-categories').classList.add('is-active');
		document.body.classList.add('glass-overflow-in');
	});

	document.querySelector('.hero-categories ._close').addEventListener('click', function(){

		document.querySelector('.hero-categories').classList.remove('is-active');
		document.body.classList.remove('glass-overflow-in');
		document.body.classList.add('glass-overflow-out');

		setTimeout(() => {
			document.body.classList.remove('glass-overflow-out');
		}, 1000);
	});
}

const testimonialSlider = () => {

	let slider;
	slider = new Swiper('.testimonial-slider', {

		speed : 1200,

		navigation: {

			nextEl: '.testimonial-slider__nav ._next',
			prevEl: '.testimonial-slider__nav ._prev',
			disabledClass: '_disabled'
		},

		pagination: {

			el: '.testimonial-slider__pagination',
			type: 'bullets',
		}
	});
}

const videoPlayer = () => {

	let playerContainer = document.querySelector('.video-player');

	if(!playerContainer) return;

	let player = document.querySelector('.video-player__movie source');

	playerContainer.addEventListener('click', function(){

		this.classList.add('is-active');
		player.src = player.dataset.src;
		document.querySelector('.video-player__movie').load();

	});
}
