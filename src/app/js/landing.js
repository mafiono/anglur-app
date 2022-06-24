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