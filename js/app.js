const ingresos = [];
const egresos = [];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){ // Itera sobre cada ingreso
        totalIngreso += ingreso.valor; // Suma el valor de cada ingreso al total
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){ // Itera sobre cada egreso
        totalEgreso += egreso.valor; // Suma el valor de cada egreso al total
    }
    return totalEgreso;
}

// Actualiza el encabezado con el presupuesto y porcentaje de egresos
let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos(); // Calcula el presupuesto total
    let porcentajeEgreso = totalEgresos()/totalIngresos(); // Calcula el porcentaje de egresos

    // Muestra los valores formateados en el DOM, ubicandolos por 'id'
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// Formatea valores como moneda
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
}

// Formatea valores como porcentaje con dos decimales
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}

// Genera el HTML para mostrar los ingresos y lo inserta en el DOM
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso); // Genera el HTML para cada ingreso 
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML; // Inserta el HTML en el contenedor de ingresos
}

// Crea el HTML de un ingreso individual, esta funcion es llamada en el bloque anterior ^
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
    return ingresoHTML;
};

// Elimina un ingreso basado en su 'id'
const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id); // Busca el índice del ingreso
    ingresos.splice(indiceEliminar,1); // Elimina un indice del array por medio de splice()
    cargarCabecero(); // Actualiza el encabezado
    cargarIngresos(); // Actualiza la lista de ingresos
}

// Genera el HTML para mostrar los egresos y lo inserta en el DOM
const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso); // Genera el HTML para cada egreso
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML; // Inserta el HTML en el contenedor de egresos
}

// Crea el HTML de un egreso individual
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
    return egresoHTML
}

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id); // Busca el índice del egreso
    egresos.splice(indiceEliminar,1); // Elimina por splice()
    cargarCabecero();
    cargarEgresos();
}

// Agrega un nuevo dato (ingreso o egreso) basado en los valores del formulario
let agregarDato = ()=>{
    let forma = document.forms['forma']; // Accede al formulario con el id 'forma' y lo asigna a la variable 'forma'
    let tipo = forma['tipo']; // Obtiene el elemento de tipo (ingreso o egreso) del formulario y lo asigna a la variable 'tipo'
    let descripcion = forma['descripcion'];  // Obtiene el campo de descripción del formulario y lo asigna a la variable 'descripcion'
    let valor = forma['valor']; // Obtiene el campo de valor del formulario y lo asigna a la variable 'valor'
    if(descripcion.value !== '' && valor.value !== ''){  // Comprueba que los campos de 'descripcion' y 'valor' no estén vacíos
        if(tipo.value === 'ingreso'){ // Comprueba si el tipo seleccionado es 'ingreso'
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value))); // Crea un nuevo objeto 'Ingreso' usando los valores de 'descripcion' y 'valor' del formulario
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value === 'egreso'){ // Si el tipo seleccionado es 'egreso', ejecuta este bloque
            egresos.push(new Egreso(descripcion.value, Number(valor.value))); // Crea un nuevo objeto 'Egreso' con los valores de 'descripcion' y 'valor' y lo añade al array 'egresos'
            cargarCabecero();
            cargarEgresos();
        }
    }
};