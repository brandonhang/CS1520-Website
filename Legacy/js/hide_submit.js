$(document).ready(function() {
	$(document).on('click', '#message-sent button', function() {
		$('#message-sent').hide();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#message-sent').hide();
		}
	});
});