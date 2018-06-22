var marker = new Array();

var mymap = L.map('mapid', {
    center: [-33.435979, -70.596415],
    zoom: 16
});

// Iconos de markers personalizados
var iconDefault = 'img/map-markers-01.png';
var iconOk = 'img/map-markers-02.png';
var iconActive = 'img/map-markers-03.png';

var defaultMarker = L.icon({
    iconUrl: iconDefault,
    iconSize: [50, 78],
    iconAnchor: [30, 60],
    popupAnchor: [1, -34]
});
var statusOkMarker = L.icon({
    iconUrl: iconOk,
    iconSize: [50, 78],
    iconAnchor: [30, 60],
    popupAnchor: [1, -34]
});

//Inicializar firebase y refs respectivos
const database = firebase.database();
const homesRef = database.ref('homes');
//Firebase sacar valores de homes
homesRef.on('value', homesData, errData);

//Pinta marcadores en mapa
function homesData(data) {
    const homes = data.val();
    Object.keys(homes).map(key => {
        const single = homes[key];
        const lat = single.lat;
        const lng = single.lon;
        const estado = single.estado;
        const address = single.address;

        //Evita que se acumulen marcadores en el mismo lugar
        if (marker[key]) {
            mymap.removeLayer(marker[key]);
        }
        //Dependiendo del estado, se pone el marcador respectivo
        //A cada marcador se le asigna el homeId y su dirección respectiva para utilizarse cuando se sacan patrols del marker
        let theMarker;
        if(estado == "actividad"){

        }
        else if(estado == "inactividad"){

        }
        else{
            console.log('no esta definido');
            return;
        }
        switch (estado) {
            case undefined:
                console.log('no esta definido ' + address);
            case "actividad":
                marker[key] = L.marker([lat, lng], { icon: statusOkMarker, homeId: key, address: address });
                break;
            case "inactividad":
                marker[key] = L.marker([lat, lng], { icon: defaultMarker,   homeId: key, address: address });
                break;
            default:
                break;
        }
        console.log('crear marker ' + marker[key]);
        marker.push(marker[key]);
        //Tooltip
        marker[key].bindTooltip(address, { direction: 'top', opacity: 1, offset: [-5, -65] });
        //Le añade función onClick a la acción de click
        marker[key].on('click', onClick);
        mymap.addLayer(marker[key]);
    });
}

//Guarda que se hizo click en el marcador
let eventBackup;

//Función cuando se hace click en el marcador;
function onClick(e) {
    const i = this.options;
    const key = i.homeId;
    if(key == undefined){
        console.log('key no definida');
        return;
    }
    const address = i.address;
    //Añade clase para ponerle fondo
    console.log(key)
    //Firebase sacar valores de patrol del marker
    homesRef.child(key + '/patrols').orderByKey().limitToLast(10).once('value', patrolPerHomeReport, errData);
    function patrolPerHomeReport(data) {
        const patrols = data.val();
        console.log(patrols);
        let list = '';
        let arr = [];
        Object.keys(patrols).map(key => {
            patrolsRef.child(patrols[key]).once('value', patrolId => {
                const singlePatrol = patrolId.val();
                const timeOfPatrol = EpochtoDate(singlePatrol.timestamp).default;
                const el = '<li><div class="report-head">' + address + '<span class="status-badge ok">ok</span>' + '</div>' + '<div class="report-body">' + timeOfPatrol + '</div>' + '</li>';
                arr.push(el)
            }, errData);
        });
        //Da vuelta el array para que sea en order descendente.
        arr.reverse();
        Object.keys(arr).map(key => {
            list += arr[key];
        });
        $('ul.stacked.sidebar-nav ul').html(list).animate();
    }
    //END//

    $(e.target._icon).addClass('selectedMarker');
    if (eventBackup == undefined) {
        eventBackup = e;
    }
    else {
        //eventBackup.target.setIcon(defaultMarker);
        $(eventBackup.target._icon).removeClass('selectedMarker');
        eventBackup = e;
    }
    $("#wrapper").addClass("stack-toggled");    
}

function errData(err) {
    console.log('Error');
    console.log(err);
}

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY29uY2VwdG9yb2JsZWRvIiwiYSI6ImNqZGtkcjJlaTIyY3oycXJsa2l4MHd4YW0ifQ.K9-U1BeaboW5hJJiwklSCw', {
    maxZoom: 17,
    minZoom: 13
}).addTo(mymap);

