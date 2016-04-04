$(document).ready(function() {
	$(document).on('click', '#accept-button', function() {
		$('#cookie-terms').stop().hide();
		document.cookie="snickerdoodle=First time visitor; expires=(Date.getTime() * 1000 + 10)";
	});
});
