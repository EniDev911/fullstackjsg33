// REQUERIMIENTO 3.1
// Original
// function pintar() {
//     ele = document.getElementById("ele1")
//     ele.style.backgroundColor = 'yellow'
// }
// ele = document.getElementById("ele1")
// ele.addEventListener("click", pintar);

// MODIFICADO 3.1

function pintar(ele) {
    ele.style.backgroundColor = 'yellow'
}
ele = document.getElementById("ele1");

ele.addEventListener("click", () => {
    pintar(ele);
});

// REQUERIMIENTO 3.2
// Modificar la función para pasar un color como argumento a la función pintar
// El color debe ser verde (green) por defecto, al hacer clic en el parráfo se 
// debe pasar a amarillo
function pintar(ele, color = "green") {
    ele.style.backgroundColor = color
}
pintar(ele);
ele.addEventListener("click", () => {
    pintar(ele, "yellow");
});