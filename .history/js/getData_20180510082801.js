const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

function homesData(data){
    const homes = data.val();
    const lat = homes[key].lat;
    const lng = homes[key].lon;
}