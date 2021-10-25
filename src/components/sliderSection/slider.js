import './slider.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let sections = gsap.utils.toArray('.slide');
let maxWidth = 0;

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
	anticipatePin: 1
});

let waitingLoad = setInterval(() => {
	if (!document.querySelector('#app').classList.contains('hide')) {
		const getMaxWidth = () => {
			maxWidth = 0;
			sections.forEach((section) => {
				maxWidth += section.offsetWidth + 50;
			});
		};

		getMaxWidth();

		ScrollTrigger.addEventListener('refreshInit', getMaxWidth);

		gsap.to(sections, {
			xPercent: -100 * (sections.length - 1),
			ease: 'none',
			width: '100vh',

			scrollTrigger: {
				trigger: '#slider-blocks',
				pin: true,
				scrub: true,
				end: () => `+=${maxWidth}`
			}
		});

		sections.forEach((sct, i) => {
			getMaxWidth();
			ScrollTrigger.create({
				trigger: sct,
				start: () =>
					`top top-=${
						(sct.offsetLeft - window.innerWidth / 2) *
						(maxWidth / (maxWidth - window.innerWidth))
					}`,
				end: () =>
					`+=${
						sct.offsetWidth *
							(maxWidth / (maxWidth - window.innerWidth)) +
						100
					}`,
				toggleClass: { targets: sct, className: 'active' }
			});
		});

		clearInterval(waitingLoad);
	}
}, 1000);
