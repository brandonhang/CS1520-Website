<?php
	if (!isset($_POST["recaptcha"])) {				// Discourages direct access to the file
		die("Unauthorized access prohibited!  That means you!");
		exit(1);
	}
	define('SUBARU', TRUE);				// Allows the included private RSA key to be read without getting the 404 page
	include "g-recaptcha.php";			// THIS WILL FAIL BECAUSE IT IS NOT IN THE REPO
	$recaptcha = $_POST["recaptcha"];
	
	$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$g_key&response=$recaptcha");
	$bot_check = json_decode($response);
	
	if ($bot_check->success) {
		$db = new mysqli("localhost", "root", "");		// New database connection; the username and password
														// are default for educational/compatiability purposes for now
		if ($db->connect_error) {
			exit(1);							// Database connection error
		}
		else {
			$db->query("CREATE DATABASE IF NOT EXISTS bsh41");			// The database is just my Pitt username
			$db = new mysqli("localhost", "root", "", "bsh41");
			
			$table = "CREATE TABLE IF NOT EXISTS messages (
				timestamp VARCHAR(19) PRIMARY KEY,
				name TEXT,
				email TEXT,
				message TEXT
			)";
			$db->query($table);
			$db->set_charset("utf8");
			
			$name = $db->real_escape_string($_POST["name"]);			// Inputs are not yet sanitized as that requires Javascript, per our discussion
			$email = $db->real_escape_string($_POST["email"]);
			$message = $db->real_escape_string($_POST["message"]);
			
			$timestamp = date("Y-m-d H:i:s", $_SERVER["REQUEST_TIME"]);
			$timestamp = $db->real_escape_string($timestamp);
			
			$db->query("INSERT INTO messages (timestamp, name, email, message)
				VALUES ('$timestamp', '$name', '$email', '$message')");
		}
		$db->close();			// Close database connection
	}
?>