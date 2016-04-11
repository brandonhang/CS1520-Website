$(document).ready(function() {
	$('#contact form').submit(function(event) {
		var name = $('#contact input[type="text"]').val();
		var email = $('#contact input[type="email"]').val();
		var message = $('#contact textarea').val();
		var recaptcha = grecaptcha.getResponse();
		
		if (name.length === 0) {
			$('#message-sent h3').text("What's in a name?  I don't know, you left it blank.");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		if (email.length === 0) {
			$('#message-sent h3').text("You left your email address blank!");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		if (message.length === 0) {
			$('#message-sent h3').text("You didn't write anything in the message box!");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		if (recaptcha.length === 0) {
			$('#message-sent h3').text("Please prove that you are not a robot/Terminator/Agent of the Matrix!");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		
		$.ajax({
			url: 'php/send_msg.php',
			type: 'POST',
			dataType: 'text',
			data: {
				"name": name,
				"email": email,
				"message": message,
				"recaptcha": recaptcha
			},
			success: function() {
				$('#message-sent h3').text("Your message was sent!");
				$('#message-sent').show();
				$('#contact input[type="text"], #contact input[type="email"], #contact textarea').val("");
			},
			error: function() {
				$('#message-sent h3').text("Your message couldn't be delivered... maybe monkeys in the server room?"
						+ "  Please try again later.");
				$('#message-sent').show();
			}
		});
		event.preventDefault();
	});
	
	$(document).on('click', '#message-sent button', function() {
		$('#message-sent').hide();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#message-sent').hide();
		}
	});
});