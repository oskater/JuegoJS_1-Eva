const btn_jugar=document.getElementById("btn_jugar");
const btn_reiniciar=document.getElementById("btn_reiniciar");

const conf_juego=document.getElementById("conf_juego");
const paneles=document.getElementById("paneles");
const numero_casillas=document.getElementById("NumeroCasillas");

const panel__enemigo=document.getElementById("panel__enemigo");
const panel__aliado=document.getElementById("panel__aliado");

const puntosAliados=document.getElementById("puntosAliados");
const puntosEnemigos=document.getElementById("puntosEnemigos");

const fin_juego=document.getElementById("fin_juego");

const mostrarJuego=()=>{
    if(numero_casillas.value!="Selecciona"){
        conf_juego.style.display="none";
        puntosAliados.style.display="flex";
        puntosEnemigos.style.display="flex";
        paneles.style.display="block";
        cargar__tableros();
    }else{
        numero_casillas.style.border="2px solid red";
    }
}

let flotas=0;
const cargar__tableros=()=>{
    if(numero_casillas.value=="4x4"){
        crearTabla(4, 4);
        flotas=8;
    }else if(numero_casillas.value=="6x6"){
        crearTabla(6, 6);  
        flotas=12;  
    }else if(numero_casillas.value=="8x8"){
        crearTabla(8, 8);
        flotas=24;
    }
    cargar__flotas();
}



function crearTabla(filas, columnas) {
    const tabla_aliados = document.createElement('TABLE');
    const tabla_enemigos = document.createElement('TABLE');

    for (let i = 0; i < filas; i++) {
        let fila_aliados = document.createElement('TR');
        let fila_enemigos = document.createElement('TR');

        for (let j = 0; j < columnas; j++) {
            let celda_aliados = document.createElement('TD');
            let celda_enemigos = document.createElement('TD');
            fila_aliados.append(celda_aliados);
            fila_enemigos.append(celda_enemigos);
        }
        tabla_aliados.append(fila_aliados);
        tabla_enemigos.append(fila_enemigos);
    }

    panel__aliado.append(tabla_aliados);
    panel__enemigo.append(tabla_enemigos);
}

const cargar__flotas=()=>{
    const casillas__enemigo=panel__enemigo.querySelectorAll("TD");
    const casillas__aliado=panel__aliado.querySelectorAll("TD");

    for(let i=0; i<flotas; i++){
        let random1=0;
        let random2=0;
        do{
            random1=Math.floor(Math.random()*casillas__aliado.length);
            random2=Math.floor(Math.random()*casillas__enemigo.length);
        }while(casillas__aliado[random1].value=="flota" || casillas__enemigo[random2].value=="flota");
        casillas__aliado[random1].value="flota";
        casillas__enemigo[random2].value="flota";
    }
}


const juegoAliado=(event)=>{
    if(event.target.tagName=="TD"){
        if(event.target.value=="flota"){
            event.target.style.backgroundColor="green";
            puntosAliados.firstElementChild.nextElementSibling.textContent=parseInt(puntosAliados.firstElementChild.nextElementSibling.textContent)+1;
            if(parseInt(puntosAliados.firstElementChild.nextElementSibling.textContent)==flotas){
                mostrar_fin_juego(true);
            }
        }else{
            event.target.style.backgroundColor="red";
        }  
        juegoEnemigo();
    }
}

const juegoEnemigo=()=>{
    const casillas__aliado=panel__aliado.querySelectorAll("TD");
    let eleccion_maquina=casillas__aliado[Math.floor(Math.random()*casillas__aliado.length)];
    
    do{
        eleccion_maquina=casillas__aliado[Math.floor(Math.random()*casillas__aliado.length)];
    }while(eleccion_maquina.style.backgroundColor=="red" || eleccion_maquina.style.backgroundColor=="green");
    
    if(eleccion_maquina.value==null || eleccion_maquina.value=="caido"){
        eleccion_maquina.style.backgroundColor="red";
        eleccion_maquina.value="caido";
        eleccion_maquina=casillas__aliado[Math.floor(Math.random()*casillas__aliado.length)];
    } else if(eleccion_maquina.value=="flota"){
        eleccion_maquina.style.backgroundColor="green";
        puntosEnemigos.firstElementChild.nextElementSibling.textContent=parseInt(puntosEnemigos.firstElementChild.nextElementSibling.textContent)+1;
        if(parseInt(puntosEnemigos.firstElementChild.nextElementSibling.textContent)==flotas){
            mostrar_fin_juego(false);
        }
    }

}

document.addEventListener("DOMContentLoaded",cargar__tableros);
btn_jugar.addEventListener("click", mostrarJuego);
panel__enemigo.addEventListener("click",juegoAliado);

const mostrar_fin_juego=(ganador)=>{
    if(ganador==true){
        fin_juego.firstElementChild.textContent="¡GANASTE!"
    }else{
        fin_juego.firstElementChild.textContent="¡PERDISTE!"
    }
    paneles.style.display="none";
    fin_juego.style.display="flex";
}

const finJuego=()=>{
    window.location.href="./index.html";
}

btn_reiniciar.addEventListener("click", finJuego)