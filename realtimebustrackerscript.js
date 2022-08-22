mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNwODQwMyIsImEiOiJjbDZoNjNkZWowZTV3M2NvempzNDJsNzd5In0.VS_EVMeF6UESjL-AOmEuIQ';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/satellite-v9',
center: [-71.092761, 42.357575],
zoom: 14
});


/*var marker = new mapboxgl.Marker()
.setLngLat([-71.092761, 42.357575])
.addTo(map);

const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

let counter = 0;
function move () {
    setTimeout(() =>{
       if (counter >= busStops.length) return;
       marker.setLngLat(busStops[counter]);
       counter++;
       move();
    }, 1000);
}*/

var markers = [];

async function run(){
  if (markers.length > 0) {
    markers.forEach((marker) => marker.remove());
  }
  
      const locations = await getBusLocations();
    console.log(new Date());
    console.log (locations);
  
      locations.forEach((element) => {
      const el = document.createElement('div');
        el.className = 'marker';
  
      var marker = new mapboxgl.Marker()
          .setLngLat([
        element.attributes.longitude,
        element.attributes.latitude,
      ])
          .addTo(map);
        markers.push(marker)
      })
  
    console.log(new Date());
    setTimeout(run,15000);
  }
  
    async function getBusLocations(){
      const url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
      const response = await fetch(url);
      const json     = await response.json();
    return json.data;
  }
  
   run();