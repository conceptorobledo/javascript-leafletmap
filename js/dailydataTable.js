const database = firebase.database();
const patrolsRef = database.ref('patrols');
const homesRef = database.ref('homes');


patrolsRef.orderByKey().limitToLast(100).on('value', patrolReport, errData);
 function patrolReport(data) {
    const patrols = data.val();
    if (patrols == null) {
        $('#report-list-all').html('<p>No hay patrullas</p>');
        return false;
    }
    let dataset = [
        ['Francisco Bilbao 2626','6', ((6/10)*100) + '%', '25/5/2018','<span class="status-badge ok">ok</span>'],
        ['Jorge Matte Gormaz 1677','7',((7/10)*100) + '%','25/5/2018','<span class="status-badge ok">ok</span>'],
        ['Francisco Bilbao 2626','10',((10/10)*100) + '%','24/5/2018','<span class="status-badge ok">ok</span>'],
        ['Jorge Matte Gormaz 1677','9',((9/10)*100) + '%','24/5/2018','<span class="status-badge nok">nok</span>'],
        ['Francisco Bilbao 2626','10',((10/10)*100) + '%','23/5/2018','<span class="status-badge ok">ok</span>'],
        ['Jorge Matte Gormaz 1677','10',((10/10)*100) + '%','23/5/2018','<span class="status-badge ok">ok</span>']
    ];
    const table = $('#daily-control-table').DataTable({
        searching: false,
        ordering:  true,
        data: dataset,
        order: [[3, "desc"]],
        columns: [
            { title: 'Dirección' },
            { title: 'Rondas'},
            { title: 'Completado'},
            { title: 'Fecha'},
            { title: 'status'}
        ],
        "columnDefs": [
            { width:"40%"},
            { width:"30%"},
            { width:"30%"},
          ]
    });
    Object.keys(patrols).map(key => {
        homesRef.child(patrols[key].homeId).once('value', home => {
            const homeSingle = home.val();
            const address = homeSingle.address;
            const date = EpochtoDate(patrols[key].timestamp);
            const timeOfPatrol = date.hours
            const fulldate = date.flat;
            const columns = [address, timeOfPatrol, fulldate ]
            dataset.unshift([address, timeOfPatrol, fulldate ]);
        }, errData);
    });
}


function errData(err) {
    console.log('Error');
    console.log(err);
}