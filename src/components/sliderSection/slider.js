import './slider.scss';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const sections = gsap.utils.toArray('.slide');
let maxWidth = 0;

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  anticipatePin: 1,
});

const waitingLoad = setInterval(() => {
  if (
    !document.querySelector('#app').classList.contains('hide') &&
		(document.querySelector('#slider-blocks-franchise') ||
			document.querySelector('#slider-blocks'))
  ) {
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
        trigger: document.querySelector('#slider-blocks-franchise') ?
					'#slider-blocks-franchise' :
					'#slider-blocks',
        pin: true,
        scrub: true,
        end: () => `+=${maxWidth}`,
      },
    });

    sections.forEach((sct) => {
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
        toggleClass: {targets: sct, className: 'active'},
      });
    });

    clearInterval(waitingLoad);
  }
}, 1000);
