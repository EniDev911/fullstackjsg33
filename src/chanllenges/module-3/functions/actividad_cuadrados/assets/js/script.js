// variable global que almacena un color
color = "";
const box1 = document.querySelector("#box-1"),
    box2 = document.querySelector("#box-2"),
    box3 = document.querySelector("#box-3"),
    box4 = document.querySelector("#box-4"),
    currentColor = document.querySelector(".color");

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

for (let box of [box1, box2, box3, box4]) {
    box.addEventListener("click", () => {
        cambiarColor(box);
    })
}
