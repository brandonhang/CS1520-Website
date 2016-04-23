<?php
	if (empty($_POST)) {			// Tries to discourage direct access to the file
		include "404.php";
		die("Unauthorized access prohibited!  That means you!");
	}
	
	$file = fopen("../misc/github_cache.txt", "w");
	
	if (flock($file, LOCK_EX)) {			// FLOCKS the file when writing to it
		foreach($_POST as $string) {
			fwrite($file, $string . "\n");
		}
	}
	
	fclose($file);
?>