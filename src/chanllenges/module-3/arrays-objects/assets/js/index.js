import { propiedadesJSON as propertiesData } from './data.js'

const btn = document.getElementById("btn"),
      inputSince = document.getElementById("input-since"),
      inputUntil = document.getElementById("input-until"),
      inputRooms = document.getElementById("input-rooms"),
      totalResult = document.getElementById("total"),
      divProperties = document.getElementById("properties");

let message;
let template;

const createTemplate = (property)=>{
    template += `
    <div class="propiedad">
      <div class="img" style="background-image: url('${property.src}')"></div>
        <section>
          <h5>${property.name}</h5>
          <div class="d-flex justify-content-between">
            <p>Cuartos: ${property.rooms}</p>
            <p>Metros: ${property.m}</p>
          </div>
          <p class="my-3">${property.description}</p>
          <button class="btn btn-info ">Ver más</button>
        </section>
    </div>`
}

const validateInput = () => {
  message = "";
  for(let input of [inputRooms, inputUntil, inputSince]){
    if (input.value === ""){
        message += `¡El campo "${input.dataset.name}" no puede estar vacio!\n`;
      }
  }
  return inputRooms.value != "" && inputUntil.value != "" && inputSince.value != "";
}    

const searchData = () => {
  if (validateInput()){
    template = "";
    let total = 0;

    for (let property of propertiesData){
      if((Number(inputSince.value) <= property.m) 
        && (Number(inputUntil.value) >= property.m) 
        && (Number(inputRooms.value) <= property.rooms)){
          createTemplate(property);
          total = total + 1;
      }
    }
    divProperties.innerHTML = template;
    totalResult.innerHTML = total;
    return;
  }
  return alert(message);
}

btn.addEventListener("click", () =>{
  searchData();
})