import './preloader.scss';

function showMsg(msg) {
	if (document.querySelector('.preloader-info-msg')) {
		document.querySelector('.preloader-info-msg').innerHTML = msg;
	}
}

const preloader = {
	content: document.querySelector('#app'),

	init() {
		showMsg(`Downloading general fonts...<br>Please, wait...`);
		const preloaderHtml = document.querySelector('.preloader');
		this.content.classList.add('hide');

		preloader.loadingState(preloaderHtml);
	},

	loadingState(preloaderHtmlT) {
		const progressBar = document.querySelector('.download-line');
		const images = document.images;
		let imagesLoaded = 0;

		if (images.length) {
			for (let i = 0; i < images.length; i++) {
				const tmpImageContainer = new Image();

				tmpImageContainer.onload = imageLoading;
				tmpImageContainer.onerror = imageLoading;
				tmpImageContainer.src = images[i].src;
			}
		} else {
			preloader.hideState(preloaderHtmlT);
		}

		function imageLoading() {
			showMsg(`Downloading...`);
			imagesLoaded++;

			if (imagesLoaded > 3) {
				setTimeout(() => preloader.hideState(preloaderHtmlT), 1000);
			}

			const progress = ((100 / images.length) * imagesLoaded) << 0;
			if (imagesLoaded <= images.length) {
				showMsg(
					`Images downloaded: ${imagesLoaded} / ${images.length}`
				);

				progressBar.style.width = `${progress}%`;
			}

			if (imagesLoaded >= images.length) {
				preloader.hideState(preloaderHtmlT);
			}
		}
	},

	hideState(preloaderHtml) {
		showMsg('Downloading important fonts...');
		if (document.fonts) {
			document.fonts
				.load("16px 'Michroma'")
				.then(
					function () {
						showMsg(`Some more...`);
						setTimeout(() => {
							preloader.content.style = `opacity: 1`;
							preloader.content.classList.remove('hide');

							preloaderHtml.classList.add('is-loaded');
						}, 1000);
					},
					function () {
						showMsg(`Downloading important fonts...`);
					}
				)
				.then(function () {
					setTimeout(() => {
						preloaderHtml.classList.remove('is-loaded');
						preloaderHtml.innerHTML = '';
						preloaderHtml.remove();
						preloaderHtml.hidden = true;
					}, 1350);
				});
		}
	}
};

window.addEventListener('DOMContentLoaded', preloader.init());
