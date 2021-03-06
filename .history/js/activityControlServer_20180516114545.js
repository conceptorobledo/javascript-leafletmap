//Controla el estado de los hogares activo e inactivo.

patrolsRef.on('child_added', activityControl, errData);

let timer = {};

function activityControl(data){
    const homeId = data.val().homeId;
    homesRef.child(refKey).update({estado: 'actividad'});

    if(timer[refKey]){
        clearTimeout(timer[refKey]);
    }
}



/* 
//Aquí se guarda la o las funciones de timer
let timer = {};

//Actividad de patrulla
function patrolActivity(data) {
    const refKey = data.ref.key;

    console.log('refkey' + refKey);
    //Sí marca patrulla, estado esta ok
    homesRef.child(refKey).update({ estado: 'ok' });

    //Si existia timer, reiniciar timeout
    if(timer[refKey]){
        clearTimeout(timer[refKey]);
    }
    //Establecer timeout
    timer[refKey] = setTimeout(() => {
        console.log('TIMEOUT' + refKey);
        delete timer[refKey];      
        homesRef.child(refKey).update({ estado: 'inactividad' });
    }, 10000);
}
 */