import './slider.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let sections = gsap.utils.toArray('.slide-bikes');
gsap.registerPlugin(ScrollTrigger);

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		clearInterval(waitingLoad);
	}
}, 1000);
