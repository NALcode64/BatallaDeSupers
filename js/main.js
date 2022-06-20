//CLASE CONSTRUCTORA SUPERS
class superHeroe {
  constructor(nombre, poder, agilidad, inteligencia, imagen, id) {
    this.nombre = nombre; //tipo String
    this.poder = poder; //tipo Número
    this.agilidad = agilidad; //tipo Número
    this.inteligencia = inteligencia; //tipo Número
    this.imagen = imagen; //tipo Imagen
    this.id = id; //tipo Número  //el ID me sirve para poder identificar las tarjetas de cada super en el html 
  }
}

//VARIABLES CON SUPERS
const ironMan = new superHeroe("Iron Man",1545,4544,8441,"./img/ironMan.jpg",1),
      thor = new superHeroe("Thor",4564,3454,1574,"./img/thor.jpg",2),
      hulk = new superHeroe("Hulk",4564,1445,1004,"./img/hulk.jpg",3),
      capitanAmerica = new superHeroe("Capitan America",2400,1451,1451,"./img/capitanAmerica.jpg",4),
      ojoDeHalcon = new superHeroe("Ojo de Halcón",1500,6451,3451,"./img/hawkEye.jpg",5),
      viudaNegra = new superHeroe("Viuda Negra",1500,7451,3551,"./img/blackWidow.jpg",6),
      spiderMan = new superHeroe("Spider Man",5400,3451,9451,"./img/spiderman.jpg",7),
      vision = new superHeroe("Visión",2400,1451,1451,"./img/vision.jpg",8),
      mighy = new superHeroe("Mighy Thor","2455","3456","5662","./img/mightyThor.jpg",9),
      charles = new superHeroe("Charles Xavier","12345","1423","14563","./img/charlesXavier.jpg",10);


//LISTA DE SUPERS
let superHeroes = [ironMan,thor,hulk,capitanAmerica,ojoDeHalcon,viudaNegra,spiderMan,vision,mighy,charles];

//LISTA DE SUPERS (VACIA)
let superSeleccionados = [];

//NODOS
const personajeSeleccionado1 = document.getElementById("personaje1"),
      personajeSeleccionado2 = document.getElementById("personaje2"),
      contenedorBotones = document.getElementById("botones"),
      botonReset = document.createElement("div"),
      botonLucha = document.createElement("div"),
      contenedorSupers = document.querySelector(".contenedor"),
      botonQuieroMasPersonajes = document.getElementById("quieroMas");

//FUNCION PARA AGREGAR SUPERS DE MANERA DINAMICA
function agregarSupers(listaSupers) {
  listaSupers.forEach((heroe) => {  
    contenedorSupers.innerHTML += ` <img class="tarjeta" id="tarjeta${heroe.id}" src="${heroe.imagen}" alt="${heroe.nombre}" /> `;
  });
}

//FUNCION PARA AGREGAR UN EVENTO A CADA TARJETA DE SUPERS EN LA PAGINA
function agregarEventos(listaSupers) {
  listaSupers.forEach((heroe) => 
  {
    document.querySelector(`#tarjeta${heroe.id}`) //selecciona la tarjeta que tenga el mismo ID del objeto en el foreach, cada objeto es un super 
            .addEventListener("click", () => { guardarPersonaje(heroe) }) //le agrega a esa tarjeta que encontro un evento para poder tocar y guardar el objeto(héroe) asociado
  });
}

//FUNCION PARA GUARDAR CADA PERSONAJE TOCANDO LA TARJETA
function guardarPersonaje(personaje) {
  if (superSeleccionados.length != 2) {
    superSeleccionados.push(personaje);
    mostrarSuper(personaje);
    superSeleccionadosAviso();
  } 
}

//FUNCION QUE MUESTRA LOS SUPERS SELECCIONADOS (A LA IZQUIERDA O DERECHA DE LA PÁGINA)
function mostrarSuper(personaje) {
  if (superSeleccionados.length < 3) {
    if (superSeleccionados.length <= 1) {
      crearBotones();
      personajeSeleccionado1.innerHTML += `
                            <img src="${personaje.imagen}" alt="${personaje.nombre}" />
                            <div class="caracteristicas" >
                                <h4>Nombre : ${personaje.nombre}</h4>
                                <h4>Nivel de Poder : ${personaje.poder}</h4>
                                <h4>Nivel de Agilidad: ${personaje.agilidad}</h4>
                                <h4>Nivel de Inteligencia: ${personaje.inteligencia}</h4>
                            <div/>
                    `;
    } else {
      personajeSeleccionado2.innerHTML += `
                            <img src="${personaje.imagen}" alt="${personaje.nombre}" />
                            <div class="caracteristicas" >
                                <h4>Nombre : ${personaje.nombre}</h4>
                                <h4>Nivel de Poder : ${personaje.poder}</h4>
                                <h4>Nivel de Agilidad: ${personaje.agilidad}</h4>
                                <h4>Nivel de Inteligencia: ${personaje.inteligencia}</h4>
                            <div/>
                    `;
    }
  }
}

//FUNCION PARA QUE APAREZCA LOS BOTONES DE PELEA Y PARA REINICIAR EL JUEGO
function crearBotones() {
  botonLucha.innerHTML += `
                            <div id="botonLuchar" onclick="luchar()">  ENFRENTARLOS
                                <img src="./img/fight.png" alt="botonLucha"/>
                            <div/>
                    `;
  botonReset.innerHTML += `
                            <div id="botonReset" onclick="reiniciar()">  REINICIAR JUEGO
                                <img src="./img/reload.png" alt="botonReinicio"/>
                            <div/>
                    `;

  contenedorBotones.appendChild(botonLucha);
  contenedorBotones.appendChild(botonReset);
}

//FUNCION PARA REINICIAR EL JUEGO
function reiniciar() {
  personajeSeleccionado1.innerHTML = "";
  personajeSeleccionado2.innerHTML = "";
  botonReset.innerHTML = "";
  botonLucha.innerHTML = "";
  superSeleccionados.splice(0, superSeleccionados.length);

  guardarEnStorage("listaDeGanadores", JSON.stringify(ganadores)); //cada vez que reiniciamos el juego guarda a los ganadores
}

//FUNCION PARA LUCHA DE PERSONAJES
function luchar() {
  const poderSuperUno = superSeleccionados[0].poder;
  const poderSuperDos = superSeleccionados[1].poder;

  if (poderSuperUno > poderSuperDos) {
    personajeSeleccionado1.innerHTML = `<div id="ganador"> <img src="${superSeleccionados[0].imagen}" alt="${superSeleccionados[0].nombre}" /> GANADOR "${superSeleccionados[0].nombre}" <div/> `;
    personajeSeleccionado2.innerHTML = "";
    botonLucha.innerHTML = "";

    return ganadores.push(superSeleccionados[0]); //guardo los personajes que van ganando en una variable

  } else if (poderSuperDos > poderSuperUno) {
    personajeSeleccionado2.innerHTML = `<div id="ganador"> <img src="${superSeleccionados[1].imagen}" alt="${superSeleccionados[1].nombre}" /> GANADOR "${superSeleccionados[1].nombre}" <div/> `;
    personajeSeleccionado1.innerHTML = "";
    botonLucha.innerHTML = "";

    return ganadores.push(superSeleccionados[1]);
    
  } else {
    alert("TENEMOS UN EMPATE!!!");
  }
}

//STORAGE
const ganadores = []; //para guardar a los ganadores por cada pelea realizada

//FUNCION QUE GUARDA CADA OBJETO EN LOCAL STORAGE, PREVIAMENTE SE NECESITA QUE EL OBJETO ESTE TRANSFORMADO POR JSON
function guardarEnStorage(nombre, valor) {
  localStorage.setItem(nombre, valor);
}

//SWEET ALERT
function superSeleccionadosAviso() {
  Swal.fire({
    position: 'top-end',
    title: 'personaje seleccionado',
    showConfirmButton: false,
    timer: 500,
    width: 400,
    imageUrl: "./img/avengersIcon.png",
    imageHeight: 100,
  })
}

//ASOCIA A UN BOTON UN EVENTO PARA AGREGAR MAS PERSONAJES 
botonQuieroMasPersonajes.addEventListener("click", () => { agregarMas() });

//FUNCION QUE AGREGA MAS PERSONAJES A LA LISTA DE PERSONAJES
function agregarMas() {
  fetch("/personajesExtra.json")
      .then(function(res) {
          return res.json();
      })
      .then((datos) => {
        agregarSupers(datos); //AGREGA LOS NUEVOS SUPERS DESDE EL JSON
        agregarEventos(datos.concat(superHeroes));  //AGREGA LOS EVENTOS A TODAS LAS CARDS NUEVAMENTE 
      })
  botonQuieroMasPersonajes.innerHTML = ""; //DESAPARECE EL BOTON PARA AGREGAR MAS PERSONAJES 
}

//PROGRAMA
agregarSupers(superHeroes); //AGREGA LOS SUPERS EN LA PÁGINA 
agregarEventos(superHeroes); //AGREGAR EVENTOS EN LAS TARJETAS 

