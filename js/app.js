// Arrays to store income and expense objects
const ingresos = [];
const egresos = [];

// Main function to initialize the application by loading header and data
let cargarApp = ()=>{
    cargarCabecero(); // Updates the header with budget and percentage
    cargarIngresos(); // Displays all income records in the DOM
    cargarEgresos(); // Displays all expense records in the DOM
}

// Calculates the total income by summing up all income values in the 'ingresos' array
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){ 
        totalIngreso += ingreso.valor; // Adds each income's value to the total
    }
    return totalIngreso;
}

// Calculates the total expenses by summing up all expense values in the 'egresos' array
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){ 
        totalEgreso += egreso.valor;  // Adds each expense's value to the total
    }
    return totalEgreso;
}

// Updates the header section with the budget and expense percentage
let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos(); // Computes the total budget
    let porcentajeEgreso = totalEgresos()/totalIngresos(); // Computes the expense percentage

    // Updates the DOM elements with formatted budget, percentages, and totals
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// Formats a numerical value as a currency in USD with two decimal places
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
}

// Formats a numerical value as a percentage with two decimal places
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}

// Generates the HTML content for the list of incomes and injects it into the DOM
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso); // Creates HTML for each income record 
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML; // Inserts the income list into the container
}

// Creates the HTML structure for a single income entry
const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML; // Returns the HTML string for the income entry
};

// Removes an income record based on its 'id' and updates the display
const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id); // Finds the index of the income to remove
    ingresos.splice(indiceEliminar,1); // Removes the income from the array
    cargarCabecero(); // Updates the header
    cargarIngresos(); // Updates the income list in the DOM
}

// Generates the HTML content for the list of expenses and injects it into the DOM
const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso); // Creates HTML for each expense record
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML; // Inserts the expense list into the container
}

// Creates the HTML structure for a single expense entry
const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                     <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML // Returns the HTML string for the expense entry
}

// Removes an expense record based on its 'id' and updates the display
const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id); // Finds the index of the expense to remove
    egresos.splice(indiceEliminar,1); // Removes the expense from the array
    cargarCabecero();
    cargarEgresos();
}

// Adds a new income or expense record based on the form input
let agregarDato = ()=>{
    let forma = document.forms['forma']; // Accesses the form element with the id 'forma'
    let tipo = forma['tipo']; // Retrieves the 'type' field (income or expense)
    let descripcion = forma['descripcion'];  // Retrieves the 'description' field
    let valor = forma['valor']; // Retrieves the 'value' field
    if(descripcion.value !== '' && valor.value !== ''){  // Ensures the fields are not empty
        if(tipo.value === 'ingreso'){ // If the type is 'income'
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value))); // Adds a new income record
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value === 'egreso'){ // If the type is 'expense'
            egresos.push(new Egreso(descripcion.value, Number(valor.value))); // Adds a new expense record
            cargarCabecero();
            cargarEgresos();
        }
    }
};