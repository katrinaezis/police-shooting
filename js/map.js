// Katrina Ezis
// Info-343
// Assignment 3: Police-Shooting
// 10/21/2015

// Global variable needed to create map
var map;

// Calls draw map once the page has loaded
window.onload = function() {
	drawMap();
};

// Draws a mapbox map then calls getData to begin populating map
var drawMap = function() {
  map = L.map('map-container').setView([35, -100], 4);
  var layer = L.tileLayer('https://api.mapbox.com/v4/katrinaezis.noedkc81/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2F0cmluYWV6aXMiLCJhIjoiY2lmeWFqYm5kNHZ6MnVubHl6ZHNpcGVzaSJ9.u7DgPtcf5tLTdhIuoEtwow#4');
  layer.addTo(map);
  getData();
}

// Gets the data from the JSON file, then calls customBuild with that
// JSON data
var getData = function() {
  // Executes an AJAX request to get the data in data/response.js
  $.ajax({
  	url: "data/response.json",
  	type: 'get',
  	success: function(data) {
  		customBuild(data);
  	},
  	dataType: 'json'
  });

}

// Creates layers for the map and then loops through the
// JSON data passed in to find the correct information to
// create circles to be added to those layers.
var customBuild = function(data) {
	// Three layer groups
	var armed = new L.LayerGroup([]);
	var unarmed = new L.LayerGroup([]);
	var unknown = new L.LayerGroup([]);
	// Variables to keep count for table
	var killarm = 0;
	var killunarm = 0;
	var hitarm = 0;
	var hitunarm = 0;
	// Loops through data and grabs necesary info
	$.each(data, function(i, val) {
		var lat = val["lat"];
		var lon = val["lng"];
		var kill = val["Hit or Killed?"];
		var key = val["Armed or Unarmed?"];
		var sum = val["Summary"];
		var link = val["Source Link"];
		link = "<a href=" + link + ">" + sum + "</a>";
		// Creates circles and gives them color
		if (key == "Armed") {
			var circle = new L.circleMarker([lat, lon], {
				color: '#004747',
				fillColor: '#004747',
				fillOpacity: '0.7'
			});
			circle.bindPopup(link);
			circle.addTo(armed);
		} else if (key == "Unarmed") {
			var circle = new L.circleMarker([lat, lon], {
				color: '#000000',
				fillColor: '#000000',
				fillOpacity: '0.7'
			});
			circle.bindPopup(link);
			circle.addTo(unarmed);
		} else {
			var circle = new L.circleMarker([lat, lon], {
				color: '#800000',
				fillColor: '#800000',
				fillOpacity: '0.7'
			});
			circle.bindPopup(link);
			circle.addTo(unknown);
		}
		// Table data
		if (kill == "Hit" && key == "Armed") {
			hitarm++;
		} else if (kill == "Killed" && key =="Armed") {
			killarm++;
		} else if (kill == "Hit" && key == "Unarmed") {
			hitunarm++;
		} else if (kill == "Killed" && key == "Unarmed") {
			killunarm++;
		}
	});
	// Populates table
	$('#ka').html(killarm);
	$('#ku').html(killunarm);
	$('#ha').html(hitarm);
	$('#hu').html(hitunarm);
	// Adds layers to map
	armed.addTo(map);
	unarmed.addTo(map);
	unknown.addTo(map);
	var control = {
		"Armed": armed,
		"Unarmed": unarmed,
		"Not Known": unknown
	};
	L.control.layers(null, control).addTo(map);
}


