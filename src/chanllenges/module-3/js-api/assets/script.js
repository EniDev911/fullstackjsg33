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
      if (value[1].codigo === undefined) {
        console.log("Missing");
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
    lineColor = "rgb(255,55,255)";

  const config = {
    type: typeChart,
    data: {
      labels: data.map((item) => item.fecha.substring(1, 10)),
      datasets: [
        {
          label: title,
          backgroundColor: lineColor,
          data: data.map((item) => item.valor),
        },
      ],
    },
  };
  return config;
};

const renderChart = async (indicator) => {
  const data = await getValues(indicator);
  dataFilter = data.serie.filter((value, index) => index < 10);
  config = getConfigChart(dataFilter);

  canvasChart.style.backgroundColor = "white";

  let chartStatus = Chart.getChart(canvasChart);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  let canvas = new Chart(canvasChart, config);
};

const getResults = async (_from, _to) => {
  console.log(_from);
  const values = await getValues(),
    formatResult = (_from / values[`${_to}`].valor).toFixed(2);
  console.log(formatResult);
  resultText.innerHTML = `Resultado: <span>\$ ${formatResult}</span>`;
};

window.addEventListener("load", () => {
  fillSelectBox();
  submitBtn.addEventListener("click", () => {
    getResults(Number(inputBox.value), selectBox.value);
    renderChart(selectBox.value);
  });
  document.addEventListener("keydown", (e) => {
    e.key === "Enter"
      ? getResults(Number(inputBox.value), selectBox.value) &&
        renderChart(selectBox.value)
      : false;
  });
});
