import './index.scss';
import './components/hooker';
import './Invest/hooker';
import AOS from 'aos';

const waitingLoad = setInterval(() => {
  if (!document.querySelector('#app').classList.contains('hide')) {
    AOS.init();

    clearInterval(waitingLoad);
  }
}, 1000);

const lines = document.querySelectorAll('line_');
const links = document.querySelector('.top_navbar');

lines.forEach((line) => line.classList.add('line_'));

links.classList.remove('hidden');
