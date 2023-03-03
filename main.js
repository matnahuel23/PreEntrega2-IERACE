//------------------------------------ARRAY CONSULTORIO-----------------------------------------
let consultorio = [];
//---------------------------------------FECHA ACTUAL ------------------------------------------
//Obtengo fecha Actual
const fechaActual = new Date();
//----------------------------------------CONSULTAS--------------------------------------------
let consultasTexto = "Cual de las siguientes operaciones desea realizar: \n 1- Buscar paciente por id \n 2- Buscar por apellido \n 3- Agendar paciente por ID \n 4- Existe paciente con x edad \n 5- Listado de los nombres de los pacientes";
//-----------------------------------Constructor de Objeto Paciente---------------------------------------------
// inicializo Id
let id = 1;
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

//------------------------------------FUNCIONES--------------------------------------------

// carga de paciente
function cargaPacientes (){
    // Array de pacientes
    let consultorio = [];
    let seleccion = true;
    while (seleccion){
        let DNI = Number (prompt ("Ingrese DNI"));
        let NOMBRE =  prompt("Ingrese Nombre");
        let APELLIDO =  prompt("Ingrese Apellido");
        let fechaNac =  prompt("Ingrese Fecha de nacimiento formato MM/DD/AAAA");
        const fechaArr = fechaNac.split("/");
        const NACIMIENTO = new Date(`${fechaArr[2]}-${fechaArr[0]}-${fechaArr[1]}`);
        let TELEFONO = Number (prompt ("Ingrese Telefono"));
        let NACIONALIDAD = prompt ("Ingrese Nacionalidad");
        let SEXO = sexoPaciente();
        consultorio.push(new Paciente({
            dni:DNI,
            nombre: NOMBRE, 
            apellido:APELLIDO,
            nacimiento:NACIMIENTO,
            telefono: TELEFONO,
            sexo: SEXO,
            pais:NACIONALIDAD
            }));
    seleccion = confirm("¿Desea ingresar otro Paciente?");
    }
    /* uso este alert con JSON para chequear que se haya cargado el arreglo dentro de la funcion
    const consultorioJSON = JSON.stringify(consultorio);
    alert(consultorioJSON); */
    return consultorio
}

function sexoPaciente(){
        let continuar = true;
        while (continuar){
            let S = prompt ("Ingrese Sexo M (Masculino),F (Femenino) u O (Otro)");
            S = S.toUpperCase();
            switch (S){
                    case "M":
                        SEXO = "MASCULINO";
                        continuar=false;
                        break;
                    case "F":
                        SEXO = "FEMENINO";
                        continuar=false;
                        break;
                    case "O":
                        SEXO = "OTRO";
                        continuar=false;
                        break;
                    default:
                    alert (`Error en la seleccion`)
            };
        }
        return SEXO;
}

function busqPorId(){
                    let idConsulta = Number (prompt ("Ingrese ID para buscar Paciente"));
                    let personaEncontrada = consultorio.find(function(Paciente) {return Paciente.id === idConsulta;
                                            });
                                            if (personaEncontrada.id === idConsulta)
                                            {
                                            alert (`${personaEncontrada.id}- ${personaEncontrada.nombre} ${personaEncontrada.apellido} \n La agenda es: ${personaEncontrada.agenda}`);
                                            }
                                            else {
                                                    alert ("No existe el paciente en el consultorio");
                                            }
}

function busqPorApellido (){
                    let apellidoConsulta = prompt ("Ingrese Apellido para buscar Paciente");
                    apellidoConsulta = apellidoConsulta.toUpperCase();
                    let personaEncontrada = consultorio.find(function(Paciente) {return Paciente.apellido === apellidoConsulta;
                                                });
                                                if (personaEncontrada.id === idConsulta)
                                                {
                                                alert (`${personaEncontrada.id}- ${personaEncontrada.nombre} ${personaEncontrada.apellido} \n La agenda es: ${personaEncontrada.agenda}`);}
                                                else {
                                                        alert ("No existe el paciente en el consultorio");
                                                }
    }

function agendarPaciente (){
                    let idAgendado = Number (prompt ("Ingrese Id para agendar paciente"));
                    consultorio.forEach(Paciente => {
                    if (Paciente.id === idAgendado){
                                                        Paciente.agendado();
                                                    }
                    });
                    
}

function existePacientePorEdad(){
                    let dato = Number (prompt ("Ingrese Edad para chequear existencia"));
                    const existe = consultorio.some (Paciente => Paciente.edad === dato);
                    if (existe){
                        alert ("Hay pacientes con la edad buscada");
                    }
                    else {
                        alert ("No se encuentran pacientes con la edad buscada");
                    }
}

function nombresPacientes (){
    const listaNombres = consultorio.map(Paciente => Paciente.nombre);
    alert(listaNombres);
}

function consultas (){
    let seleccion = true;
    while (seleccion){
                        let opcion = Number (prompt(`${consultasTexto}`));
                        switch (opcion){
                            case 1:
                                busqPorId();
                                break;
                            case 2:
                                busqPorApellido();
                                break;
                            case 3:
                                agendarPaciente();
                                break;
                            case 4:
                                existePacientePorEdad();
                                break;
                            case 5:
                                nombresPacientes();
                                break;
                        }
                    seleccion = confirm("¿Desea hacer otra consulta?");
                    }
}

//**************************************INICIO**************************************

consultorio = cargaPacientes ();
let mensaje = "Consultorio:\n";
for (let i = 0; i < consultorio.length; i++) {
  mensaje += `${consultorio[i].nombre} (${consultorio[i].edad} años)\n`;
}
alert(mensaje);
consultas ();
