import './navbar.scss';

document.addEventListener('DOMContentLoaded', function () {
	const lines = document.querySelectorAll('line_');
	const links = document.querySelector('.top_navbar');

	lines.forEach((line) => line.classList.add('line_'));

	links.classList.remove('hidden');
});
