//Guarda que se hizo click en el marcador
var eventBackup;

function onClick(e) {
    var i = this.options;
    console.log(i);
    e.target.setIcon(activeMarker);
    if (eventBackup == undefined) {
        eventBackup = e;        
    }
    else {
        eventBackup.target.setIcon(defaultMarker);
        eventBackup = e;
    }
}