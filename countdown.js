$(document).ready(function() {
	var sunset = new Date();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			$.getJSON("https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&formatted=0", function(data) {
				sunset = new Date(data.results.sunset);
				var now = new Date();
				var diff = sunset - now;
				var hours = Math.floor(diff / (60 * 60 * 1000));
				diff -= hours * (60 * 60 * 1000);
				var minutes = Math.floor(diff / (60 * 1000));
				diff -= minutes * (60 * 1000);
				var seconds = Math.floor(diff / 1000);
				var countdown = hours + ":" + padZero(minutes) + ":" + padZero(seconds);
				$("#countdown").html(countdown);
				setInterval(function() {
					now = new Date();
					diff = sunset - now;
					hours = Math.floor(diff / (60 * 60 * 1000));
					diff -= hours * (60 * 60 * 1000);
					minutes = Math.floor(diff / (60 * 1000));
					diff -= minutes * (60 * 1000);
					seconds = Math.floor(diff / 1000);
					countdown = hours + ":" + padZero(minutes) + ":" + padZero(seconds);
					$("#countdown").html(countdown);
				}, 1000);
			});
		}, function(error) {
			console.log("Error getting location: " + error.message);
			$("#countdown").html("Error getting location");
		});
	} else {
		console.log("Geolocation not supported");
		$("#countdown").html("Geolocation not supported");
	}
});

function padZero(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return num;
	}
}
