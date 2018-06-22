const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
patrolsRef.on('child_changed', patrolActivity, errData);

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
        console.log('TIMEOUT');
        delete timer[refKey];      
        homesRef.child(refKey).update({ estado: 'inactividad' });
    }, 8000);
}
