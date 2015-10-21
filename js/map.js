var map;

window.onload = function() {
	drawMap();
};

// $(document).ready(function() {
// 	drawMap();
// });


// Function to draw your map
var drawMap = function() {

  // Create map and set view
  //var map = L.map('#map-container').setView([latitude, longitude], zoom);
  map = L.map('map-container').setView([35, -100], 4);
  var layer = L.tileLayer('https://api.mapbox.com/v4/katrinaezis.noedkc81/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2F0cmluYWV6aXMiLCJhIjoiY2lmeWFqYm5kNHZ6MnVubHl6ZHNpcGVzaSJ9.u7DgPtcf5tLTdhIuoEtwow#4');
  layer.addTo(map);
  getData();

  // Create a tile layer variable using the appropriate url


  // Add the layer to your map
 

  // Execute your function to get data
 
}

// Function for getting data
var getData = function() {
  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
  	url: "data/response.json",
  	type: 'get',
  	success: function(data) {
  		//console.log(data);
  		customBuild(data);
  	},
  	dataType: 'json'
  });
  // When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data) {
	// Be sure to add each layer to the map
	// Once layers are on the map, add a leaflet controller that shows/hides layers
	

	//female vs male
	// armed vs not armed
	//killed vs not killed
	// var race = new L.LayerGroup([white, black]);
	//var gender = new L.LayerGroup([]);

	var armed = new L.LayerGroup([]);
	var unarmed = new L.LayerGroup([]);
	var unknown = new L.LayerGroup([]);
	var killarm = 0;
	var killunarm = 0;
	var hitarm = 0;
	var hitunarm = 0;
	$.each(data, function(i, val) {
		var lat = val["lat"];
		var lon = val["lng"];
		var kill = val["Hit or Killed?"];
		var key = val["Armed or Unarmed?"];
		var sum = val["Summary"];
		var link = val["Source Link"];
		link = "<a href=" + link + ">" + sum + "</a>";
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
	$('#ka').html(killarm);
	$('#ku').html(killunarm);
	$('#ha').html(hitarm);
	$('#hu').html(hitunarm);
	armed.addTo(map);
	unarmed.addTo(map);
	unknown.addTo(map);
	var control = {
		"Armed": armed,
		"Unarmed": unarmed,
		"Not Known": unknown
	};
	L.control.layers(null, control).addTo(map);
	// circle.addTo(race);
	//circle.addTo(gender);
	// var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
	//     denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
	//     aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
	//     golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
	// var cities = L.layerGroup([littleton, denver, aurora, golden]);
	// 	var overlayMaps = {
	//     "Cities": cities
	// };
	// L.control.layers(null, cities).addTo(map);



	//L.control.layers(race).addTo(map);

}


