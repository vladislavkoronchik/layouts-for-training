const createSlideshowDivs = (n) => {
	const slideshow = document.querySelector('.hero__bg-slideshow');

	if (!slideshow) {
		return -1;
	}

	for (let i = 1; i <= n; i++) {
		const div = document.createElement('div');

		div.style.backgroundImage = `url(images/slideshow/hero-bg-${i}.jpg)`;

		i === 1 && div.classList.add('is-visible');
		slideshow.appendChild(div);
	}
}


const slideshow = (slidesNum, speed = 10000, time = null) => {
	createSlideshowDivs(slidesNum);

	const firstDiv = document.querySelector('.hero__bg-slideshow div:first-child');
	let a = 1;

	let intervalIdx = setInterval(() => {
		const visibleDiv = document.querySelector('.hero__bg-slideshow .is-visible');

		visibleDiv.classList.remove('is-visible');
		a++;

		if (a <= slidesNum) {
			visibleDiv.nextElementSibling.classList.add('is-visible');
		} else {
			firstDiv.classList.add('is-visible');
			a = 1;
		}
	}, speed);

	if (time) {
		setTimeout(() => {
			clearInterval(intervalIdx);
		}, time);
	}
}

// slideshow(5,1000,20000);
slideshow(5, 20000, null);

const cube = document.querySelector('.cube-hero');
const cubeControls = document.querySelector('.cube-controls-hero');
const cubecontrolsArrows = document.querySelectorAll('.cube-controls-hero__arrow');
const controlTopX = document.querySelector('.cube-controls-hero__arrow--top-x-control');
const controlBottomX = document.querySelector('.cube-controls-hero__arrow--bottom-x-control');
const controlLeftY = document.querySelector('.cube-controls-hero__arrow--left-y-control');
const controlRightY = document.querySelector('.cube-controls-hero__arrow--right-y-control');
const controlTopZ = document.querySelector('.cube-controls-hero__arrow--top-z-control');
const controlBottomZ = document.querySelector('.cube-controls-hero__arrow--bottom-z-control');

let x = 0;
let y = 0;
let z = 0;
let direction;
let axis;
let mode;
let cubeIntervalIdx;

function playPause(mode) {
	if (mode === "play") {
		cubeIntervalIdx = setInterval(() => {
			cube.style.transform = `rotateX(${x}deg) rotateY(${y++}deg) rotateZ(${z}deg)`;
		}, 100);
	} else if (mode === "pause") {
		clearInterval(cubeIntervalIdx);
	}
};

function startRotate() {
	playPause("play");
}

function stopRotate() {
	playPause("pause");
}

function cubeControlsFn(direction = null, axis = null) {
	if (direction === 'top' && axis === 'x') {
		cube.style.transform = `rotateX(${x += 20}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
	} else if (direction === 'bottom' && axis === 'x') {
		cube.style.transform = `rotateX(${x -= 20}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
	} else if (direction === 'left' && axis === 'y') {
		cube.style.transform = `rotateX(${x}deg) rotateY(${y -= 20}deg) rotateZ(${z}deg)`;
	} else if (direction === 'right' && axis === 'y') {
		cube.style.transform = `rotateX(${x}deg) rotateY(${y += 20}deg) rotateZ(${z}deg)`;
	} else if (direction === 'top' && axis === 'z') {
		cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z -= 20}deg)`;
	} else if (direction === 'bottom' && axis === 'z') {
		cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z += 20}deg)`;
	}
};

function clickArrow(e) {
	e.preventDefault();
	if (e.target.classList.contains('cube-controls-hero__arrow')) {
		direction = e.target.getAttribute('data-direction');
		axis = e.target.getAttribute('data-axis');
		cubeControlsFn(direction, axis);
	}
	if (e.target.classList.contains('cube-controls-hero__mode')) {
		mode = e.target.getAttribute('data-mode');
		if (mode === "is-playing") {
			stopRotate();
			e.target.firstElementChild.className = 'fas fa-play';
			e.target.setAttribute("data-mode", "is-paused")
		} else if (mode === "is-paused") {
			startRotate();
			e.target.firstElementChild.className = 'fas fa-pause';
			e.target.setAttribute("data-mode", "is-playing")
		}
	}
};

cubeControls.addEventListener('click', clickArrow);

// cubeControls.addEventListener('blur', startRotate);

// cubeControls.addEventListener('mouseleave', startRotate);

// cubeControls.addEventListener('focusin', stopRotate);

// cubeControls.addEventListener('mouseenter', stopRotate);

startRotate();

const macbookContent = document.querySelector('.macbook__content');

window.addEventListener('scroll', () => {
	if (window.pageYOffset + window.innerHeight >= macbookContent.offsetTop + macbookContent.offsetHeight / 2) {
		macbookContent.classList.add('change');
	} /*else {
		macbookContent.classList.remove('change');
	}*/
});

const watchBands = document.querySelector('.watch__bands');
const watchCases = document.querySelector('.watch__cases');
const watchBandsArr = document.querySelectorAll('.watch__band-img');
const watchCasesArr = document.querySelectorAll('.watch__case-img');
const watchControls = document.querySelector('.watch__controls');
const maxImgsX = document.querySelectorAll('.watch__band-img').length;
const maxImgsY = document.querySelectorAll('.watch__case-img').length;
const widthImgX = document.querySelector('.watch__band-img').getBoundingClientRect().width;
const heightImgY = document.querySelector('.watch__case-img').getBoundingClientRect().height;
let counterX = maxImgsX % 2 === 0 ? Math.floor(maxImgsX / 2) : Math.floor(maxImgsX / 2) + 1;
let counterY = maxImgsY % 2 === 0 ? Math.floor(maxImgsY / 2) : Math.floor(maxImgsY / 2) + 1;
let axisX = maxImgsX % 2 === 0 ? -35 : 0;
let axisY = maxImgsY % 2 === 0 ? -35 : 0;
let prevEl;
let nextEl;
let control;
let disabledControlX;
let disabledControlY;

watchCases.style.marginTop = `${axisY}rem`;
watchBands.style.marginRight = `${axisX}rem`;

function setWatchImgParam(array) {
	array.forEach((item, idx) => {
		if (idx === 0) {
			item.setAttribute('data-current', idx + 1);
			item.setAttribute('data-prev', 'null');
			item.setAttribute('data-next', idx + 2);
		} else if (idx === array.length - 1) {
			item.setAttribute('data-current', idx + 1);
			item.setAttribute('data-prev', idx);
			item.setAttribute('data-next', 'null');
		} else {
			item.setAttribute('data-current', idx + 1);
			item.setAttribute('data-prev', idx);
			item.setAttribute('data-next', idx + 2);
		}
	});
};

setWatchImgParam(watchBandsArr);
setWatchImgParam(watchCasesArr);

function watchControlsFn(direction = null, axis = null,  control) {
	if (direction === 'top') {
		watchCases.style.marginTop = `${axisY -= widthImgX * 2 / 10}rem`;
		counterY--;
		prevEl = watchCases.children[counterY - 1].getAttribute('data-prev');
		nextEl = watchCases.children[counterY - 1].getAttribute('data-next');
		hideControl(prevEl, nextEl, control, axis);
	}

	if (direction === 'bottom') {
		watchCases.style.marginTop = `${axisY += widthImgX * 2 / 10}rem`;
		counterY++;
		prevEl = watchCases.children[counterY - 1].getAttribute('data-prev');
		nextEl = watchCases.children[counterY - 1].getAttribute('data-next');
		hideControl(prevEl, nextEl, control, axis);
	}

	if (direction === 'left') {
		watchBands.style.marginRight = `${axisX -= widthImgX * 2 / 10}rem`;
		counterX--;
		prevEl = watchBands.children[counterX - 1].getAttribute('data-prev');
		nextEl = watchBands.children[counterX - 1].getAttribute('data-next');
		hideControl(prevEl, nextEl, control, axis);
	}

	if (direction === 'right') {
		watchBands.style.marginRight = `${axisX += widthImgX * 2 / 10}rem`;
		counterX++;
		prevEl = watchBands.children[counterX - 1].getAttribute('data-prev');
		nextEl = watchBands.children[counterX - 1].getAttribute('data-next');
		hideControl(prevEl, nextEl, control, axis);
	}
}

function clickWatchControl(e) {
	if (e.target.classList.contains('watch__control')) {
		control = e.target;
		direction = control.getAttribute('data-direction');
		axis = control.getAttribute('data-axis');
		watchControlsFn(direction, axis, control);
	}
};

function hideControl(prevEl, nextEl, control, axis) {
	if (axis === 'x') {
		if (prevEl === 'null' || nextEl === 'null') {
			control.setAttribute('disabled', 'disabled');
			disabledControlX = control;
		} else {
			if (disabledControlX) {
				disabledControlX.removeAttribute('disabled');
				disabledControlX = null;
			}
		}
	}

	if (axis === 'y') {
		if (prevEl === 'null' || nextEl === 'null') {
			control.setAttribute('disabled', 'disabled');
			disabledControlY = control;
		} else {
			if (disabledControlY) {
				disabledControlY.removeAttribute('disabled');
				disabledControlY = null;
			}
		}
	}
}

watchControls.addEventListener('click', clickWatchControl);

const header = document.querySelector('.header');

function visibleHeader(e) {
	if (e.clientY <= header.offsetHeight) {
		header.classList.add('is-visible');
		header.classList.add('is-scrolling');
	} else {
		header.classList.remove('is-visible');
	}
}

window.addEventListener('load', () => {
	if (window.pageYOffset < header.offsetHeight) {
		header.classList.add('is-visible');
	}
});

window.addEventListener('scroll', () => {
	if (window.pageYOffset > header.offsetHeight) {
		window.addEventListener('mousemove', visibleHeader);
		header.classList.remove('is-visible');
	} else {
		window.removeEventListener('mousemove', visibleHeader);
		header.classList.add('is-visible');
		header.classList.remove('is-scrolling');
	}
});