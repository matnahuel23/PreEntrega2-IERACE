//---------------------------------------FECHA ACTUAL ------------------------------------------
//Obtengo fecha Actual
const fechaActual = new Date();
//---------------------------------------Arreglo Consultorio-----------------------------------------------
// Array de pacientes
let consultorio = [];
// inicializo Id
let id = 1;
//-----------------------------------Constructor de Objeto Paciente---------------------------------------------
class Paciente {
    constructor (info) {
        // AUMENTO ID POR CADA PACIENTE
        this.id = id++;
        this.dni = parseInt(info.dni);
        this.nombre = info.nombre.toUpperCase ();
        this.apellido = info.apellido.toUpperCase();
        this.nacimiento = info.nacimiento;
        // fecha de nacimiento en formato toLocaleDateString()
        const edad = new Date(Date.parse(info.nacimiento));
        // diferencia fecha actual - nacimiento y ademas en la misma linea convertir diferencia en años y redondear
        this.edad = Math.floor( (fechaActual - edad) / (365.25 * 24 * 60 * 60 * 1000));
        this.telefono = parseInt (info.telefono);
        this.sexo = info.sexo.toUpperCase ();
        this.pais = info.pais.toUpperCase ();
        this.agenda = false; 
    }
    agendado (){
        this.agenda = true;
    }
}

//---------------------------------------Cargo Paciente en Objeto para probar------------------------------------------
// const pacientes = new Paciente ({
//     dni : 123456789,
//     nombre : "Matias", 
//     apellido : "Ierace",
//     nacimiento : '11/07/1986',  // para fechas uso las comillas que estan en el ? '' con mes/dia/año
//     telefono : 123456789,
//     sexo : "Masculino",
//     pais : "Argentina"
// });
//----------------------------------Cargo Objetos Pacientes dentro del Arreglo Consultorio--------------------------------------------

consultorio.push(new Paciente({
    dni : 111,
    nombre : "Matias", 
    apellido : "Ierace",
    nacimiento : '11/07/1986',  // para fechas uso las comillas que estan en el ? '' con mes/dia/año
    telefono : 111,
    sexo : "Masculino",
    pais : "Argentina"
    })
);

consultorio.push(new Paciente({
    dni : 222,
    nombre : "maria", 
    apellido : "gomez",
    nacimiento : '12/31/1994',
    telefono : 222,
    sexo : "femenino",
    pais : "Argentina"
    })
);

consultorio.push(new Paciente({
    dni:333,
    nombre: "juan", 
    apellido:"perez",
    nacimiento:'01/01/2000',
    telefono: 333,
    sexo: "masculino",
    pais:"brasil"
    })
);
//---------------------------------------Busquedas-------------------------------------------------
// muestro todo el arreglo
console.log(consultorio);

// Busqueda por id, el id propio del array arranca en 0
console.log(consultorio[id = 0]);

// Busqueda mediante FOR datos especificos en este caso id y nombre de todo el ARRAY
for (const Paciente of consultorio) {
    console.log(Paciente.id);
    console.log(Paciente.nombre);
};

// Busqueda y funcion agendado paso a JUAN a TRUE agendado
for (const Paciente of consultorio) {
    if (Paciente.nombre === "JUAN")
    {
        Paciente.agendado();
    }
}

//FOREACH Busqueda por el Valor Pais dentro de consultorio, usando el forEach y con esto reemplazo la funcion for
consultorio.forEach(Paciente => {
    console.log(Paciente.pais);
});

// FIND devuelve todo el PRIMER objeto encontrado que coincida con mi busqueda
const buscado = consultorio.find(Paciente => Paciente.id === 2);
console.log(buscado); //{id: 3, dni: 333, Nombre: "JUAN", apellido: "PEREZ"...}

// SOME devuelve BOOLEANO para la busqueda que hago en este caso personas que se llamen PEDRO
const existe = consultorio.some(Paciente => Paciente.nombre === "PEDRO");
console.log(existe); // false

// FILTER devuelve los que cumplen la condicion en este caso menor de 25 años
const jovenes = consultorio.filter(Paciente => Paciente.edad < 25);
console.log(jovenes); // [{id: 3, dni: 333, Nombre: "JUAN", apellido: "PEREZ"...}]

// .LENGTH para obtener total de objetos en el arreglo
const totalPacientes = consultorio.length;
console.log (totalPacientes);

//REDUCE acumulador para tener el total en este caso de edades todas sumandas, con acumulador, lo que suma y el 0 es el inciador
const edades = consultorio.reduce ((acum, item) => acum + item.edad, 0);
console.log(edades);

//para hacer promedio de edad hago asi de facil total/cantidad
let promedioEdad=edades/totalPacientes;
console.log(promedioEdad);

// MAP busca y devuelve un arreglo con todos los nombres de los pacientes
const listaNombres = consultorio.map(Paciente => Paciente.nombre);
console.log(listaNombres);//[ 'MATIAS', 'MARIA', 'JUAN' ]

//MAP transformando el arreglo con Nacionalidad Modificada por URUGUAY y sumo 5 a la edad
const todosPeru = consultorio.map((item) => {
    return{
        dni : item.id,
        nombre : item.nombre, 
        apellido : item.apellido,
        nacimiento : item.nacimiento,
        edad : item.edad + 5,
        telefono : item.telefono,
        sexo : item.sexo,
        pais : "URUGUAY",
    }
});
console.log(todosPeru);

// SORT para ordenar por alfabeto o edad depende si pongo .edad o .nombre
consultorio.sort ((a,b) => {
    if (a.edad > b.edad) {
        return 1
    }
    if (a.edad < b.edad) {
        return -1
    }
    return 0
});
console.log(consultorio);

//------------------------------------ELIMINAR-------------------------------------------------

const index = 1; // índice del elemento a eliminar poniendo 1 elimino el 2do

consultorio.splice(index, 1); // elimina un elemento a partir del índice 1 o sea el 2 se elimina 

console.log(consultorio); // Output: [{ id: 1, nombre: "objeto1" }, { id: 3, nombre: "objeto3" }]