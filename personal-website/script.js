const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');

let isMouseCircle = true;

const mouseCircleFn = (x, y) => {
	isMouseCircle && (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1;`);
	mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1;`;
}

const circles = document.querySelectorAll('.hero__circle');
const mainImg = document.querySelector('.hero__main-circle-img');

let mX = 0;
let mY = 0;
const z = 100;

const moveCircle = (prop, val) => {
	circles.forEach(circle => {
		circle.style.cssText = `${prop}: ${val}px`;
	});
	mainImg.style.cssText = `${prop}: ${val}px`;
}

const animateCircles = (e, x, y) => {

	if (x < mX) {
		moveCircle('left', z);
	} else if (x > mX) {
		moveCircle('left', 0 - z);
	}

	if (y < mY) {
		moveCircle('top', z);
	} else if (y > mY) {
		moveCircle('top', 0 - z);
	}

	mX = e.clientX;
	mY = e.clientY;
}

let hoveredElPosition = [];

/* Sticky Element */
const stickyElement = (x, y, hoveredEl) => {
	if (hoveredEl.classList.contains('sticky')) {
		hoveredElPosition.length < 1 && (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

		hoveredEl.style.cssText = `top: ${y}px; left: ${x}px`;

		if (
			hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
			hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
			hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
			hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
		) {
			hoveredEl.style.cssText = '';
			hoveredElPosition = [];
		}

		hoveredEl.addEventListener('mouseleave', () => {
			hoveredEl.style.cssText = '';
			hoveredElPosition = [];
		});
	}
};
/* End of Sticky Element */

/* Mouse Circle Transform */
const mouseCircleTransform = (hoveredEl) => {
	if (hoveredEl.classList.contains('pointer-enter')) {
		hoveredEl.addEventListener('mousemove', () => {
			isMouseCircle = false;
			mouseCircle.style.cssText = `
				width: ${hoveredEl.getBoundingClientRect().width}px;
				height: ${hoveredEl.getBoundingClientRect().height}px;
				top: ${hoveredEl.getBoundingClientRect().top}px;
				left: ${hoveredEl.getBoundingClientRect().left}px;
				opacity: 1;
				animation: none;
				transform: translate(0, 0);
				border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
				transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s;
			`;
		});

		hoveredEl.addEventListener('mouseleave', () => {
			isMouseCircle = true;
		});

		document.addEventListener('scroll', () => {
			if (!isMouseCircle) {
				mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
			}
		})
	}
};

/* End of Mouse Circle Transform */

document.body.addEventListener('mousemove', e => {
	let x = e.clientX;
	let y = e.clientY;
	const hoveredEl = document.elementFromPoint(x, y);

	mouseCircleFn(x, y);
	animateCircles(e, x, y);

	stickyElement(x, y, hoveredEl);
	mouseCircleTransform(hoveredEl);
});

document.body.addEventListener('mouseleave', e => {
	mouseCircle.style.cssText = `opacity: 0;`;
	mouseDot.style.cssText = `opacity: 0;`;
});

const mainBtns = document.querySelectorAll('.main-btn');

mainBtns.forEach(btn => {
	let ripple = document.createElement('div');

	const createHoverRipple = (x, y) => {
		ripple.classList.add('ripple');
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		btn.prepend(ripple);
	}

	btn.addEventListener('mouseenter', e => {
		const left = e.clientX - e.target.getBoundingClientRect().left;
		const top = e.clientY - e.target.getBoundingClientRect().top;
		createHoverRipple(left, top);
	});

	btn.addEventListener('mouseleave', () => btn.removeChild(ripple));
});

/* Progress Bar */
const sections = document.querySelectorAll('section');
const progressBar = document.querySelector('.progress-bar');
const progressBarHalfCircles = document.querySelectorAll('.progress-bar__half-circle');
const progressBarHalfCircleTop = document.querySelector('.progress-bar__half-circle-top');
const progressBarCircle = document.querySelector('.progress-bar__circle');

let scrolledPortion = 0;
let scrollBoll = false;
let imageWrapper = false;

const progressBarFn = (bigImgWrapper) => {
	imageWrapper = bigImgWrapper;
	let pageHeight = 0;
	const pageViewportHeight = window.innerHeight;

	if (!imageWrapper) {
		pageHeight = document.documentElement.scrollHeight;
		scrolledPortion = window.pageYOffset;
	} else {
		pageHeight = imageWrapper.scrollHeight;
		scrolledPortion = imageWrapper.scrollTop;
	}

	const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

	progressBarHalfCircles.forEach(el => {
		el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

		if (scrolledPortionDegree >= 180) {
			progressBarHalfCircles[0].style.transform = 'rotate(180deg)';
			progressBarHalfCircleTop.style.opacity = '0';
		} else {
			progressBarHalfCircleTop.style.opacity = '1';
		}
	});

	scrollBoll = scrolledPortion + pageViewportHeight === pageHeight;

	if (scrollBoll) {
		progressBarCircle.style.transform = 'rotate(180deg)';
	} else {
		progressBarCircle.style.transform = 'rotate(0deg)';
	}
};

progressBar.addEventListener('click', (e) => {
	e.preventDefault();

	if (!imageWrapper) {
		const sectionPositions = Array.from(sections).map(section => scrolledPortion + section.getBoundingClientRect().top);
		const nextPosition = sectionPositions.find(sectionPosition => sectionPosition > scrolledPortion);

		scrollBoll ? window.scrollTo(0, 0) : window.scrollTo(0, nextPosition);
	} else {
		scrollBoll ? imageWrapper.scrollTo(0, 0) : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
	}
});

progressBarFn();
/* End of Progress Bar */

/* Navigation */
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

const scrollFn = () => {
	menuIcon.classList.add('show-menu-icon');
	navbar.classList.add('hide-navbar');

	if (window.scrollY === 0) {
		menuIcon.classList.remove('show-menu-icon');
		navbar.classList.remove('hide-navbar');
	}

	progressBarFn();
}

document.addEventListener('scroll', scrollFn);

menuIcon.addEventListener('click', () => {
	menuIcon.classList.remove('show-menu-icon');
	navbar.classList.remove('hide-navbar');
});
/* End of Navigation */

/* About Text */
const aboutText = document.querySelector('.about__text');
const aboutTextContent = aboutText.getAttribute('data-abouttext');

Array.from(aboutTextContent).forEach(char => {
	const span = document.createElement('span');
	span.textContent = char;
	aboutText.appendChild(span);

	span.addEventListener('mouseenter', (e) => {
		e.target.style.animation = 'aboutTextAnim 10s infinite';
		setTimeout(() => {
			e.target.style.animation = '';
		}, 20000);
	});
});
/* End of About Text */

/* Projects Section */
const wrapper = document.querySelector('.wrapper');
const projects = document.querySelectorAll('.project');
const projectHideBtn = document.querySelector('.project-hide-btn');

projects.forEach((project, i) => {
	project.addEventListener('mouseenter', () => {
		let y = project.firstElementChild.offsetHeight - project.offsetHeight + 20;
		scrollImg(y);
	});
	project.addEventListener('mouseleave', () => {
		scrollImg();
	});

	function scrollImg(y = null) {
		project.firstElementChild.style.top = y === null ? y : `-${y}px`;
	}

	project.addEventListener('click', () => {
		bigImgWrapper = document.createElement('div');
		bigImgWrapper.classList.add('project-img-wrapper');
		wrapper.appendChild(bigImgWrapper);

		const bigImg = document.createElement('img');
		bigImg.classList.add('project-img');
		const imgPath = project.firstElementChild.getAttribute('src').split('.')[0];
		bigImg.setAttribute('src', `${imgPath}-big.jpg`);
		bigImgWrapper.appendChild(bigImg);
		document.body.style.overflowY = 'hidden';

		document.removeEventListener('scroll', scrollFn);

		mouseCircle.style.opacity = '0';

		progressBarFn(bigImgWrapper);

		bigImgWrapper.addEventListener('scroll', () => {
			progressBarFn(bigImgWrapper);
		});

		projectHideBtn.classList.add('change');
		projectHideBtn.addEventListener('click', projectHide);
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				projectHide();
			}
		});

		function projectHide() {
			projectHideBtn.classList.remove('change');
			bigImgWrapper.remove();
			bigImg.remove();
			document.body.style.overflowY = '';

			document.addEventListener('scroll', scrollFn);

			progressBarFn();
		}
	});

	i >= 6 && (project.style.cssText = 'display: none; opacity: 0');
});

const projectsSection = document.querySelector('.projects');
const projectsBtn = document.querySelector('.projects__main-btn');
const projectsBtnText = projectsBtn.querySelector('.main-btn__text');
let isShowHide = true;

const showProjects = (project, i) => {
	setTimeout(() => {
		project.style.display = 'flex';
		projectsSection.scrollIntoView({ block: 'end' });
	}, 600);

	setTimeout(() => {
		project.style.opacity = '1';
	}, i * 200);
};

const hideProjects = (project, i) => {
	setTimeout(() => {
		project.style.display = 'none';
		projectsSection.scrollIntoView({ block: 'end' });
	}, 1200);

	setTimeout(() => {
		project.style.opacity = '0';
	}, i * 100);
};

projectsBtn.addEventListener('click', (e) => {
	e.preventDefault();

	projectsBtn.firstElementChild.nextElementSibling.classList.toggle('change');

	isShowHide ? (projectsBtnText.textContent = 'Show Less') : (projectsBtnText.textContent = 'Show More');

	projects.forEach((project, i) => {
		i >= 6 && (isShowHide ? showProjects(project, i) : hideProjects(project, i));
	});
	isShowHide = !isShowHide;
});
/* End of Projects Section */

/* Services Section */
document.querySelectorAll('.service__btn').forEach((serviceBtn) => {
	serviceBtn.addEventListener('click', (e) => {
		e.preventDefault();

		const serviceText = serviceBtn.nextElementSibling;
		serviceText.classList.toggle('change');

		const rightPosition = serviceText.classList.contains('change') ?
			`calc(100% - ${getComputedStyle(serviceBtn.firstElementChild).width})` :
			0;

		serviceBtn.firstElementChild.style.right = rightPosition;
	})
})
/* End of Services Section */

/* Contact Section */
/* Form */
const contactFormHeading = document.querySelector('.contact__form-heading');
const contactFormInputs = document.querySelectorAll('.contact__form-input');

contactFormInputs.forEach((input) => {
	input.addEventListener('focus', (e) => {
		contactFormHeading.style.opacity = '0';
		setTimeout(() => {
			contactFormHeading.textContent = `Your ${input.placeholder}`;
			contactFormHeading.style.opacity = '1';
		}, 300);
	});

	input.addEventListener('blur', (e) => {
		contactFormHeading.style.opacity = '0';
		setTimeout(() => {
			contactFormHeading.textContent = 'Let\'s Talk';
			contactFormHeading.style.opacity = '1';
		}, 300);
	});
})
/* End of Form */

/* Slideshow */
const slideshow = document.querySelector('.slideshow');

setInterval(() => {
	const firstIcon = slideshow.firstElementChild;
	const mediumIcon = slideshow.children[3];

	firstIcon.classList.add('faded-out');
	mediumIcon.classList.add('light');
	mediumIcon.previousElementSibling.classList.remove('light');

	setTimeout(() => {
		slideshow.removeChild(firstIcon);
		slideshow.appendChild(firstIcon);
		setTimeout(() => {
			firstIcon.classList.remove('faded-out');
		}, 500);
	}, 500);
}, 3000);
/* End of Slideshow */

/* Form Validation */
const form = document.querySelector('.contact__form');
const formInputName = document.querySelector('#name');
const formInputEmail = document.querySelector('#email');
const formInputSubject = document.querySelector('#subject');
const formTextareaMessage = document.querySelector('#message');
const formMessages = document.querySelectorAll('.contact__form-message');

const error = (input, message) => {
	input.nextElementSibling.classList.add('error');
	input.nextElementSibling.textContent = message;
};

const success = (input) => {
	input.nextElementSibling.classList.remove('error');
};

const checkRequiredFields = (inputArr) => {
	inputArr.forEach(input => {
		if (input.value.trim() === "") {
			error(input, `${input.id} is required`);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.trim().length < min) {
		error(input, `${input.id} must be at least ${min} characters`);
	} else {
		success(input);
	}
};

const checkEmail = (input) => {
	const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (regEx.test(input.value.trim())) {
		success(input);
	} else {
		error(input, 'Email is not valid');
	}
};

form.addEventListener('submit', (e) => {
	checkLength(formInputName, 2);
	checkLength(formInputSubject, 2);
	checkLength(formTextareaMessage, 10);
	checkEmail(formInputEmail);
	checkRequiredFields([formInputName, formInputEmail, formInputSubject, formTextareaMessage]);

	const notValid = Array.from(formMessages).find((message) => {
		return message.classList.contains('error');
	});

	notValid && e.preventDefault();
});

/* End of Form Validation */
/* End of Contact Section */