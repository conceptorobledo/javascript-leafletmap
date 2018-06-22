const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
patrolsRef.on('child_added', patrolStatus, errData);

function patrolStatus(data) {
    const patrols = data.val();
    const keys = Object.keys(patrols);
    console.log(keys);

    /* let timer;
    const patrols = data.val();
    console.log(patrols);
    const keys = Object.keys(patrols);

    for (var i = 0; i < keys.length; i++) {
        //Saca el último nodo de cada patrulla
        patrolsRef.child(key).orderByKey().limitToLast(1).once('value', singlePatrol);
        function singlePatrol(pData) {
            if (timer[key]) {
                clearTimeout(timer[key]);
            }
            timer[key] = setTimeout(() => {
                console.log('estado de inactividad en patrulla ' + key);
                homesRef.child(key).update({ estado: 'inactividad' });
            }, 8000);
        }

    } */
    //Iterar y revisar estados de la patrulla por TIMESTAMP
}

// retrieve the last record from `ref`
patrolsRef.endAt().limit(1).on('child_added', function(snapshot) {

    // all records after the last continue to invoke this function
    console.log(snapshot.name(), snapshot.val());
 
 });