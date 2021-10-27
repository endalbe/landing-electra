import './preloader.scss';

function showMsg(msg) {
	document.querySelector('.preloader-info-msg').innerHTML = msg;
}

const preloader = {
	content: document.querySelector('#app'),

	init() {
		showMsg(`Downloading general fonts...<br>Please, wait...`);
		let preloader_html = document.querySelector('.preloader');
		this.content.classList.add('hide');

		preloader.loadingState(preloader_html);
	},

	loadingState(preloader_html_t) {
		let progressBar = document.querySelector('.download_line'),
			images = document.images,
			imagesLoaded = 0;

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
			showMsg(`Downloading...`);
			imagesLoaded++;

			if (imagesLoaded > 5)
				setTimeout(() => preloader.hideState(preloader_html_t), 7500);

			let progress = ((100 / images.length) * imagesLoaded) << 0;
			if (imagesLoaded <= images.length) {
				showMsg(
					`Images downloaded: ${imagesLoaded} / ${images.length}`
				);

				progressBar.style.width = `${progress}%`;
			}

			if (imagesLoaded >= images.length)
				preloader.hideState(preloader_html_t);
		}
	},

	hideState(preloader_html) {
		if (document.fonts) {
			showMsg(`Downloading important fonts...`);

			document.fonts
				.load("16px 'Michroma'")
				.then(
					function () {
						showMsg(`Some more...`);
						setTimeout(() => {
							preloader.content.style = `opacity: 1`;
							preloader.content.classList.remove('hide');

							preloader_html.classList.add('isLoaded');
						}, 1000);
					},
					function () {
						showMsg(`Downloading important fonts...`);
					}
				)
				.then(function () {
					setTimeout(() => {
						preloader_html.classList.remove('isLoaded');
						preloader_html.innerHTML = '';
						preloader_html.remove();
						preloader_html.hidden = true;
					}, 1350);
				});
		}
	}
};

window.addEventListener('DOMContentLoaded', preloader.init());
