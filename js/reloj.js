const mostrarReloj = () => {
    let fecha = new Date(); // Creates a new Date object to get the current date and time
    let hr = formatoHora(fecha.getHours()); // Formats hours to a two-digit string
    let min = formatoHora(fecha.getMinutes()); // Formats minutes to a two-digit string
    let seg = formatoHora(fecha.getSeconds()); // Formats seconds to a two-digit string

    // Displays the formatted time (HH:MM:SS) in the element with id 'hora'
    document.getElementById('hora').innerHTML = `${hr}:${min}:${seg}`;

    // Array containing the abbreviated names of the months
    const meses = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Array containing the abbreviated names of the weekdays
    const dias = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    let diaSemana = dias[fecha.getDay()]; // Gets the current day of the week as a string
    let dia = fecha.getDate(); // Gets the current day of the month (1–31)
    let mes = meses[fecha.getMonth()]; // Gets the current month as a string
    let year = fecha.getFullYear();  // Gets the current year (e.g., 2024)
    let fechaTexto = `${diaSemana}, ${mes}/${dia}/${year}`;

     // Constructs the full date text in the format: "Day, Mon/DD/YYYY"
    document.getElementById('fecha').innerHTML = fechaTexto;
};

const formatoHora = (hora) => {
     // Ensures single-digit numbers are displayed as two digits ("9" becomes "09")
    return hora < 10 ? '0' + hora : hora;
};

// Calls mostrarReloj every 1000 milliseconds (1 second) to update the time and date
setInterval(mostrarReloj, 1000);