<?php
	session_start();
	$cookie_set = isset($_COOKIE["snickerdoodle"]);		// Yes, my cookie is named after... a cookie
	$display_alert = TRUE;				// Sets the use of cookies TOC to true
	
	if ($cookie_set === TRUE) {			// If the cookie is set, the site will not display the use of cookies TOC
		$display_alert = FALSE;
		setcookie("snickerdoodle", "Returning visitor", time() + 60);		// Adds another 10 seconds to the cookie expiration
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
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<meta name="author" content="Brandon S. Hang"/>
		
		<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Sorts+Mill+Goudy' rel='stylesheet' type='text/css'/>
		<link type="image/x-icon" rel="shortcut icon" href="img/icons/icon.ico"/>
		<link type="text/css" rel="stylesheet" href="style/sassy-hang.css"/>
		<link type="text/css" rel="stylesheet"  href="slick/slick.css"/>
		
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
				<h1>Car enthusiast, computer overlord, and all-around swell guy</h1>
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
		
		<div id="programming" class="container">
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
						<a href="https://github.com/brandonhang"></a>
						<span></span>
						<table>
							<tr>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>
									<a href="https://github.com/brandonhang?tab=repositories">REPOS</a>
								</td>
								<td>
									<a href="https://github.com/brandonhang/followers">FOLLOWERS</a>
								</td>
							</tr>
						</table>
						<img id="git-pic"/>
					</div>
					<p>
						You can find my GitHub page here containing my some of my projects both
						past and present.  Also shown is the repository of my finished projects
						completed at the University of Pittsburgh.  Click on the inner nodes to
						view the different branches in this repo or click on a terminal node to
						its source code on GitHub!
					</p>
					<p>
						If you are so inclined, you can also take a look at my current résumé
						by clicking <a href="misc/BHang_Resume.pdf" target="blank">here</a>.
					</p>
				</section>
				<div id="cs-tree"></div>
			</div>
		</div>
		
		<!-- Interests Section -->
		<div id="interests" class="container">
			<div class="content">
				<h2>Interests</h2>
				<h5>Music</h5>
				<p class="int-desc">
					Playing music, my oldest and most beloved pastime, has taken me on many a journey between cities,
					across state lines, and even international boundaries!  Like I said earlier, it all started in
					4<sup>th</sup> grade when I was given my first instrument.  Performance-wise, my first love still is,
					and will always be, jazz.  Influenced from a young age by my father, I grew up listening to the music
					of Dave Brubeck and Miles Davis and quickly developed a taste for the genre.  As I grew older, it was
					through performing jazz that I was able to experience many different places and cultures.  In recent
					years, I also rediscovered the joy in performing classical piano.  <i>*Sniff*</i>, my old piano teacher
					would be so proud!  After visiting Jamaica with the Pitt Jazz Ensemble, I began enjoying reggae as well.
					There was just something about experiencing music at its origin that really touched my soul.  Recently,
					on the whim of a friend to be wed, I took to singing as well.  Well, it took quite a bit of coaxing as I
					had never sung before an audience in my life!  No, elementary school choir does <i>not</i> count!  In
					the end, my first vocal performance was an entire concert in front of a packed wedding reception!  And
					it was a hit!<br/><br/>
					Check out these <a href='concert.php'>Dynamically Generated Concert Program Notes</a>!
				</p>
				<div class="music-thumbs thumbnails"></div>
				<div class="music slideshow"></div>
				<h5>Cars</h5>
				<p class="int-desc">
					Anyone who knows me knows that I am a real car nut, a diehard petrolhead, an automotive <i>fanatic</i>.
					I don&#39t know exactly when the bug bit me, but I seemingly turned overnight.  For me, automobiles are
					more than just a two ton steel appliance that shuttle you from point A to point B.  To me, automobiles
					carry personalities that are often conveyed in their owners.  Some cars are temperamental, refusing to
					go out if there&#39s even a single drop of rain.  Some are loud and rude and always angry at the world,
					shouting at the top of their (mechanical) lungs.  Others have a bit more self-control and only get riled
					up when pressed.  In any case, I enjoy cars from every era.  From the classic pony cars of yesteryear,
					to the ludicrously-priced and ludicrously powerful European exotics, and even the Japanese street
					legends of humble origins, I&#39m a fan of it all.<br/><br/>
					You can see more of my automotive photography on my
					<a href="https://www.flickr.com/photos/dangitshang">Flickr</a>!
				</p>
				<div class="cars-thumbs thumbnails"></div>
				<div class="cars slideshow"></div>
			</div>
		</div>
		
		<!-- Contact Form -->
		<div id="contact" class="container">
			<div class="content">
				<h2>Contact</h2>
				<form method="POST">
					<section>
						<label for="name">Name</label>
						<input type="text" name="name" maxlength="30" placeholder="Your name"/>
					</section>
					<section>
						<label for="email">Email</label>
						<input type="email" name="email" maxlength="40" placeholder="your@email.com"/>
					</section>
					<label for="message">Message</label>
					<textarea name="message" maxlength="600" placeholder="What would you like to tell me?"></textarea>
					<h5>Anti-Skynet</h5>
					<input class="button" type="submit" name="send" value="Send"/>
					<div id="recaptcha"></div>
				</form>
				<img src="img/bkgrds/logo-big.png"/>
			</div>
		</div>
		
		<!-- Footer -->
		<div id="footer">
			<span>&copy; 2016 Brandon S. Hang</span>
			<a href="https://github.com/brandonhang"><img src="img/icons/github-gray-28px.png"/></a>
			<a href="https://www.linkedin.com/in/brandonhang"><img src="img/icons/linkedin-gray-28px.png"/></a>
			<a href="https://www.flickr.com/photos/dangitshang"><img src="img/icons/flickr-gray-28px.png"/></a>
			<a href="https://www.youtube.com/playlist?list=PLr-gFI33RZBw-uQb17DgehrGYP9CotwZ_">
				<img src="img/icons/youtube-gray-28px.png"/>
			</a>
			<a href="http://www.pitt.edu/~bsh41/"><img src="img/icons/bsod-gray-28px.png"/></a>
			<a id="lightbulb"><img src="img/icons/lightbulb-gray-28px.png"/></a>
			<a>About this site</a>
		</div>
		
		<!-- Contact Send Popup -->
		<div id='message-sent' class='underlay-dim'>
			<div>
				<h3></h3>
				<button class='button'>Okay</button>
			</div>
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
		<script src="js/recaptcha.js"></script>
		<script src="js/mobile-menu.js"></script>
		<script src="js/cs_tree.js"></script>
		<script src="js/hide_terms.js"></script>
		<script src="js/lightbox.js"></script>
		<script src="js/about.js"></script>
		<script src="js/github_api.js"></script>
		<script src="js/send_msg.js"></script>
		<script src="js/jquery.easing.1.3.js"></script>
		<script src="js/easing_nav_jump.js"></script>
		<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
			async defer></script>
		<script src="slick/slick.min.js"></script>
		<script src="js/slick_init.js"></script>
		<script src="js/light_up.js"></script>
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
