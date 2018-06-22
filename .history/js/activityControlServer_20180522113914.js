//Controla el estado de los hogares activo e inactivo.

patrolsRef.on('child_added', activityControl, errData);

let timer = {};

function activityControl(data) {
    console.log('actividad');
    const homeId = data.val().homeId;
    homesRef.child(homeId).update({ estado: 'actividad' });

    //Si existia timer, reiniciar timeout
    if (timer[homeId]) {
        clearTimeout(timer[homeId]);
    }
    //Establecer timeout
    timer[homeId] = setTimeout(() => {
        console.log('TIMEOUT' + homeId);
        delete timer[homeId];
        homesRef.child(homeId).update({ estado: 'inactividad' });
    }, 20000);
}