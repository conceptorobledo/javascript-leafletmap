const database = firebase.database();
const patrolsRef = database.ref('patrols');
const homesRef = database.ref('homes');

const table = $('#control-table').DataTable({
    searching: false,
    ordering:  true,
    order: [[ 1, "desc" ],[2, "desc"]],
    columns: [
        { title: 'Dirección' },
        { title: 'Hora' },
        { title: 'Fecha'},
        { title: 'Ronda' },
        { title: 'Status' }
    ],
    "columnDefs": [
        { width:"40%"},
        { width:"30%"},
        { width:"30%"},
      ]
});

patrolsRef.orderByKey().limitToLast(100).once('value', patrolReport, errData);
 function patrolReport(data) {
    const patrols = data.val();
    if (patrols == null) {
        $('#report-list-all').html('<p>No hay patrullas</p>');
        return false;
    }
    
    Object.keys(patrols).map(key => {
        homesRef.child(patrols[key].homeId).once('value', home => {
            const homeSingle = home.val();
            const address = homeSingle.address;
            const date = EpochtoDate(patrols[key].timestamp);
            const timeOfPatrol = date.hours
            const fulldate = date.flat;
            const columns = [ address, timeOfPatrol, fulldate, 'demo','<span class="status-badge ok">ok</span>' ]
            table.rows.add([columns]).draw();
        }, errData);
    });
    
}


function errData(err) {
    console.log('Error');
    console.log(err);
}