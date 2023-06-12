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

		class MenuCards {
			constructor(title, description, image, altImage, price, parentSelector, ...classes) {
					this.title = title;
					this.description = description;
					this.image = image;
					this.altImage = altImage;
					this.price = price;
					this.parent = document.querySelector(parentSelector);
					this.transfer = 27;
					this.classes = classes;
					this.changeToUAH(); // можно вызвать метод прямо в конструкторе
			}

			changeToUAH() {
					this.price = this.price * this.transfer;
			}

			createCard() {
				const element = document.createElement('div');
				 if (this.classes.length === 0) {
					this.classes = 'menu__item';
					element.classList.add(this.classes);
				 } else {
					this.classes.forEach((className = 'menu__item') => element.classList.add(className));
				 }
				element.innerHTML = `
				<img src="${this.image}" alt="${this.altImage}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>`;
				this.parent.append(element);
			};
		
		}

		new MenuCards(
			'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
			'img/tabs/vegy.jpg', 
			'vegy', 
			'229', 
			'.menu__field .container',
		).createCard();
		
		new MenuCards(
			'Меню "“Премиум”"',
			'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
			'img/tabs/elite.jpg',
			'elite',
			'550',
			'.menu__field .container',
			'menu__item'
			).createCard();

		new MenuCards(
			'Меню "Постное"',
			'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
			'img/tabs/post.jpg',
			'post',
			'430',
			'.menu__field .container',
			'menu__item'
		).createCard();


		// Send post mail
		const forms = document.querySelectorAll('form');

		const messages = {
			loading: 'Загрузка',
			success: 'Успешно отправлено!',
			failure: 'Что-то пошло не так...'
		};
		
		forms.forEach((e) => {
			postDate(e);
		});

		function postDate(form) {
				form.addEventListener('submit', (event) => {
/* 						event.preventDefault();

						const statusMessage = document.createElement('div');
						statusMessage.classList.add('status');
						statusMessage.textContent = messages.loading;
						form.append(statusMessage);


						const req = new XMLHttpRequest();
						req.open('POST', 'server.php');
						req.setRequestHeader('Content-Type', 'application/json');

						const formData = new FormData(form);

						const object = {};

						formData.forEach((value, key) => {
								object[key] = value;
						});

						const json = JSON.stringify(object);

						req.send(json);

						req.addEventListener('load', (event) => {
								if (req.status === 200) {
									console.log(req.response);
									showThanksModal(messages.success);
									form.reset();
									statusMessage.remove();
								} else {
									showThanksModal(messages.failure);
								}
						}); */


						// Напишем через fetch
						event.preventDefault();

						const statusMessage = document.createElement('div');
						statusMessage.classList.add('status');
						statusMessage.textContent = messages.loading;
						form.append(statusMessage);

						const formData = new FormData(form);

						const formObject = {};
						formData.forEach((value, key) => {
								formObject[key] = value;
						});

						fetch('server.php', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(formObject)
						})
						.then(data => {
							console.log(data.text());
							showThanksModal(messages.success);
						})
						.catch(() => {
							showThanksModal(messages.failure);
						})
						.finally(() => {
							form.reset();
							statusMessage.remove();
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


		// to databse json

		fetch('http://localhost:3000/menu')
			.then(data => data.json())
			.then(res => console.log(res));


});

