const API = "https://mindicador.cl/api/";
// selectors
const selectBox = document.getElementById("select-box"),
  inputBox = document.getElementById("input-box"),
  submitBtn = document.getElementById("submit-btn"),
  canvasChart = document.getElementById("chart"),
  resultText = document.getElementById("result");

/**
 *
 * @param {String} indicator Un tipo de indicador para obtener su data ('opcional')
 * @returns {Object} {} El resultado de la petición, de lo contrario un error de la excepción ocurrida.
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

const getConfigChart = (data) => {
  const typeChart = "line",
    title = "Historial 10 últimos cambios",
    lineColor = "rgb(255,55,255)",
    _labels = data.map((item) => item.fecha.substring(0, 10)),
    _data = data.map((item) => item.valor);

  const config = {
    type: typeChart,
    data: {
      labels: _labels,
      datasets: [
        {
          label: title,
          backgroundColor: lineColor,
          data: _data,
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(105, 99, 132, 1)",
          pointBorderColor: "rgba(255, 255, 255, 1)",
          color: "#fff",
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: ["yellow"],
          },
        },
        y: {
          ticks: {
            color: ["#ccc"],
          },
        },
      },
    },
  };
  return config;
};

const renderChart = async (indicator) => {
  const data = await getValues(indicator);
  dataFilter = data.serie.filter((value, index) => index < 10);
  config = getConfigChart(dataFilter);

  let chartStatus = Chart.getChart(canvasChart);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  canvasChart.parentNode.style.opacity = "1";
  let canvas = new Chart(canvasChart, config);
};

const getResults = async (_from, _to) => {
  const values = await getValues(),
    formatResult = (_from / values[`${_to}`].valor).toFixed(2);
  let symbol = "";
  if (_to === "euro") {
    symbol = "€";
  }
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
