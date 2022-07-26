    ele = document.getElementById("ele1");
    ele.style.color = "green";
    ele.addEventListener("click", function(event, color = "yellow") {
      event.target.style.backgroundColor = "yellow";
      event.target.style.color = color;
    });