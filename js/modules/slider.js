function slider() {
		// Slider
		const slider = document.querySelector('.offer__slider'),
					slideItems = slider.querySelectorAll('.offer__slide'),
					prev = slider.querySelector('.offer__slider-prev'),
					next = slider.querySelector('.offer__slider-next'),
					totalSlides = slider.querySelector('#total'),
					currentSlide = slider.querySelector('#current'),
					sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
					sliderInner = slider.querySelector('.offer__slider-inner'),
					width = window.getComputedStyle(sliderWrapper).width,
					paginationWrapper = document.createElement('div');

		let slideIndex = 1;
		let offset = 0;

		paginationWrapper.classList.add('carousel-indicators');
		slider.append(paginationWrapper);

		if (slideItems.length < 10) {
			totalSlides.textContent = `0${slideItems.length}`;
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			totalSlides.textContent = slideItems.length;
			currentSlide.textContent = slideIndex;
		}

		const addZero = () => {
			if (slideItems.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}
		};

		sliderInner.style.cssText = `width: ${100 * slideItems.length}%; display: flex; transition: 0.5s all`;

		sliderWrapper.style.cssText = 'overflow: hidden';

		slideItems.forEach(slide => {
			slide.style.width = width;

			const dot = document.createElement('div');
			dot.classList.add('dot');
			paginationWrapper.append(dot);
		});

		const paginationPlay = () => {
			document.querySelectorAll('.dot').forEach((e, i) => {
				e.style.backgroundColor = '#c3c3c3';
				if (slideIndex-1 == i) e.style.backgroundColor = 'black';
			});
		};
		paginationPlay();

		next.addEventListener('click', () => {
			if (offset == +width.slice(0, width.length - 2) * (slideItems.length - 1)) {
				offset = 0;
			} else {
				offset += +width.slice(0, width.length - 2);
			}

			sliderInner.style.transform = `translateX(-${offset}px)`;

			if (slideIndex == slideItems.length) {
				slideIndex = 1;
			} else {
				slideIndex++;
			}
			paginationPlay();
			addZero();

		});

		prev.addEventListener('click', () => {
			if (offset == 0) {
				offset = +width.slice(0, width.length - 2) * (slideItems.length - 1);
			} else {
				offset -= +width.slice(0, width.length - 2);
			}

			sliderInner.style.transform = `translateX(-${offset}px)`;

			if (slideIndex == 1) {
				slideIndex = slideItems.length;
			} else {
				slideIndex--;
			}
			paginationPlay();
			addZero();
		});

	// Другой метод реализации слайдера, более простой

	/* 	initSlider(slideIndex, slideItems, totalSlides, currentSlide);

	function initSlider(n, slides, total, current) {
	showSlide(n, slides, current);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length
	}
	}

	function showSlide(n, slides, current) {
	if (n > slides.length) slideIndex = 1;

	if (n < 1) slideIndex = slides.length;


	slides.forEach(e => e.classList.remove('active'));

	slides[slideIndex - 1].classList.add('active');

	if (slides.length < 10) {
		current.textContent = slideIndex;
	} else {
		current.textContent = slideIndex;
	}
	}

	function plusSlide(n, slides) {
	showSlide(slideIndex += n, slides, current);
	}

	prev.addEventListener('click', () => plusSlide(-1, slideItems, currentSlide));

	next.addEventListener('click', () => plusSlide(1, slideItems, currentSlide)) */
}

module.exports = slider;