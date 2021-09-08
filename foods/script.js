const menuToggle = document.querySelector('.menu-toggle');
const targetEl = document.querySelectorAll('.target');
const icons = document.querySelectorAll('.hero__icon');
let i = 1;

menuToggle.addEventListener('click', () => {
	targetEl.forEach(item => item.classList.toggle('change'));
});

const startFadeIcons = setInterval(() => {
	i++;

	const icon = document.querySelector('.hero__icons .change');

	icon.classList.remove('change');

	if (i > icons.length) {
		icons[0].classList.add('change');
		i = 1;
	} else {
		icon.nextElementSibling.classList.add('change');
	}

}, 4000);

setTimeout(() => {
	clearInterval(startFadeIcons);
}, 180000);