$(document).ready(function() {
	$.ajax({
		url: 'https://api.github.com/users/brandonhang',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var timestamp = getTimestamp();
			$('#git-pic').attr("src", data.avatar_url);
			$('#git-card > a').text("@" + data.login);
			$('#git-card > span').text(data.company);
			$('#git-card tr:first-of-type td:first-of-type').text(data.public_repos);
			$('#git-card tr:first-of-type td:last-of-type').text(data.followers);
			$('.git-status').attr("src", "img/icons/api-connected.png");
			$('.tooltip span').text("The GitHub API is connected!");
			$.ajax({
				url: 'php/github_cache.php',
				type: 'POST',
				dataType: 'text',
				data: {
					"avatar": data.avatar_url,
					"login": data.login,
					"company": data.company,
					"repos": data.public_repos,
					"data": data.followers,
					"update": timestamp
				}
			});
		},
		error: function() {
			$.ajax({
				url: 'misc/github_cache.txt',
				type: 'GET',
				dataType: 'text',
				success: function(data) {
					var git = data.split("\n");
					$('#git-pic').attr("src", git[0]);
					$('#git-card > a').text("@" + git[1]);
					$('#git-card > span').text(git[2]);
					$('#git-card tr:first-of-type td:first-of-type').text(git[3]);
					$('#git-card tr:first-of-type td:last-of-type').text(git[4]);
					$('.git-status').attr("src", "img/icons/api-cached.png");
					$('.tooltip span').html("Couldn't connect to the API.<br>" +
							"Using a cached version from<br>" + git[5] + ".");
				},
				error: function() {
					$('#git-pic').attr("src", "https://avatars1.githubusercontent.com/u/16514561?v=3");
					$('#git-card > a').text("@brandonhang");
					$('#git-card > span').text("University of Pittsburgh");
					$('#git-card tr:first-of-type td:first-of-type').text("???");
					$('#git-card tr:first-of-type td:last-of-type').text("???");
					$('.git-status').attr("src", "img/icons/api-fubar.png");
					$('.tooltip span').html("Couldn't connect to the API.<br>");
				}
			});
		}
	});
});

function getTimestamp() {												// Gets the current day and time in the UTC time zone
	var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var date = new Date();
	var weekday = dayArr[date.getUTCDay()];
	var month = monthArr[date.getUTCMonth()];
	var day = date.getUTCDate();
	var hour = date.getUTCHours();
	var min = date.getUTCMinutes();
	var sec = date.getUTCSeconds();
	var year = date.getUTCFullYear();
	
	if (day < 10) {					// Adds a zero in front of the number if it is less than 10
		day = String(0) + day;
	}
	if (hour < 10) {
		hour = String(0) + hour;
	}
	if (min < 10) {
		min = String(0) + min;
	}
	if (sec < 10) {
		sec = String(0) + sec;
	}
	
	return weekday + " " + month + " " + day + " " + hour + ":" + min + ":" + sec + " " + year + " UTC";
}
