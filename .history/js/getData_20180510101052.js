const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

function homesData(data) {
    const homes = data.val()
    Object.keys(homes).map(key => {
        const lat = data[key].lat;
        const lng = data[key].lon;
        console.log(lat + " y " + lng)
        var LamMarker = L.marker([lat, lng], { icon: defaultMarker});
        marker.push(LamMarker);
        marker[key].on('click', onClick);
        mymap.addLayer(marker[key]);
    });
}

//Firebase sacar valores de homes
homesRef.on('value', homesData, errData);

function errData(err) {
    console.log('Error');
    console.log(err);
}