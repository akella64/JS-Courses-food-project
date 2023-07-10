function calculator() {
		//calculator
		const result = document.querySelector('.calculating__result span');

		let height, weight, age, sex, ratio;
	
		if (localStorage.getItem('sex')) {
			sex = localStorage.getItem('sex');
		} else {
			sex = 'female';
			localStorage.setItem('sex', 'female');
		}
	
		if (localStorage.getItem('ratio')) {
			ratio = localStorage.getItem('ratio');
		} else {
			ratio = 1.375;
			localStorage.setItem('ratio', 1.375);
		}
	
		function initLocalSettings(selector, activeClass) {
				const elements = document.querySelectorAll(selector);
	
				elements.forEach(e => {
						e.classList.remove(activeClass);
						if (e.getAttribute('id') === localStorage.getItem('sex')) e.classList.add(activeClass);
	
						if (e.getAttribute('data-ratio') === localStorage.getItem('ratio')) e.classList.add(activeClass);
				});
		}
	
		initLocalSettings('#gender', 'calculating__choose-item_active');
		initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');
	
		function calcTotal() {
			if (!sex || !height || !weight || !age || !ratio) {
				result.textContent = '_______';
				return;
			}
	
			if (sex === 'female') {
				result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
			} else {
				result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * weight) - (5.7 * age)) * ratio);
			}
	
		}
	
		calcTotal();
	
		function getStaticInformation(selector, activeClass) {
				const elements = document.querySelectorAll(`${selector} div`);
				
				elements.forEach(e => {
						e.addEventListener('click', (event) => {
	
							if (event.target.getAttribute('data-ratio')) {
								ratio = +event.target.getAttribute('data-ratio');
								localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
							} else {
								sex = event.target.getAttribute('id');
								localStorage.setItem('sex', event.target.getAttribute('id'));
							}
	
							elements.forEach(e => {
								e.classList.remove(activeClass);
							});
	
							event.target.classList.add(activeClass);
	
							calcTotal();
						});
				});
	
		}
	
		getStaticInformation('#gender', 'calculating__choose-item_active');
		getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
	
		function dynamicInformation(selector) {
			const input = document.querySelector(selector);
	
			input.addEventListener('input', () => {
	
				if (input.value.match(/\D/g)) {
						input.style.border = '1px solid red';
				} else {
						input.style.border = 'none';
				}
	
					switch (input.getAttribute('id')) {
						case 'height':
								height = +input.value;
							break;
						case 'weight':
								weight = +input.value;
							break;
						case 'age':
								age = +input.value;
							break;
					}
	
					calcTotal();
			});
		}
	
		dynamicInformation('#weight');
		dynamicInformation('#height');
		dynamicInformation('#age');
}

export default calculator;