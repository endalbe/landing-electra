import './community.scss';

import CircleType from 'circletype';

const waitingLoad = setInterval(() => {
  if (!document.querySelector('#app').classList.contains('hide')) {
    const roundedTexts = document.querySelectorAll('.rounded-text');
    roundedTexts.forEach((element) => new CircleType(element));

    clearInterval(waitingLoad);
  }
}, 1000);
