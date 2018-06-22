const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

function homesData(data) {
    Object.keys(data).map(key => {
        const lat = data[key].lat;
        const lng = data[key].lon;
        console.log(lat,lng)
        var LamMarker = L.marker([lat, lng], { icon: defaultMarker});
        marker.push(LamMarker);
        marker[key].on('click', onClick);
        mymap.addLayer(marker[key]);
    });
}
