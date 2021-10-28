import './slider.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let sections = gsap.utils.toArray('.slide-bike');
gsap.registerPlugin(ScrollTrigger);

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		sections.forEach((slide) => {
			gsap.to(slide, {
				scrollTrigger: {
					trigger: slide,
					scrub: true,
					pin: true,
					start: 'center center',
					end: '+=100%',
					toggleClass: 'active',
					scaleX: 0,
					transformOrigin: 'center center',
					ease: 'none'
				}
			});
		});

		clearInterval(waitingLoad);
	}
}, 2500);
