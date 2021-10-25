import './index.scss';
import './components/hooker';
import AOS from 'aos';

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		AOS.init();
		clearInterval(waitingLoad);
	}
}, 1000);
