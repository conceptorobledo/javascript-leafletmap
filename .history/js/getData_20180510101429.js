const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
homesRef.on('value', homesData, errData);

var marker = new Array();


function homesData(data) {
    const homes = data.val()
    Object.keys(homes).map(key => {
        console.log(homes[key]);
        const lat = homes[key].lat;
        const lng = homes[key].lon;
        console.log(lat + " y " + lng)
        var LamMarker = L.marker([lat, lng], { icon: defaultMarker});
        marker.push(LamMarker);
        mymap.addLayer(marker[key]);
    });
}

function errData(err) {
    console.log('Error');
    console.log(err);
}