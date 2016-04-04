$(document).ready(function() {
	$(document).on('click', '.hobby-list-item', function(event) {
		var hobby = $(this).attr("id");
		$('#' + hobby + ' .expand').stop().toggleClass('rotated');
		$('#' + hobby + ' + .hobby-desc').stop().toggle(250);
		event.preventDefault();
	});
});