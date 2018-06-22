const database = firebase.database();

const homesRef = database.ref('homes');
const patrolsRef = database.ref('patrols');

function homesData(data) {
    Object.keys(data).map(key => {
        return data[key]
    });
}

console.log(homesData(homesRef));