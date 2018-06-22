//Genera el reporte de todas las patrullas
//Las imprime en el sidebar

const patrolsRef = database.ref('patrols');

//Firebase sacar valores de homes
patrolsRef.orderByKey().limitToLast(10).on('value', patrolReport, errData);
function patrolReport(data) {
    const patrols = data.val();
    if(patrols == null){
        $('#report-list-all').html('<p>No hay patrullas</p>');
        return false;
    }
    let list= '';
    let arr = [];
    Object.keys(patrols).map(key => {
        homesRef.child(patrols[key].homeId).once('value', home => {
            const homeSingle = home.val();
            const address = homeSingle.address;
            const timeOfPatrol = EpochtoDate(patrols[key].timestamp).default;
            const el = '<li><div class="report-head">'+ address  + '<span class="status-badge ok">ok</span>'+'</div>' + '<div class="report-body">' + timeOfPatrol+ '</div>' +'</li>';
            arr.push(el);
        }, errData);
    });
    //Da vuelta el array para que sea en order descendente.
    arr.reverse();
    Object.keys(arr).map(key => {
        list+=arr[key];
    });
    $('#report-list-all').html(list).animate();
}



