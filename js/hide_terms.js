$(document).ready(function() {
	$(document).on('click', '#accept-button', function() {			// The cookie is set when the button is clicked
		$('#cookie-terms').stop().hide();
		document.cookie="snickerdoodle=First time visitor; expires=(Date.getTime() * 1000 + 10)";
	});
});
