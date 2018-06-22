//Controla el estado de los hogares activo e inactivo.

patrolsRef.on('child_added', activityControl, errData);

let timer = {};

function activityControl(data) {
    const homeId = data.val().homeId;
    homesRef.child(refKey).update({ estado: 'actividad' });

    //Si existia timer, reiniciar timeout
    if (timer[refKey]) {
        clearTimeout(timer[refKey]);
    }
    //Establecer timeout
    timer[refKey] = setTimeout(() => {
        console.log('TIMEOUT' + refKey);
        delete timer[refKey];
        homesRef.child(refKey).update({ estado: 'inactividad' });
    }, 10000);
}