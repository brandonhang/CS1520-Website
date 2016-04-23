$(document).ready(function() {
	$('#contact form').submit(function(event) {					// Gets form values
		var name = $('#contact input[type="text"]').val();
		var email = $('#contact input[type="email"]').val();
		var message = $('#contact textarea').val();
		var recaptcha = grecaptcha.getResponse();
		
		if (name.length === 0) {				// Error message if no name was entered
			$('#message-sent h3').text("What's in a name?  I don't know, you left it blank.");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		if (email.length === 0) {				// Error message if no email was entered
			$('#message-sent h3').text("You left your email address blank!");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		if (message.length === 0) {			// Error message if no message was entered
			$('#message-sent h3').text("You didn't write anything in the message box!");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		if (recaptcha.length === 0) {			// Error message if the user is a robot
			$('#message-sent h3').text("Please prove that you are not a robot/Terminator/Agent of the Matrix!");
			$('#message-sent').show();
			event.preventDefault();
			return;
		}
		
		$.ajax({									// AJAX call to submit the information (and later sanitze) to the database
			url: 'php/send_msg.php',
			type: 'POST',
			dataType: 'text',
			data: {
				"name": name,
				"email": email,
				"message": message,
				"recaptcha": recaptcha
			},
			success: function() {					// Successfully sent the message
				$('#message-sent h3').text("Your message was sent!");
				$('#message-sent').show();
				$('#contact input[type="text"], #contact input[type="email"], #contact textarea').val("");
				grecaptcha.reset();
			},
			error: function() {					// Error sending the message
				$('#message-sent h3').text("Something's wrong with the G-diffuser!  Your message was unable to be delivered."
						+ "  Please try again later.");
				$('#message-sent').show();
			}
		});
		event.preventDefault();
	});
	
	$(document).on('click', '#message-sent button', function() {		// Close the confirmation on button click
		$('#message-sent').hide();
	});
	$(document).keyup(function(e) {						// Close the confirmation on ESC key press
		if (e.keyCode == 27) {
			$('#message-sent').hide();
		}
	});
});