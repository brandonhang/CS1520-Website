<?php
	if (empty($_POST)) {
		include "404.php";
		die("Unauthorized access prohibited!  That means you!");
	}
	
	$file = fopen("../misc/github_cache.txt", "w");
	
	if (flock($file, LOCK_EX)) {
		foreach($_POST as $string) {
			fwrite($file, $string . "\n");
		}
	}
	
	fclose($file);
?>