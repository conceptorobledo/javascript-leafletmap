const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
patrolsRef.on('child_changed', patrolStatus, errData);

let timer = {};
function patrolStatus(data) {
    const refKey = data.ref.key;
    console.log('ok');
    homesRef.child(refKey).update({ estado: 'ok' });
    timer[key] = setTimeout(() => {
        console.log('TIMEOUT');
        homesRef.child(key).update({ estado: 'inactividad' });
    }, 8000);
    
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
