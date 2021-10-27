import './community.scss';

import CircleType from 'circletype';

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		let roundedTexts = document.querySelectorAll('.rounded-text');
		roundedTexts.forEach((element) => new CircleType(element));

		clearInterval(waitingLoad);
	}
}, 1000);
