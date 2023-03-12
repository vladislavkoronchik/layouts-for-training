const menuIcon = document.querySelector('.menu-icon');
const navbarList = document.querySelector('.menu-list');

menuIcon.addEventListener('click', () => {
	menuIcon.classList.toggle('change');
	navbarList.classList.toggle('change');
});

const video = document.querySelector('.about__video');
const videoBtn = document.querySelector('.about__video-button-icon');
const videoBar = document.querySelector('.about__video-bar');

const playPause = () => {
	if (video.paused) {
		video.play();
		videoBtn.className = 'about__video-button-icon far fa-pause-circle';
		video.style.opacity = 0.7;
	} else {
		video.pause();
		videoBtn.className = 'about__video-button-icon far fa-play-circle';
		video.style.opacity = 0.3;
	}
}

videoBtn.addEventListener('click', playPause);

video.addEventListener('timeupdate', () => {
	const barWidth = video.currentTime / video.duration;
	videoBar.style.width = `${barWidth * 100}%`;

	if (video.ended) {
		videoBtn.className = 'about__video-button-icon far fa-play-circle';
		video.style.opacity = 0.3;
	}
});

const pricingSwiper = new Swiper(".pricing__swiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	coverflowEffect: {
		rotate: 70,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true,
	},
});
