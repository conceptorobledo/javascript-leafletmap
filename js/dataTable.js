patrolsRef.orderByKey().limitToLast(100).on('value', patrolReport, errData);
function patrolReport(data) {
    const patrols = data.val();
    if (patrols == null) {
        $('#report-list-all').html('<p>No hay patrullas</p>');
        return false;
    }
    //let list= '';
    let dataset = [];
    Object.keys(patrols).map(key => {
        homesRef.child(patrols[key].homeId).once('value', home => {
            const homeSingle = home.val();
            const address = homeSingle.address;
            const date = EpochtoDate(patrols[key].timestamp);
            console.log(date);
            const timeOfPatrol = date.hours
            const dayOfPatrol = date.day_month;
            const monthOfPatrol = date.month;
            const fulldate = date.flat;
            dataset.unshift([address, timeOfPatrol, fulldate ]);
        }, errData);
    });
    $('#control-table').DataTable({
        searching: false,
        ordering:  false,
        data: dataset,
        order: [[ 1, "desc" ],[2, "desc"]],
        columns: [
            { title: 'Dirección' },
            { title: 'Hora' },
            { title: 'Fecha'}
        ]
    });
}
