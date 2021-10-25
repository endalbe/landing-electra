import './slider.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let sections = gsap.utils.toArray('.slide-bike');
gsap.registerPlugin(ScrollTrigger);

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		sections.forEach((slide) => {
			gsap.to(slide, {
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: slide,
					scrub: true,
					pin: true,
					anticipatePin: 1,
					start: 'center center',
					end: () => '+=' + slide.offsetHeight,
					toggleClass: 'active',
					snap: 1
				}
			});
		});

		clearInterval(waitingLoad);
	}
}, 1000);
