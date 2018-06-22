const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
patrolsRef.on('value', patrolStatus, errData);

function patrolStatus(data) {
    const patrols = data.val();
    const keys = Object.keys(patrols);
    console.log(patrols)
    patrolsRef.once('child_added', patrolChild, errData);
    function patrolChild(childData){
        console.log(childData);
    }

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