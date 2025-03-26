const { title } = require("process");

function initMap() {
    var location = { lat: 22.5645, lng: 72.9289 }; // Replace with the actual coordinates
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: location
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Location"
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<strong>GCET College</strong><br>*It is the location of the Conference (GCET Auditorium) <br><a href="https://maps.app.goo.gl/pR7ovJCzaCmDKg5PA" target="_blank">Google Maps Link</a>'
    });

    marker.addListener("click", function () {
        infoWindow.open(map, marker);
    });

    infoWindow.open(map, marker);
}
