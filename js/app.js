document.addEventListener('DOMContentLoaded', () => {

		//Tabs
		const tabsContent = document.querySelectorAll('.tabcontent'),
					tabs = document.querySelectorAll('.tabheader__item'),
					tabsParent = document.querySelector('.tabheader__items');

		function hideTabsContent() { 
			tabsContent.forEach(e => {
				e.classList.add('hide');
				e.classList.remove('show', 'fade');
			});

			tabs.forEach(e => {
					e.classList.remove('tabheader__item_active');
			});
		}


		function showTabContent(i = 0) { 
			tabsContent[i].classList.add('show', 'fade');
			tabsContent[i].classList.remove('hide');
			tabs[i].classList.add('tabheader__item_active');
		}

		hideTabsContent();
		showTabContent();

		tabsParent.addEventListener('click', (e) => {
				const target = e.target;

				if (target && target.classList.contains('tabheader__item')) {
						tabs.forEach((tab,i) => {
								if (target == tab) {
									hideTabsContent();
									showTabContent(i);
								}
						});
				}
		});


		//Timer

		//создадим отправную точку (до какой даты будет идти таймер)

		const deadline = '2023-02-28'

		// функция, которая сравнивает текущее время и конечное время
		function  getTimeRemaining(endtime) { 
				const t = Date.parse(endtime) - new Date();
				let days, hours, minutes, seconds;

				if (t <= 0) {
					days = 0;
					hours = 0;
					minutes = 0;
					seconds = 0;
				} else {
					days = Math.floor(t / (1000 * 60 * 60 * 24)),
					hours = Math.floor(t / (1000 * 60 * 60) % 24),
					minutes = Math.floor((t / 1000 / 60) % 60),
					seconds = Math.floor((t / 1000) % 60);
				}


				return {
						'total': t,
						'days': days,
						'hours': hours,
						'minutes': minutes,
						'seconds': seconds
				};
		}

		function getZero(num) {
				if (num >= 0 && num < 10) {
					return `0${num}`;
				} else {
					return num;
				}
		}

		function setTime(selector, endtime) {
				const time = document.querySelector(selector),
							days = time.querySelector('#days'),
							hours = time.querySelector('#hours'),
							minutes = time.querySelector('#minutes'),
							seconds = time.querySelector('#seconds'),
							timeInterval = setInterval(updateClock, 1000);
				
				updateClock();

				function updateClock() {
						const t = getTimeRemaining(endtime);

						days.textContent = getZero(t.days);
						hours.textContent = getZero(t.hours);
						minutes.textContent = getZero(t.minutes);
						seconds.textContent = getZero(t.seconds);

						if (t.total <= 0) {
							clearInterval(timeInterval);
						}
				}
		}


		setTime('.timer', deadline);


		//Modal window
		const openBtnsModal = document.querySelectorAll('[data-modal]'),
					closeBtnModal = document.querySelector('[data-modalClose]'),
					modal = document.querySelector('.modal');

		function closeModal() { 
			modal.classList.toggle('show');
			document.body.style.overflow = 'visible';
			modal.classList.remove('show');
		 }

		 function openModal() {
			modal.classList.toggle('show');
			document.body.style.overflow = 'hidden';
			//clearInterval(modalTimerId);
		 }

		openBtnsModal.forEach(e => {
			e.addEventListener('click', openModal);
		});

		closeBtnModal.addEventListener('click', closeModal);

		modal.addEventListener('click', (e) => {
			if (e.target === modal || e.target.getAttribute('data-close') == '') closeModal()
		});

		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape' && modal.classList.contains('show')) closeModal()
		});

		//open modal timeout
		//const modalTimerId = setTimeout(openModal, 10000);

		function showModuleByScroll() {
			if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
				openModal();
				window.removeEventListener('scroll', showModuleByScroll);
			}
		}

		window.addEventListener('scroll', showModuleByScroll);



		//Menu cards

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

		const getResource = async (url) => {
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(`Failed to get resource from ${url}, status: ${res.status}`);
			}
			return await res.json();
		};

		getResource('http://localhost:3000/menu')
			.then((data) => {
				data.forEach(({img, altimg, title, descr, price}) => {
					new MenuCard(img, altimg, title, descr, price, '.menu .container',).render();
				});
			});

		// Send post mail
		const forms = document.querySelectorAll('form');

		const messages = {
			loading: 'Загрузка',
			success: 'Успешно отправлено!',
			failure: 'Что-то пошло не так...'
		};
		
		forms.forEach((e) => {
			bindPostDate(e);
		});

		const postDate = async (url, data) => {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data
			});

			return await res.json();
		};

		function bindPostDate(form) {
				form.addEventListener('submit', (event) => {
						event.preventDefault();

						const statusMessage = document.createElement('div');
						statusMessage.classList.add('status');
						statusMessage.textContent = messages.loading;
						form.append(statusMessage);

						const json = JSON.stringify(Object.fromEntries(new FormData(form).entries()));

						postDate('http://localhost:3000/requests', json)
						.then(data => {
							console.log(`Добалена запись: ${data.json()}`);
							showThanksModal(messages.success);
							setTimeout(() => {
								statusMessage.remove();
							}, 3000);
						})
						.catch(() => {
							showThanksModal(messages.failure);
						})
						.finally(() => {
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
			`

			document.querySelector('.modal').append(thanksModal);

			setTimeout(() => {
					thanksModal.remove();
					prevModalDialog.classList.add('show');
					prevModalDialog.classList.remove('hide');
					closeModal();
			}, 4000);
		}


});

