const API = "https://mindicador.cl/api/";
// SELECTORS
const selectBox = document.getElementById("select-box"),
  inputBox = document.getElementById("input-box"),
  btnSearch = document.getElementById("btn-search"),
  resultText = document.getElementById("result"),
  canvasChart = document.getElementById("chart");

// REALIZA LAS PETICIONES A LA API
async function getValues(indicador = "") {
  try {
    const response = await fetch(API.concat(indicador));
    return response.ok ? await response.json() : alert("Recurso no disponible");
  } catch (error) {
    return error.message;
  }
}

// LLENAR EL SELECT
async function fillSelectBox() {
  const values = await getValues();
  //  codigos = ["uf", "ivp", "utm"];
  if (values) {
    let html = "";
    Array.from(Object.entries(values)).forEach((value) => {
      if (
        value[1].codigo === undefined ||
        value[1].codigo === "tpm" ||
        value[1].codigo === "ipc" ||
        value[1].codigo === "imacec" ||
        value[1].codigo === "tasa_desempleo"
      ) {
        console.log(`Ignorado ${value[1].codigo}`);
      } else {
        html += `<option value="${value[1].codigo}">${value[1].nombre}</option>`;
      }
    });
    selectBox.innerHTML = html;
  }
}

// OBTENER LA CONVERSIÓN
async function getResults(_from, _to) {
  const values = await getValues(),
    formatResult = (_from / values[`${_to}`].valor).toFixed(2);
  let symbol = "";
  _to === "euro" ? (symbol = "€") : "";

  resultText.innerHTML = `Resultado: <span>\$ ${formatResult} ${symbol}</span>`;
}
// CARGAR CONFIGURACIÓN DEL GRÁFICO
function getConfigChart(_data) {
  const xLabels = _data.map((item) => item.fecha.substring(0, 10));
  const yLabels = _data.map((item) => item.valor);
  const config = {
    type: "line",
    data: {
      labels: xLabels,
      datasets: [
        {
          label: "Últimos 10 cambios",
          backgroundColor: ["purple", "blue", "red", "orange"],
          data: yLabels,
        },
      ],
      borderWidth: 3,
    },
    options: {
      responsive: true,
    },
  };

  return config;
}

// RENDER DEL GRÁFICO
async function renderChart(indicator) {
  const data = await getValues(indicator);
  const dataFilter = data.serie.filter((item, index) => index < 10);
  const config = getConfigChart(dataFilter);

  let chartStatus = Chart.getChart(canvasChart);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(canvasChart, config);
}

btnSearch.addEventListener("click", function () {
  inputBox.value != ""
    ? getResults(inputBox.value, selectBox.value) &&
      renderChart(selectBox.value)
    : alert("Debes ingresar un valor para buscar");
});

fillSelectBox();
