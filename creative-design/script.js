document.querySelectorAll('.team-member__story-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		btn.classList.toggle('change');
		btn.nextElementSibling.classList.toggle('change');
	});
});