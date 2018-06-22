const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

function homesData(data) {
    Object.keys(data).map(key => {
        const lat = data[key].lat;
        const lng = data[key].lon;
    });
}
