import './navbar.scss';
const lines = document.querySelectorAll('line_');
const links = document.querySelector('.top_navbar');

lines.forEach((line) => line.classList.add('line_'));

links.classList.remove('hidden');
