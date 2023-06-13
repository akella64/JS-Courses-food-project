window.addEventListener('DOMContentLoaded', function() {

	// Tabs
	
let tabs = document.querySelectorAll('.tabheader__item'),
	tabsContent = document.querySelectorAll('.tabcontent'),
	tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
			
			tabsContent.forEach(item => {
					item.classList.add('hide');
					item.classList.remove('show', 'fade');
			});

			tabs.forEach(item => {
					item.classList.remove('tabheader__item_active');
			});
}

function showTabContent(i = 0) {
			tabsContent[i].classList.add('show', 'fade');
			tabsContent[i].classList.remove('hide');
			tabs[i].classList.add('tabheader__item_active');
	}
	
	hideTabContent();
	showTabContent();

tabsParent.addEventListener('click', function(event) {
	const target = event.target;
	if(target && target.classList.contains('tabheader__item')) {
					tabs.forEach((item, i) => {
							if (target == item) {
									hideTabContent();
									showTabContent(i);
							}
					});
	}
	});
	
	// Timer

	const deadline = '2022-06-11';

	function getTimeRemaining(endtime) {
			const t = Date.parse(endtime) - Date.parse(new Date()),
					days = Math.floor( (t/(1000*60*60*24)) ),
					seconds = Math.floor( (t/1000) % 60 ),
					minutes = Math.floor( (t/1000/60) % 60 ),
					hours = Math.floor( (t/(1000*60*60) % 24) );

			return {
					'total': t,
					'days': days,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
			};
	}

	function getZero(num){
			if (num >= 0 && num < 10) { 
					return '0' + num;
			} else {
					return num;
			}
	}

	function setClock(selector, endtime) {

			const timer = document.querySelector(selector),
					days = timer.querySelector("#days"),
					hours = timer.querySelector('#hours'),
					minutes = timer.querySelector('#minutes'),
					seconds = timer.querySelector('#seconds'),
					timeInterval = setInterval(updateClock, 1000);

			updateClock();

			function updateClock() {
					const t = getTimeRemaining(endtime);

					days.innerHTML = getZero(t.days);
					hours.innerHTML = getZero(t.hours);
					minutes.innerHTML = getZero(t.minutes);
					seconds.innerHTML = getZero(t.seconds);

					if (t.total <= 0) {
							clearInterval(timeInterval);
					}
			}
	}

	setClock('.timer', deadline);

	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
			modal = document.querySelector('.modal');

	modalTrigger.forEach(btn => {
			btn.addEventListener('click', openModal);
	});

	function closeModal() {
			modal.classList.add('hide');
			modal.classList.remove('show');
			document.body.style.overflow = '';
	}

	function openModal() {
			modal.classList.add('show');
			modal.classList.remove('hide');
			document.body.style.overflow = 'hidden';
			clearInterval(modalTimerId);
	}

	modal.addEventListener('click', (e) => {
			if (e.target === modal || e.target.getAttribute('data-close') == "") {
					closeModal();
			}
	});

	document.addEventListener('keydown', (e) => {
			if (e.code === "Escape" && modal.classList.contains('show')) { 
					closeModal();
			}
	});

	const modalTimerId = setTimeout(openModal, 300000);

	function showModalByScroll() {
			if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
					openModal();
					window.removeEventListener('scroll', showModalByScroll);
			}
	}
	window.addEventListener('scroll', showModalByScroll);

	// Используем классы для создание карточек меню
	class MenuCard {
			constructor(src, alt, title, descr, price, parentSelector, ...classes) {
					this.src = src;
					this.alt = alt;
					this.title = title;
					this.descr = descr;
					this.price = price;
					this.classes = classes;
					this.parent = document.querySelector(parentSelector);
					this.transfer = 27;
					this.changeToUAH(); 
			}

			changeToUAH() {
					this.price = this.price * this.transfer; 
			}

			render() {
					const element = document.createElement('div');

					if (this.classes.length === 0) {
							this.classes = "menu__item";
							element.classList.add(this.classes);
					} else {
							this.classes.forEach(className => element.classList.add(className));
					}

					element.innerHTML = `
							<img src=${this.src} alt=${this.alt}>
							<h3 class="menu__item-subtitle">${this.title}</h3>
							<div class="menu__item-descr">${this.descr}</div>
							<div class="menu__item-divider"></div>
							<div class="menu__item-price">
									<div class="menu__item-cost">Цена:</div>
									<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
							</div>
					`;
					this.parent.append(element);
			}
	}

		// Запрос к db.json на получение карточек
/* 		getResource('http://localhost:3000/menu')
			.then(data => {
					data.forEach(({img, altimg, title, descr, price}) => {
							new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
					});
			}); */

		// Запрос через axios
		axios.get('http://localhost:3000/menu')
			.then(data => {
				data.data.forEach(({img, altimg, title, descr, price}) => {
						new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
				});
			});

			// Добавление карточкек с использованием функции

				// getResource('http://localhost:3000/menu')
				//     .then(data => createCard(data));

				// function createCard(data) {
				//     data.forEach(({img, altimg, title, descr, price}) => {
				//         const element = document.createElement('div');

				//         element.classList.add("menu__item");

				//         element.innerHTML = `
				//             <img src=${img} alt=${altimg}>
				//             <h3 class="menu__item-subtitle">${title}</h3>
				//             <div class="menu__item-descr">${descr}</div>
				//             <div class="menu__item-divider"></div>
				//             <div class="menu__item-price">
				//                 <div class="menu__item-cost">Цена:</div>
				//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
				//             </div>
				//         `;
				//         document.querySelector(".menu .container").append(element);
				//     });
				// }

	// Forms

	const forms = document.querySelectorAll('form');
	const message = {
			loading: 'img/form/spinner.svg',
			success: 'Спасибо! Скоро мы с вами свяжемся',
			failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
			bindPostData(item);
	});

	const postData = async (url, data) => {
			let res = await fetch(url, {
					method: "POST",
					headers: {
							'Content-Type': 'application/json'
					},
					body: data
			});
	
			return await res.json();
	};

	async function getResource(url) {
			let res = await fetch(url);
	
			if (!res.ok) {
					throw new Error(`Could not fetch ${url}, status: ${res.status}`);
			}
	
			return await res.json();
	}

	function bindPostData(form) {
			form.addEventListener('submit', (e) => {
					e.preventDefault();

					let statusMessage = document.createElement('img');
					statusMessage.src = message.loading;
					statusMessage.style.cssText = `
							display: block;
							margin: 0 auto;
					`;
					form.insertAdjacentElement('afterend', statusMessage);
			
					const formData = new FormData(form);

					const json = JSON.stringify(Object.fromEntries(formData.entries()));

					postData('http://localhost:3000/requests', json)
					.then(data => {
							console.log(data);
							showThanksModal(message.success);
							statusMessage.remove();
					}).catch(() => {
							showThanksModal(message.failure);
					}).finally(() => {
							form.reset();
					});
			});
	}

	function showThanksModal(message) {
			const prevModalDialog = document.querySelector('.modal__dialog');

			prevModalDialog.classList.add('hide');
			openModal();

			const thanksModal = document.createElement('div');
			thanksModal.classList.add('modal__dialog');
			thanksModal.innerHTML = `
					<div class="modal__content">
							<div class="modal__close" data-close>×</div>
							<div class="modal__title">${message}</div>
					</div>
			`;
			document.querySelector('.modal').append(thanksModal);
			setTimeout(() => {
					thanksModal.remove();
					prevModalDialog.classList.add('show');
					prevModalDialog.classList.remove('hide');
					closeModal();
			}, 4000);
	}

	// Slider
	(() => {
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
	})();
	


});