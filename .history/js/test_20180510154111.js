const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
patrolsRef.on('child_changed', patrolActivity, errData);

//Aquí se guarda la o las funciones de timer
let timer = {};

//Actividad de patrulla
function patrolActivity(data) {
    const refKey = data.ref.key;

    //Sí marca patrulla, estado esta ok
    homesRef.child(refKey).update({ estado: 'ok' });

    //Si existia timer, reiniciar timeout
    if(timer[refKey]){
        clearTimeout(timer[refKey]);
    }
    timer[refKey] = setTimeout(() => {
        console.log('TIMEOUT');
        delete timer[refKey];        
        homesRef.child(refKey).update({ estado: 'inactividad' });
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
