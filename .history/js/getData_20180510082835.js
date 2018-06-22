const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

function homesData(data) {
    Object.keys(data).map(key => {
        const lat = homes[key].lat;
        const lng = homes[key].lon;
    })
}