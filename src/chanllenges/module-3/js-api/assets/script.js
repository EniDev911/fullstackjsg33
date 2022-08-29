import { prepareConfigChart } from "./utilities/helpers.js";
import { validate } from "./utilities/helpers.js";

const API = "https://mindicador.cl/api/";
// selectors
const selectBox = document.getElementById("select-box"),
  inputBox = document.getElementById("input-box"),
  submitBtn = document.getElementById("submit-btn"),
  resultText = document.getElementById("result");

const getValues = async (indicator = "") => {
  try {
    const options = { method: "GET" },
      res = await fetch(API.concat(indicator), options);
    console.log(res);
    return res.ok ? await res.json() : alert("Recursos no disponible");
  } catch (err) {
    return err.message;
  }
};

const fillSelectBox = async () => {
  const values = await getValues();
  if (values) {
    let html = "";
    Array.from(Object.entries(values)).forEach((value) => {
      if (
        value[1].codigo === undefined ||
        value[1].codigo === "tpm" ||
        value[1].codigo === "tasa_desempleo"
      ) {
        console.log(`indicador ${value[1].codigo} ignorado`);
      } else {
        html += `<option value="${value[1].codigo}">${value[1].nombre}</option>`;
      }
    });
    selectBox.innerHTML = html;
  }
};

const renderChart = async (indicator) => {
  const data = await getValues(indicator),
    chartStatus = Chart.getChart("chart");
  chartStatus != undefined ? chartStatus.destroy() : false;
  Chart.defaults.color = "#d6ff00";
  new Chart("chart", prepareConfigChart("chart", data));
};

const getResults = async (_from, _to) => {
  const values = await getValues(),
    formatResult = (_from / values[`${_to}`].valor).toFixed(2);
  let symbol = "$";
  if (_to === "euro") {
    symbol = "€";
  } else if (_to === "bitcoin") {
    symbol = "฿";
  }
  resultText.innerHTML = `<span>${symbol} ${formatResult.replace(
    ".",
    ","
  )}</span>`;
};

window.addEventListener("load", () => {
  document.body.className = "loaded";
  console.log(
    "%c→ENIDEV911",
    `font-size: 35px; 
      background: #393939; 
        color: #fff; padding: 10px; 
        border-radius: 4px;
        border-bottom: 1px solid #f6c;`
  );
  fillSelectBox();
  submitBtn.addEventListener("click", () => {


    validate(Number(inputBox.value))
      ? getResults(Number(inputBox.value), selectBox.value) &&
      renderChart(selectBox.value)
      : "";
  });
  document.addEventListener("keydown", (e) => {
    e.key === "Enter"
      ? inputBox.value != ""
        ? getResults(Number(inputBox.value), selectBox.value) &&
        renderChart(selectBox.value)
        : alert("Debe ingresar un monto para buscar")
      : "";
  });
});
