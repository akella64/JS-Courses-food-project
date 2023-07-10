require('es6-promise/auto');
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs'
import modal, { openModal } from './modules/modal'
import forms from './modules/forms'
import slider from './modules/slider'
import timer from './modules/timer'
import cards from './modules/cards'
import calculator from './modules/calculator'

window.addEventListener('DOMContentLoaded', function() {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	forms('.form', modalTimerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		inner: '.offer__slider-inner'
	});
	timer('.timer', '2023-09-11');
	cards();
	calculator();
});