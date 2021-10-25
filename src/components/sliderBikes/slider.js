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
					end: '+=100%',
					toggleClass: 'active',
					snap: 1,
					scaleX: 0,
					transformOrigin: 'left center',
					ease: 'none'
				}
			});
		});

		clearInterval(waitingLoad);
	}
}, 1000);
