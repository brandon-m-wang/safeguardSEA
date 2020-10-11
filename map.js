var map;
var seattle = {lat: 47.6062, lng: -122.3321};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 47.6062, lng: -122.3321},
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
}

let circleArray = []

let contentString = "Location: South Park Date: 8/31/2020 Description: Anti-Black assault on multiple local community members. In violation of state (RCW 9A.36.080), and municipal code (SMC 12A.06.115)."

fetch('https://us-central1-safeguard-292111.cloudfunctions.net/getAllCrimes')
    .then(response => response.json())
    .then(data => drawCircles(data[0]));


function drawCircles(data) {
    for (let i in circleArray) {
        circleArray[i].setMap(null)
    }
    circleArray = []
    for (key in data) {
        latlngobj = key.split(", ")
        latlngobj = {lat: parseFloat(latlngobj[0]), lng: parseFloat(latlngobj[1])}
        if(data[key] < 10) {
            const circle = new google.maps.Circle({
                fillColor: '#e29002',
                fillOpacity: .8,
                strokeColor: 'white',
                strokeWeight: .5,
                clickable: true,
                map,
                center: latlngobj,
                radius: Math.sqrt(data[key]) * 50
            })
            circleArray.push(circle)
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            google.maps.event.addListener(circle, 'click', function(ev){
            infowindow.setPosition(circle.getCenter());
            infowindow.open(map);
    });
        }else if(data[key] < 50) {
            const circle = new google.maps.Circle({
                fillColor: '#ca3900',
                fillOpacity: .8,
                strokeColor: 'white',
                strokeWeight: .5,
                clickable: true,
                map,
                center: latlngobj,
                radius: Math.sqrt(data[key]) * 50
            })
            circleArray.push(circle)
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            google.maps.event.addListener(circle, 'click', function(ev){
            infowindow.setPosition(circle.getCenter());
            infowindow.open(map);
    });
        }else{
            const circle = new google.maps.Circle({
                fillColor: '#d00000',
                fillOpacity: .8,
                strokeColor: 'white',
                strokeWeight: .5,
                clickable: true,
                map,
                center: latlngobj,
                radius: Math.sqrt(data[key]) * 50
            })
            circleArray.push(circle)
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            google.maps.event.addListener(circle, 'click', function(ev){
            infowindow.setPosition(circle.getCenter());
            infowindow.open(map);
    });
        }

    };
}


$(function () {
    $("#submission").click(function (event) {
        submitUserData()
        event.preventDefault()
    });
});

function submitUserData() {
    raceSelection = $('#race option:selected').text();
    genderSelection = $('#gender option:selected').text();
    sexualitySelection = $('#sexuality option:selected').text();
    religionSelection = $('#religion option:selected').text();

    fetch(`https://us-central1-safeguard-292111.cloudfunctions.net/getLocations?race=${raceSelection}&religion=${genderSelection}&sexuality=${sexualitySelection}&gender=${religionSelection}`)
        .then(response => response.json())
        .then(data => drawCircles(data[0]));
}



/*  NO LONGER RELEVANT ------
          // Create a <script> tag and set the USGS URL as the source.
          var script = document.createElement('script');

          // // This example uses a local copy of the GeoJSON stored at
          // http:earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
          script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
*/
//loading data using JSON file
// map.data.loadGeoJson("data.JSON");

/*         document.getElementsByTagName('head')[0].appendChild(script);

        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
          return {
            icon: getCircle(magnitude)
          };
        });
        
      }

      function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#e27500',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }

      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
      }
*/
// const infowindow = new google.maps.InfoWindow({
//   content: 'contentString'
// });

// const marker = new google.maps.Marker({
//   position: uluru,
//   map,
//   title: "Uluru (Ayers Rock)",
// });
// marker.addListener("click", () => {
//   infowindow.open(map, marker);
// });