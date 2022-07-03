'use strict'
const containerElements = document.getElementById("elements");
const qtyPet = prompt("¿Cuantas mascotas deseas regitrar?");

console.log(qtyPet);
containerElements.style.color = "green";
containerElements.innerHTML = `${qtyPet}`;

// crea una nueva hoja de estilo 
var nuevoCSS = document.createElement("style");
// establece el valor del atributo media del nuevo elemento creado 
nuevoCSS.setAttribute("media", "screen");
// añade la nueva hoja de estilo al final del <head>
document.head.appendChild(nuevoCSS);