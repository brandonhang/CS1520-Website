<?php
	session_start();
	
	function songs_to_array($filepath, $location) {
		$exists = file_exists($filepath);
		
		if ($exists === TRUE) {
			$file = file($filepath);
			$arr_dst = array();
			
			foreach ($file as $string) {
				$string = rtrim($string);
				
				if (count($location > 0)) {
					$string = preg_replace("[##place]", $location, $string, 1);
				}
				
				$str_arr = preg_split("/[|]/", $string);
				
				if (count($str_arr) === 1) {
					array_push($arr_dst, $str_arr[0]);
				}
				else {
					array_push($arr_dst, $str_arr);
				}
			}
			return $arr_dst;
		}
	}
	
	function pick_songs($arr_src, $arr_dst, $int) {
		$randy = array_rand($arr_src, $int);
		
		if ($int > 1) {
			foreach ($randy as $index) {
				array_push($arr_dst, $arr_src[$index]);
			}
		}
		else {
			array_push($arr_dst, $arr_src[$randy]);
		}
		return $arr_dst;
	}
	
	function not_rigged_shuffle($arr) {
		if (count($arr) > 0) {
			$count = count($arr);
			
			for ($i = ($count - 1); $i > 0; $i--) {
				$rand_num = rand(0, $i);
				$arr_item = $arr[$i];
				$arr[$i] = $arr[$rand_num];
				$arr[$rand_num] = $arr_item;
			}
		}
		return $arr;
	}
	
	$places_arr = songs_to_array("misc/concert/locations.txt", "");
	
	$place = $places_arr[array_rand($places_arr, 1)];
	$abbr_place = substr($place, 0, strpos($place, ","));
	
	$solo_piano = songs_to_array("misc/concert/solo-piano.txt", "");
	$four_day_jazz = songs_to_array("misc/concert/4df.txt", "");
	$jazz_circus = songs_to_array("misc/concert/jazz-circus.txt", "");
	$big_band = songs_to_array("misc/concert/big-band.txt", $abbr_place);
	
	$today = getdate();
	$selections = array();
	
	$selections = pick_songs($solo_piano, $selections, 3);
	$selections = pick_songs($four_day_jazz, $selections, 2);
	$selections = pick_songs($jazz_circus, $selections, 2);
	$selections = pick_songs($big_band, $selections, 1);
	
	$selections = not_rigged_shuffle($selections);
?>

<!DOCTYPE html>
<html>
	<head>
		<meta name="author" content="Brandon S. Hang"/>
		
		<link href='https://fonts.googleapis.com/css?family=Linden+Hill:400,400italic' rel='stylesheet' type='text/css'/>
		<link type="text/css" rel="stylesheet" href="style/concert.css"/>
		<link rel="shortcut icon" href="img/icons/icon.ico" type="image/x-icon"/>
		
		<title>Today's Performance</title>
	</head>
	<body>
		<div>
			<h1>The LZW Concert Series</h1>
			<h2>PRESENTS</h2>
			<h3>Brandon S. Hang</h3>
			<h4>
				<?php
					echo "$today[weekday], $today[month] $today[mday], $today[year] • ";
					echo $place;
				?>
			</h4>
			<ul>
				<?php
					foreach ($selections as $song) {
						echo "<li class='dots'><span>$song[0]</span><span>$song[1]</span></li>";
						if (isset($song[2]) === TRUE) {
							if (strncmp($song[2], "arr.", 4) === 0) {
								echo "<li class='arr'>$song[2]</li>";
							}
							else {
								echo "<li class='tab'>$song[2]</li>";
							}
						}
					}
				?>
			</ul>
			<h5>Refresh the page for a new concert!</h5>
		</div>
		<a href="index.php#interests"><span>BACK</span></a>
	</body>
</html>