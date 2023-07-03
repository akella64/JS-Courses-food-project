window.addEventListener('DOMContentLoaded', function() {

const tabs = require('./modules/tabs'),
			modal = require('./modules/modal'),
			forms = require('./modules/forms'),
			slider = require('./modules/slider'),
			timer = require('./modules/timer'),
			cards = require('./modules/cards'),
			calculator = require('./modules/calculator');

			tabs();
			modal();
			forms();
			slider();
			timer();
			cards();
			calculator();
});