var marker;
var coords = {};

initMap = function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      coords = {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      };
      setMapa(coords);
    }, function (error) { console.log(error); });
}

let count = 0;
function setMapa(coords) {
  var map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: 8,
      center: new google.maps.LatLng(coords.lat, coords.lng),

    });
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(coords.lat, coords.lng),

  });
  marker.addListener('click', toggleBounce);

  marker.addListener('dragend', function (event) {
    document.getElementById('coords').innerHTML = `LATITUD: ${this.getPosition().lat()} LONGITUD: ${this.getPosition().lng()}`
    console.log(`Latitud: ${this.getPosition().lat()} Longitud: ${this.getPosition().lng()}`);
    count++;
    console.log(count);
    let label = document.getElementById('label');
    let btn = document.getElementById('btn');
    if (count % 2 === 0) {
      label.innerHTML = 'TU PEDIDO PUEDE SER ENVIADO'
      btn.disabled = false;
      btn.classList.remove("btn-disabled");

    } else {
      label.innerHTML = 'NO TENEMOS COBERTURA'
      btn.disabled = true;
      btn.classList.add('btn-disabled');
    }
  });
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function getData() {
  fetch('https://sandboxintegracion.chazki.com:8443/chazkiServices/delivery/coverage/position?store="1"&latitude=-6.771344&longitude=-79.838635', {
    method: 'GET',
    headers: {
      'chazki-api-key': '6UdfUPiIPR5Zez1chaZkihPh5eMUtr0QOjzxl0'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data));
}
// getData();



