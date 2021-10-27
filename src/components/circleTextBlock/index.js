import './index.scss';
import CircleType from 'circletype';

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		new CircleType(document.querySelector('.text-rounded-for-img-first'));
		new CircleType(document.querySelector('.text-rounded-for-img-second'));
		new CircleType(document.querySelector('.text-rounded-for-img-last'));

		clearInterval(waitingLoad);
	}
}, 1000);
