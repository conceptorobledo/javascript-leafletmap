//Toma un timestamp y lo convierte a horas,minutos, etc.
//La fecha a trabajar esta en EPOCH y las funciones de Javasccript aceptan UNIX, por lo que hay que multiplicarlos x 1000

//Pasa Epoch a Unix y luego a fecha
exports.EpochtoDate = function (timestamp) {
    //Timestamp es de epoch y hay que pasarlo a unix agregandole milisegundos
    const toDate = new Date(timestamp * 1000);
    const hours = (toDate.getHours() < 10 ? '0' : '') + toDate.getHours();
    //Si el minuto tiene 1 digito, agregarle 0 en frente
    const minutes = (toDate.getMinutes() < 10 ? '0' : '') + toDate.getMinutes();
    const seconds = (toDate.getSeconds() < 10 ? '0' : '') + toDate.getSeconds();
    const day = toDate.getUTCDate();
    // getMonth, 0 = Enero, 1 = Febrero ... etc
    const month = toDate.getMonth();
    let monthName;

    switch (month) {
        case 0:
            monthName = 'Enero';
            break;
        case 1:
            monthName = 'Febrero';
            break;
        case 2:
            monthName = 'Marzo';
            break;
        case 3:
            monthName = 'Abril';
            break;
        case 4:
            monthName = 'Mayo';
            break;
        case 5:
            monthName = 'Junio';
            break;
        case 6:
            monthName = 'Julio';
            break;
        case 7:
            monthName = 'Agosto';
            break;
        case 8:
            monthName = 'Septiembre';
            break;
        case 9:
            monthName = 'Octubre';
            break;
        case 10:
            monthName = 'Noviembre';
            break;
        case 11:
            monthName = 'Diciembre';
            break;
    };

    const dayOfTheWeek = toDate.getUTCDay();
    return {
        default: hours + ':' + minutes + ':' + seconds + ', ' + day + ' de ' + monthName,
        hours: hours + ':' + minutes,
        day_month: day + ' de ' + monthName
    }
}
