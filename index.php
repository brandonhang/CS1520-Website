<?php
	session_start();
	$cookie_set = isset($_COOKIE["snickerdoodle"]);		// Yes, my cookie is named after... a cookie
	$display_alert = TRUE;				// Sets the use of cookies TOC to true
	
	if ($cookie_set === TRUE) {			// If the cookie is set, the site will not display the use of cookies TOC
		$display_alert = FALSE;
		setcookie("snickerdoodle", "Returning visitor", time() + 10);		// Adds another 10 seconds to the cookie expiration
	}
	
	/*
	 * This section attempts to add a message to a database.  If the message is valid and is
	 * successfully sent, it will display a success message.  Otherwise, it will display an
	 * error message.
	 */
	
	if (isset($_POST["send"]) === TRUE) {				// Conditional if the send button was pressed
		if (empty($_POST["name"]) === TRUE || empty($_POST["email"]) === TRUE || empty($_POST["message"]) === TRUE) {
			$message = "Your message was not sent!  One or more fields were missing from your request.";
		}											// Fails if any field is empty
		else {
			$db = new mysqli("localhost", "root", "");		// New database connection; the username and password
															// are default for educational/compatiability purposes for now
			if ($db->connect_error) {
				$message = ":( Your message could not be processed because of monkeys in the server room.  
					Please try again later.";							// Database connection error
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
				
				$clean_name = $db->real_escape_string($_POST["name"]);			// Inputs are not yet sanitized as that requires Javascript, per our discussion
				$clean_email = $db->real_escape_string($_POST["email"]);
				$clean_message = $db->real_escape_string($_POST["message"]);
				
				$timestamp = date("Y-m-d H:i:s", $_SERVER["REQUEST_TIME"]);
				$timestamp = $db->real_escape_string($timestamp);
				
				$db->query("INSERT INTO messages (timestamp, name, email, message)
					VALUES ('$timestamp', '$clean_name', '$clean_email', '$clean_message')");
				
				$message = "Your message has been sent!";
			}
			$db->close();			// Close database connection
		}
	}
	
	
	/*
	 * This function reads the contents of a text file and displays it to the screen exactly as
	 * it was formatted in the file.
	 */
	function print_txt_file($txt_file) {
		$hobby_exists = file_exists($txt_file);
		
		if ($hobby_exists) {
			echo file_get_contents($txt_file);
		}
		else {			// Default message if the file is missing
			echo
				"<p>I'd like to tell you something about myself, but evidently I need 
				to fix this section first... Because it broke.</p>";
		}
	}
	
	
	/*
	 * This function builds a row of buttons in the interests sections.  It takes in a string as
	 * a parameter and uses it to create an ID, load images, and display text.
	 */
	function build_list($category) {
		echo
			"<li id='$category' class='hobby-list-item'><a href='#'>
				<img class='hobby-icon' src='img/icons/$category-icon.jpg'/>
				<img src='img/icons/$category-txt.png'/>
				<img class='expand' src='img/icons/expand-88px.png'/></a></li>";
		
		echo "<div class='hobby-desc'>";
		echo "<a href='img/bkgrds/$category-big.jpg' class='lightbox-img'>
			<img src='img/bkgrds/$category-desc.jpg'/></a>";
		print_txt_file("misc/$category.txt");
		
		if (strcmp($category, "Music") === 0) {		// Adds links based on the category
			echo "<div><a href='concert.php'>
				Dynamically Generated Concert Program Notes</a></div>";
		}
		if (strcmp($category, "Media") === 0) {
			echo "<div><a href='https://www.flickr.com/photos/dangitshang' target='_blank'>
				Flickr Gallery</a></div>";
		}
		
		echo "</div>";
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<meta name="author" content="Brandon S. Hang"/>

		<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Sorts+Mill+Goudy' rel='stylesheet' type='text/css'/>
		<link type="image/x-icon" rel="shortcut icon" href="img/icons/icon.ico"/>
		<link id="css" type="text/css" rel="stylesheet" href="style/sassy-hang.css"/>
		
		<title>Brandon S. Hang</title>

	</head>
	<body>
	
		<!-- Navigation Bar -->
		<div class="nav-container">
			<hr class="blue-menu"></hr>
			<div>
				<a href="#top">Brandon S. Hang</a>
				<img id="menu-button" src="img/icons/menu-open-50px.png"/>
				<div id="links">
					<ul>
						<?php
							$icon_pics = array(
								"img/icons/icon-book-29px.png",
								"img/icons/icon-pc-29px.png",
								"img/icons/icon-music-29px.png",
								"img/icons/icon-email-29px.png");
							$icon_links = array(
								"#about",
								"#programming",
								"#interests",
								"#contact",);
							$icon_text = array(
								"About Me",
								"Programming",
								"Interests",
								"Contact Me",);
							
							foreach ($icon_pics as $index => $icon) {		// Builds the top nav menu
								echo
									"<li style=\"background-image: url('$icon');\">
									<a href='$icon_links[$index]'>$icon_text[$index]</a></li>";
							}
						?>
					</ul>
				</div>
			</div>
		</div>
		<!-- Introduction Section -->
		<div id="top" class="container">
			<div class="content">
				<img src="img/bkgrds/myface-circle.png" alt="It's my face..."/>
				<h1>Car enthusiast, NBA junkie, musician, and all-around swell guy</h1>
			</div>
		</div>
		
		<!-- About Me Section -->
		<div id="about" class="container">
			<div class="content">
				<h2>About Me</h2>
				<img src="img/bkgrds/about-pic.jpg" alt="Flying kick!"/>
				<?php
					print_txt_file("misc/About.txt");
				?>
			</div>
		</div>
		
		<div id="prog" class="container">
			<div class="content">
				<h2>Programming</h2>
				<section>
					<div id="git-card">
						<div>
							<div class="tooltip">
								<img class="git-status"/>
								<img class="git-logo" src="img/icons/github-40px.png"/>
								<span></span>
							</div>
						</div>
						<a href="https://github.com/brandonhang" target="blank"></a>
						<span></span>
						<table>
							<tr>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>
									<a href="https://github.com/brandonhang?tab=repositories" target="blank">REPOS</a>
								</td>
								<td>
									<a href="https://github.com/brandonhang/followers" target="blank">FOLLOWERS</a>
								</td>
							</tr>
						</table>
						<img id="git-pic"/>
					</div>
					<p>
						You can find my GitHub page here containing my some of my projects both
						past and present.  Also shown is a tree of some finished projects done
						at the University of Pittsburgh.
					</p>
				</section>
				<div id="cs-tree"></div>
			</div>
		</div>
		
		
		<!-- Programming Section -->
		<div id="programming" class="container">
			<div class="content">
				<h2>Programming</h2>
				
				<ul>
					<li>
						<img src="img/icons/github-220px.png">
						<a href="https://github.com/brandonhang" target="blank"><img src="img/icons/github-logo.png"/></a>
						<p>
							Here, you'll find my GitHub repository containing a smattering of my past 
							projects done at the University of Pittsburgh.  It may seem bare at the 
							moment but as I continue to hone my craft, expect this repository to fill 
							up.
						</p>
					</li>
					<li>
						<img src="img/icons/resume-220px.png">
						<a href="misc/BHang_resume_Feb2016.pdf" target="_blank">Résumé</a>
						<p>
							Behold!  My résumé for all the world to see!  Contained within this
							single sheet of paper is a succinct summary of my career highlights.
							</br><i>Updated: February 2016</i>
						</p>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Interests Section -->
		<div id="interests" class="container">
			<div class="content">
				<h2>Interests</h2>
				<ul>
					<?php
						$likes = array(
							"Music",
							"Media",
							"Cars",
							"Sports"
						);
						
						foreach ($likes as $hobby) {		// Builds the interactive "buttons" for each interest
							build_list($hobby);
						}
					?> 
				</ul>
			</div>
		</div>
		
		<!-- Contact Form -->
		<div id="contact" class="container">
			<div class="content">
				<h2>Contact</h2>
				<form action="index.php#contact" method="POST">
					<h5>Name</h5>
					<input type="text" name="name" maxlength="30" placeholder="Your name"/>
					<h5>Email</h5>
					<input type="email" name="email" maxlength="40" placeholder="your@email.com"/>
					<h5>Message</h5>
					<textarea name="message" maxlength="600" placeholder="What would you like to tell me?"></textarea>
					<input class="button" type="submit" name="send" value="Send"/>
				</form>
				<img src="img/bkgrds/logo-big.png"/>
			</div>
			
		</div>
		
		<!-- Contact Send Popup -->
		<?php
			if (isset($_POST["send"]) === TRUE) {			// Displays a message if the contact form is used
				echo
					"<div id='message-sent' class='underlay-dim'>
						<div>
							<h3>$message</h3>
							<button class='button'>Hooray!</button>
						</div>
					</div>";
			}
		?>
		
		<!-- Footer -->
		<div id="footer">
			&copy; 2016 Brandon S. Hang
			<a href="#">About this site</a>
		</div>
		
		<!-- Cookies TOC -->
		<?php if ($display_alert === TRUE) { ?>
			<div id="cookie-terms">
				<p>
					This site uses cookies (not the sugary, cavity-inducing type) to make your
					browsing experience awesome.  No personal or sensitive information is ever
					stored.  By continuing to use this site, you agree to this use of cookies
					and understand that they are not edible, baked goods.
				</p>
				<button id="accept-button" class="button">I Understand</button>
			</div>
		<?php }; ?>
		
		<!-- Scripts -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
		<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
		<script src="js/cs_tree.js"></script>
		<script src="js/jquery.easing.1.3.js"></script>
		<script src="js/mobile-menu.js"></script>
		<script src="js/easing_nav_jump.js"></script>
		<script src="js/hide_terms.js"></script>
		<script src="js/toggle_interests.js"></script>
		<script src="js/lightbox.js"></script>
		<script src="js/about.js"></script>
		<script src="js/hide_submit.js"></script>
		<script src="js/github_api.js"></script>
		
	</body>
</html>
<!--
            `Nd      `sdo`    
      ```.-+dMm:`      .Nh    
     `oyysyMMNyys`      hN    
          /Mm.          dd    
         /Mm.      `-::/Md.   
        /Mh`      -oso+yMmymy-
       +Ms             `NN-dMd
      sd:-/ossso:      `NmMh: 
h.   /hddyo+//:yMd    `hMN:   
M. +md+`      /NN+  :yNMMMMy  
M../`` :smMNmdN+  -NMMMMMMM:  
N:  sNNMmo+MMh.   /dmsdMMM/   
do  yMmsshMMh mMm.    hMNmmy. 
sd   -+sMymMMyMd:   `sMM:..mh 
.o   :dm:.MMMh:    -NMMMy. mN 
   /dMN+smMN+      -mMM+  :Mm 
  oMMMMd+hMM+        hN  /NN- 
  `oo:   `-`         hMdNMd-  
                     Nm//-    
                    .Ms       
                    +M-       
                    dm        
                   .M+        
                   oN`        
                   ms         
                  .M.         
                  om          
                  hh          
                  dy          
                  ms          
                  yo
-->