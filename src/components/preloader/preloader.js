import './preloader.scss';

const preloader = {
	opacity: 0.0,
	content: document.querySelector('#app'),

	init() {
		let preloader_html = document.querySelector('.preloader');

		this.content.classList.add('hide');
		this.loadingState(preloader_html);
	},

	loadingState(preloader_html_t) {
		let progressBar = document.querySelector('.download_line'),
			images = document.images,
			imagesLoaded = 0;

		setTimeout(() => preloader.hideState(preloader_html_t), 15000);

		if (images.length) {
			for (let i = 0; i < images.length; i++) {
				let tmpImageContainer = new Image();

				tmpImageContainer.onload = imageLoading;
				tmpImageContainer.onerror = imageLoading;
				tmpImageContainer.src = images[i].src;
			}
		} else {
			preloader.hideState(preloader_html_t);
		}

		function imageLoading() {
			imagesLoaded++;
			let progress = ((100 / images.length) * imagesLoaded) << 0;
			if (imagesLoaded <= images.length)
				progressBar.style.width = `${progress}%`;

			if (imagesLoaded >= images.length) {
				preloader.hideState(preloader_html_t);
			}
		}
	},

	hideState(preloader_html) {
		this.content.style = `opacity: 1`;
		this.content.classList.remove('hide');

		preloader_html.classList.add('isLoaded');
		preloader_html.innerHTML = '';

		setTimeout(() => {
			preloader_html.remove();
			preloader_html.hidden = true;
		}, 1000);
	}
};

document.addEventListener('DOMContentLoaded', function () {
	preloader.init();
});
