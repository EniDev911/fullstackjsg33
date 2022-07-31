// variable global que almacena un color
color = "";
// Selectores
const box1 = document.querySelector("#box-1"),
    box2 = document.querySelector("#box-2"),
    box3 = document.querySelector("#box-3"),
    box4 = document.querySelector("#box-4"),
    currentColor = document.querySelector(".color");

// Evento de capturar las teclas
document.addEventListener('keydown', (event) => {
    keyValue = event.key;
    if (keyValue === "a") {
        color = "#f5c";
        cambiarColor(currentColor);
    } else if (keyValue === "s") {
        color = "#9cb";
        cambiarColor(currentColor);
    } else if (keyValue === "d") {
        color = "#f50";
        cambiarColor(currentColor);
    }
})

const cambiarColor = function (element) {
    element.style.backgroundColor = color;
}

/*
box1.addEventListener("click", ()=>{
    cambiarColor(box1);
})
box2.addEventListener("click", ()=>{
    cambiarColor(box1);
})

box3.addEventListener("click", ()=>{
    cambiarColor(box1);
})

box4.addEventListener("click", ()=>{
    cambiarColor(box1);
})
*/
for (let box of [box1, box2, box3, box4]) {
    box.addEventListener("click", () => {
        cambiarColor(box);
    })
}
