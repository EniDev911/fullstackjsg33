import { getDataColors } from "./utilities/helpers.js";
const API = "https://mindicador.cl/api/";
// selectors
const selectBox = document.getElementById("select-box"),
  inputBox = document.getElementById("input-box"),
  submitBtn = document.getElementById("submit-btn"),
  canvasChart = document.getElementById("chart"),
  resultText = document.getElementById("result");

/**
 *
 * @param {String} indicator A indicador type to get data ('optional')
 * @returns {Object} {} Returns fetch results or error
 */

const getValues = async (indicator = "") => {
  try {
    const options = { method: "GET" },
      res = await fetch(API.concat(indicator), options);
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

const prepareConfigChart = (data) => {
  const title = "Historial 10 últimos cambios";

  const config = {
    type: "line",
    data: {
      labels: data.map((ele) => ele.fecha.substring(0, 10)),
      datasets: [
        {
          label: title,
          data: data.map((item) => item.valor),
          backgroundColor: getDataColors(40)[6],
          borderColor: getDataColors()[8],
          pointBorderColor: getDataColors()[6],
          fill: true,
          borderWidth: 2,
          pointBorderWidth: 5,
          tension: 0.2,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: getDataColors()[8],
          },
        },
        y: {
          ticks: {
            color: getDataColors()[2],
          },
        },
      },
    },
  };
  return config;
};

const renderChart = async (indicator) => {
  const data = await getValues(indicator),
    dataFilter = data.serie.filter((value, index) => index < 10),
    config = prepareConfigChart(dataFilter);
  // Default All Chart colors
  Chart.defaults.color = "#d6ff00";
  let chartStatus = Chart.getChart(canvasChart);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  canvasChart.parentNode.style.opacity = "1";
  new Chart("chart", config);
};

const getResults = async (_from, _to) => {
  const values = await getValues(),
    formatResult = (_from / values[`${_to}`].valor).toFixed(2);
  let symbol = "";
  _to === "euro" ? (symbol = "€") : (symbol = "");
  resultText.innerHTML = `Resultado: <span>\$ ${formatResult.replace(
    ".",
    ","
  )} ${symbol}</span>`;
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
    inputBox.value != ""
      ? getResults(Number(inputBox.value), selectBox.value) &&
        renderChart(selectBox.value)
      : alert("Debe ingresar un monto para buscar");
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
